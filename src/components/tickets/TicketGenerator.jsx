// src/components/tickets/TicketGenerator.jsx

import { useState } from 'react';
import { generateTicket } from '../../utils/ticketGenerator';
import Button from '../common/Button';
import Input from '../common/Input';

const TicketGenerator = () => {
    const [ticketType, setTicketType] = useState('order');
    const [inputData, setInputData] = useState({
        id: '',
        customerName: '',
        phone: '',
        deviceType: '',
        brand: '',
        model: '',
        // Campos específicos para citas
        appointmentDate: '',
        appointmentTime: '',
        repairReason: '',
        estimatedCost: '',
        // Campos específicos para presupuestos
        comments: ''
    });

    const handlePrint = async () => {
        try {
            await generateTicket(inputData, ticketType); // Pasar el tipo correctamente
            alert('Ticket generado correctamente.');
        } catch (error) {
            console.error(error);
            alert('Error generando el ticket.');
        }
    };

    const handleInputChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ height: '100%', padding: '20px' }}>
            <h1>Generación de Tickets</h1>
            
            <div>
                <label htmlFor="ticketType">Tipo de Ticket: </label>
                <select 
                    id="ticketType"
                    value={ticketType} 
                    onChange={(e) => setTicketType(e.target.value)}
                >
                    <option value="order">Nueva Orden</option>
                    <option value="appointment">Cita</option>
                    <option value="budget">Presupuesto</option>
                </select>
            </div>

            <form style={{ marginTop: '20px' }}>
                {/* Campos comunes */}
                <div>
                    <label htmlFor="customerName">Nombre del Cliente:</label>
                    <Input
                        id="customerName"
                        name="customerName"
                        placeholder="Nombre del cliente"
                        value={inputData.customerName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone">Teléfono del Cliente:</label>
                    <Input
                        id="phone"
                        name="phone"
                        placeholder="Teléfono del cliente"
                        value={inputData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="deviceType">Tipo de Dispositivo:</label>
                    <Input
                        id="deviceType"
                        name="deviceType"
                        placeholder="Tipo de dispositivo"
                        value={inputData.deviceType}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="brand">Marca:</label>
                    <Input
                        id="brand"
                        name="brand"
                        placeholder="Marca"
                        value={inputData.brand}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="model">Modelo:</label>
                    <Input
                        id="model"
                        name="model"
                        placeholder="Modelo"
                        value={inputData.model}
                        onChange={handleInputChange}
                    />
                </div>
                
                {/* Campos específicos según el tipo */}
                {ticketType === 'appointment' && (
                    <>
                        <div>
                            <label htmlFor="appointmentDate">Fecha de Cita:</label>
                            <Input
                                type="date"
                                id="appointmentDate"
                                name="appointmentDate"
                                value={inputData.appointmentDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="appointmentTime">Hora de Cita:</label>
                            <Input
                                type="time"
                                id="appointmentTime"
                                name="appointmentTime"
                                value={inputData.appointmentTime}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="repairReason">Motivo de la Reparación:</label>
                            <Input
                                id="repairReason"
                                name="repairReason"
                                placeholder="Motivo de la reparación"
                                value={inputData.repairReason}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="estimatedCost">Costo Estimado ($):</label>
                            <Input
                                type="number"
                                id="estimatedCost"
                                name="estimatedCost"
                                placeholder="Costo estimado"
                                value={inputData.estimatedCost}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}

                {ticketType === 'budget' && (
                    <>
                        <div>
                            <label htmlFor="comments">Comentarios:</label>
                            <Input
                                id="comments"
                                name="comments"
                                placeholder="Comentarios"
                                value={inputData.comments || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Agrega más campos específicos para presupuestos si es necesario */}
                    </>
                )}

                <div style={{ marginTop: '20px' }}>
                    <Button type="button" onClick={handlePrint}>
                        Generar Ticket
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TicketGenerator;
