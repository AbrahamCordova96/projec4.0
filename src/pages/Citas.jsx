import React, { useEffect, useState } from 'react';
import AppointmentList from '../components/appointments/AppointmentList';
import AppointmentModal from '../components/appointments/AppointmentModal';
import SearchBar from '../components/appointments/SearchBar';
import { getAppointments, updateAppointment } from '../utils/citasStorage';

const Citas = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const loadAppointments = () => {
      const storedAppointments = getAppointments();
      setAppointments(storedAppointments);
      setFilteredAppointments(storedAppointments);
    };

    loadAppointments();
    // Actualizar cada 30 segundos para detectar nuevas citas
    const interval = setInterval(loadAppointments, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (criteria) => {
    // Filtrar citas basado en los criterios de búsqueda
    const filtered = appointments.filter(appointment =>
      appointment.nombre.toLowerCase().includes(criteria.nombre.toLowerCase()) &&
      appointment.fecha.includes(criteria.fecha) &&
      appointment.motivo.toLowerCase().includes(criteria.motivo.toLowerCase())
    );
    setFilteredAppointments(filtered);
  };

  const handleModify = (appointment) => {
    setModalData(appointment);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  const handleSave = async (updatedAppointment) => {
    try {
      const updated = await updateAppointment(updatedAppointment.id, updatedAppointment);
      const updatedList = appointments.map(app =>
        app.id === updated.id ? updated : app
      );
      setAppointments(updatedList);
      setFilteredAppointments(updatedList);
      setModalData(null);
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
      alert('Error al actualizar la cita');
    }
  };

  return (
    <div className="citas-page">
      <h1 className="text-2xl font-bold mb-4">Gestión de Citas</h1>
      <SearchBar onSearch={handleSearch} />
      <AppointmentList appointments={filteredAppointments} onModify={handleModify} />
      {modalData && <AppointmentModal appointment={modalData} onClose={handleCloseModal} onSave={handleSave} />}
    </div>
  );
};

export default Citas;
