import { motion } from 'framer-motion';

const FormRow = ({
  children,
  animate = true,
  className = ''
}) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, x: -20 } : false}
      animate={animate ? { opacity: 1, x: 0 } : false}
      exit={animate ? { opacity: 0, x: 20 } : false}
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FormRow;