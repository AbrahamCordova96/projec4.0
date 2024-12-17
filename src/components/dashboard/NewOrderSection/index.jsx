import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { formatDateTime, generateOrderNumber } from '../../../utils/formatters';
import { printTickets } from '../../../utils/ticketGenerator';
import CustomerInfo from './CustomerInfo';
import DeviceInfo from './DeviceInfo';
import OrderForm from './OrderForm';
import PartsModal from './PartsModal';
import PriceInfo from './PriceInfo';

function NewOrderSection() {
  const [orderData, setOrderData] = useState({
    orderNumber: '',
    creationDateTime: formatDateTime(new Date()),
    customerName: '',
    customerPhone: '',
    deviceType: '',
    brand: '',
    model: '',
    suggestedPrice: '',
    quality: '',
    providerPrice: '',
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

  // Generar número de orden al cargar el componente
  useEffect(() => {
    const fetchOrderNumber = async () => {
      const newOrderNumber = await generateOrderNumber();
      setOrderData(prev => ({ ...prev, orderNumber: newOrderNumber }));
    };

    fetchOrderNumber();
  }, []);

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

  const handleClear = async () => {
    const newOrderNumber = await generateOrderNumber(); // Generar un nuevo número
    setOrderData({
      ...orderData,
      orderNumber: newOrderNumber,
      customerName: '',
      customerPhone: '',
      deviceType: '',
      brand: '',
      model: '',
      suggestedPrice: '',
      quality: '',
      providerPrice: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Encabezado con ícono y línea divisoria */}
      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faClipboard} className="text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold text-gray-700">Nueva Orden</h2>
      </div>
      <hr className="border-gray-300 mb-4" />

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
          onChange={(newData) => setOrderData(prev => ({
            ...prev,
            ...newData,
            totalPrice: newData.suggestedPrice || prev.totalPrice
          }))}
        />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fallas del Sistema</label>
            <textarea
              name="systemFailures"
              value={orderData.systemFailures}
              onChange={handleChange}
              placeholder="Sonido, cámaras, micrófono, etc."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Daños Físicos</label>
            <textarea
              name="physicalDamage"
              value={orderData.physicalDamage}
              onChange={handleChange}
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

        {/* Botones iguales a Registro de Ventas */}
        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={() => setShowPartsModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar Refacción
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Limpiar Orden
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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
            setOrderData({ ...orderData, parts });
            setShowPartsModal(false);
          }}
        />
      )}
    </div>
  );
}

export default NewOrderSection;
