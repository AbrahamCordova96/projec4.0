import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const calculateDailySummary = (transactions) => {
  const summary = {
    totalSales: 0,
    totalRepairs: 0,
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0
  };

  transactions.forEach(transaction => {
    const amount = parseFloat(transaction.amount);
    switch (transaction.type) {
      case 'sale':
        summary.totalSales += amount;
        summary.totalIncome += amount;
        break;
      case 'repair':
        summary.totalRepairs += amount;
        summary.totalIncome += amount;
        break;
      case 'income':
        summary.totalIncome += amount;
        break;
      case 'expense':
        summary.totalExpenses += amount;
        break;
    }
  });

  summary.netProfit = summary.totalIncome - summary.totalExpenses;
  return summary;
};

export const generateMonthlyData = (transactions) => {
  const today = new Date();
  const sixMonthsAgo = subMonths(today, 6);
  
  const monthRange = eachMonthOfInterval({
    start: sixMonthsAgo,
    end: today
  });

  return monthRange.map(date => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    
    const monthTransactions = transactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate >= monthStart && tDate <= monthEnd;
    });

    const summary = calculateDailySummary(monthTransactions);
    
    return {
      month: format(date, 'MMMM yyyy', { locale: es }),
      ...summary
    };
  });
};

export const getTopProducts = (transactions, limit = 5) => {
  const productSales = {};
  
  transactions
    .filter(t => t.type === 'sale')
    .forEach(t => {
      if (!productSales[t.description]) {
        productSales[t.description] = {
          name: t.description,
          quantity: 0,
          total: 0
        };
      }
      productSales[t.description].quantity += 1;
      productSales[t.description].total += parseFloat(t.amount);
    });

  return Object.values(productSales)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
};

export const getTopServices = (transactions, limit = 5) => {
  const serviceRepairs = {};
  
  transactions
    .filter(t => t.type === 'repair')
    .forEach(t => {
      if (!serviceRepairs[t.description]) {
        serviceRepairs[t.description] = {
          name: t.description,
          quantity: 0,
          total: 0
        };
      }
      serviceRepairs[t.description].quantity += 1;
      serviceRepairs[t.description].total += parseFloat(t.amount);
    });

  return Object.values(serviceRepairs)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
};

export const generatePDFReport = (data) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Reporte Financiero', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Generado: ${format(new Date(), 'PPP', { locale: es })}`, 20, 30);
  
  // Resumen general
  doc.autoTable({
    startY: 40,
    head: [['Concepto', 'Monto']],
    body: [
      ['Ventas Totales', `$${data.summary.totalSales.toFixed(2)}`],
      ['Reparaciones Totales', `$${data.summary.totalRepairs.toFixed(2)}`],
      ['Ingresos Totales', `$${data.summary.totalIncome.toFixed(2)}`],
      ['Gastos Totales', `$${data.summary.totalExpenses.toFixed(2)}`],
      ['Ganancia Neta', `$${data.summary.netProfit.toFixed(2)}`]
    ]
  });
  
  // Productos más vendidos
  doc.addPage();
  doc.text('Productos Más Vendidos', 20, 20);
  doc.autoTable({
    startY: 30,
    head: [['Producto', 'Cantidad', 'Total']],
    body: data.topProducts.map(p => [
      p.name,
      p.quantity.toString(),
      `$${p.total.toFixed(2)}`
    ])
  });
  
  return doc;
};