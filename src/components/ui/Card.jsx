import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  title, 
  icon: Icon,
  isExpandable = false,
  isExpanded = true,
  onToggle,
  className = '' 
}) => {
  const cardVariants = {
    collapsed: { height: '4rem' },
    expanded: { height: 'auto' }
  };

  return (
    <motion.div
      initial={false}
      animate={isExpandable ? (isExpanded ? 'expanded' : 'collapsed') : 'expanded'}
      variants={cardVariants}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-soft 
                 hover:shadow-elevated transition-shadow duration-300 ${className}`}
    >
      <div 
        className={`p-4 flex items-center justify-between ${
          isExpandable ? 'cursor-pointer' : ''
        }`}
        onClick={isExpandable ? onToggle : undefined}
      >
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
          )}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {isExpandable && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-gray-500"
          >
            ▼
          </motion.div>
        )}
      </div>
      
      {(!isExpandable || isExpanded) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 pt-0"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Card;