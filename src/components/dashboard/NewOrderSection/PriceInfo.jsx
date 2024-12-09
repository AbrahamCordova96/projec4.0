import React from 'react';

function PriceInfo({ data, onChange }) {
  const calculatePendingBalance = () => {
    const total = parseFloat(data.totalPrice) || 0;
    const advance = parseFloat(data.advance) || 0;
    const discount = parseFloat(data.discount) || 0;
    return (total - advance - discount).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio Total</label>
          <input
            type="number"
            value={data.totalPrice}
            onChange={(e) => onChange({...data, totalPrice: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Adelanto</label>
          <input
            type="number"
            value={data.advance}
            onChange={(e) => onChange({...data, advance: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Saldo Pendiente</label>
          <input
            type="text"
            value={calculatePendingBalance()}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Descuento</label>
          <input
            type="number"
            value={data.discount}
            onChange={(e) => onChange({...data, discount: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Motivo del Descuento</label>
          <input
            type="text"
            value={data.discountReason}
            onChange={(e) => onChange({...data, discountReason: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default PriceInfo;