
import React, { useState } from "react";
import OrderList from "../components/orders/OrderList";
import OrderDetailModal from "../components/orders/OrderDetailModal";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const orders = [
    {
      id: 1,
      client: "Juan Pérez",
      device: "iPhone 13",
      status: "Completada",
      details: "Reparación de pantalla",
    },
    {
      id: 2,
      client: "María González",
      device: "Samsung Galaxy S21",
      status: "Pendiente",
      details: "Cambio de batería",
    },
  ];

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Órdenes Generadas</h1>
      <OrderList orders={orders} onOrderClick={handleOrderClick} />
      {modalOpen && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Orders;