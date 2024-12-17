import {
  faArrowTrendDown,
  faArrowTrendUp,
  faDollarSign,
  faFileLines,
  faMoneyBillTransfer
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import SectionHeader from '../common/SectionHeader';
import TextArea from '../common/TextArea';

function FinancialMovements() {
  const [movement, setMovement] = useState({
    amount: '',
    description: '',
    category: 'income'
  });

  const handleSubmit = (type) => {
    console.log('Movimiento registrado:', { ...movement, type });
    setMovement({
      amount: '',
      description: '',
      category: 'income'
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <SectionHeader 
        title="Movimientos Financieros Adicionales"
        icon={faMoneyBillTransfer}
      />

      <div className="space-y-4">
        <Input
          label="Monto"
          type="number"
          value={movement.amount}
          onChange={(e) => setMovement({ ...movement, amount: e.target.value })}
          placeholder="0.00"
          icon={faDollarSign}
          required
        />

        <TextArea
          label="Descripción"
          value={movement.description}
          onChange={(e) => setMovement({ ...movement, description: e.target.value })}
          placeholder="Detalle del movimiento..."
          icon={faFileLines}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleSubmit('income')}
            icon={faArrowTrendUp}
            variant="primary"
            className="w-full"
          >
            REGISTRAR INGRESO
          </Button>
          <Button
            onClick={() => handleSubmit('expense')}
            icon={faArrowTrendDown}
            variant="danger"
            className="w-full"
          >
            REGISTRAR GASTO
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FinancialMovements;
