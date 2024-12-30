import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  PhoneIcon,
  DevicePhoneMobileIcon,
  WrenchScrewdriverIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Form from '../ui/Form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';
import FormSection from '../ui/FormSection';
import FormRow from '../ui/FormRow';
import FormActions from '../ui/FormActions';

const deviceTypes = ['Móvil', 'Tablet', 'Laptop', 'Otros'];
const repairTypes = [
  'Cambio de Pantalla',
  'Reparación de Puerto de Carga',
  'Cambio de Batería',
  'Reparación de Placa',
  'Actualización de Software'
];

const RepairOrderForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    customerName: '',
    customerPhone: '',
    deviceType: '',
    brand: '',
    model: '',
    repairType: '',
    description: '',
    estimatedDelivery: '',
    estimatedCost: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName) newErrors.customerName = 'El nombre es requerido';
    if (!formData.customerPhone) newErrors.customerPhone = 'El teléfono es requerido';
    if (!formData.deviceType) newErrors.deviceType = 'El tipo de dispositivo es requerido';
    if (!formData.repairType) newErrors.repairType = 'El tipo de reparación es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Resetear formulario después de envío exitoso
      setFormData({
        customerName: '',
        customerPhone: '',
        deviceType: '',
        brand: '',
        model: '',
        repairType: '',
        description: '',
        estimatedDelivery: '',
        estimatedCost: ''
      });
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando se modifica
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card title="Nueva Orden de Reparación" icon={WrenchScrewdriverIcon}>
      <Form onSubmit={handleSubmit} className="mt-6">
        <FormSection title="Información del Cliente">
          <FormRow>
            <Input
              label="Nombre del Cliente"
              value={formData.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
              error={errors.customerName}
              icon={UserIcon}
              placeholder="Nombre completo"
            />

            <Input
              label="Teléfono"
              value={formData.customerPhone}
              onChange={(e) => handleChange('customerPhone', e.target.value)}
              error={errors.customerPhone}
              icon={PhoneIcon}
              placeholder="Número de contacto"
            />
          </FormRow>
        </FormSection>

        <FormSection title="Información del Dispositivo">
          <FormRow>
            <Select
              label="Tipo de Dispositivo"
              options={deviceTypes}
              value={formData.deviceType}
              onChange={(value) => handleChange('deviceType', value)}
              error={errors.deviceType}
              icon={DevicePhoneMobileIcon}
            />

            <AnimatePresence mode="wait">
              {formData.deviceType && (
                <Input
                  label="Marca"
                  value={formData.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                  placeholder="Marca del dispositivo"
                />
              )}
            </AnimatePresence>
          </FormRow>

        <AnimatePresence mode="wait">
          {formData.brand && (
            <FormRow className="mt-4">
              <Input
                label="Modelo"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                placeholder="Modelo del dispositivo"
              />

              <Select
                label="Tipo de Reparación"
                options={repairTypes}
                value={formData.repairType}
                onChange={(value) => handleChange('repairType', value)}
                error={errors.repairType}
              />
            </FormRow>
          )}
        </AnimatePresence>
        </FormSection>

        <AnimatePresence mode="wait">
          {formData.repairType && (
            <FormSection title="Detalles de la Reparación">
              <TextArea
                label="Descripción del Problema"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Descripción detallada del problema"
                rows={3}
              />

              <FormRow>
                <Input
                  label="Fecha Estimada de Entrega"
                  type="datetime-local"
                  value={formData.estimatedDelivery}
                  onChange={(e) => handleChange('estimatedDelivery', e.target.value)}
                  icon={CalendarIcon}
                />

                <Input
                  label="Costo Estimado"
                  type="number"
                  value={formData.estimatedCost}
                  onChange={(e) => handleChange('estimatedCost', e.target.value)}
                  icon={CurrencyDollarIcon}
                  placeholder="0.00"
                />
              </FormRow>

              <FormActions>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setFormData({})}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Crear Orden
                </Button>
              </FormActions>
            </FormSection>
          )}
        </AnimatePresence>
      </Form>
    </Card>
  );
};

export default RepairOrderForm;