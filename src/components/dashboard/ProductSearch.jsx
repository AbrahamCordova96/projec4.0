import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  CheckIcon,
  TagIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

function ProductSearch({ onProductSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Datos simulados de productos - en una aplicación real vendrían de una API/base de datos
  const products = [
    { id: 1, name: 'Smartphone X', price: 599.99 },
    { id: 2, name: 'Tablet Pro', price: 799.99 },
    { id: 3, name: 'Laptop Ultra', price: 1299.99 }
  ];

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSelect = (product) => {
    setSearchTerm(product.name);
    setSuggestions([]);
    onProductSelect(product);
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar Producto..."
          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium text-base"
        />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          {suggestions.map((product) => (
            <div
              key={product.id}
              onClick={() => handleSelect(product)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TagIcon className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-base font-semibold text-gray-900">{product.name}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                      {product.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                <CheckIcon 
                  className={`h-5 w-5 text-green-500 transition-opacity duration-200 ${
                    searchTerm === product.name ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductSearch;