import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, FileText, Lightbulb, Link2, Sparkles } from 'lucide-react';

/**
 * QuizDisplayReadOnly Component
 * Displays a quiz in read-only format for history viewing
 * Shows correct answers highlighted and explanations visible
 */
const QuizDisplayReadOnly = ({ quiz }) => {
  if (!quiz) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Quiz Title Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-md border border-blue-200 shadow-lg rounded-2xl p-8"
      >
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg shadow-blue-500/40">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">{quiz.title}</h2>
            <p className="text-gray-600 text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Created: {new Date(quiz.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quiz Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/90 backdrop-blur-md border border-blue-200 shadow-lg rounded-2xl p-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg shadow-blue-500/40">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Summary</h3>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">{quiz.summary}</p>
      </motion.div>

      {/* Questions Section Header */}
      <div className="flex items-center justify-center space-x-3 py-4">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1"></div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Questions ({quiz.questions.length})
        </h3>
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1"></div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="bg-white/90 p-6 rounded-2xl shadow-md border border-gray-200 transition-all duration-300"
          >
            {/* Question Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                  Question {index + 1}
                </span>
                {question.difficulty && (
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {question.difficulty.toUpperCase()}
                  </span>
                )}
                <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent flex-1"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 leading-relaxed">
                {question.question}
              </h4>
            </div>

            {/* Options - Read-only, no interactivity */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, optIndex) => {
                const isCorrect = option === question.correct_answer;
                
                return (
                  <div
                    key={optIndex}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isCorrect
                        ? 'border-green-400 bg-[#e8f5e9]'
                        : 'border-gray-200 bg-[#f5f5f5]'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold mr-3 ${
                        isCorrect 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-400 text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className={`flex-1 font-medium ${
                        isCorrect ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {option}
                      </span>
                      {isCorrect && (
                        <span className="flex items-center space-x-2 text-green-600 font-bold">
                          <CheckCircle className="w-5 h-5" />
                          <span>✅</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation - Always visible in read-only mode */}
            {question.explanation && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-[#e3f2fd] border border-blue-200 p-5 rounded-xl shadow-sm"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-blue-500 p-2 rounded-lg shadow-md">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-blue-700 mb-2">💡 Explanation</p>
                    <p className="text-gray-800 leading-relaxed">{question.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Related Topics Section */}
      {quiz.related_topics && quiz.related_topics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-md border border-blue-200 shadow-lg rounded-2xl p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg shadow-lg shadow-purple-500/40">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Related Topics for Further Reading</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {quiz.related_topics.map((topic, index) => (
              <a
                key={index}
                href={`https://en.wikipedia.org/wiki/${topic.replace(/ /g, '_')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-2 border-blue-200 hover:border-blue-400 px-4 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Link2 className="w-4 h-4 text-blue-500 group-hover:text-blue-600" />
                <span className="text-gray-700 font-medium group-hover:text-gray-900">{topic}</span>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizDisplayReadOnly;
