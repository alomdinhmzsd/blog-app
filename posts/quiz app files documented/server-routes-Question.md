I'll provide comprehensive documentation for these backend files,
explaining their purposes, relationships, and functionality in detail.

```javascript
/**
 * server.js - Backend Server Configuration
 *
 * This is the main entry point for the backend server. It handles:
 * - Express application setup
 * - MongoDB connection with retry logic
 * - CORS configuration
 * - Middleware setup
 * - Route mounting
 * - Error handling
 * - Server startup
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRouter = require('./routes'); // Main question routes

// Initialize Express application
const app = express();

// Configure allowed origins for CORS
const allowedOrigins = [
  'https://quiz.padmin-awslabs.link', // Production
  'http://localhost:5173', // Vite dev server
  'http://localhost:4005', // Create React App fallback
];

// CORS middleware configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ CORS rejected: ${origin}`);
        callback(new Error(`CORS not allowed from origin: ${origin}`));
      }
    },
    credentials: true, // Allow credentials/cookies
  })
);

// Body parsing middleware with increased limit for large requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection setup with retry logic
mongoose.set('strictQuery', true); // Prepare for Mongoose 7 change

/**
 * Establishes MongoDB connection with automatic retry on failure
 */
const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => console.log('✅ MongoDB connection established'))
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      console.log('⏳ Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

// Start initial connection attempt
connectWithRetry();

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('📊 MongoDB models:', mongoose.modelNames()); // Log registered models
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Mount question routes
app.use('/api/questions', questionRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    dbState: mongoose.connection.readyState, // 1 = connected
    dbName: mongoose.connection.name,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 MongoDB URI: ${process.env.MONGODB_URI}`);
  console.log(
    `🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:4005'}`
  );
});
```

```javascript
/**
 * routes.js - API Route Definitions
 *
 * Contains all question-related API routes:
 * - GET all questions
 * - GET single question by ID or questionId
 *
 * Features:
 * - Flexible question lookup (by MongoDB _id or questionId)
 * - Reference fallback logic
 * - Comprehensive error handling
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('./models/Question');

/**
 * GET /api/questions
 * Returns all questions sorted by questionId
 */
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ questionId: 1 });
    res.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

/**
 * GET /api/questions/:id
 * Returns a single question by:
 * - MongoDB _id
 * - questionId (case-insensitive)
 *
 * Also attempts to find reference from other versions if missing
 */
router.get('/:id', async (req, res) => {
  try {
    let question;

    // First try to find by MongoDB ID
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      question = await Question.findById(req.params.id)
        .select('+reference') // Explicitly include reference
        .lean(); // Return plain JS object
    }

    // If not found by ID, try by questionId (case-insensitive)
    if (!question) {
      question = await Question.findOne({
        questionId: { $regex: new RegExp(`^${req.params.id}$`, 'i') },
      })
        .select('+reference')
        .lean();
    }

    // Return 404 if question not found
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // If reference is missing, try to find it from another version
    if (!question.reference) {
      const referenceQuestion = await Question.findOne({
        questionId: question.questionId,
        reference: { $exists: true, $ne: '' },
      }).select('reference');

      if (referenceQuestion) {
        question.reference = referenceQuestion.reference;
      }
    }

    res.json({
      success: true,
      data: question,
    });
  } catch (err) {
    console.error('Error fetching question:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

module.exports = router;
```

```javascript
/**
 * Question.js - MongoDB Question Model
 *
 * Defines the Question schema with:
 * - Strict validation rules
 * - Custom pre-save hooks
 * - Indexes for performance
 * - Virtuals and transformations
 */

const mongoose = require('mongoose');

// Answer sub-schema
const answerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Answer text is required'],
    },
    isCorrect: {
      type: Boolean,
      required: [true, 'Must specify if answer is correct'],
    },
    explanation: {
      type: String,
      required: [true, 'Explanation is required'],
    },
  },
  { _id: true } // Ensure answers get their own IDs
);

// Main Question schema
const questionSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: [true, 'Question ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [
        /^SAA-Q\d{3,4}$/,
        'Please use valid question ID format (SAA-Q001)',
      ],
    },
    question: {
      type: String,
      required: [true, 'Question text is required'],
      minlength: [10, 'Question must be at least 10 characters'],
    },
    answers: {
      type: [answerSchema],
      validate: {
        validator: function (v) {
          // Must have at least 2 answers with at least one correct
          return v.length >= 2 && v.some((a) => a.isCorrect);
        },
        message: 'Must have at least 2 answers with one correct',
      },
    },
    type: {
      type: String,
      enum: {
        values: ['single', 'multi'],
        message: 'Type must be either "single" or "multi"',
      },
      default: 'single',
    },
    domain: {
      type: String,
      required: [true, 'Domain is required'],
    },
    image: {
      type: mongoose.Schema.Types.Mixed, // Can be String or Array
      validate: {
        validator: function (v) {
          return (
            v === undefined ||
            v === null ||
            typeof v === 'string' ||
            (Array.isArray(v) && v.every((img) => typeof img === 'string'))
          );
        },
        message: 'Image must be a string, array of strings, or null',
      },
    },
    reference: {
      type: String,
      validate: {
        validator: function (v) {
          if (!v) return true;
          // Handle both string and array input
          const urls = Array.isArray(v) ? v : v.split('\n\n');
          return urls.every((url) => /^https?:\/\/.+\..+/.test(url.trim()));
        },
        message: 'Each reference must be a valid URL',
      },
    },
  },
  {
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to objects
  }
);

/**
 * Pre-save hook to normalize reference format
 * Converts array references to newline-separated strings
 */
questionSchema.pre('save', function (next) {
  if (this.reference) {
    // Handle array input
    if (Array.isArray(this.reference)) {
      this.reference = this.reference
        .filter((url) => url && url.trim()) // Remove empty
        .join('\n\n'); // Convert to string
    }
    // Handle string input
    else if (typeof this.reference === 'string') {
      this.reference = this.reference
        .split('\n\n')
        .map((url) => url.trim())
        .filter((url) => url)
        .join('\n\n');
    }
  }
  next();
});

// Create index on domain field for faster queries
questionSchema.index({ domain: 1 });

module.exports = mongoose.model('Question', questionSchema);
```

### Key Relationships and Architecture:

1. **server.js** is the main entry point that:

   - Configures the Express application
   - Sets up MongoDB connection
   - Mounts the routes from routes.js
   - Handles global middleware and error handling

2. **routes.js** contains:

   - All question-related API endpoints
   - Business logic for question retrieval
   - Connects to the Question model for database operations

3. **Question.js** defines:
   - The MongoDB schema and model
   - Validation rules and data structure
   - Pre-save hooks for data normalization
   - Indexes for query optimization

### Key Features:

1. **Robust Error Handling**:

   - Comprehensive error responses
   - Development/production mode differentiation
   - Automatic retry for database connections

2. **Data Validation**:

   - Strict schema validation in Mongoose
   - Custom validators for complex fields
   - Pre-save hooks for data normalization

3. **Flexible Querying**:

   - Supports lookup by both MongoDB ID and questionId
   - Case-insensitive questionId matching
   - Reference fallback mechanism

4. **Performance**:

   - Database indexing
   - Lean queries where appropriate
   - CORS optimization

5. **Maintainability**:
   - Clear separation of concerns
   - Comprehensive logging
   - Health check endpoint

This backend architecture provides a solid foundation for the AWS exam prep application, with clear separation between configuration, routing, and data modeling layers. The code is well-documented and includes robust error handling and validation throughout.
