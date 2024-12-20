import React from 'react';
import { ArrowDownTrayIcon, PencilIcon } from '@heroicons/react/24/solid';
import { generateTicket } from '../../utils/ticketGenerator';

const AppointmentList = ({ appointments, onModify }) => {
  const handlePrint = (appointment) => {
    generateTicket(appointment);
  };

  return (
    <div className="appointment-list">
      {appointments.map(appointment => (
        <div key={appointment.id} className="appointment-card">
          <h2>{appointment.nombre}</h2>
          <p>Fecha: {appointment.fecha}</p>
          <p>Motivo: {appointment.motivo}</p>
          <button onClick={() => onModify(appointment)} className="btn-modify">
            <PencilIcon className="icon" /> Modificar
          </button>
          <button onClick={() => handlePrint(appointment)} className="btn-print">
            <ArrowDownTrayIcon className="icon" /> Imprimir
          </button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
