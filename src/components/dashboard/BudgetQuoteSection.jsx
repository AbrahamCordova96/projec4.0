import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  PhoneIcon,
  TrashIcon,
  UserIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAppointment } from '../../utils/citasStorage';
import { generateTicket } from '../../utils/ticketGenerator';
import BrandModelSelector from './NewOrderSection/BrandModelSelector';

function BudgetQuoteSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    phone: '',
    operation: '',
    brand: '',
    model: '',
    comments: '',
    price: '',
    appointmentDate: '',
    suggestedPrice: '',
    quality: '',
    providerPrice: ''
  });

  const operations = [
    'Cambio de Pantalla',
    'Reparación de Puerto de Carga',
    'Cambio de Batería',
    'Reparación de Placa',
    'Actualización de Software',
    'Otro'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBrandModelChange = (brand, model, modelData) => {
    setFormData(prev => ({
      ...prev,
      brand,
      model,
      price: modelData?.precio || prev.price,
      quality: modelData?.calidad || '',
      providerPrice: modelData?.precioProveedor || ''
    }));
  };

  const handleSubmit = (type) => {
    console.log(`${type === 'quote' ? 'Presupuesto' : 'Cita'} generado:`, formData);
    
    // Aquí podrías agregar validación de datos antes de enviar
    if (!formData.customerName || !formData.phone || !formData.operation) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    // Implementar lógica de envío según el tipo
    if (type === 'quote') {
      // Lógica para generar presupuesto
    } else {
      // Lógica para agendar cita
    }
  };

  const handleClear = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      customerName: '',
      phone: '',
      operation: '',
      brand: '',
      model: '',
      comments: '',
      price: '',
      appointmentDate: '',
      suggestedPrice: '',
      quality: '',
      providerPrice: ''
    });
  };

  const handleGenerateBudget = async () => {
    try {
      // Generar ticket para cliente
      await generateTicket(formData, false, false);
      // Generar ticket para taller
      await generateTicket(formData, false, true);
      
      // Guardar como cita
      const savedAppointment = saveAppointment({
        ...formData,
        tipo: 'presupuesto'
      });
      
      if (window.confirm('¿Desea ir a la ventana de citas?')) {
        navigate('/citas');
      }
    } catch (error) {
      console.error('Error al generar presupuesto:', error);
      alert('Error al generar el presupuesto');
    }
  };

  const handleScheduleAppointment = async () => {
    try {
      const appointmentData = {
        ...formData,
        id: Date.now(), // Generar ID único
        deviceType: formData.operation, // Usar la operación como tipo de dispositivo
        creationDateTime: new Date().toLocaleString(), // Fecha actual formateada
        totalPrice: formData.price // Asegurar compatibilidad con el template
      };

      // Generar ticket de cita
      await generateTicket(appointmentData, 'appointment');
      
      // Guardar cita
      const savedAppointment = saveAppointment({
        ...appointmentData,
        tipo: 'cita'
      });
      
      navigate('/citas');
    } catch (error) {
      console.error('Error al agendar cita:', error);
      alert('Error al agendar la cita');
    }
  };

  const handleScheduleAppointmentWithData = async (appointmentData) => {
    try {
      const ticket = await generateTicket(appointmentData);
      // Procesar el ticket generado
      // ...existing code...
    } catch (error) {
      console.error('Error al agendar cita:', error);
      // Manejar el error apropiadamente
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <DocumentTextIcon className="h-7 w-7 text-gray-700 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Presupuesto</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Fecha
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Nombre del Cliente
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              placeholder="Nombre completo"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Teléfono
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              placeholder="Número de contacto"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Operación
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <WrenchScrewdriverIcon className="h-5 w-5 text-gray-500" />
            </div>
            <select
              value={formData.operation}
              onChange={(e) => handleChange('operation', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              required
            >
              <option value="">Seleccionar Operación</option>
              {operations.map(op => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Marca y Modelo
          </label>
          <BrandModelSelector
            initialBrand={formData.brand}
            initialModel={formData.model}
            onBrandChange={(brand) => handleBrandModelChange(brand, '', null)}
            onModelChange={(model, modelData) => handleBrandModelChange(formData.brand, model, modelData)}
          />
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Comentarios
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <DocumentTextIcon className="h-5 w-5 text-gray-500" />
            </div>
            <textarea
              value={formData.comments}
              onChange={(e) => handleChange('comments', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              rows={3}
              placeholder="Detalles adicionales..."
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Precio
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Fecha de Cita
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ClockIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="datetime-local"
              value={formData.appointmentDate}
              onChange={(e) => handleChange('appointmentDate', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-medium"
            />
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleGenerateBudget}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DocumentTextIcon className="h-6 w-6 mr-2" />
            Generar Presupuesto
          </button>
          <button
            onClick={handleScheduleAppointment}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <CalendarIcon className="h-6 w-6 mr-2" />
            Agendar Cita
          </button>
          <button
            onClick={handleClear}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <TrashIcon className="h-6 w-6 mr-2" />
            Limpiar Datos
          </button>
        </div>
      </div>
    </div>
  );
}

export default BudgetQuoteSection;