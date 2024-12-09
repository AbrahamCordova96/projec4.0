import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';

function ProductSearch({ onProductSelect, icon }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Simulated product data - in a real app this would come from an API/database
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
      <div className="relative rounded-lg shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={icon} className="text-gray-400" />
          </div>
        )}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto..."
          className={`
            block w-full rounded-lg border-gray-300 
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            transition-colors duration-200
          `}
        />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 divide-y divide-gray-100">
          {suggestions.map((product) => (
            <div
              key={product.id}
              onClick={() => handleSelect(product)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                <div className="text-xs text-gray-500">${product.price}</div>
              </div>
              <FontAwesomeIcon 
                icon={faCheck} 
                className={`h-4 w-4 text-green-500 ${searchTerm === product.name ? 'opacity-100' : 'opacity-0'}`} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductSearch;