import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
  maxWidth = 'max-w-2xl'
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`
                w-full ${maxWidth} transform overflow-hidden rounded-2xl
                bg-white p-6 text-left align-middle shadow-xl transition-all
              `}>
                <Dialog.Title as="div" className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    {icon && (
                      <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                        <FontAwesomeIcon 
                          icon={icon} 
                          className="text-white h-5 w-5" 
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg p-1 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;