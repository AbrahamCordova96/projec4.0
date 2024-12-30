import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const NotificationsPanel = ({ onClose }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-screen w-80 bg-white dark:bg-gray-900 
                   shadow-2xl z-50 overflow-y-auto"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Notificaciones</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                         transition-colors duration-200"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Aquí irá el contenido de las notificaciones */}
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No hay notificaciones nuevas
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default NotificationsPanel;