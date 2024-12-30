import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Form from '../ui/Form';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import FormSection from '../ui/FormSection';
import FormRow from '../ui/FormRow';
import FormActions from '../ui/FormActions';
import Button from '../ui/Button';

const AppointmentForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    customerName: '',
    phone: '',
    date: '',
    time: '',
    deviceType: '',
    reason: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName) newErrors.customerName = 'El nombre es requerido';
    if (!formData.phone) newErrors.phone = 'El teléfono es requerido';
    if (!formData.date) newErrors.date = 'La fecha es requerida';
    if (!formData.time) newErrors.time = 'La hora es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        customerName: '',
        phone: '',
        date: '',
        time: '',
        deviceType: '',
        reason: ''
      });
    } catch (error) {
      console.error('Error al agendar cita:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card title="Nueva Cita" icon={CalendarIcon}>
      <Form onSubmit={handleSubmit} className="mt-6">
        <FormSection title="Información del Cliente">
          <FormRow>
            <Input
              label="Nombre del Cliente"
              value={formData.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
              error={errors.customerName}
              icon={UserIcon}
              required
            />

            <Input
              label="Teléfono"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
              icon={PhoneIcon}
              required
            />
          </FormRow>
        </FormSection>

        <FormSection title="Detalles de la Cita">
          <FormRow>
            <Input
              label="Fecha"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              error={errors.date}
              icon={CalendarIcon}
              required
            />

            <Input
              label="Hora"
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              error={errors.time}
              icon={ClockIcon}
              required
            />
          </FormRow>

          <FormRow>
            <Input
              label="Tipo de Dispositivo"
              value={formData.deviceType}
              onChange={(e) => handleChange('deviceType', e.target.value)}
              icon={DevicePhoneMobileIcon}
              placeholder="Ej: Smartphone, Tablet, Laptop"
            />
          </FormRow>

          <TextArea
            label="Motivo de la Cita"
            value={formData.reason}
            onChange={(e) => handleChange('reason', e.target.value)}
            icon={ChatBubbleBottomCenterTextIcon}
            placeholder="Describe el motivo de la cita..."
          />

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
              Agendar Cita
            </Button>
          </FormActions>
        </FormSection>
      </Form>
    </Card>
  );
};

export default AppointmentForm;