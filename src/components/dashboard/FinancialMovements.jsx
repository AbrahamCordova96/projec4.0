import { useState } from 'react';
import { 
  faMoneyBillTransfer,
  faArrowTrendUp,
  faArrowTrendDown,
  faDollarSign,
  faFileLines
} from '@fortawesome/free-solid-svg-icons';
import Card from '../common/Card';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Button from '../common/Button';

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
    <Card 
      title="Movimientos Financieros Adicionales" 
      icon={faMoneyBillTransfer}
      elevated
    >
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
    </Card>
  );
}

export default FinancialMovements;