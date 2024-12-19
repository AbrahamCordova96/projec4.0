// src/components/dashboard/NewOrderSection/index.jsx

import {
  BoltIcon,
  CameraIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  FingerPrintIcon,
  HashtagIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  TrashIcon,
  WifiIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { format, parseISO, addDays } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { formatDateTime, generateOrderNumber } from '../../../utils/formatters';
import { printTickets } from '../../../utils/ticketGenerator';
import CustomerInfo from './CustomerInfo';
import DeviceInfo from './DeviceInfo';
import PartsModal from './PartsModal';

// Registrar el idioma español
registerLocale('es', es);

function NewOrderSection() {
  const [orderData, setOrderData] = useState({
    orderNumber: '',
    creationDateTime: new Date(), // Almacenar como objeto Date
    customerName: '',
    customerLastName: '',
    customerPhone: '',
    deviceType: '',
    brand: '',
    model: '',
    suggestedPrice: '',
    quality: '',
    providerPrice: '',
    faultDescription: '',
    systemFailures: '',
    physicalDamage: '',
    processToPerform: '',
    repairOperations: [],
    deliveryDateTime: null, // Almacenado como objeto Date o null
    totalPrice: '',
    advance: '',
    pendingBalance: '',
    discount: '',
    discountReason: '',
    parts: []
  });

  const [showPartsModal, setShowPartsModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const systemFailureButtons = [
    { icon: SpeakerWaveIcon, text: 'Sonido' },
    { icon: CameraIcon, text: 'Cámaras' },
    { icon: MicrophoneIcon, text: 'Micrófono' },
    { icon: BoltIcon, text: 'No Enciende' },
    { icon: WifiIcon, text: 'Sin Señal' },
    { icon: FingerPrintIcon, text: 'Touch ID' }
  ];

  const physicalDamageButtons = [
    { text: 'Lente Cámara' },
    { text: 'Rayón En' },
    { text: 'Golpe En' },
    { text: 'Quebradura En' },
    { text: 'Humedad En' }
  ];

  useEffect(() => {
    const fetchOrderNumber = async () => {
      try {
        const newOrderNumber = await generateOrderNumber();
        setOrderData(prev => ({ ...prev, orderNumber: newOrderNumber }));
      } catch (error) {
        console.error('Error al generar número de orden:', error);
      }
    };

    fetchOrderNumber();
  }, []);

  const handleSystemFailureClick = (failureText) => {
    setOrderData(prev => ({
      ...prev,
      systemFailures: prev.systemFailures
        ? `${prev.systemFailures}, ${failureText}`
        : failureText
    }));
  };

  const handlePhysicalDamageClick = (damageText) => {
    setOrderData(prev => ({
      ...prev,
      physicalDamage: prev.physicalDamage
        ? `${prev.physicalDamage}, ${damageText}`
        : damageText
    }));
  };

  // **Modificación Principal: Almacenar deliveryDateTime como objeto Date**
  const handleDateTimeSelect = (date) => {
    setOrderData(prev => ({
      ...prev,
      deliveryDateTime: date // Almacenar directamente el objeto Date
    }));
  };

  const renderDatePicker = () => {
    return (
      <div className="relative">
        <label className="block text-base font-semibold text-gray-700 mb-2">
          Fecha y Hora de Entrega
        </label>
        <DatePicker
          selected={orderData.deliveryDateTime} // Recibir directamente el objeto Date
          onChange={handleDateTimeSelect}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Hora"
          dateFormat="dd/MM/yyyy HH:mm"
          locale="es"
          placeholderText="Seleccione fecha y hora de entrega"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700"
        />
      </div>
    );
  };

  const calculatePendingBalance = () => {
    const total = parseFloat(orderData.totalPrice) || 0;
    const advance = parseFloat(orderData.advance) || 0;
    const discount = parseFloat(orderData.discount) || 0;
    return (total - advance - discount).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const requiredFields = [
        'customerName',
        'customerLastName',
        'customerPhone',
        'deviceType',
        'brand',
        'model',
        'faultDescription',
        'deliveryDateTime'
      ];

      const missingFields = requiredFields.filter(field => {
        if (field === 'deliveryDateTime') {
          return !orderData[field];
        }
        return !orderData[field].trim();
      });
      if (missingFields.length > 0) {
        throw new Error(`Faltan campos requeridos: ${missingFields.join(', ')}`);
      }

      // Formatear la fecha para almacenamiento
      const formattedDeliveryDateTime = orderData.deliveryDateTime
        ? format(orderData.deliveryDateTime, "dd/MM/yyyy HH:mm", { locale: es })
        : null;

      // Crear objeto de orden para almacenamiento
      const orderToStore = {
        ...orderData,
        deliveryDateTime: formattedDeliveryDateTime, // Guardar fecha formateada
        creationDateTime: formatDateTime(orderData.creationDateTime), // Formatear fecha de creación
        id: Date.now(),
        creationDate: new Date().toISOString(),
        status: 'generada',
        pendingBalance: calculatePendingBalance()
      };

      // Obtener órdenes existentes y agregar la nueva
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      savedOrders.push(orderToStore);
      localStorage.setItem('orders', JSON.stringify(savedOrders));

      const accountingEntry = {
        date: new Date(),
        type: orderData.advance ? 'advance' : 'income',
        description: orderData.advance
          ? `Adelanto ${orderData.repairOperations.join(', ')}`
          : orderData.repairOperations.join(', '),
        amount: orderData.advance || orderData.totalPrice
      };

      // Generar el ticket
      await printTickets({
        ...orderData,
        deliveryDateTime: formattedDeliveryDateTime, // Asegurar que la fecha esté formateada
        pendingBalance: calculatePendingBalance()
      });

      console.log('Orden generada:', orderToStore);
      console.log('Entrada contable:', accountingEntry);
      
      // Mostrar mensaje de éxito
      alert('Orden generada y guardada exitosamente');
      
      // Limpiar el formulario
      handleClear();
    } catch (error) {
      console.error('Error al generar la orden:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = async () => {
    try {
      const newOrderNumber = await generateOrderNumber();
      setOrderData({
        orderNumber: newOrderNumber,
        creationDateTime: new Date(), // Restablecer como objeto Date
        customerName: '',
        customerLastName: '',
        customerPhone: '',
        deviceType: '',
        brand: '',
        model: '',
        suggestedPrice: '',
        quality: '',
        providerPrice: '',
        faultDescription: '',
        systemFailures: '',
        physicalDamage: '',
        processToPerform: '',
        repairOperations: [],
        deliveryDateTime: null, // Restablecer a null
        totalPrice: '',
        advance: '',
        pendingBalance: '',
        discount: '',
        discountReason: '',
        parts: []
      });
    } catch (error) {
      console.error('Error al limpiar el formulario:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <ClipboardDocumentIcon className="h-7 w-7 text-gray-700 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Nueva Orden</h2>
      </div>
      <hr className="border-gray-300 mb-6" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-semibold text-gray-700">
              <span className="inline-flex items-center">
                <HashtagIcon className="h-5 w-5 text-gray-500 mr-2" />
                Número de Orden
              </span>
            </label>
            <input
              type="text"
              value={orderData.orderNumber}
              readOnly
              className="mt-2 block w-full rounded-md border-gray-300 bg-gray-50 font-medium"
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700">
              <span className="inline-flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                Fecha y Hora de Creación
              </span>
            </label>
            <input
              type="text"
              value={formatDateTime(orderData.creationDateTime) || "Fecha inválida"}
              readOnly
              className="mt-2 block w-full rounded-md border-gray-300 bg-gray-50 font-medium"
            />
          </div>
        </div>

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

        <div>
          <label className="block text-base font-semibold text-gray-700">
            Descripción de la Falla
          </label>
          <div className="mt-2 flex items-center">
            <WrenchScrewdriverIcon className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              name="faultDescription"
              value={orderData.faultDescription}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              placeholder="Descripción detallada de la falla"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700">
            Proceso a Realizar
          </label>
          <div className="mt-2 flex items-center">
            <WrenchScrewdriverIcon className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              name="processToPerform"
              value={orderData.processToPerform}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              placeholder="Descripción del proceso"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">
            Fallas del Sistema
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {systemFailureButtons.map(({ icon: Icon, text }) => (
              <button
                key={text}
                type="button"
                onClick={() => handleSystemFailureClick(text)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Icon className="h-5 w-5 mr-2 text-gray-500" />
                {text}
              </button>
            ))}
          </div>
          <textarea
            name="systemFailures"
            value={orderData.systemFailures}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">
            Daños Físicos
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {physicalDamageButtons.map(({ text }) => (
              <button
                key={text}
                type="button"
                onClick={() => handlePhysicalDamageClick(text)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {text}
              </button>
            ))}
          </div>
          <textarea
            name="physicalDamage"
            value={orderData.physicalDamage}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
            rows={3}
          />
        </div>

        {renderDatePicker()}

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-base font-semibold text-gray-700">Precio Total</label>
            <div className="mt-2 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="number"
                name="totalPrice"
                value={orderData.totalPrice}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700">Adelanto</label>
            <div className="mt-2 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="number"
                name="advance"
                value={orderData.advance}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700">Saldo Pendiente</label>
            <div className="mt-2 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                value={calculatePendingBalance()}
                readOnly
                className="pl-10 block w-full rounded-md border-gray-300 bg-gray-50 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-semibold text-gray-700">Descuento</label>
            <div className="mt-2 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="number"
                name="discount"
                value={orderData.discount}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700">Motivo del Descuento</label>
            <input
              type="text"
              name="discountReason"
              value={orderData.discountReason}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              placeholder="Motivo del descuento"
            />
          </div>
        </div>

        <div className="flex justify-between space-x-4 mt-8">
          <button
            type="button"
            onClick={() => setShowPartsModal(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            <DevicePhoneMobileIcon className="h-6 w-6 mr-2" />
            Agregar Refacción
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <TrashIcon className="h-6 w-6 mr-2" />
              Limpiar Orden
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <CheckIcon className="h-6 w-6 mr-2" />
              {isSubmitting ? 'Generando...' : 'Generar Orden'}
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
            setOrderData(prev => ({ ...prev, parts }));
            setShowPartsModal(false);
          }}
        />
      )}
    </div>
  );
}

export default NewOrderSection;
