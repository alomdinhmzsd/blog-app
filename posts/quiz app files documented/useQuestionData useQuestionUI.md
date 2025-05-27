Here are the fully documented versions of `useQuestionData.js` and `useQuestionUI.js` with detailed comments while maintaining all original functionality:

### `useQuestionData.js` with Comprehensive Documentation

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for fetching question data from API
 * @param {string} id - The ID of the question to fetch
 * @returns {object} Contains:
 *   - question: Current question data
 *   - loading: Loading state
 *   - error: Error message if request fails
 *   - allQuestions: Array of all questions
 */
export const useQuestionData = (id) => {
  // State management for question data
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    /**
     * Fetches question data from API
     * - Gets both the specific question and all questions list
     * - Handles errors gracefully
     */
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Parallel API requests for better performance
        const [allQuestionsRes, questionRes] = await Promise.all([
          // Fetch all questions
          axios.get(`${process.env.REACT_APP_API_URL}/api/questions`),

          // Fetch specific question with fallback retry
          axios
            .get(`${process.env.REACT_APP_API_URL}/api/questions/${id}`)
            .catch(async () => {
              // Retry with questionId param if initial request fails
              return axios.get(
                `${process.env.REACT_APP_API_URL}/api/questions/${id}`,
                { params: { questionId: id } }
              );
            }),
        ]);

        // Update state with fetched data
        setAllQuestions(allQuestionsRes.data.data || []);
        setQuestion(questionRes.data.data);
      } catch (err) {
        // Capture either API error message or generic error
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Re-run effect when question ID changes

  return { question, loading, error, allQuestions };
};

// Debug log for API configuration
console.log('API Base URL:', process.env.REACT_APP_API_URL);
```

### `useQuestionUI.js` with Comprehensive Documentation

```javascript
/**
 * Custom hook for managing question UI state
 * @param {object} question - The current question object
 * @returns {object} Contains:
 *   - selected: Array/string of selected answers
 *   - setSelected: Setter for selected answers
 *   - submitted: Submission status
 *   - setSubmitted: Setter for submission status
 *   - isCorrect: Correctness state
 *   - setIsCorrect: Setter for correctness
 *   - showResetDialog: Reset dialog visibility
 *   - setShowResetDialog: Setter for reset dialog
 *   - showExplanation: Explanation visibility
 *   - setShowExplanation: Setter for explanation
 *   - error: Error message
 *   - setError: Setter for error
 */
export const useQuestionUI = (question) => {
  // Initialize state based on question type
  const [selected, setSelected] = useState(
    question?.type === 'single' ? '' : [] // String for single, array for multiple
  );
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState(null);

  return {
    // Answer selection
    selected,
    setSelected,

    // Submission state
    submitted,
    setSubmitted,

    // Validation state
    isCorrect,
    setIsCorrect,

    // Dialog controls
    showResetDialog,
    setShowResetDialog,

    // Explanation toggle
    showExplanation,
    setShowExplanation,

    // Error handling
    error,
    setError,
  };
};
```

Key Documentation Features:

1. **JSDoc Comments**:

   - Clear descriptions of each hook's purpose
   - Detailed parameter documentation
   - Return value specifications

2. **State Management Explanations**:

   - Initial state logic
   - State update scenarios
   - Type-specific handling (single vs multiple answers)

3. **Error Handling**:

   - Clear error capture logic
   - Graceful fallbacks

4. **Performance Considerations**:

   - Parallel API requests
   - Dependency array explanations

5. **Component Architecture**:
   - Separation of concerns (data vs UI state)
   - Reusability considerations

These documented versions maintain all original functionality while providing:

- Better maintainability
- Easier debugging
- Clear usage guidelines
- Type safety through documentation
- Error handling transparency

Would you like me to document any additional files or explain specific parts in more detail?
