// src/utils/ticketGenerator.js

import { formatTicketDateTime, formatCurrency } from "./formatters";

const pricesByOperation = {
  "Reparación de Puerto de Carga Tipo C": 500,
  "Reparación de Puerto de Carga Tipo V8": 400,
  "Reparación de Puerto de Carga iPhone 12": 750,
  "Reparación de Puerto de Carga iPhone 11ProMax": 600,
  "Formateo o Desbloqueo con Cuenta Google": 350,
  "Formateo o Desbloqueo sin Cuenta Google": 500,
  "Rsim iPhone 12": 700,
  "Rsim iPhone 11ProMax": 600,
};

export const calculateOperationPrice = (operation, brand, model) => {
  if (operation === "Cambio de Pantalla") {
    return 800;
  }
  return pricesByOperation[operation] || 0;
};

const generateTicketContent = (data, type) => {
  switch (type) {
    case "appointment":
      return generateAppointmentContent(data);
    case "budget":
      return generateBudgetContent(data);
    default:
      return generateOrderContent(data);
  }
};

const generateAppointmentContent = (data) => {
  return `
    <div class="section">
      <h1>Cita #${data.id || "N/A"}</h1>
      <div>Fecha de Cita: ${formatTicketDateTime(data.appointmentDate)}</div>
      <div>Cliente: ${data.customerName}</div>
      <div>Teléfono: ${data.phone}</div>
    </div>
    
    <div class="section">
      <div>Dispositivo: ${data.deviceType || "N/A"}</div>
      <div>Marca: ${data.brand || "N/A"}</div>
      <div>Modelo: ${data.model || "N/A"}</div>
      ${data.repairReason ? `<div>Motivo: ${data.repairReason}</div>` : ""}
    </div>
    
    <div class="section">
      <div>Hora de Cita: ${formatTicketDateTime(
        data.appointmentTime || data.appointmentDate
      )}</div>
      ${
        data.estimatedCost
          ? `<div>Costo Estimado: ${formatCurrency(data.estimatedCost)}</div>`
          : ""
      }
    </div>
    
    <div class="disclaimer">
      <p>*El cliente debe presentarse puntualmente a su cita programada.</p>
      <p>*La cita tiene una tolerancia máxima de 15 minutos.</p>
      <p>*El diagnóstico inicial es gratuito pero podría requerir tiempo adicional.</p>
    </div>
  `;
};

const generateBudgetContent = (data) => {
  const price =
    data.price ||
    calculateOperationPrice(data.operation, data.brand, data.model);

  return `
    <div class="section">
      <h1>Presupuesto #${data.id || "N/A"}</h1>
      <div>Fecha: ${formatTicketDateTime(data.date)}</div>
      <div>Cliente: ${data.customerName}</div>
      <div>Teléfono: ${data.phone}</div>
      
      <div class="details-section">
        <div>Marca: ${data.brand}</div>
        <div>Modelo: ${data.model}</div>
        <div>Operación: ${data.operation}</div>
        ${data.comments ? `<div>Comentarios: ${data.comments}</div>` : ""}
      </div>
      
      <div class="price-section">
        <div>Precio Total: ${formatCurrency(price)}</div>
        ${
          data.appointmentDate
            ? `<div>Fecha de Cita: ${formatTicketDateTime(
                data.appointmentDate
              )}</div>`
            : ""
        }
      </div>
    </div>
  `;
};

const generateOrderContent = (data) => {
  return `
    <div class="section">
      <h1>No Orden #${data.id || "N/A"}</h1>
      <div>Fecha: ${formatTicketDateTime(
        data.creationDateTime || data.date
      )}</div>
      <div>Cliente: ${data.customerName}</div>
      <div>Teléfono: ${data.phone || "N/A"}</div>
    </div>
    
    <div class="section">
      <div>Dispositivo: ${data.deviceType || "N/A"}</div>
      <div>Marca: ${data.brand || "N/A"}</div>
      <div>Modelo: ${data.model || "N/A"}</div>
      ${data.operation ? `<div>Operación: ${data.operation}</div>` : ""}
      ${data.comments ? `<div>Comentarios: ${data.comments}</div>` : ""}
    </div>
    
    <div class="section summary">
      <div>
        <span>Precio Total:</span>
        <span>$${parseFloat(data.price || data.totalPrice || 0).toFixed(
          2
        )}</span>
      </div>
      ${
        data.discount
          ? `
      <div>
        <span>Descuento:</span>
        <span>$${parseFloat(data.discount).toFixed(2)}</span>
      </div>
      `
          : ""
      }
      <div>
        <span>Adelanto:</span>
        <span>$${parseFloat(data.advance).toFixed(2)}</span>
      </div>
      <div>
        <span>Saldo Pendiente:</span>
        <span>$${parseFloat(data.pendingBalance).toFixed(2)}</span>
      </div>
    </div>
    
    ${
      data.deliveryDateTime
        ? `
    <div class="section">
      <div>Fecha de Entrega: ${formatTicketDateTime(
        data.deliveryDateTime
      )}</div>
    </div>
    `
        : ""
    }
    
    <div class="disclaimer">
      <p>*El cliente debe informar al técnico si el dispositivo se ha sumergido en agua o ha sufrido daños físicos antes de la reparación.</p>
      <p>*El cliente debe ser consciente de que ciertas reparaciones se llevarán a cabo más tiempo que otras. Micro soldadura y cortos de 5-15 días.</p>
      <p>*El cliente acepta que si no recoge el dispositivo después de 15 días de la fecha acordada, el taller puede tomar posesión del dispositivo para recuperar el costo de la reparación.</p>
      <p>*El cliente debe tener en cuenta que algunas reparaciones pueden requerir la eliminación de datos del dispositivo.</p>
      <p>*El cliente debe ser consciente de que algunos dispositivos no tienen solución debido a daños irreparables.</p>
      <p>*El cliente debe tener en cuenta que algunos dispositivos pueden necesitar piezas nuevas y que estas pueden tener un costo adicional.</p>
      <p>*El cliente acepta que la garantía solo cubrirá el trabajo realizado por el taller y no cubrirá ningún daño adicional causado por el mal uso del dispositivo.</p>
    </div>

    <div class="customer-signature">
      <div>Firma del cliente</div>
      <div class="signature-line"></div>
    </div>
  `;
};

export const generateTicket = async (data, type = "order") => {
  try {
    const ticketWindow = window.open("", "_blank");

    if (!ticketWindow) {
      throw new Error("No se pudo abrir la ventana para imprimir el ticket");
    }

    const commonStyles = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
      
      body {
        font-family: 'Roboto', Arial, sans-serif;
        width: 75mm;
        margin: 0;
        padding: 0;
      }

      .ticket-header, .ticket-footer {
        text-align: center;
        margin-bottom: 20px;
      }

      .ticket-content {
        border: 1px solid #000;
        padding: 10px;
      }

      .ticket-content h1 {
        font-size: 18px;
        margin: 0 0 10px 0;
        text-align: center;
      }

      .ticket-content .section {
        margin-bottom: 10px;
      }

      .ticket-content .section div {
        margin-bottom: 5px;
        font-size: 12px;
      }

      .ticket-content .summary {
        border-top: 1px solid #000;
        padding-top: 10px;
      }

      .ticket-content .summary div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }

      .logo {
        width: 50mm;
        margin-bottom: 10px;
      }

      .business-info {
        margin-bottom: 20px;
        font-size: 12px;
      }

      .disclaimer {
        text-align: left;
        font-size: 10px;
        margin-top: 20px;
      }

      .disclaimer p {
        margin: 5px 0;
        padding-bottom: 5px;
        border-bottom: 1px dotted #000;
      }

      .customer-signature {
        margin-top: 30px;
        text-align: center;
      }

      .signature-line {
        margin: 20px auto;
        width: 80%;
        border-bottom: 1px solid #000;
      }

      @media print {
        body {
          width: 75mm;
          margin: 0;
          padding: 0;
        }
        
        .ticket-content {
          border: none;
        }
      }
    `;

    const ticketContent = generateTicketContent(data, type);
    const ticketTemplate = `
      <html>
        <head>
          <title>Ticket ${data.id || "N/A"}</title>
          <style>${commonStyles}</style>
        </head>
        <body>
          <div class="ticket-header">
            <img src="/images/logo.png" alt="LOGO" class="logo">
            <div class="business-info">
              <div>Salva Cell</div>
              <div>Av C. del refugio s/n fracc. valle de las misiones</div>
              <div>Mexicali, B.C.</div>
              <div>+52 686 226 23 77</div>
              <div>salva.tech@gmail.com</div>
            </div>
          </div>
          
          <div class="ticket-content">
            ${ticketContent}
          </div>
        </body>
      </html>
    `;

    ticketWindow.document.write(ticketTemplate);
    ticketWindow.document.close();

    return new Promise((resolve, reject) => {
      ticketWindow.onload = () => {
        try {
          ticketWindow.print();
          setTimeout(() => {
            ticketWindow.close();
            resolve(true);
          }, 1000);
        } catch (error) {
          reject(error);
        }
      };
    });
  } catch (error) {
    console.error("Error al generar ticket:", error);
    throw error;
  }
};
