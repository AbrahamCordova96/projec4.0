import { useState } from 'react';
import { formatDateTime, generateOrderNumber } from '../../../utils/formatters';
import { printTickets } from '../../../utils/ticketGenerator';
import CustomerInfo from './CustomerInfo';
import DeviceInfo from './DeviceInfo';
import OrderForm from './OrderForm';
import PartsModal from './PartsModal';
import PriceInfo from './PriceInfo';
import SectionHeader from '../../common/SectionHeader';
import Button from '../../common/Button';
import { ClipboardIcon } from '@heroicons/react/24/solid';

function NewOrderSection() {
  const [orderData, setOrderData] = useState({
    orderNumber: generateOrderNumber(),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    printTickets({ ...orderData });
  };

  return (
    <div className="new-order-section">
      <SectionHeader title="Nueva Orden" icon="<ClipboardIcon className="w-6 h-6 text-blue-500" />" />
      <hr className="divider" />
      <form onSubmit={handleSubmit}>
        <OrderForm orderNumber={orderData.orderNumber} creationDateTime={orderData.creationDateTime} />
        <CustomerInfo data={orderData} onChange={setOrderData} />
        <DeviceInfo data={orderData} onChange={setOrderData} />
        <div className="button-group">
          <Button text="Agregar Refacción" />
          <Button text="Limpiar Orden" />
          <Button text="Generar Orden" />
        </div>
      </form>
    </div>
  );
}

export default NewOrderSection;