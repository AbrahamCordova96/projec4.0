// ...existing code...

const generateAppointmentContent = (appointmentData) => {
  return {
    date: appointmentData.date,
    time: appointmentData.time,
    service: appointmentData.service,
    client: appointmentData.client,
    // Agrega cualquier otro dato necesario para el ticket
  };
};

const generateTicket = async (appointmentData) => {
  try {
    const content = generateAppointmentContent(appointmentData);
    // ...existing code...
    return ticket;
  } catch (error) {
    console.error('Error al generar ticket:', error);
    throw error;
  }
};

// ...existing code...
