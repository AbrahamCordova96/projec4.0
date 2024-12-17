import {
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/common/Header';
import BudgetQuoteSection from '../components/dashboard/BudgetQuoteSection';
import FinancialMovements from '../components/dashboard/FinancialMovements';
import NewOrderSection from '../components/dashboard/NewOrderSection';
import SalesSection from '../components/dashboard/SalesSection';

function Dashboard() {
  return (
    <div className="space-y-8">
      <Header
        title="SISTEMA DE GESTIÓN COMERCIAL"
        subtitle="Panel de Control Principal"
        icon={faChartLine}
      />

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

        {/* Botón para acceder a Órdenes Generadas */}
        <div className="col-span-12 lg:col-span-7 space-y-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.href = '/orders'}
          >
            Ver Órdenes Generadas
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
