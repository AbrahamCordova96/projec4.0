import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { XMarkIcon, ExclamationCircleIcon, CalendarIcon, BellAlertIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationsModal = ({ isOpen, onClose, originRect }) => {
  const [notifications, setNotifications] = React.useState({
    urgent: [],
    warning: [],
    info: []
  });

  React.useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const loadNotifications = () => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const pendingItems = JSON.parse(localStorage.getItem('pendingItems') || '[]');
    const today = new Date();

    const processItems = (items, type) => {
      return items.map(item => ({
        ...item,
        type,
        daysUntil: differenceInDays(
          new Date(type === 'appointment' ? item.appointmentDate : item.deliveryDate),
          today
        )
      })).filter(item => item.daysUntil >= 0 && item.daysUntil <= 5);
    };

    const allItems = [
      ...processItems(appointments, 'appointment'),
      ...processItems(pendingItems, 'pending')
    ];

    setNotifications({
      urgent: allItems.filter(item => item.daysUntil <= 2),
      warning: allItems.filter(item => item.daysUntil > 2 && item.daysUntil <= 4),
      info: allItems.filter(item => item.daysUntil === 5)
    });
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'urgent':
        return {
          container: 'bg-red-100 border-2 border-red-300 shadow-lg',
          text: 'text-red-900',
          header: 'bg-red-200 border-b-2 border-red-300 text-red-900',
          icon: 'text-red-600',
          section: 'bg-gradient-to-b from-red-100/90 to-red-50/90 border-2 border-red-200 shadow-lg'
        };
      case 'warning':
        return {
          container: 'bg-orange-100 border-2 border-orange-300 shadow-lg',
          text: 'text-orange-900',
          header: 'bg-orange-200 border-b-2 border-orange-300 text-orange-900',
          icon: 'text-orange-600',
          section: 'bg-gradient-to-b from-orange-100/90 to-orange-50/90 border-2 border-orange-200 shadow-lg'
        };
      case 'info':
        return {
          container: 'bg-green-100 border-2 border-green-300 shadow-lg',
          text: 'text-green-900',
          header: 'bg-green-200 border-b-2 border-green-300 text-green-900',
          icon: 'text-green-600',
          section: 'bg-gradient-to-b from-green-100/90 to-green-50/90 border-2 border-green-200 shadow-lg'
        };
      default:
        return {
          container: 'bg-gray-100 border-2 border-gray-300 shadow-lg',
          text: 'text-gray-900',
          header: 'bg-gray-200 border-b-2 border-gray-300',
          icon: 'text-gray-600',
          section: 'bg-gradient-to-b from-gray-100/90 to-gray-50/90 border-2 border-gray-200 shadow-lg'
        };
    }
  };

  const renderNotificationGroup = (items, title, type) => {
    if (items.length === 0) return null;

    const styles = getNotificationStyle(type);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`mb-6 rounded-xl overflow-hidden ${styles.section}`}
      >
        <div className={`rounded-t-xl px-4 py-2 ${styles.header} flex items-center gap-2`}>
          <BellAlertIcon className={`w-5 h-5 ${styles.icon}`} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className={`rounded-b-xl border-x border-b ${styles.container} p-4`}>
          <div className="space-y-3">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className={`p-4 rounded-lg bg-white shadow-md border-2 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-200 ${styles.text}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">
                        {item.type === 'appointment' ? 'Cita' : 'Pendiente'}: {item.customerName}
                      </span>
                      {item.daysUntil <= 2 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <ExclamationCircleIcon className={`w-5 h-5 ${styles.icon}`} />
                        </motion.div>
                      )}
                    </div>
                    <div className="mt-2 font-medium opacity-90">
                      {item.type === 'appointment' ? item.motivo : item.processToPerform}
                    </div>
                    <div className="mt-2 flex items-center text-sm opacity-75">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {format(
                        new Date(item.type === 'appointment' ? item.appointmentDate : item.deliveryDate),
                        'dd/MM/yyyy HH:mm',
                        { locale: es }
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <motion.div
              layoutId="notifications-modal"
              className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle bg-white rounded-xl shadow-xl transform transition-all max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <Dialog.Title as="h2" className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <BellAlertIcon className="w-7 h-7 text-indigo-500" />
                  Notificaciones
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <AnimatePresence>
                {renderNotificationGroup(notifications.urgent, 'Notificaciones Urgentes (1-2 días)', 'urgent')}
                {renderNotificationGroup(notifications.warning, 'Próximas Notificaciones (3-4 días)', 'warning')}
                {renderNotificationGroup(notifications.info, 'Notificaciones Futuras (5 días)', 'info')}

                {Object.values(notifications).every(arr => arr.length === 0) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <BellAlertIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No hay notificaciones pendientes</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NotificationsModal;