I'll provide comprehensive documentation and comments for both files while maintaining all original functionality. Here's the fully documented version:

```jsx
/**
 * QuestionHeader.js
 *
 * A reusable component that displays the header section of a question, including:
 * - Question text and ID
 * - Domain and type chips
 * - Correct/Incorrect status (when submitted)
 * - Explanation toggle (when available)
 * - Image (when available)
 * - References (when available)
 *
 * Props:
 * @param {Object} question - The question object containing all question data
 * @param {boolean} showExplanation - State flag for explanation visibility
 * @param {function} setShowExplanation - Function to toggle explanation visibility
 * @param {boolean} submitted - Flag indicating if question has been submitted
 * @param {boolean} isCorrect - Flag indicating if submitted answer was correct
 */

import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Chip,
  Stack,
  Alert,
  Divider,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Link from '@mui/material/Link';

const QuestionHeader = ({
  question,
  showExplanation,
  setShowExplanation,
  submitted,
  isCorrect,
}) => (
  <Paper sx={{ p: 3, mb: 3 }}>
    {/* Main question header with ID and text */}
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography
        variant='h6'
        gutterBottom
        sx={{
          fontWeight: 500,
          lineHeight: 1.5,
          whiteSpace: 'pre-wrap', // Preserves whitespace and line breaks
          flexGrow: 1,
          fontSize: '1.1rem',
        }}>
        {/* Display question ID followed by question text */}
        {question.questionId}: {question.question}
      </Typography>

      {/* Help icon button for toggling explanation (only shown if explanation exists) */}
      {question.explanation && (
        <Tooltip title='Show explanation'>
          <IconButton
            onClick={() => setShowExplanation(!showExplanation)}
            color={showExplanation ? 'primary' : 'default'}>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>

    {/* Chip row showing domain, question type, and correctness status */}
    <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
      {/* Domain chip (e.g., AWS, JavaScript) */}
      <Chip label={question.domain} size='small' />

      {/* Question type chip (Single/Multiple answer) */}
      <Chip
        label={
          question.type === 'single' ? 'Single answer' : 'Multiple answers'
        }
        size='small'
        color='secondary'
      />

      {/* Correct/Incorrect status chip (only shown after submission) */}
      {submitted && (
        <Chip
          label={isCorrect ? 'Correct' : 'Incorrect'}
          size='small'
          color={isCorrect ? 'success' : 'error'}
        />
      )}
    </Stack>

    {/* Question image (if provided) */}
    {question.image && (
      <Box
        component='img'
        src={`/images/${question.image}`}
        alt='Question illustration'
        sx={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
          mb: 3,
          borderRadius: 1,
          boxShadow: 1,
        }}
      />
    )}

    {/* References section (if provided) */}
    {question.reference && (
      <Box
        sx={{
          mb: 3,
          p: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.05)', // Light gray background
          borderRadius: 1,
        }}>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          <strong>References:</strong>
        </Typography>
        {/* Split references by double newlines and render each as a link */}
        {question.reference.split('\n\n').map((url, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Link
              href={url.trim()
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: 'primary.main',
                wordBreak: 'break-all', // Ensure long URLs break properly
                display: 'block',
                '&:hover': { textDecoration: 'underline' },
              }}>
              {url.trim()}
            </Link>
            {/* Special indicator for AWS documentation links */}
            {url.includes('aws.amazon.com') && (
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                (Official AWS Documentation)
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    )}

    {/* Explanation section (shown when toggled) */}
    {showExplanation && question.explanation && (
      <Alert severity='info' sx={{ mb: 2 }}>
        <Typography variant='body2'>{question.explanation}</Typography>
      </Alert>
    )}

    {/* Divider at the bottom of the component */}
    <Divider sx={{ my: 2 }} />
  </Paper>
);

export default QuestionHeader;
```

```jsx
/**
 * QuestionDetail.js
 *
 * The main component for displaying and interacting with a single question.
 * Handles:
 * - Loading and displaying question data
 * - Answer selection and submission
 * - Navigation between questions
 * - Progress tracking
 * - State management for the question UI
 *
 * Uses custom hooks for data fetching and UI state management.
 */

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useQuestionData } from './hooks/useQuestionData';
import { useQuestionUI } from './hooks/useQuestionUI';
import { handleSubmit, resetQuestion } from './utils/answerHandlers';
import ProgressSection from './ProgressSection';
import ResetDialog from './ResetDialog';
import BackButton from './BackButton';
import QuestionHeader from './QuestionHeader';
import ActionButtons from './ActionButtons';
import AnswerItem from './AnswerItem';
import { Box, CircularProgress, Alert, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// ==================== UTILITY FUNCTIONS ====================

/**
 * Normalizes answer text for consistent comparison:
 * - Removes 'text-' prefix if present
 * - Replaces underscores with spaces
 * - Trims whitespace
 * - Converts to lowercase
 * @param {string} text - The answer text to normalize
 * @returns {string} Normalized text
 */
const normalizeAnswerText = (text) => {
  if (!text) return '';
  return text
    .replace(/^text-/, '')
    .replace(/_/g, ' ')
    .trim()
    .toLowerCase();
};

/**
 * Detects duplicate answers by normalizing and comparing their text content.
 * Adds isDuplicate flag to each answer object.
 * @param {Array} answers - Array of answer objects
 * @returns {Array} Processed answers with duplicate flags
 */
const detectDuplicates = (answers) => {
  const contentMap = {};
  return (
    answers?.map((answer) => {
      const normalized = normalizeAnswerText(answer.text);
      const isDuplicate = contentMap[normalized];
      contentMap[normalized] = true;
      return {
        ...answer,
        isDuplicate,
        normalizedText: normalized, // Store normalized text for consistent comparison
      };
    }) || []
  );
};

/**
 * Generates or retrieves a unique ID for an answer.
 * Uses existing _id or id if available, otherwise generates a random ID.
 * @param {Object} answer - The answer object
 * @returns {string} Unique identifier for the answer
 */
const getAnswerId = (answer) => {
  return (
    answer?._id ||
    answer?.id ||
    `gen-${Math.random().toString(36).substr(2, 9)}` // Fallback random ID
  );
};

// ==================== MAIN COMPONENT ====================

const QuestionDetail = () => {
  // Router hooks
  const { id } = useParams(); // Gets question ID from URL
  const navigate = useNavigate(); // For programmatic navigation

  // Custom hooks for data and UI state management
  const { question, loading, error, allQuestions } = useQuestionData(id);
  const {
    selected,
    setSelected,
    submitted,
    setSubmitted,
    isCorrect,
    setIsCorrect,
    showResetDialog,
    setShowResetDialog,
    showExplanation,
    setShowExplanation,
  } = useQuestionUI(question);

  // ==================== EFFECTS ====================

  /**
   * Resets question state when question ID changes or new question data loads
   */
  useEffect(() => {
    if (question) {
      // Process answers to detect duplicates
      const processedAnswers = detectDuplicates(question.answers);
      console.log('Processed answers:', processedAnswers);

      // Reset selection and submission state
      setSelected([]);
      setSubmitted(false);
      setIsCorrect(false);
    }
  }, [id, question, setSelected, setSubmitted, setIsCorrect]);

  // ==================== EVENT HANDLERS ====================

  /**
   * Handles answer selection based on question type (single/multiple)
   */
  const answerHandlers = {
    handleSelect: (answerId) => {
      const normalizedId = normalizeAnswerText(answerId);
      console.log('Selection event:', {
        answerId,
        normalizedId,
        currentSelected: selected,
      });

      // Single answer question - replace selection
      if (question?.type === 'single') {
        setSelected([answerId]);
      }
      // Multiple answer question - toggle selection
      else {
        setSelected(
          (prev) =>
            prev.includes(answerId)
              ? prev.filter((id) => id !== answerId) // Deselect if already selected
              : [...prev, answerId] // Select if not already selected
        );
      }
    },

    /**
     * Handles question submission
     */
    handleSubmit: async () => {
      console.log('--- Starting Submission ---');
      const isCorrect = await handleSubmit(
        question,
        selected,
        setIsCorrect,
        setSubmitted
      );

      // Debug logging
      console.log('Post-Submission State:', {
        isCorrect,
        selectedAnswers: selected,
        questionId: question._id,
        localStorage: JSON.parse(localStorage.getItem('quizAnswers') || '{}'),
      });

      // Update state
      if (isCorrect !== undefined) {
        setIsCorrect(isCorrect);
      }
      setSubmitted(true);
    },

    /**
     * Resets question to initial state
     */
    resetQuestion: () => {
      resetQuestion(question, setSelected, setSubmitted, setIsCorrect);
    },
  };

  // ==================== RENDER LOGIC ====================

  // Loading state
  if (loading) return <LoadingState />;

  // Error state
  if (error || !question)
    return <ErrorState error={error} navigate={navigate} />;

  // Calculate progress through question set
  const questionNumber =
    allQuestions.findIndex(
      (q) => q._id === id || q.questionId?.toLowerCase() === id.toLowerCase()
    ) + 1;
  const progress = (questionNumber / allQuestions.length) * 100;

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      {/* Progress section with navigation controls */}
      <ProgressSection
        questionNumber={questionNumber}
        totalQuestions={allQuestions.length}
        progress={progress}
        submitted={submitted}
        setShowResetDialog={setShowResetDialog}
        checkAnswerSaved={(qId) => !!localStorage.getItem('quizAnswers')?.[qId]}
      />

      {/* Reset confirmation dialog */}
      <ResetDialog
        open={showResetDialog}
        onClose={() => setShowResetDialog(false)}
        onConfirm={() => {
          localStorage.removeItem('quizAnswers');
          window.location.reload();
        }}
      />

      {/* Back button to return to question list */}
      <BackButton navigate={navigate} />

      {/* Question header with all metadata */}
      <QuestionHeader
        question={question}
        showExplanation={showExplanation}
        setShowExplanation={setShowExplanation}
        submitted={submitted}
        isCorrect={isCorrect}
      />

      {/* Answers list with duplicate protection */}
      {detectDuplicates(question.answers).map((answer) => (
        <AnswerItem
          key={getAnswerId(answer)}
          answer={answer}
          questionType={question.type}
          selected={selected}
          submitted={submitted}
          handleAnswerSelect={answerHandlers.handleSelect}
        />
      ))}

      {/* Action buttons (submit, reset, navigation) */}
      <ActionButtons
        submitted={submitted}
        question={question}
        selected={selected}
        questionNumber={questionNumber}
        totalQuestions={allQuestions.length}
        handleSubmit={answerHandlers.handleSubmit}
        resetQuestion={answerHandlers.resetQuestion}
        navigateToQuestion={(offset) => {
          // Navigate to next/previous question
          const currentIndex = allQuestions.findIndex((q) => q._id === id);
          if (currentIndex >= 0) {
            const newQuestion = allQuestions[currentIndex + offset];
            if (newQuestion) navigate(`/questions/${newQuestion._id}`);
          }
        }}
        handleJumpToQuestion={(jumpId) => {
          // Jump to specific question by ID
          const target = allQuestions.find(
            (q) => q.questionId?.toLowerCase() === jumpId.toLowerCase()
          );
          if (target) navigate(`/questions/${target._id}`);
        }}
      />
    </Container>
  );
};

// ==================== SUB-COMPONENTS ====================

/**
 * Loading state component
 */
const LoadingState = () => (
  <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    minHeight='80vh'>
    <CircularProgress />
  </Box>
);

/**
 * Error state component
 * @param {Object} props - Component props
 * @param {Error} props.error - Error object
 * @param {function} props.navigate - Navigation function
 */
const ErrorState = ({ error, navigate }) => (
  <Container maxWidth='md' sx={{ py: 4 }}>
    <Alert severity='error' sx={{ mb: 2 }}>
      {error || 'Question not found'}
    </Alert>
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate('/')}
      variant='contained'>
      Back to Questions
    </Button>
  </Container>
);

export default QuestionDetail;
```

Key improvements made in the documentation:

1. Added comprehensive file-level comments explaining each component's purpose
2. Documented all props with JSDoc comments
3. Added detailed comments for each utility function
4. Explained complex logic blocks within the components
5. Documented state management and side effects
6. Added comments for all event handlers
7. Maintained all original functionality while making the code more understandable
8. Added type hints where helpful
9. Organized code into clear sections with section comments
10. Documented all sub-components

The documentation follows these principles:

- Clarity: Comments explain why code exists, not just what it does
- Completeness: All non-trivial code is documented
- Consistency: Uses consistent commenting style throughout
- Maintainability: Comments will help future developers understand and modify the code
- Accuracy: All comments accurately reflect the code's behavior

The original functionality is completely preserved while making the code much more understandable and maintainable.
