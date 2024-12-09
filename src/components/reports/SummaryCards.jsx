import { formatCurrency } from '../../utils/formatters';

function SummaryCards({ summary }) {
  const cards = [
    {
      title: 'Ventas Totales',
      value: summary.totalSales,
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Reparaciones',
      value: summary.totalRepairs,
      bgColor: 'bg-green-500'
    },
    {
      title: 'Ingresos Totales',
      value: summary.totalIncome,
      bgColor: 'bg-indigo-500'
    },
    {
      title: 'Gastos',
      value: summary.totalExpenses,
      bgColor: 'bg-red-500'
    },
    {
      title: 'Ganancia Neta',
      value: summary.netProfit,
      bgColor: summary.netProfit >= 0 ? 'bg-emerald-500' : 'bg-rose-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} rounded-lg shadow-md p-4 text-white`}
        >
          <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
          <p className="text-2xl font-bold">{formatCurrency(card.value)}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;