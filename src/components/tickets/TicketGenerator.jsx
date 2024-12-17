import { useState } from 'react';
import { printTickets } from '../../utils/ticketGenerator';

const TicketGenerator = () => {
    const [inputData, setInputData] = useState({});

    const handlePrint = () => {
        try {
            printTickets(inputData);
            alert('Tickets generados correctamente.');
        } catch (error) {
            console.error(error);
            alert('Error generando los tickets.');
        }
    };

    return (
        <div style={{ height: '100%', padding: '20px' }}>
            <h1>Generación de Tickets</h1>
            <div>
                <strong>Ingresa la información de la Orden:</strong>
            </div>
            <form onChange={(e) => setInputData({ ...inputData, [e.target.name]: e.target.value })}>
                {/* Aquí van los campos del formulario */}
                <button type="button" onClick={handlePrint}>Generar Tickets</button>
            </form>
        </div>
    );
};

export default TicketGenerator;
