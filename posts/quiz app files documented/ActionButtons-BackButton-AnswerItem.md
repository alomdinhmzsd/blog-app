Here's the fully commented version of `ActionButtons.js`, maintaining all original functionality with precise documentation:

```javascript
import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

/**
 * ActionButtons component - Handles navigation and answer submission
 *
 * @param {boolean} submitted - Whether the current question has been submitted
 * @param {object} question - Current question object
 * @param {array} selected - Array of selected answer IDs
 * @param {number} questionNumber - Current question index
 * @param {number} totalQuestions - Total number of questions
 * @param {function} navigateToQuestion - Handler for prev/next navigation
 * @param {function} handleSubmit - Answer submission handler
 * @param {function} resetQuestion - Reset question state handler
 * @param {string} jumpToId - ID for question jump functionality
 * @param {function} setJumpToId - Setter for jumpToId
 * @param {function} handleJumpToQuestion - Handler for jump-to-question
 * @param {function} handleKeyDown - Keydown handler for text input
 */
const ActionButtons = ({
  submitted,
  question,
  selected,
  questionNumber,
  totalQuestions,
  navigateToQuestion,
  handleSubmit,
  resetQuestion,
  jumpToId,
  setJumpToId,
  handleJumpToQuestion,
  handleKeyDown,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      mt: 3,
      gap: 2,
    }}>
    {/* Unsubmitted State - Navigation and Submit */}
    {!submitted ? (
      <>
        {/* Previous Question Button */}
        <Button
          variant='outlined'
          startIcon={<NavigateBeforeIcon />}
          onClick={() => navigateToQuestion(-1)}
          disabled={questionNumber <= 1}
          sx={{ minWidth: '120px' }}>
          Previous
        </Button>

        {/* Submit Answer Button */}
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={
            question.type === 'single'
              ? !selected // Disabled if no selection for single-answer
              : selected.length === 0 // Disabled if no selections for multi-answer
          }
          sx={{ flex: 1 }}>
          Submit Answer
        </Button>

        {/* Next Question Button */}
        <Button
          variant='outlined'
          endIcon={<NavigateNextIcon />}
          onClick={() => navigateToQuestion(1)}
          disabled={questionNumber >= totalQuestions}
          sx={{ minWidth: '120px' }}>
          Next
        </Button>
      </>
    ) : (
      {/* Submitted State - Reset, Jump, and Continue */}
      <>
        {/* Try Again Button */}
        <Button
          variant='outlined'
          onClick={resetQuestion}
          sx={{ minWidth: '120px' }}>
          Try Again
        </Button>

        {/* Question Jump Controls */}
        <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
          <TextField
            size='small'
            placeholder='Jump to ID (saa-Q001)'
            value={jumpToId}
            onChange={(e) => setJumpToId(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ flex: 1 }}
          />
          <Button
            variant='contained'
            onClick={handleJumpToQuestion}
            disabled={!jumpToId}>
            Go
          </Button>
        </Box>

        {/* Next Question Button (Submitted State) */}
        <Button
          variant='contained'
          endIcon={<NavigateNextIcon />}
          onClick={() => navigateToQuestion(1)}
          disabled={questionNumber >= totalQuestions}
          sx={{ minWidth: '120px' }}>
          Next Question
        </Button>
      </>
    )}
  </Box>
);

export default ActionButtons;
```

---

Here's the fully commented version of `AnswerItem.js`:

```javascript
import React from 'react';
import {
  Box,
  FormControlLabel,
  Checkbox,
  Radio,
  Typography,
} from '@mui/material';

/**
 * AnswerItem component - Renders individual answer options
 *
 * @param {object} answer - Answer object containing text, _id, etc.
 * @param {string} questionType - 'single' or 'multiple' answer type
 * @param {array} selected - Array of selected answer IDs
 * @param {boolean} submitted - Whether question is submitted
 * @param {function} handleAnswerSelect - Handler for answer selection
 */
const AnswerItem = ({
  answer,
  questionType,
  selected,
  submitted,
  handleAnswerSelect,
}) => {
  // Determine if current answer is selected
  const isSelected =
    selected.includes(answer._id) ||
    selected.includes(answer.text) ||
    selected.some((id) => id.includes(answer._id || answer.text));

  // Use Radio for single-answer, Checkbox for multiple-answer
  const ControlComponent = questionType === 'single' ? Radio : Checkbox;

  return (
    <Box
      sx={{
        mb: 1,
        p: 2,
        border: '1px solid',
        borderColor: isSelected ? 'primary.main' : 'divider',
        borderRadius: 1,
        backgroundColor: isSelected ? 'action.selected' : 'background.paper',
        position: 'relative',
        // Special styling for duplicate answers
        ...(answer.isDuplicate && {
          borderLeft: '4px solid',
          borderLeftColor: 'warning.main',
        }),
      }}
      onClick={() => handleAnswerSelect(answer._id || answer.text)}>
      <FormControlLabel
        control={
          <ControlComponent
            checked={isSelected}
            disabled={submitted}
            sx={{
              mr: 1,
              // Color feedback after submission
              ...(submitted && {
                color: answer.isCorrect ? 'success.main' : 'error.main',
              }),
            }}
          />
        }
        label={
          <Typography
            sx={{
              fontWeight: isSelected ? 600 : 400,
              color: submitted
                ? answer.isCorrect
                  ? 'success.main' // Green for correct answers
                  : 'text.secondary' // Dim for incorrect
                : 'text.primary', // Normal when not submitted
            }}>
            {answer.text}
            {/* Duplicate answer indicator */}
            {answer.isDuplicate && (
              <Box
                component='span'
                sx={{
                  ml: 1,
                  px: 1,
                  py: 0.5,
                  bgcolor: 'warning.light',
                  color: 'warning.contrastText',
                  fontSize: 12,
                  borderRadius: 1,
                }}>
                Duplicate
              </Box>
            )}
          </Typography>
        }
        sx={{ width: '100%', m: 0 }}
      />
      {/* Show explanation after submission if available */}
      {submitted && answer.explanation && (
        <Typography
          variant='body2'
          sx={{
            mt: 1,
            pl: 4,
            fontStyle: 'italic',
            color: answer.isCorrect ? 'success.main' : 'error.main',
          }}>
          {answer.explanation}
        </Typography>
      )}
    </Box>
  );
};

export default AnswerItem;
```

---

Here's the fully commented version of `BackButton.js`:

```javascript
import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

/**
 * BackButton component - Simple navigation back button
 *
 * @returns {JSX.Element} Button with back navigation functionality
 */
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate('/')} // Navigates to home route
      sx={{ mb: 3 }}>
      Back to Questions
    </Button>
  );
};

export default BackButton;
```

Key documentation improvements:

1. Added JSDoc comments for all components and props
2. Explained conditional rendering logic
3. Documented UI state dependencies
4. Clarified styling rationale
5. Maintained all original functionality
6. Added comments for special cases (duplicate answers, etc.)

Would you like me to continue with any other files in your codebase?
