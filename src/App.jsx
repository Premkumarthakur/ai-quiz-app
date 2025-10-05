import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TopicSelection from './components/TopicSelection';
import LoadingScreen from './components/LoadingScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import ThemeToggle from './components/ThemeToggle';
import { generateQuiz } from './services/aiService';

function QuizApp() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [selectedTopic, setSelectedTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleSelectTopic = async (topic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setError('');
    navigate('/loading');

    try {
      const quizQuestions = await generateQuiz(topic);
      setQuestions(quizQuestions);
      navigate('/quiz');
    } catch (err) {
      setError(err.message || 'Failed to generate quiz. Please try again.');
      setTimeout(() => {
        navigate('/');
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (finalScore, answers) => {
    setScore(finalScore);
    setUserAnswers(answers);
    navigate('/result');
  };

  const handleRetake = () => {
    setQuestions([]);
    setScore(0);
    setUserAnswers({});
    setSelectedTopic('');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <ThemeToggle isDark={isDark} onToggle={handleToggleTheme} />

      {error && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}

      <Routes>
        <Route path="/" element={<TopicSelection onSelectTopic={handleSelectTopic} />} />
        <Route path="/loading" element={<LoadingScreen topic={selectedTopic} />} />
        <Route
          path="/quiz"
          element={
            questions.length > 0 ? (
              <QuizScreen
                questions={questions}
                onComplete={handleQuizComplete}
                topic={selectedTopic}
              />
            ) : (
              <TopicSelection onSelectTopic={handleSelectTopic} />
            )
          }
        />
        <Route
          path="/result"
          element={
            <ResultScreen
              score={score}
              totalQuestions={questions.length}
              onRetake={handleRetake}
              topic={selectedTopic}
              questions={questions}
              userAnswers={userAnswers}
            />
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <QuizApp />
    </Router>
  );
}

export default App;
