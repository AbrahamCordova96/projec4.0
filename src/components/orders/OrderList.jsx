import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "../common/Button";

const OrderList = ({ orders, onOrderClick, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = orders.filter((order) =>
      Object.values(order).some((value) =>
        value?.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredOrders(filtered);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Buscar órdenes..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div 
                className="flex-grow cursor-pointer" 
                onClick={() => onOrderClick(order)}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Orden #{order.orderNumber}
                </h3>
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-gray-600">
                    Cliente: {order.customerName} {order.customerLastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Dispositivo: {order.deviceType} - {order.brand} {order.model}
                  </p>
                  <p className="text-sm text-gray-600">
                    Fecha: {order.creationDateTime}
                  </p>
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(order.id)}
                className="ml-4"
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;