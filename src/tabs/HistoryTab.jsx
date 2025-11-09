import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, RefreshCw, X, FileText } from 'lucide-react';
import { getQuizHistory, getQuizById } from '../services/api';
import HistoryTable from '../components/HistoryTable';
import QuizDisplayReadOnly from '../components/QuizDisplayReadOnly';

/**
 * HistoryTab Component
 * Displays quiz history and allows viewing quiz details in a modal
 */
const HistoryTab = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch quiz history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const history = await getQuizHistory();
      setQuizzes(history);
    } catch (err) {
      setError(err.message || 'Failed to fetch quiz history');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (quizId) => {
    setShowModal(true);
    setModalLoading(true);
    setSelectedQuiz(null);

    try {
      const quiz = await getQuizById(quizId);
      setSelectedQuiz(quiz);
    } catch (err) {
      setError(err.message || 'Failed to fetch quiz details');
      setShowModal(false);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedQuiz(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg shadow-blue-500/40">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Quiz History
              </h2>
              <p className="text-gray-600 text-sm">View and manage your generated quizzes</p>
            </div>
          </div>
          <motion.button
            onClick={fetchHistory}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold flex items-center gap-2 shadow-md hover:shadow-blue-500/40"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </motion.button>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 border-l-4 border-red-500 p-5 rounded-xl backdrop-blur-sm">
          <p className="text-red-300 font-medium flex items-center">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        </div>
      )}

      {/* History Table */}
      <HistoryTable
        quizzes={quizzes}
        onViewDetails={handleViewDetails}
        loading={loading}
      />

      {/* Modal for Quiz Details */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 rounded-2xl shadow-xl border border-blue-200 max-w-5xl w-full flex flex-col max-h-[85vh]"
            >
              {/* Modal Header - Fixed */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm px-8 py-5 border-b border-blue-300 flex justify-between items-center z-10 rounded-t-2xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-blue-500/40">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Quiz Details
                  </h3>
                </div>
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  className="text-gray-600 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-xl"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="overflow-y-auto px-8 py-6 space-y-4 scroll-smooth flex-1">
                {modalLoading ? (
                  <div className="flex flex-col justify-center items-center py-16">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/30 border-t-blue-500"></div>
                      <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-blue-500/20"></div>
                    </div>
                    <p className="mt-4 text-gray-400 font-medium">Loading quiz details...</p>
                  </div>
                ) : selectedQuiz ? (
                  <QuizDisplayReadOnly quiz={selectedQuiz} />
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-block bg-red-500/20 p-4 rounded-2xl mb-4">
                      <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-lg">Failed to load quiz details</p>
                  </div>
                )}
              </div>

              {/* Modal Footer - Fixed */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm px-8 py-5 border-t border-blue-200 rounded-b-2xl">
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-md"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryTab;
