export const saveAppointment = (appointmentData) => {
  try {
    const appointments = getAppointments();
    const newAppointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    return newAppointment;
  } catch (error) {
    console.error("Error al guardar la cita:", error);
    throw error;
  }
};

export const getAppointments = () => {
  try {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    return appointments.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return [];
  }
};

export const updateAppointment = (id, newData) => {
  try {
    const appointments = getAppointments();
    const index = appointments.findIndex((app) => app.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...newData };
      localStorage.setItem("appointments", JSON.stringify(appointments));
      return appointments[index];
    }
    throw new Error("Cita no encontrada");
  } catch (error) {
    console.error("Error al actualizar la cita:", error);
    throw error;
  }
};
