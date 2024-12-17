
import React from "react";

const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Detalles de la Orden</h2>
        <p><strong>Cliente:</strong> {order.client}</p>
        <p><strong>Dispositivo:</strong> {order.device}</p>
        <p><strong>Estado:</strong> {order.status}</p>
        <p><strong>Detalles:</strong> {order.details}</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;