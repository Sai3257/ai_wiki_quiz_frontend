import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, BookOpen, FileText, Lightbulb } from 'lucide-react';

/**
 * QuizDisplay Component
 * Displays an interactive quiz with title, summary, and questions with options
 */
const QuizDisplay = ({ quiz }) => {
  // Track selected answers for each question
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!quiz) {
    return null;
  }

  const handleOptionClick = (questionIndex, option) => {
    // Only allow selection if not already answered
    if (!selectedAnswers[questionIndex]) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionIndex]: option
      });
    }
  };

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
        {quiz.questions.map((question, index) => {
          const selectedAnswer = selectedAnswers[index];
          const isAnswered = selectedAnswer !== undefined;
          const isCorrectAnswer = selectedAnswer === question.correct_answer;

          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white/90 p-5 rounded-2xl shadow-md border border-blue-100 transition-all duration-300"
            >
              {/* Question Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                    Question {index + 1}
                  </span>
                  <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent flex-1"></div>
                </div>
                <h4 className="text-xl font-bold text-gray-800 leading-relaxed">
                  {question.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {question.options.map((option, optIndex) => {
                  const isCorrect = option === question.correct_answer;
                  const isSelected = selectedAnswer === option;
                  
                  let optionStyle = 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
                  
                  if (isAnswered) {
                    if (isSelected && isCorrect) {
                      optionStyle = 'border-green-500 bg-green-50 shadow-md shadow-green-200';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-red-500 bg-red-50 shadow-md shadow-red-200';
                    } else if (!isSelected && isCorrect) {
                      optionStyle = 'border-green-500 bg-green-50 shadow-md shadow-green-200';
                    } else {
                      optionStyle = 'border-gray-300 bg-gray-50 opacity-60';
                    }
                  }

                  return (
                    <div
                      key={optIndex}
                      onClick={() => handleOptionClick(index, option)}
                      className={`group p-4 rounded-xl border-2 transition-all duration-300 ${optionStyle}`}
                    >
                      <div className="flex items-center">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold mr-3 ${
                          isAnswered && isCorrect
                            ? 'bg-green-500 text-white' 
                            : isAnswered && isSelected && !isCorrect
                            ? 'bg-red-500 text-white'
                            : isAnswered
                            ? 'bg-gray-300 text-gray-600'
                            : 'bg-gray-200 text-gray-700 group-hover:bg-blue-200'
                        }`}>
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className={`flex-1 ${
                          isAnswered && isCorrect
                            ? 'text-green-700 font-semibold' 
                            : isAnswered && isSelected && !isCorrect
                            ? 'text-red-700 font-semibold'
                            : 'text-gray-800'
                        }`}>
                          {option}
                        </span>
                        {isAnswered && isCorrect && (
                          <span className="flex items-center space-x-2 text-green-600 font-bold">
                            <CheckCircle className="w-5 h-5" />
                            <span>Correct</span>
                          </span>
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <span className="flex items-center space-x-2 text-red-600 font-bold">
                            <XCircle className="w-5 h-5" />
                            <span>Wrong</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback Message */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 p-4 rounded-xl border-l-4 ${
                    isCorrectAnswer 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <p className={`font-semibold ${
                    isCorrectAnswer ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {isCorrectAnswer 
                      ? '✅ Correct!' 
                      : `❌ Incorrect! The correct answer is: ${question.correct_answer}`
                    }
                  </p>
                </motion.div>
              )}

              {/* Explanation - Only show after answer is selected */}
              {isAnswered && question.explanation && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-[#f0f7ff] border-l-4 border-blue-500 p-5 rounded-xl shadow-sm"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 bg-blue-500 p-2 rounded-lg shadow-md">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-600 mb-1">Explanation</p>
                      <p className="text-gray-800 leading-relaxed">{question.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizDisplay;
