import { createContext, useContext, useState } from 'react';

const SummaryContext = createContext();

export function SummaryProvider({ children }) {
  const [metrics] = useState([
    {
      label: 'Ventas Totales',
      value: 15000,
      previousValue: 12000
    },
    {
      label: 'Reparaciones',
      value: 8000,
      previousValue: 7500
    },
    {
      label: 'Ingresos Totales',
      value: 23000,
      previousValue: 19500
    },
    {
      label: 'Ganancia Neta',
      value: 12500,
      previousValue: 10000
    }
  ]);

  const [salesData] = useState([
    { date: '01/12', sales: 1200, repairs: 800 },
    { date: '02/12', sales: 1500, repairs: 900 },
    { date: '03/12', sales: 1000, repairs: 1200 },
    { date: '04/12', sales: 1800, repairs: 1000 },
    { date: '05/12', sales: 2000, repairs: 850 }
  ]);

  const [products] = useState([
    {
      code: '001',
      description: 'Smartphone X',
      currentStock: 2,
      minimumStock: 5
    },
    {
      code: '002',
      description: 'Tablet Pro',
      currentStock: 1,
      minimumStock: 3
    }
  ]);

  const [config, setConfig] = useState({
    showMetrics: true,
    showSalesChart: true,
    showStockAlerts: true
  });

  const value = {
    metrics,
    salesData,
    products,
    config,
    setConfig
  };

  return (
    <SummaryContext.Provider value={value}>
      {children}
    </SummaryContext.Provider>
  );
}

export function useSummary() {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error('useSummary must be used within a SummaryProvider');
  }
  return context;
}