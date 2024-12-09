import MetricCard from './MetricCard';
import { useSummary } from '../../contexts/SummaryContext';

function PerformanceMetrics() {
  const { metrics } = useSummary();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </div>
  );
}

export default PerformanceMetrics;