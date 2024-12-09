import React from 'react';

function OrderForm({ orderNumber, creationDateTime }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Número de Orden</label>
        <input
          type="text"
          value={orderNumber}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha y Hora de Creación</label>
        <input
          type="text"
          value={creationDateTime}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
        />
      </div>
    </div>
  );
}

export default OrderForm;