import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';

const QuizScreen = ({ questions, onComplete, topic }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [direction, setDirection] = useState(0);

  const handleSelectAnswer = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    onComplete(score, selectedAnswers);
  };

  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const allAnswered = questions.every((_, index) => selectedAnswers[index] !== undefined);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
            {topic}
          </h2>
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectAnswer(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {isSelected && <CheckCircle className="w-5 h-5" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  currentQuestion === 0
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    allAnswered
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit Quiz
                </motion.button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    isAnswered
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizScreen;
