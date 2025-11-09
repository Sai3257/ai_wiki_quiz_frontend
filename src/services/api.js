// API service for communicating with FastAPI backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

/**
 * Generate a quiz from a Wikipedia URL
 * @param {string} wikipediaUrl - The Wikipedia article URL
 * @param {number} numQuestions - Number of questions (5-10)
 * @returns {Promise<Object>} Quiz data
 */
export const generateQuiz = async (wikipediaUrl, numQuestions = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wikipedia_url: wikipediaUrl,
        num_questions: numQuestions,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate quiz');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
};

/**
 * Get all quiz history
 * @returns {Promise<Array>} Array of quiz summaries
 */
export const getQuizHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/history`);

    if (!response.ok) {
      throw new Error('Failed to fetch quiz history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    throw error;
  }
};

/**
 * Get a specific quiz by ID
 * @param {number} quizId - The quiz ID
 * @returns {Promise<Object>} Full quiz data
 */
export const getQuizById = async (quizId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/${quizId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch quiz');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
};

/**
 * Delete a quiz by ID
 * @param {number} quizId - The quiz ID
 * @returns {Promise<Object>} Success message
 */
export const deleteQuiz = async (quizId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/${quizId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete quiz');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting quiz:', error);
    throw error;
  }
};
