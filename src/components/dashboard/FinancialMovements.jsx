import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

function FinancialMovements() {
  const [movement, setMovement] = useState({
    amount: '',
    description: '',
    category: 'income'
  });

  const handleSubmit = (type) => {
    console.log('Movimiento Registrado:', { ...movement, type });
    setMovement({
      amount: '',
      description: '',
      category: 'income'
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <BanknotesIcon className="h-7 w-7 text-gray-700 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Movimientos Financieros</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Monto
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="number"
              value={movement.amount}
              onChange={(e) => setMovement({ ...movement, amount: e.target.value })}
              placeholder="0.00"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Descripción
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <DocumentTextIcon className="h-5 w-5 text-gray-500" />
            </div>
            <textarea
              value={movement.description}
              onChange={(e) => setMovement({ ...movement, description: e.target.value })}
              placeholder="Detalle del movimiento..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              rows={3}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            onClick={() => handleSubmit('income')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowTrendingUpIcon className="h-6 w-6 mr-2" />
            Registrar Ingreso
          </button>
          <button
            onClick={() => handleSubmit('expense')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <ArrowTrendingDownIcon className="h-6 w-6 mr-2" />
            Registrar Gasto
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinancialMovements;