import { Menu, Transition } from '@headlessui/react';
import {
  ChartBarIcon,
  ChartPieIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  BellIcon,
  CogIcon
} from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  // Función para abrir/cerrar la modal
  const toggleNotificationsModal = () => setShowNotifications(!showNotifications);

  const adminItems = [
    { path: '/products', label: 'Control de Productos', icon: ChartBarIcon },
    { path: '/accounting', label: 'Libro de Cuentas', icon: CurrencyDollarIcon },
    { path: '/reports', label: 'Reportes', icon: DocumentChartBarIcon },
    { path: '/summary', label: 'Resumen Visual', icon: ChartPieIcon }
  ];

  return (
    <nav className="bg-gradient-to-r from-[#2C3E50] to-[#3498DB] text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Botones de Notificaciones y Configuración */}
        <div className="flex space-x-4">
          {/* Botón de Notificaciones */}
          <button
            title="Notificaciones"
            className="p-2 rounded hover:bg-white/5"
            onClick={toggleNotificationsModal}
          >
            <BellIcon className="w-6 h-6" />
          </button>

          {/* Botón de Configuración con Menú Desplegable */}
          <Menu as="div" className="relative">
            <Menu.Button className="p-2 rounded hover:bg-white/5">
              <CogIcon className="w-6 h-6" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/app-settings"
                        className={`block px-4 py-2 text-sm ${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        Ajustes de aplicación
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/user-management"
                        className={`block px-4 py-2 text-sm ${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        Gestión de usuarios
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* Enlaces de Navegación */}
        <div className="flex space-x-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded text-sm font-medium ${
              location.pathname === '/' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'
            }`}
          >
            Panel Principal
          </Link>
          <Link
            to="/orders"
            className={`px-3 py-2 rounded text-sm font-medium ${
              location.pathname === '/orders' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'
            }`}
          >
            Órdenes Generadas
          </Link>
          <Link
            to="/appointments"
            className={`px-3 py-2 rounded text-sm font-medium ${
              location.pathname === '/appointments' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'
            }`}
          >
            Citas
          </Link>
          <Link
            to="/pending"
            className={`px-3 py-2 rounded text-sm font-medium ${
              location.pathname === '/pending' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'
            }`}
          >
            Pendientes
          </Link>

          {/* Área Administrativa */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center px-3 py-2 rounded text-sm font-medium hover:bg-white/5">
              Área Administrativa
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {adminItems.map((item) => (
                  <Menu.Item key={item.path}>
                    {({ active }) => (
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-2 text-sm rounded ${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        <item.icon className="w-5 h-5 mr-3 text-gray-400" />
                        {item.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Modal de Notificaciones */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Notificaciones</h2>
            <ul>
              <li className="mb-2">🔔 Notificación 1: Tarea pendiente</li>
              <li className="mb-2">🔔 Notificación 2: Nuevo mensaje recibido</li>
              <li className="mb-2">🔔 Notificación 3: Actualización disponible</li>
            </ul>
            <button
              className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={toggleNotificationsModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
