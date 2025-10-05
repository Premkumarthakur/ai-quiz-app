import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { generateFeedback } from '../services/aiService';

const ResultScreen = ({ score, totalQuestions, onRetake, topic, questions, userAnswers }) => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const percentage = (score / totalQuestions) * 100;

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const aiFeedback = await generateFeedback(score, totalQuestions, topic);
        setFeedback(aiFeedback);
      } catch (error) {
        console.error('Failed to generate feedback:', error);
        setFeedback('Great job completing the quiz! Keep learning and improving.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [score, totalQuestions, topic]);

  const getPerformanceColor = () => {
    if (percentage >= 80) return 'from-green-500 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-500 to-amber-500';
    return 'from-orange-500 to-red-500';
  };

  const confettiVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: [0, 1, 0],
      y: [0, 100],
      x: [(i - 5) * 20, (i - 5) * 30],
      rotate: [0, 360],
      transition: {
        duration: 2,
        delay: i * 0.1,
        repeat: Infinity,
        repeatDelay: 1,
      },
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {percentage >= 80 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={confettiVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-0 left-1/2"
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${getPerformanceColor()} flex items-center justify-center`}
        >
          <Trophy className="w-16 h-16 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
        >
          Quiz Complete!
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <p className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
            {score}/{totalQuestions}
          </p>
          <p className="text-2xl text-gray-600 dark:text-gray-300">
            {percentage.toFixed(0)}% Correct
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-2 text-gray-600 dark:text-gray-300">Generating feedback...</span>
            </div>
          ) : (
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
              {feedback}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Question Review
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {questions.map((question, index) => {
              const isCorrect = userAnswers[index] === question.correctAnswer;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className={`p-4 rounded-xl border-2 ${
                    isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-white mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Your answer:{' '}
                          </span>
                          <span className={isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                            {question.options[userAnswers[index]]}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              Correct answer:{' '}
                            </span>
                            <span className="text-green-700 dark:text-green-300">
                              {question.options[question.correctAnswer]}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetake}
          className="flex items-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Retake Quiz
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ResultScreen;
