import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import SummaryCards from '../components/reports/SummaryCards';
import MonthlyChart from '../components/reports/MonthlyChart';
import TopItems from '../components/reports/TopItems';
import {
  calculateDailySummary,
  generateMonthlyData,
  getTopProducts,
  getTopServices,
  generatePDFReport
} from '../utils/reportUtils';

function Reports() {
  const [dateRange, setDateRange] = useState({
    start: format(new Date(), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd')
  });
  
  const [transactions] = useState([]); // En una implementación real, esto vendría de un contexto o API
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    // Filtrar transacciones por rango de fechas
    const filteredTransactions = transactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate >= new Date(dateRange.start) && tDate <= new Date(dateRange.end);
    });

    // Calcular resúmenes
    const newSummary = calculateDailySummary(filteredTransactions);
    const newMonthlyData = generateMonthlyData(transactions);
    const newTopProducts = getTopProducts(filteredTransactions);
    const newTopServices = getTopServices(filteredTransactions);

    setSummary(newSummary);
    setMonthlyData(newMonthlyData);
    setTopProducts(newTopProducts);
    setTopServices(newTopServices);
  }, [transactions, dateRange]);

  const handleExportPDF = () => {
    const doc = generatePDFReport({
      summary,
      topProducts,
      topServices,
      monthlyData
    });
    doc.save('reporte-financiero.pdf');
  };

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Reportes</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-500">a</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleExportPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Exportar PDF
          </button>
        </div>
      </header>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopItems title="Productos Más Vendidos" items={topProducts} />
        <TopItems title="Servicios Más Solicitados" items={topServices} />
      </div>

      <MonthlyChart data={monthlyData} />
    </div>
  );
}

export default Reports;