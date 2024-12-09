import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency, formatDateTime } from './formatters';

export const generateTicket = (orderData, type = 'client') => {
  const doc = new jsPDF();
  
  // Configuración básica
  doc.setFontSize(12);
  
  // Encabezado
  doc.setFontSize(16);
  doc.text('Sistema de Gestión Financiera', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  
  // Información de la orden
  doc.text(`Orden #: ${orderData.orderNumber}`, 20, 40);
  doc.text(`Fecha: ${formatDateTime(orderData.creationDateTime)}`, 20, 50);
  
  // Información del cliente
  doc.text('Datos del Cliente:', 20, 70);
  doc.text(`Nombre: ${orderData.customerName}`, 30, 80);
  doc.text(`Teléfono: ${orderData.customerPhone}`, 30, 90);
  
  // Información del dispositivo
  doc.text('Dispositivo:', 20, 110);
  doc.text(`Tipo: ${orderData.deviceType}`, 30, 120);
  doc.text(`Marca: ${orderData.brand}`, 30, 130);
  doc.text(`Modelo: ${orderData.model}`, 30, 140);
  doc.text(`Falla: ${orderData.faultDescription}`, 30, 150);
  
  // Estado del dispositivo
  if (orderData.deviceState.length > 0) {
    doc.text('Estado Físico del Dispositivo:', 20, 170);
    orderData.deviceState.forEach((mark, index) => {
      doc.text(`• ${mark.comment}`, 30, 180 + (index * 10));
    });
  }
  
  // Información de precios
  const y = 220;
  doc.text('Detalles del Pago:', 20, y);
  doc.text(`Total: ${formatCurrency(orderData.totalPrice)}`, 30, y + 10);
  if (orderData.advance) {
    doc.text(`Adelanto: ${formatCurrency(orderData.advance)}`, 30, y + 20);
  }
  if (orderData.discount) {
    doc.text(`Descuento: ${formatCurrency(orderData.discount)}`, 30, y + 30);
    doc.text(`Motivo: ${orderData.discountReason}`, 30, y + 40);
  }
  doc.text(`Saldo Pendiente: ${formatCurrency(orderData.pendingBalance)}`, 30, y + 50);
  
  // Firma
  doc.text('_____________________', 20, y + 80);
  doc.text('Firma de conformidad', 20, y + 90);
  
  return doc;
};

export const printTickets = (orderData) => {
  const clientTicket = generateTicket(orderData, 'client');
  const workshopTicket = generateTicket(orderData, 'workshop');
  
  clientTicket.save(`ticket-cliente-${orderData.orderNumber}.pdf`);
  workshopTicket.save(`ticket-taller-${orderData.orderNumber}.pdf`);
};