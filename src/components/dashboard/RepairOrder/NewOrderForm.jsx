import { useState, useEffect } from 'react';
import DeviceStateCanvas from './DeviceStateCanvas';
import PartsModal from './PartsModal';
import { generateOrderNumber, formatDateTime } from '../../../utils/formatters';

function NewOrderForm() {
  const [orderData, setOrderData] = useState({
    orderNumber: '',
    creationDateTime: '',
    customerName: '',
    customerPhone: '',
    deviceType: '',
    brand: '',
    model: '',
    faultDescription: '',
    deliveryDateTime: '',
    totalPrice: '',
    advance: '',
    pendingBalance: '',
    discount: '',
    discountReason: '',
    deviceState: [],
    parts: []
  });

  const [showPartsModal, setShowPartsModal] = useState(false);

  useEffect(() => {
    setOrderData(prev => ({
      ...prev,
      orderNumber: generateOrderNumber(),
      creationDateTime: formatDateTime(new Date())
    }));
  }, []);

  useEffect(() => {
    const total = parseFloat(orderData.totalPrice) || 0;
    const advance = parseFloat(orderData.advance) || 0;
    const discount = parseFloat(orderData.discount) || 0;
    setOrderData(prev => ({
      ...prev,
      pendingBalance: (total - advance - discount).toFixed(2)
    }));
  }, [orderData.totalPrice, orderData.advance, orderData.discount]);

  const deviceTypes = ['Móvil', 'Tablet', 'Laptop', 'Otros'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí implementaremos la lógica para guardar la orden
    console.log('Orden generada:', orderData);
  };

  const handleClear = () => {
    setOrderData({
      ...orderData,
      customerName: '',
      customerPhone: '',
      deviceType: '',
      brand: '',
      model: '',
      faultDescription: '',
      deliveryDateTime: '',
      totalPrice: '',
      advance: '',
      pendingBalance: '',
      discount: '',
      discountReason: '',
      deviceState: [],
      parts: []
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Nueva Orden</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Orden</label>
            <input
              type="text"
              value={orderData.orderNumber}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha y Hora de Creación</label>
            <input
              type="text"
              value={orderData.creationDateTime}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
            <input
              type="text"
              value={orderData.customerName}
              onChange={(e) => setOrderData({...orderData, customerName: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              value={orderData.customerPhone}
              onChange={(e) => setOrderData({...orderData, customerPhone: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Dispositivo</label>
            <select
              value={orderData.deviceType}
              onChange={(e) => setOrderData({...orderData, deviceType: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleccionar...</option>
              {deviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Marca</label>
            <input
              type="text"
              value={orderData.brand}
              onChange={(e) => setOrderData({...orderData, brand: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Modelo</label>
            <input
              type="text"
              value={orderData.model}
              onChange={(e) => setOrderData({...orderData, model: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción de la Falla</label>
          <textarea
            value={orderData.faultDescription}
            onChange={(e) => setOrderData({...orderData, faultDescription: e.target.value})}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <DeviceStateCanvas
          deviceState={orderData.deviceState}
          onChange={(state) => setOrderData({...orderData, deviceState: state})}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha y Hora de Entrega</label>
            <input
              type="datetime-local"
              value={orderData.deliveryDateTime}
              onChange={(e) => setOrderData({...orderData, deliveryDateTime: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio Total</label>
            <input
              type="number"
              value={orderData.totalPrice}
              onChange={(e) => setOrderData({...orderData, totalPrice: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adelanto</label>
            <input
              type="number"
              value={orderData.advance}
              onChange={(e) => setOrderData({...orderData, advance: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Saldo Pendiente</label>
            <input
              type="text"
              value={orderData.pendingBalance}
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
              value={orderData.discount}
              onChange={(e) => setOrderData({...orderData, discount: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Motivo del Descuento</label>
            <input
              type="text"
              value={orderData.discountReason}
              onChange={(e) => setOrderData({...orderData, discountReason: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={() => setShowPartsModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Agregar Refacción
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Limpiar Orden
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Generar Orden
            </button>
          </div>
        </div>
      </form>

      {showPartsModal && (
        <PartsModal
          orderNumber={orderData.orderNumber}
          parts={orderData.parts}
          onClose={() => setShowPartsModal(false)}
          onSave={(parts) => {
            setOrderData({...orderData, parts});
            setShowPartsModal(false);
          }}
        />
      )}
    </div>
  );
}

export default NewOrderForm;