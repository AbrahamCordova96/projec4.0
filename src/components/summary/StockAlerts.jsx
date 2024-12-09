import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function StockAlerts({ products }) {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    const filtered = products?.filter(product => 
      product.currentStock <= product.minimumStock
    ) || [];
    setLowStockProducts(filtered);
  }, [products]);

  if (!lowStockProducts.length) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
        <h3 className="text-lg font-semibold">Alertas de Stock</h3>
      </div>
      <div className="space-y-4">
        {lowStockProducts.map((product) => (
          <div 
            key={product.code}
            className="flex justify-between items-center p-3 bg-yellow-50 rounded-md border border-yellow-200"
          >
            <div>
              <p className="font-medium text-gray-900">{product.description}</p>
              <p className="text-sm text-gray-600">Código: {product.code}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Stock: {product.currentStock}
              </p>
              <p className="text-xs text-gray-600">
                Mínimo: {product.minimumStock}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockAlerts;