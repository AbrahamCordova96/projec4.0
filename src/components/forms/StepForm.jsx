import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const StepForm = ({ 
  title,
  steps = [], 
  onComplete, 
  onClose,
  initialData = {} 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mover la validación dentro del render
  const renderContent = () => {
    if (!Array.isArray(steps) || steps.length === 0) {
      return <div>No hay pasos configurados</div>;
    }

    const currentStepData = steps[currentStep] || {};
    const { title: stepTitle, component: StepComponent } = currentStepData;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose?.();
          }}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl p-6 m-4"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose?.();
            }}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6">{title}</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index !== steps.length - 1 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                      ${index <= currentStep
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-gray-300 text-gray-500'
                      }`}
                  >
                    {index + 1}
                  </div>
                  {index !== steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 
                        ${index < currentStep ? 'bg-primary-600' : 'bg-gray-300'}`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold">
              {stepTitle || 'Paso no disponible'}
            </h3>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
            >
              {StepComponent ? (
                <StepComponent
                  data={formData}
                  onNext={(stepData) => {
                    if (isSubmitting) return;
                    
                    const newData = { ...formData, ...stepData };
                    setFormData(newData);
                    
                    if (currentStep === steps.length - 1) {
                      onComplete?.(newData);
                    } else {
                      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
                    }
                  }}
                  onBack={() => {
                    if (isSubmitting || currentStep === 0) return;
                    setCurrentStep(prev => prev - 1);
                  }}
                />
              ) : (
                <p className="text-gray-500">Componente no disponible</p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    );
  };

  return renderContent();
};

StepForm.propTypes = {
  title: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    })
  ).isRequired,
  onComplete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default StepForm;