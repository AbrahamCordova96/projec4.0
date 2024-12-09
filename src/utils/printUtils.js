export const generateTicket = (transaction) => {
  const ticket = `
=================================
        COMPROBANTE DE OPERACIÓN        
=================================
Fecha: ${formatDateTime(transaction.date)}
Tipo: ${transaction.type}
Descripción: ${transaction.description}
---------------------------------
${transaction.type === 'expense' ? 'EGRESO' : 'INGRESO'}: ${formatCurrency(transaction.amount)}
=================================
  `;
  
  // En un entorno real, aquí se conectaría con la API de la impresora
  console.log('Imprimiendo ticket:', ticket);
  return ticket;
};