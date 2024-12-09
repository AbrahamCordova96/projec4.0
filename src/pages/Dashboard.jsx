import { 
  faChartLine, 
  faFileInvoice, 
  faMoneyBillTransfer, 
  faCalculator 
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/common/Header';
import SalesSection from '../components/dashboard/SalesSection';
import NewOrderSection from '../components/dashboard/NewOrderSection';
import FinancialMovements from '../components/dashboard/FinancialMovements';
import BudgetQuoteSection from '../components/dashboard/BudgetQuoteSection';

function Dashboard() {
  return (
    <div className="space-y-8">
      <Header
        title="SISTEMA DE GESTIÓN COMERCIAL"
        subtitle="Panel de Control Principal"
        icon={faChartLine}
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <NewOrderSection />
        </div>

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