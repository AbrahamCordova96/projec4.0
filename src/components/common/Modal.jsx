import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con blur y centrado usando flex */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40"
            onClick={onClose}
          />
          
          {/* Modal centrado correctamente */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic dentro de él
          >
            <div className="w-[95%] md:w-11/12 md:max-w-4xl bg-white rounded-xl shadow-elevated overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b bg-gray-50">
                <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Content con scroll */}
              <div className="p-6 max-h-[calc(85vh-8rem)] overflow-y-auto">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;