
import React from "react";

const OrderList = ({ orders, onOrderClick }) => {
  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <div
          key={order.id}
          className="p-4 border rounded cursor-pointer hover:bg-gray-100"
          onClick={() => onOrderClick(order)}
        >
          <h3 className="text-lg font-semibold">{order.client}</h3>
          <p>Dispositivo: {order.device}</p>
          <p>Estado: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;