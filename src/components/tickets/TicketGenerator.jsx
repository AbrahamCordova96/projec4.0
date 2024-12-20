import { useState } from 'react';
import { generateTicket } from '../../utils/ticketGenerator';

const TicketGenerator = () => {
    const [ticketType, setTicketType] = useState('order');
    const [inputData, setInputData] = useState({
        id: '',
        customerName: '',
        customerPhone: '',
        deviceType: '',
        brand: '',
        model: '',
        // Campos específicos para citas
        appointmentDate: '',
        appointmentTime: '',
        repairReason: '',
        estimatedCost: ''
    });

    const handlePrint = async () => {
        try {
            await generateTicket(inputData, ticketType);
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
                <select 
                    value={ticketType} 
                    onChange={(e) => setTicketType(e.target.value)}
                >
                    <option value="order">Nueva Orden</option>
                    <option value="appointment">Cita</option>
                    <option value="budget">Presupuesto</option>
                </select>
            </div>

            <form>
                {/* Campos comunes */}
                <input
                    name="customerName"
                    placeholder="Nombre del cliente"
                    onChange={handleInputChange}
                />
                
                {/* Campos específicos según el tipo */}
                {ticketType === 'appointment' && (
                    <>
                        <input
                            type="date"
                            name="appointmentDate"
                            onChange={handleInputChange}
                        />
                        <input
                            type="time"
                            name="appointmentTime"
                            onChange={handleInputChange}
                        />
                    </>
                )}

                <button type="button" onClick={handlePrint}>
                    Generar Ticket
                </button>
            </form>
        </div>
    );
};

export default TicketGenerator;
