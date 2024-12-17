import { useState } from 'react';
import { faFileInvoice, faCalendarPlus, faEraser } from '@fortawesome/free-solid-svg-icons';
import SectionHeader from '../common/SectionHeader';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import BrandModelSelector from './NewOrderSection/BrandModelSelector';

function BudgetQuoteSection() {
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
    'Cambio de pantalla',
    'Reparación de puerto de carga',
    'Cambio de batería',
    'Reparación de placa',
    'Actualización de software',
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Encabezado con SectionHeader */}
      <SectionHeader 
        title="Presupuesto"
        icon={faFileInvoice}
      />

      <div className="space-y-4">
        <Input
          label="Fecha"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
          required
        />

        <Input
          label="Nombre del Cliente"
          value={formData.customerName}
          onChange={(e) => handleChange('customerName', e.target.value)}
          required
          placeholder="Nombre completo"
        />

        <Input
          label="Teléfono"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          required
          placeholder="Número de contacto"
        />

        <Select
          label="Operación"
          options={operations}
          value={formData.operation}
          onChange={(value) => handleChange('operation', value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <BrandModelSelector
            initialBrand={formData.brand}
            initialModel={formData.model}
            onBrandChange={(brand) => handleBrandModelChange(brand, '', null)}
            onModelChange={(model, modelData) => handleBrandModelChange(formData.brand, model, modelData)}
          />
        </div>

        <TextArea
          label="Comentarios"
          value={formData.comments}
          onChange={(e) => handleChange('comments', e.target.value)}
          rows={3}
          placeholder="Detalles adicionales..."
        />

        <Input
          label="Precio $"
          type="number"
          value={formData.price}
          onChange={(e) => handleChange('price', e.target.value)}
          required
          placeholder="0.00"
        />

        <Input
          label="Fecha de Cita"
          type="datetime-local"
          value={formData.appointmentDate}
          onChange={(e) => handleChange('appointmentDate', e.target.value)}
        />

        <div className="flex space-x-4 pt-4">
          <Button
            onClick={() => handleSubmit('quote')}
            icon={faFileInvoice}
            variant="primary"
            className="flex-1"
          >
            Generar Presupuesto
          </Button>
          <Button
            onClick={() => handleSubmit('appointment')}
            icon={faCalendarPlus}
            variant="success"
            className="flex-1"
          >
            Agendar Cita
          </Button>
          <Button
            onClick={handleClear}
            icon={faEraser}
            variant="secondary"
            className="flex-1"
          >
            Limpiar Datos
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BudgetQuoteSection;
