import { motion } from 'framer-motion';
import { Brain, Cpu, Heart, Rocket, Sparkles } from 'lucide-react';

const topics = [
  {
    id: 1,
    name: 'Wellness',
    description: 'Health, mindfulness, and well-being',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 2,
    name: 'Tech Trends',
    description: 'Latest innovations in technology',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    name: 'AI Basics',
    description: 'Fundamentals of artificial intelligence',
    icon: Brain,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 4,
    name: 'Space Exploration',
    description: 'Mysteries of the cosmos',
    icon: Rocket,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 5,
    name: 'Creative Arts',
    description: 'Music, design, and creativity',
    icon: Sparkles,
    color: 'from-yellow-500 to-amber-500',
  },
];

const TopicSelection = ({ onSelectTopic }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          AI-Assisted Knowledge Quiz
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Choose a topic to test your knowledge
        </p>
      </motion.div>

      {/* Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mb-16">
        {topics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTopic(topic.name)}
              className="cursor-pointer"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 h-full">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                  {topic.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {topic.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center text-gray-500 dark:text-gray-400 text-sm pb-4"
      >
        <p>
          © {new Date().getFullYear()} Developed by{' '}
          <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Prem Kumar
          </span>
        </p>
      </motion.footer>
    </div>
  );
};

export default TopicSelection;
