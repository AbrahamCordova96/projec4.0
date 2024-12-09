import React from 'react';

function CustomerInfo({ data, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
        <input
          type="text"
          value={data.customerName}
          onChange={(e) => onChange({...data, customerName: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="tel"
          value={data.customerPhone}
          onChange={(e) => onChange({...data, customerPhone: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );
}

export default CustomerInfo;