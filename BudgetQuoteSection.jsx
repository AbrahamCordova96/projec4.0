// ...existing code...

const handleScheduleAppointment = async (appointmentData) => {
  try {
    const ticket = await generateTicket(appointmentData);
    // Procesar el ticket generado
    // ...existing code...
  } catch (error) {
    console.error('Error al agendar cita:', error);
    // Manejar el error apropiadamente
  }
};

// ...existing code...
