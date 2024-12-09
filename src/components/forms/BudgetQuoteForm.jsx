import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faCalendarPlus, faEraser } from '@fortawesome/free-solid-svg-icons';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import Section from '../layout/Section';

const BudgetQuoteForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    phone: '',
    operation: '',
    brand: '',
    model: '',
    comments: '',
    price: '',
    appointmentDate: ''
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
      appointmentDate: ''
    });
  };

  return (
    <Section title="Presupuesto" elevated>
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
        />

        <Input
          label="Teléfono"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          required
        />

        <Select
          label="Operación"
          options={operations}
          value={formData.operation}
          onChange={(value) => handleChange('operation', value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Marca"
            value={formData.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            required
          />

          <Input
            label="Modelo"
            value={formData.model}
            onChange={(e) => handleChange('model', e.target.value)}
            required
          />
        </div>

        <TextArea
          label="Comentarios"
          value={formData.comments}
          onChange={(e) => handleChange('comments', e.target.value)}
          rows={3}
        />

        <Input
          label="Precio $"
          type="number"
          value={formData.price}
          onChange={(e) => handleChange('price', e.target.value)}
          required
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
    </Section>
  );
};

export default BudgetQuoteForm;