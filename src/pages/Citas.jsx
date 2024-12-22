import { FunnelIcon } from '@heroicons/react/24/outline';
import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react';
import AppointmentList from '../components/appointments/AppointmentList';
import AppointmentModal from '../components/appointments/AppointmentModal';
import Dropdown from '../components/common/Dropdown';
import '../styles/citasStyles.css';
import { getAppointments, updateAppointment } from '../utils/citasStorage';
import { formatTicketDateTime, parseAndValidateDate } from '../utils/formatters';

const Citas = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    const loadAppointments = () => {
      const storedAppointments = getAppointments().map(app => {
        const parsedDate = parseAndValidateDate(app.appointmentDate);
        return {
          ...app,
          appointmentDate: parsedDate
        };
      });
      
      setAppointments(storedAppointments);
      setFilteredAppointments(storedAppointments);

      // Configurar Fuse.js para búsqueda
      const fuseOptions = {
        keys: ['customerName', 'deviceType', 'brand', 'model', 'phone'],
        threshold: 0.3
      };
      setFuse(new Fuse(storedAppointments, fuseOptions));
    };

    loadAppointments();
    const interval = setInterval(loadAppointments, 30000);
    return () => clearInterval(interval);
  }, []);

  const filterItems = () => {
    let filtered = appointments;

    // Aplicar búsqueda con Fuse.js si hay término de búsqueda
    if (fuse && searchTerm) {
      filtered = fuse.search(searchTerm).map(result => result.item);
    }

    // Aplicar filtro por estado
    if (filterStatus !== 'all') {
      filtered = filtered.filter(appointment => appointment.estado === filterStatus);
    }

    // Separar citas por origen
    const directAppointments = filtered.filter(app => app.source === 'direct' || !app.source);
    const budgetAppointments = filtered.filter(app => app.source === 'budget');

    return {
      direct: directAppointments,
      budget: budgetAppointments
    };
  };

  const handleModify = (appointment) => {
    const appointmentWithParsedDate = {
      ...appointment,
      appointmentDate: parseAndValidateDate(appointment.appointmentDate)
    };
    setModalData(appointmentWithParsedDate);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  const handleSave = async (updatedAppointment) => {
    try {
      const parsedDate = parseAndValidateDate(updatedAppointment.appointmentDate);
      
      if (!parsedDate) {
        alert('La fecha de cita ingresada no es válida');
        return;
      }

      const appointmentToUpdate = {
        ...updatedAppointment,
        appointmentDate: parsedDate.toISOString()
      };

      const updated = await updateAppointment(appointmentToUpdate.id, appointmentToUpdate);
      const updatedList = appointments.map(app =>
        app.id === updated.id ? {
          ...updated,
          appointmentDate: parseAndValidateDate(updated.appointmentDate)
        } : app
      );
      
      setAppointments(updatedList);
      setFilteredAppointments(updatedList);
      setModalData(null);
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
      alert('Error al actualizar la cita');
    }
  };

  const formatAppointmentDate = (date) => {
    if (!date) return "No especificada";
    try {
      return formatTicketDateTime(date);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return "Fecha inválida";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Citas</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar citas..."
              className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dropdown
            label={
              <div className="flex items-center">
                <FunnelIcon className="w-5 h-5 mr-2" />
                Filtrar por Estado
              </div>
            }
            items={[
              { label: 'Todas', onClick: () => setFilterStatus('all') },
              { label: 'Pendientes', onClick: () => setFilterStatus('pendiente') },
              { label: 'Confirmadas', onClick: () => setFilterStatus('confirmada') },
              { label: 'Canceladas', onClick: () => setFilterStatus('cancelada') }
            ]}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Citas Directas</h2>
          <AppointmentList 
            appointments={filterItems().direct.map(app => ({
              ...app,
              appointmentDate: formatAppointmentDate(app.appointmentDate)
            }))}
            onModify={handleModify} 
          />
        </section>

        <section className="bg-blue-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Citas desde Presupuestos
          </h2>
          <AppointmentList 
            appointments={filterItems().budget.map(app => ({
              ...app,
              appointmentDate: formatAppointmentDate(app.appointmentDate)
            }))}
            onModify={handleModify} 
          />
        </section>
      </div>

      {modalData && 
        <AppointmentModal 
          appointment={modalData} 
          onClose={handleCloseModal} 
          onSave={handleSave} 
        />
      }
    </div>
  );
};

export default Citas;