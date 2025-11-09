import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, History, Sparkles } from 'lucide-react';
import GenerateQuizTab from './tabs/GenerateQuizTab';
import HistoryTab from './tabs/HistoryTab';

function App() {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100/30 via-indigo-100/20 to-purple-100/30 animate-gradient-shift pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header - Glass Effect */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg"
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  AI Wiki Quiz Generator
                </h1>
                <p className="text-gray-600 mt-1 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  Generate intelligent quizzes from Wikipedia using AI
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Tab Navigation - Floating Glass Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white/90 backdrop-blur-md border border-blue-200 shadow-lg rounded-2xl p-2"
          >
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab('generate')}
                className={`${
                  activeTab === 'generate'
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-300/50 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-blue-50'
                } flex-1 py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5" />
                  <span>Generate Quiz</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`${
                  activeTab === 'history'
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-300/50 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-blue-50'
                } flex-1 py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300`}
              >
                <span className="flex items-center justify-center gap-2">
                  <History className="w-5 h-5" />
                  <span>History</span>
                </span>
              </button>
            </nav>
          </motion.div>
        </div>

        {/* Tab Content with Animation */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'generate' ? <GenerateQuizTab /> : <HistoryTab />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer - Gradient Text */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm border-t border-blue-200 mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-600 text-sm hover:text-gray-800 transition-colors">
              Powered by <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text font-semibold">FastAPI</span> ⚡ 
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text font-semibold"> Gemini AI</span> ⚡ 
              <span className="bg-gradient-to-r from-pink-400 to-blue-500 text-transparent bg-clip-text font-semibold"> React</span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
