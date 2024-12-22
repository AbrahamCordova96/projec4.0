const saveAppointment = (appointmentData) => {
  try {
    const appointments = getAppointments();
    const newAppointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      source: appointmentData.source || 'direct' // Agregar origen de la cita
    };
    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    return newAppointment;
  } catch (error) {
    console.error("Error al guardar la cita:", error);
    throw error;
  }
};

const getAppointments = () => {
  try {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    return appointments.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return [];
  }
};

const updateAppointment = (id, newData) => {
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

const saveBudget = (budgetData) => {
  try {
    const budgets = JSON.parse(localStorage.getItem('budgets')) || [];
    const newBudget = {
      ...budgetData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    budgets.push(newBudget);
    localStorage.setItem('budgets', JSON.stringify(budgets));
    return newBudget;
  } catch (error) {
    console.error("Error al guardar el presupuesto:", error);
    throw error;
  }
};

const getBudgets = () => {
  try {
    return JSON.parse(localStorage.getItem('budgets')) || [];
  } catch (error) {
    console.error("Error al obtener presupuestos:", error);
    return [];
  }
};

// Una única exportación al final del archivo
export {
  saveAppointment,
  getAppointments,
  updateAppointment,
  saveBudget,
  getBudgets
};
