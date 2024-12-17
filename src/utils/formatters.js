export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;

  // Obtener el último número de orden desde localStorage
  let lastOrderNumber =
    localStorage.getItem("lastOrderNumber") || `${currentDate}-0000`;

  // Extraer y actualizar el contador
  const parts = lastOrderNumber.split("-");
  const lastCounter = parseInt(parts[3], 10) || 0;
  const newCounter = (lastCounter + 1).toString().padStart(4, "0");

  // Generar el nuevo número de orden
  const newOrderNumber = `${currentDate}-${newCounter}`;

  // Guardar el nuevo número en localStorage
  localStorage.setItem("lastOrderNumber", newOrderNumber);

  return newOrderNumber;
};
