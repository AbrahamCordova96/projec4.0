import { useState, useEffect } from 'react';
import ProductTable from '../components/products/ProductTable';
import AddProductForm from '../components/products/AddProductForm';
import ProductFilters from '../components/products/ProductFilters';

function ProductControl() {
  const [products, setProducts] = useState([
    {
      code: '001',
      description: 'Smartphone X',
      category: 'Celulares',
      location: 'Pasillo 1, Estante A',
      purchasePrice: 400.00,
      salePrice: 599.99,
      currentStock: 5,
      minimumStock: 10,
      lastUpdate: '2023-12-20T00:00:00.000Z'
    },
    {
      code: '002',
      description: 'Tablet Pro',
      category: 'Tablets',
      location: 'Pasillo 2, Estante B',
      purchasePrice: 300.00,
      salePrice: 449.99,
      currentStock: 15,
      minimumStock: 5,
      lastUpdate: '2023-12-20T00:00:00.000Z'
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...products];

    // Apply search filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.code.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Apply price range filter
    if (filters.priceRange.min) {
      filtered = filtered.filter(product => 
        product.salePrice >= parseFloat(filters.priceRange.min)
      );
    }
    if (filters.priceRange.max) {
      filtered = filtered.filter(product => 
        product.salePrice <= parseFloat(filters.priceRange.max)
      );
    }

    // Apply stock filter
    if (filters.stockFilter !== 'all') {
      filtered = filtered.filter(product => {
        const isLowStock = product.currentStock <= product.minimumStock;
        return filters.stockFilter === 'low' ? isLowStock : !isLowStock;
      });
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-white bg-[#2C3E50] py-4 mb-8">
          SISTEMA DE GESTIÓN COMERCIAL
        </h1>
        <h2 className="text-xl font-bold text-[#2C3E50] mb-6">Control de Productos</h2>
      </header>

      <ProductFilters onFilterChange={handleFilterChange} />
      <AddProductForm onAddProduct={handleAddProduct} />
      
      <div className="mt-8">
        <ProductTable products={filteredProducts} />
      </div>
    </div>
  );
}

export default ProductControl;