import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/common/Header';
import BudgetQuoteSection from '../components/dashboard/BudgetQuoteSection';
import FinancialMovements from '../components/dashboard/FinancialMovements';
import NewOrderSection from '../components/dashboard/NewOrderSection';
import SalesSection from '../components/dashboard/SalesSection';
import { Link } from 'react-router-dom';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid'; // Removida importación de CalendarIcon
import {
  ShoppingCartIcon,
  ChartBarIcon,
  BanknotesIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import DashboardButton from '../components/dashboard/DashboardButton';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../components/common/Modal';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const menuItems = [
    {
      id: 'nuevaOrden',
      title: 'Nueva Orden',
      icon: ShoppingCartIcon,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      component: NewOrderSection
    },
    {
      id: 'ventas',
      title: 'Ventas',
      icon: ChartBarIcon,
      gradient: 'bg-gradient-to-br from-green-500 to-green-600',
      component: SalesSection
    },
    {
      id: 'finanzas',
      title: 'Ingresos/Egresos',
      icon: BanknotesIcon,
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
      component: FinancialMovements
    },
    {
      id: 'presupuestos',
      title: 'Presupuestos',
      icon: DocumentTextIcon,
      gradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
      component: BudgetQuoteSection
    }
  ];

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleCloseModal = () => {
    setActiveSection(null);
  };

  const activeItem = menuItems.find(item => item.id === activeSection);

  return (
    <div className="space-y-8">
      {/* Botones por encima del encabezado - Solo 2 botones */}
      <div className="flex justify-center space-x-4 mt-4">
        <Link
          to="/receive-parts"
          className="flex items-center px-6 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-md"
        >
          <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
          Recibir Refacción
        </Link>

        <Link
          to="/deliver-equipment"
          className="flex items-center px-6 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-md"
        >
          <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
          Entregar Equipo
        </Link>
      </div>

      {/* Encabezado Principal */}
      <Header
        title="SISTEMA DE GESTIÓN COMERCIAL"
        subtitle="Panel de Control Principal"
        icon={faChartLine}
      />

      {/* Botones del Dashboard */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <DashboardButton
              key={item.id}
              icon={item.icon}
              title={item.title}
              gradient={item.gradient}
              isActive={activeSection === item.id}
              onClick={() => handleSectionClick(item.id)}
            />
          ))}
        </div>

        {/* Modal para el contenido */}
        <Modal
          isOpen={!!activeSection}
          onClose={handleCloseModal}
          title={activeItem?.title || ''}
        >
          {activeItem?.component && <activeItem.component />}
        </Modal>
      </div>

      {/* New Dashboard Section */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Resumen de Ventas</h2>
            <p className="text-3xl font-bold text-primary-600">$0.00</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Órdenes Pendientes</h2>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Citas del Día</h2>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

