import { motion } from 'framer-motion';

const TextArea = ({
  label,
  error,
  icon: Icon,
  animate = true,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, x: -20 } : false}
      animate={animate ? { opacity: 1, x: 0 } : false}
      exit={animate ? { opacity: 0, x: 20 } : false}
      className={`space-y-1 ${className}`}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <textarea
          {...props}
          className={`
            block w-full rounded-lg shadow-sm
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-gray-100 dark:disabled:bg-gray-900
            disabled:cursor-not-allowed
            transition-colors duration-200
            resize-none
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
          `}
        />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-600 dark:text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default TextArea;