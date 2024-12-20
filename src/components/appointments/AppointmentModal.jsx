import React, { useState } from 'react';

const AppointmentModal = ({ appointment, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...appointment });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (window.confirm('¿Desea reimprimir el ticket después de guardar los cambios?')) {
      onSave(formData);
      // Llamar a la función de generar ticket
      generateTicket(formData);
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="modal">
      <h2>Modificar Cita</h2>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre del cliente"
      />
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        placeholder="Fecha de la cita"
      />
      <input
        type="text"
        name="motivo"
        value={formData.motivo}
        onChange={handleChange}
        placeholder="Motivo/Reparación"
      />
      {/* Otros campos relevantes */}
      <button onClick={handleSubmit}>Guardar Cambios</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default AppointmentModal;
