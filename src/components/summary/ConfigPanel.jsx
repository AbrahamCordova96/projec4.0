import { Switch } from '@headlessui/react';
import { useSummary } from '../../contexts/SummaryContext';

function ConfigPanel() {
  const { config, setConfig } = useSummary();

  const handleToggle = (key) => {
    setConfig((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const configOptions = [
    { key: 'showMetrics', label: 'Mostrar Métricas de Rendimiento' },
    { key: 'showSalesChart', label: 'Mostrar Gráfico de Ventas' },
    { key: 'showStockAlerts', label: 'Mostrar Alertas de Stock' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Configuración del Panel</h3>
      <div className="space-y-4">
        {configOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{option.label}</span>
            <Switch
              checked={config[option.key]}
              onChange={() => handleToggle(option.key)}
              className={`${
                config[option.key] ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config[option.key] ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConfigPanel;