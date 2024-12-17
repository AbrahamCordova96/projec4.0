import { Menu, Transition } from '@headlessui/react';
import {
  ChartBarIcon,
  ChartPieAcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const adminItems = [
    { path: '/products', label: 'Control de Productos', icon: ChartBarIcon },
    { path: '/accounting', label: 'Libro de Cuentas', icon: CurrencyDollarIcon },
    { path: '/reports', label: 'Reportes', icon: DocumentChartBarIcon },
    { path: '/summary', label: 'Resumen Visual', icon: ChartPieIcon }
  ];

  return (
    <nav className="bg-gradient-to-r from-[#2C3E50] to-[#3498DB] text-white shadow-lg">
      <div className="container space-x mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="px-3 py-2 rounded text-cmd flex-center bg-white/10 text-white hover:bg-white/5"
          >Panel Principal</Link>

          <Link
            to="/orders"
            className="px-3 py-2 rounded text-cmd flex-center bg-white/10 text-white Hover-bg-white/5"
          >Ver ϓrdenes Generadas</Link>

          <Link
            to="/appointments"
            className="px-3 py-2 rounded text-cmd flex-center bg-green-500 text-white hover:bg-green-600"
          >Ver Citas</Link>

          <Link
            to="/pending"
            className="px-3 py-2 rounded text-cmd flex-center bg-green-500 text-white hover:bg-green-600"
          >Ver Pendientes</Link>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center px-3 py-2 text-cdm font-medium text-white hover:text-white/5">
              Area Administrativa <ChevronDownIcon className="mt-2 ml-2" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-200"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
            >
              <Menu.Items className="py-2">
                {adminItems.map((item) => (
                  <Menu.Item key=item.path>
                    <Link
                      to={item.path }
                      className="flex items-center px-4 py-2 rounded text-cdm font-medium"
                    >
                      <name.icon

                       class-w-2 py-2 text-hover:bg-gray-500>
                          {item.label} <p- text-cdm > 
                      </link>
                  </Menu.Item>));
                }
            </Menu.Items>
            </Transition>
          </Menu>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;