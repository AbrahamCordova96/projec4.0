import { useState } from 'react';
import { formatDateTime, generateOrderNumber } from '../../../utils/formatters';
import { printTickets } from '../../../utils/ticketGenerator';
import CustomerInfo from './CustomerInfo';
import DeviceInfo from './DeviceInfo';
import OrderForm from './OrderForm';
import PartsModal from './PartsModal';
import PriceInfo from './PriceInfo';
import SectionHeader from '../../common/SectionHeader';
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

  const [showPartsModal, setShowPartsModal] = useState(false);

  const calculatePendingBalance = () => {
    const total = parseFloat(orderData.totalPrice) || 0;
    const advance = parseFloat(orderData.advance) || 0;
    const discount = parseFloat(orderData.discount) || 0;
    return (total - advance - discount).toFixed(2);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <SectionHeader
        title="Nueva Orden"
        icon={<ClipboardIcon className="w-6 h-6 text-blue-500" />}
      />
      </div>
  );
}

export default SectionHeader;