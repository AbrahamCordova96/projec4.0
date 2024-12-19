import React, { useState, useEffect } from "react";
import OrderList from "../components/orders/OrderList";
import OrderDetailModal from "../components/orders/OrderDetailModal";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      setIsLoading(true);
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        // Ordenar las órdenes por fecha de creación, más recientes primero
        const sortedOrders = parsedOrders.sort((a, b) => 
          new Date(b.creationDate) - new Date(a.creationDate)
        );
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error('Error al cargar las órdenes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleUpdateOrder = (updatedOrder) => {
    try {
      const updatedOrders = orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setModalOpen(false);
      
      // Mostrar mensaje de éxito
      alert('Orden actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      alert('Error al actualizar la orden. Por favor, intente nuevamente.');
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("¿Está seguro de eliminar esta orden? Esta acción no se puede deshacer.")) {
      try {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        // Mostrar mensaje de éxito
        alert('Orden eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar la orden:', error);
        alert('Error al eliminar la orden. Por favor, intente nuevamente.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Órdenes Generadas</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando órdenes...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay órdenes generadas</p>
        </div>
      ) : (
        <OrderList
          orders={orders}
          onOrderClick={handleOrderClick}
          onDelete={handleDeleteOrder}
        />
      )}

      {modalOpen && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => {
            setModalOpen(false);
            setSelectedOrder(null);
          }}
          onUpdate={handleUpdateOrder}
        />
      )}
    </div>
  );
}

export default Orders;