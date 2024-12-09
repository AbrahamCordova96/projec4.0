import { useState } from 'react';

function AddProductForm({ onAddProduct }) {
  const [product, setProduct] = useState({
    code: '',
    description: '',
    purchasePrice: '',
    salePrice: '',
    currentStock: '',
    minimumStock: '',
    location: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      ...product,
      lastUpdate: new Date().toISOString(),
      purchasePrice: parseFloat(product.purchasePrice),
      salePrice: parseFloat(product.salePrice),
      currentStock: parseInt(product.currentStock),
      minimumStock: parseInt(product.minimumStock)
    });
    setProduct({
      code: '',
      description: '',
      purchasePrice: '',
      salePrice: '',
      currentStock: '',
      minimumStock: '',
      location: '',
      category: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Producto</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Código</label>
            <input
              type="text"
              required
              value={product.code}
              onChange={(e) => setProduct({ ...product, code: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <input
              type="text"
              required
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              type="text"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ubicación en Almacén</label>
            <input
              type="text"
              value={product.location}
              onChange={(e) => setProduct({ ...product, location: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ej: Pasillo 3, Estante B"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio de Compra</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={product.purchasePrice}
              onChange={(e) => setProduct({ ...product, purchasePrice: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio de Venta</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={product.salePrice}
              onChange={(e) => setProduct({ ...product, salePrice: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Actual</label>
            <input
              type="number"
              required
              min="0"
              value={product.currentStock}
              onChange={(e) => setProduct({ ...product, currentStock: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Mínimo</label>
            <input
              type="number"
              required
              min="0"
              value={product.minimumStock}
              onChange={(e) => setProduct({ ...product, minimumStock: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#2C3E50] text-white px-4 py-2 rounded-md hover:bg-[#34495E] transition-colors"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;