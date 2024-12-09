import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { formatCurrency } from '../../utils/formatters';

function MetricCard({ metric }) {
  const getPercentageChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const percentage = getPercentageChange(metric.value, metric.previousValue);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-gray-900">
          {formatCurrency(metric.value)}
        </p>
        {percentage !== 0 && (
          <div className={`flex items-center ${percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {percentage > 0 ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            <span className="ml-1">{Math.abs(percentage).toFixed(1)}%</span>
          </div>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-600">
        vs. mes anterior: {formatCurrency(metric.previousValue)}
      </p>
    </div>
  );
}

export default MetricCard;