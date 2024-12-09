import { useState } from 'react';
import CustomerInfo from './CustomerInfo';
import DeviceInfo from './DeviceInfo';
import OrderForm from './OrderForm';
import PriceInfo from './PriceInfo';
import PartsModal from './PartsModal';
import { generateOrderNumber, formatDateTime } from '../../../utils/formatters';
import { printTickets } from '../../../utils/ticketGenerator';

function NewOrderSection() {
  const [orderData, setOrderData] = useState({
    orderNumber: generateOrderNumber(),
    creationDateTime: formatDateTime(new Date()),
    customerName: '',
    customerPhone: '',
    deviceType: '',
    brand: '',
    model: '',
    systemFailures: '',
    physicalDamage: '',
    repairOperations: [],
    deliveryDateTime: '',
    totalPrice: '',
    advance: '',
    pendingBalance: '',
    discount: '',
    discountReason: '',
    parts: []
  });

  const [showPartsModal, setShowPartsModal] = useState(false);

  const calculatePendingBalance = () => {
    const total = parseFloat(orderData.totalPrice) || 0;
    const advance = parseFloat(orderData.advance) || 0;
    const discount = parseFloat(orderData.discount) || 0;
    return (total - advance - discount).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const accountingEntry = {
      date: new Date(),
      type: orderData.advance ? 'advance' : 'income',
      description: orderData.advance 
        ? `Adelanto ${orderData.repairOperations.join(', ')}`
        : orderData.repairOperations.join(', '),
      amount: orderData.advance || orderData.totalPrice
    };

    printTickets({
      ...orderData,
      pendingBalance: calculatePendingBalance()
    });

    console.log('Orden generada:', orderData);
    console.log('Entrada contable:', accountingEntry);
  };

  const handleClear = () => {
    const newOrderNumber = generateOrderNumber();
    setOrderData({
      ...orderData,
      orderNumber: newOrderNumber,
      customerName: '',
      customerPhone: '',
      deviceType: '',
      brand: '',
      model: '',
      systemFailures: '',
      physicalDamage: '',
      repairOperations: [],
      deliveryDateTime: '',
      totalPrice: '',
      advance: '',
      pendingBalance: '',
      discount: '',
      discountReason: '',
      parts: []
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Nueva Orden</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <OrderForm 
          orderNumber={orderData.orderNumber}
          creationDateTime={orderData.creationDateTime}
        />

        <CustomerInfo
          data={orderData}
          onChange={setOrderData}
        />

        <DeviceInfo
          data={orderData}
          onChange={setOrderData}
        />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fallas del Sistema</label>
            <textarea
              value={orderData.systemFailures}
              onChange={(e) => setOrderData({...orderData, systemFailures: e.target.value})}
              placeholder="Sonido, cámaras, micrófono, etc."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Daños Físicos</label>
            <textarea
              value={orderData.physicalDamage}
              onChange={(e) => setOrderData({...orderData, physicalDamage: e.target.value})}
              placeholder="Lentes o cámaras rotas, golpes, rayones, etc."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        <PriceInfo
          data={orderData}
          onChange={setOrderData}
          pendingBalance={calculatePendingBalance()}
        />

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

export default NewOrderSection;