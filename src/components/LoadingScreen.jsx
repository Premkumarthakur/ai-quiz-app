import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingScreen = ({ topic }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="inline-block mb-6"
        >
          <Loader2 className="w-16 h-16 text-blue-500" />
        </motion.div>

        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Generating Quiz...
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Creating 5 questions about {topic}
        </p>

        <div className="flex justify-center gap-2 mt-6">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="w-3 h-3 bg-blue-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-3 h-3 bg-purple-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-3 h-3 bg-pink-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
