import { useState } from 'react';
import { 
  faShoppingCart,
  faSearch,
  faBoxes,
  faDollarSign,
  faCalculator
} from '@fortawesome/free-solid-svg-icons';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import ProductSearch from './ProductSearch';

function SalesSection() {
  const [saleData, setSaleData] = useState({
    product: null,
    quantity: 1,
    total: 0
  });

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

    console.log('Venta registrada:', saleData);
    
    setSaleData({
      product: null,
      quantity: 1,
      total: 0
    });
  };

  return (
    <Card 
      title="Registro de Ventas" 
      icon={faShoppingCart}
      elevated
      className="bg-gradient-to-br from-white to-blue-50"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
          <ProductSearch 
            onProductSelect={handleProductSelect} 
            icon={faSearch}
          />
        </div>

        <Input
          label="Cantidad"
          type="number"
          min="1"
          value={saleData.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
          icon={faBoxes}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <FontAwesomeIcon icon={faCalculator} className="text-white" />
            </div>
            <div className="text-xl font-bold text-gray-900">
              ${saleData.total.toFixed(2)}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!saleData.product}
          icon={faDollarSign}
          variant="success"
          className="w-full mt-4"
        >
          REGISTRAR VENTA
        </Button>
      </form>
    </Card>
  );
}

export default SalesSection;