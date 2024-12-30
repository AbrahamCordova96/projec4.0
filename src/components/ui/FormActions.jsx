import { motion } from 'framer-motion';

const FormActions = ({
  children,
  animate = true,
  className = ''
}) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      exit={animate ? { opacity: 0, y: -20 } : false}
      className={`flex justify-end space-x-4 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FormActions;