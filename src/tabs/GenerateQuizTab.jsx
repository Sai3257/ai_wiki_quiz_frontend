import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Link2, Target, Loader2, RotateCcw } from 'lucide-react';
import { generateQuiz } from '../services/api';
import QuizDisplay from '../components/QuizDisplay';

/**
 * GenerateQuizTab Component
 * Handles quiz generation form and displays generated quiz
 */
const GenerateQuizTab = () => {
  const [wikipediaUrl, setWikipediaUrl] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate URL
    if (!wikipediaUrl.includes('wikipedia.org/wiki/')) {
      setError('Please enter a valid Wikipedia article URL');
      return;
    }

    setLoading(true);
    setError(null);
    setQuiz(null);

    try {
      const generatedQuiz = await generateQuiz(wikipediaUrl, numQuestions);
      setQuiz(generatedQuiz);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to generate quiz. Please try again.');
      setQuiz(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setWikipediaUrl('');
    setNumQuestions(5);
    setQuiz(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Form Card - Centered and Elegant */}
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-md border border-blue-200 shadow-lg rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl mb-4 shadow-lg shadow-blue-500/40"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">
              Generate AI Quiz
            </h2>
            <p className="text-gray-600">Transform any Wikipedia article into an interactive quiz</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Wikipedia URL Input */}
            <div>
              <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Link2 className="w-4 h-4 text-blue-400" />
                Wikipedia Article URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="url"
                  value={wikipediaUrl}
                  onChange={(e) => setWikipediaUrl(e.target.value)}
                  placeholder="https://en.wikipedia.org/wiki/Artificial_intelligence"
                  className="w-full px-5 py-4 bg-white border-2 border-blue-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-300 transition-all duration-300"
                  required
                  disabled={loading}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Link2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Number of Questions */}
            <div>
              <label htmlFor="numQuestions" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                Number of Questions
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="numQuestions"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                  min="5"
                  max="10"
                  className="w-full px-5 py-4 bg-white border-2 border-blue-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-300 transition-all duration-300"
                  required
                  disabled={loading}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  5-10
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-blue-400/50 transition-all duration-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Quiz...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generate Quiz
                  </span>
                )}
              </motion.button>
              
              {quiz && (
                <motion.button
                  type="button"
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-gray-500/40 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw className="w-5 h-5" />
                    New Quiz
                  </span>
                </motion.button>
              )}
            </div>
          </form>

          {/* Loading Message */}
          {loading && (
            <div className="mt-6 bg-gradient-to-r from-[#eae6ff] to-[#e3f2fd] border-l-4 border-blue-400 p-6 rounded-xl shadow-md">
              <p className="text-gray-800 font-semibold text-lg flex items-center">
                <svg className="animate-spin h-6 w-6 mr-3 text-blue-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ✨ Generating your AI quiz... please wait a moment.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-gradient-to-r from-red-900/30 to-pink-900/30 border-l-4 border-red-500 p-5 rounded-xl backdrop-blur-sm">
              <p className="text-red-300 font-medium flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Display Generated Quiz */}
      {quiz && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <QuizDisplay quiz={quiz} />
        </motion.div>
      )}
    </div>
  );
};

export default GenerateQuizTab;
