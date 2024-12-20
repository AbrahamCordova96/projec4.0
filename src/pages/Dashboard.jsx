import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/common/Header';
import BudgetQuoteSection from '../components/dashboard/BudgetQuoteSection';
import FinancialMovements from '../components/dashboard/FinancialMovements';
import NewOrderSection from '../components/dashboard/NewOrderSection';
import SalesSection from '../components/dashboard/SalesSection';
import { Link } from 'react-router-dom';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, CalendarIcon } from '@heroicons/react/24/solid';

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Botones por encima del encabezado */}
      <div className="flex justify-center space-x-4 mt-4">
        {/* Botón Recibir Refacción */}
        <Link
          to="/receive-parts"
          className="flex items-center px-6 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-md"
        >
          <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
          Recibir Refacción
        </Link>

        {/* Botón Entregar Equipo */}
        <Link
          to="/deliver-equipment"
          className="flex items-center px-6 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-md"
        >
          <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
          Entregar Equipo
        </Link>

        {/* Botón Gestión de Citas */}
        <Link
          to="/citas"
          className="flex items-center px-6 py-3 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all duration-200 shadow-md"
        >
          <CalendarIcon className="w-5 h-5 mr-2" />
          Gestión de Citas
        </Link>
      </div>

      {/* Encabezado Principal */}
      <Header
        title="SISTEMA DE GESTIÓN COMERCIAL"
        subtitle="Panel de Control Principal"
        icon={faChartLine}
      />

      {/* Contenido principal */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sección de Nueva Orden */}
        <div className="col-span-12 lg:col-span-7">
          <NewOrderSection />
        </div>

        {/* Sección de Ventas, Finanzas y Presupuesto */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <SalesSection />
          <FinancialMovements />
          <BudgetQuoteSection />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
