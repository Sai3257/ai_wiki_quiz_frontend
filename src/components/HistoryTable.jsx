import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ExternalLink, Clock, FileText } from 'lucide-react';

/**
 * HistoryTable Component
 * Displays a table of quiz history with view details action
 */
const HistoryTable = ({ quizzes, onViewDetails, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/30 border-t-blue-500"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-blue-500/20"></div>
        </div>
        <p className="mt-4 text-gray-400 font-medium">Loading quiz history...</p>
      </div>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-12 shadow-lg border border-blue-200 text-center">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl mb-4 shadow-lg shadow-blue-500/40">
          <FileText className="w-12 h-12 text-white" />
        </div>
        <p className="text-gray-800 text-xl font-semibold mb-2">No quizzes yet</p>
        <p className="text-gray-600">Generate your first quiz to see it here!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 border border-blue-200 shadow-lg rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-200 to-purple-200">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-blue-300">
                ID
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-blue-300">
                Title
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-blue-300">
                Wikipedia URL
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-blue-300">
                Created At
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-blue-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <motion.tr 
                key={quiz.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="transition-all duration-300 hover:bg-blue-100/60 hover:shadow-md border-b border-blue-200/50 bg-white/80"
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold shadow-md">
                    {quiz.id}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500/30 p-2 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-[#333333] font-semibold">{quiz.title}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <a
                    href={quiz.wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-center space-x-2 transition-colors font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>
                      {quiz.wikipedia_url.length > 40
                        ? quiz.wikipedia_url.substring(0, 40) + '...'
                        : quiz.wikipedia_url}
                    </span>
                  </a>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-[#333333] text-sm font-semibold">
                    {new Date(quiz.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-600 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(quiz.created_at).toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <motion.button
                    onClick={() => onViewDetails(quiz.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-blue-500/40 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
