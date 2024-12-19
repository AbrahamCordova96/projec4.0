export const printTickets = async (orderData) => {
  try {
    const ticketWindow = window.open("", "_blank");

    // Verificar que la ventana se abrió correctamente
    if (!ticketWindow) {
      throw new Error("No se pudo abrir la ventana para imprimir el ticket");
    }

    const ticketTemplate = `
      <html>
      <head>
        <title>Ticket de Orden #${orderData.orderNumber}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

          body {
            font-family: 'Roboto', Arial, sans-serif;
            font-weight: bold;
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
        </style>
      </head>
      <body>
        <div class="ticket-header">
          <img src="/images/logo.png" alt="LOGO" class="logo">
          <div class="business-info">
            <div>Salva Cell</div>
            <div>Av C. del refugio s/n fracc. valle de las misiones</div>
            <div>Mexicali B. C.</div>
            <div>+52 686 226 23 77</div>
            <div>salva.tech@gmail.com</div>
          </div>
        </div>
        
        <div class="ticket-content">
          <div class="section">
            <h1>No Orden #${orderData.orderNumber}</h1>
            <div>Fecha: ${orderData.creationDateTime}</div>
            <div>Cliente: ${orderData.customerName}</div>
            <div>Teléfono: ${orderData.customerPhone}</div>
          </div>
          
          <div class="section">
            <div>Dispositivo: ${orderData.deviceType}</div>
            <div>Marca: ${orderData.brand}</div>
            <div>Modelo: ${orderData.model}</div>
            ${
              orderData.systemFailures
                ? `<div>Fallas del Sistema: ${orderData.systemFailures}</div>`
                : ""
            }
            ${
              orderData.physicalDamage
                ? `<div>Daños Físicos: ${orderData.physicalDamage}</div>`
                : ""
            }
            ${
              orderData.repairOperations.length > 0
                ? `<div>Operaciones: ${orderData.repairOperations.join(
                    ", "
                  )}</div>`
                : ""
            }
          </div>
          
          ${
            orderData.parts.length > 0
              ? `
          <div class="section">
            <div><strong>Refacciones:</strong></div>
            ${orderData.parts
              .map(
                (part) => `<div>${part.name} - $${part.price.toFixed(2)}</div>`
              )
              .join("")}
          </div>
          `
              : ""
          }
          
          <div class="section summary">
            <div>
              <span>Precio Total:</span>
              <span>$${parseFloat(orderData.totalPrice).toFixed(2)}</span>
            </div>
            ${
              orderData.discount
                ? `
            <div>
              <span>Descuento:</span>
              <span>$${parseFloat(orderData.discount).toFixed(2)}</span>
            </div>
            `
                : ""
            }
            <div>
              <span>Adelanto:</span>
              <span>$${parseFloat(orderData.advance).toFixed(2)}</span>
            </div>
            <div>
              <span>Saldo Pendiente:</span>
              <span>$${parseFloat(orderData.pendingBalance).toFixed(2)}</span>
            </div>
          </div>
          
          ${
            orderData.deliveryDateTime
              ? `
          <div class="section">
            <div>Fecha de Entrega: ${orderData.deliveryDateTime}</div>
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
        </div>
      </body>
      </html>
    `;

    ticketWindow.document.write(ticketTemplate);
    ticketWindow.document.close();

    // Esperar a que el contenido se cargue antes de imprimir
    return new Promise((resolve, reject) => {
      ticketWindow.onload = () => {
        try {
          ticketWindow.print();
          // Cerrar la ventana después de imprimir
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
    console.error("Error al generar el ticket:", error);
    throw error;
  }
};
