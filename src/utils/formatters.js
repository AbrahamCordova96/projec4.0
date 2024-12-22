// src/utils/formatters.js

/**
 * Formats a currency amount in Mexican Pesos
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
};

/**
 * Formats a date and time in Mexican format
 * @param {string|Date} date - The date to format
 * @returns {string|null} Formatted date string or null if invalid
 */
export const formatDateTime = (date) => {
  try {
    const parsedDate = new Date(date);
    if (!date || isNaN(parsedDate.getTime())) {
      console.warn("Fecha inválida proporcionada a formatDateTime:", date);
      return null;
    }

    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(parsedDate);
  } catch (error) {
    console.error("Error al formatear fecha y hora:", error);
    return null;
  }
};

/**
 * Validates and parses a date safely
 * @param {string|Date} date - The date to validate
 * @returns {Date|null} Valid Date object or null if invalid
 */
export const parseAndValidateDate = (date) => {
  try {
    if (!date) return null;
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  } catch (error) {
    console.error("Error al parsear fecha:", error);
    return null;
  }
};

/**
 * Formats a date and time specifically for tickets with long month format
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatTicketDateTime = (date) => {
  try {
    const parsedDate = parseAndValidateDate(date);
    if (!parsedDate) {
      return "No especificada";
    }

    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(parsedDate);
  } catch (error) {
    console.error("Error al formatear fecha y hora del ticket:", error);
    return "Fecha inválida";
  }
};

/**
 * Generates the HTML header for tickets
 * @returns {string} HTML string for ticket header
 */
export const formatTicketHeader = () => {
  return `
    <div class="business-info">
      <div class="logo-container">
        <img src="/images/logo.png" alt="LOGO" class="logo">
      </div>
      <div class="company-details">
        <div>Salva Cell</div>
        <div>Av C. del refugio s/n fracc. valle de las misiones</div>
        <div>Mexicali B. C.</div>
        <div>+52 686 226 23 77</div>
        <div>salva.tech@gmail.com</div>
      </div>
    </div>
  `;
};

/**
 * Generates a unique order number based on current date
 * @returns {Promise<string>} Generated order number in format YY-MM-DD-XXXX
 */
export const generateOrderNumber = async () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;

  try {
    if (typeof localStorage === "undefined") {
      console.warn(
        "localStorage no está disponible. Retornando orden predeterminada."
      );
      return `${currentDate}-0001`;
    }

    let lastOrderNumber =
      localStorage.getItem("lastOrderNumber") || `${currentDate}-0000`;
    const parts = lastOrderNumber.split("-");
    const lastCounter = parseInt(parts[3], 10) || 0;
    const newCounter = (lastCounter + 1).toString().padStart(4, "0");
    const newOrderNumber = `${currentDate}-${newCounter}`;

    localStorage.setItem("lastOrderNumber", newOrderNumber);
    return newOrderNumber;
  } catch (error) {
    console.error("Error al generar el número de orden:", error);
    return `${currentDate}-0001`;
  }
};
