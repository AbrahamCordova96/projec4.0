import React from 'react';
import { ArrowDownTrayIcon, PencilIcon, CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/solid';
import { generateTicket } from '../../utils/ticketGenerator';
import { formatDate } from '../../utils/dateUtils';

const AppointmentList = ({ appointments, onModify }) => {
  const handlePrint = async (appointment) => {
    try {
      await generateTicket({
        ...appointment,
        orderNumber: appointment.id,
        customerName: appointment.nombre,
        customerPhone: appointment.telefono,
        deviceType: appointment.dispositivo,
        totalPrice: appointment.precio || 0
      }, 'appointment');
    } catch (error) {
      console.error('Error al imprimir ticket:', error);
      alert('Error al imprimir el ticket');
    }
  };

  return (
    <div className="space-y-4">
      {appointments.map(appointment => (
        <div key={appointment.id} className="appointment-card">
          <div className="appointment-header">
            <h3 className="appointment-title">
              <UserIcon className="w-5 h-5 inline mr-2" />
              {appointment.nombre}
            </h3>
            <span className="appointment-date">
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              {formatDate(appointment.fecha)}
            </span>
          </div>
          
          <div className="appointment-content">
            <p className="appointment-detail">
              <ClockIcon className="w-4 h-4" />
              Hora: {appointment.hora || 'No especificada'}
            </p>
            <p className="appointment-detail">
              Motivo: {appointment.motivo}
            </p>
            <p className="appointment-detail">
              Estado: <span className={`font-medium ${
                appointment.estado === 'pendiente' ? 'text-yellow-600' :
                appointment.estado === 'confirmada' ? 'text-green-600' :
                'text-red-600'
              }`}>{appointment.estado}</span>
            </p>
          </div>

          <div className="appointment-actions">
            <button onClick={() => onModify(appointment)} className="btn-modify">
              <PencilIcon className="w-4 h-4" />
              Modificar
            </button>
            <button onClick={() => handlePrint(appointment)} className="btn-print">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Imprimir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
