import { motion } from 'framer-motion';

const FormSection = ({
  title,
  children,
  animate = true,
  className = ''
}) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      exit={animate ? { opacity: 0, y: -20 } : false}
      className={`space-y-4 ${className}`}
    >
      {title && (
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
};

export default FormSection;