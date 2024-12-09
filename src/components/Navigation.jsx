import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  DocumentChartBarIcon,
  ChartPieIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

function Navigation() {
  const location = useLocation();

  const adminItems = [
    { 
      path: '/products', 
      label: 'Control de Productos',
      icon: ChartBarIcon,
      description: 'Gestiona el inventario y productos'
    },
    { 
      path: '/accounting', 
      label: 'Libro de Cuentas',
      icon: CurrencyDollarIcon,
      description: 'Administra las finanzas y transacciones'
    },
    { 
      path: '/reports', 
      label: 'Reportes',
      icon: DocumentChartBarIcon,
      description: 'Visualiza estadísticas y reportes'
    },
    { 
      path: '/summary', 
      label: 'Resumen Visual',
      icon: ChartPieIcon,
      description: 'Análisis gráfico del negocio'
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-[#2C3E50] to-[#3498DB] text-white shadow-lg">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold transition-colors hover:text-gray-200">
              Sistema de Gestión
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/'
                    ? 'bg-white/10 text-white shadow-inner'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                Panel Principal
              </Link>

              <Menu as="div" className="relative">
                <Menu.Button
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${location.pathname.includes('/admin')
                      ? 'bg-white/10 text-white shadow-inner'
                      : 'text-gray-300 hover:bg-white/5'}
                  `}
                >
                  Área Administrativa
                  <ChevronDownIcon className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:rotate-180" />
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
                  <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 shadow-lg w-72 rounded-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2">
                      {adminItems.map((item) => (
                        <Menu.Item key={item.path}>
                          {({ active }) => (
                            <Link
                              to={item.path}
                              className={`
                                group flex items-center px-4 py-3 text-sm
                                ${active ? 'bg-gray-50' : ''}
                                ${location.pathname === item.path ? 'bg-gray-50' : ''}
                              `}
                            >
                              <item.icon 
                                className={`
                                  mr-3 h-5 w-5
                                  ${active ? 'text-blue-600' : 'text-gray-400'}
                                `}
                              />
                              <div>
                                <p className={`
                                  font-medium
                                  ${active ? 'text-blue-600' : 'text-gray-900'}
                                `}>
                                  {item.label}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;