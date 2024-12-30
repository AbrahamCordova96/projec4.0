import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  ClockIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { path: '/', icon: HomeIcon, label: 'Panel Principal' },
  { path: '/orders', icon: ClipboardDocumentListIcon, label: 'Órdenes' },
  { path: '/appointments', icon: CalendarIcon, label: 'Citas' },
  { path: '/pending', icon: ClockIcon, label: 'Pendientes' },
  { 
    label: 'Área Administrativa',
    type: 'group',
    items: [
      { path: '/products', icon: ChartBarIcon, label: 'Control de Productos' },
      { path: '/accounting', icon: CurrencyDollarIcon, label: 'Libro de Cuentas' },
      { path: '/reports', icon: DocumentChartBarIcon, label: 'Reportes' },
    ]
  },
  {
    label: 'Configuración',
    type: 'group',
    items: [
      { path: '/app-settings', icon: Cog6ToothIcon, label: 'Ajustes' },
      { path: '/user-management', icon: UserGroupIcon, label: 'Usuarios' },
    ]
  }
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '4rem' }
  };

  const renderMenuItem = (item, isSubItem = false) => {
    if (item.type === 'group') {
      return (
        <div key={item.label} className="mt-6 space-y-2">
          {isExpanded && (
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {item.label}
            </h3>
          )}
          <div className="space-y-1">
            {item.items.map(subItem => renderMenuItem(subItem, true))}
          </div>
        </div>
      );
    }

    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
          ${isActive 
            ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100' 
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
          } ${isSubItem ? 'ml-2' : ''}`}
      >
        <Icon className="w-5 h-5 mr-2" />
        {isExpanded && <span>{item.label}</span>}
      </Link>
    );
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      className="fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
                 shadow-lg z-30 overflow-x-hidden"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-4">
        <div className="flex items-center justify-center h-12">
          {isExpanded ? (
            <h1 className="text-xl font-bold text-primary-600">Sistema Gestión</h1>
          ) : (
            <span className="text-2xl font-bold text-primary-600">SG</span>
          )}
        </div>
      </div>

      <nav className="mt-4 px-2 space-y-1">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;