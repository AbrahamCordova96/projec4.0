import { motion, AnimatePresence } from 'framer-motion';

const Form = ({ 
  children, 
  onSubmit, 
  className = '',
  animate = true 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      exit={animate ? { opacity: 0, y: -20 } : false}
      className={`space-y-6 ${className}`}
    >
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </motion.form>
  );
};

export default Form;