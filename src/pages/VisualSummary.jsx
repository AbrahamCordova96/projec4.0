import { useSummary } from '../contexts/SummaryContext';
import ConfigPanel from '../components/summary/ConfigPanel';
import PerformanceMetrics from '../components/summary/PerformanceMetrics';
import SalesChart from '../components/summary/SalesChart';
import StockAlerts from '../components/summary/StockAlerts';

function VisualSummary() {
  const { config, salesData, products } = useSummary();

  return (
    <div className="space-y-6">
      <header className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Resumen Visual</h2>
      </header>

      <ConfigPanel />

      <div className="space-y-6">
        {config.showMetrics && <PerformanceMetrics />}
        {config.showSalesChart && <SalesChart data={salesData} />}
        {config.showStockAlerts && <StockAlerts products={products} />}
      </div>
    </div>
  );
}

export default VisualSummary;