import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, MoonIcon, SunIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../stores/themeStore';
import NotificationsPanel from './NotificationsPanel';

const TopBar = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="fixed top-0 right-0 left-16 h-16 bg-white dark:bg-gray-900 border-b 
                    border-gray-200 dark:border-gray-800 z-20 px-4 transition-colors duration-200">
      <div className="h-full flex items-center justify-end space-x-4">
        <button
          onClick={() => setShowNotifications(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                     transition-colors duration-200"
        >
          <BellIcon className="w-6 h-6" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                     transition-colors duration-200 text-gray-600 dark:text-gray-300"
          title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {theme === 'dark' ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      <AnimatePresence>
        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopBar;