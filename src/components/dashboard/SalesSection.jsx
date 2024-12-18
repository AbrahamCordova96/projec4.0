import React, { useState } from 'react';
import { 
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  CubeIcon,
  CurrencyDollarIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import ProductSearch from './ProductSearch';

function SalesSection() {
  // Estados existentes se mantienen igual
  const [saleData, setSaleData] = useState({
    product: null,
    quantity: 1,
    total: 0
  });

  // Funciones existentes se mantienen igual
  const handleProductSelect = (product) => {
    setSaleData({
      ...saleData,
      product,
      total: product.price * saleData.quantity
    });
  };

  const handleQuantityChange = (quantity) => {
    if (quantity >= 1) {
      setSaleData({
        ...saleData,
        quantity,
        total: saleData.product ? saleData.product.price * quantity : 0
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!saleData.product) return;

    console.log('Venta Registrada:', saleData);
    
    setSaleData({
      product: null,
      quantity: 1,
      total: 0
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <ShoppingCartIcon className="h-7 w-7 text-gray-700 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Registro de Ventas</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Producto
          </label>
          <div className="relative">
            <ProductSearch 
              onProductSelect={handleProductSelect} 
              icon={MagnifyingGlassIcon}
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Cantidad
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CubeIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="number"
              min="1"
              value={saleData.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Total
          </label>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <CalculatorIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${saleData.total.toFixed(2)}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!saleData.product}
          className="w-full mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CurrencyDollarIcon className="h-6 w-6 mr-2" />
          Registrar Venta
        </button>
      </form>
    </div>
  );
}

export default SalesSection;