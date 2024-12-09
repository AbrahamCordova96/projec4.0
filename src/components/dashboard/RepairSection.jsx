import { useState } from 'react';

function RepairSection() {
  const [repairData, setRepairData] = useState({
    orderNumber: '',
    repairType: '',
    totalCost: '',
    partsCost: '',
    netProfit: 0
  });

  const repairTypes = [
    'Cambio de pantalla',
    'Reparación de puerto de carga',
    'Cambio de batería',
    'Reparación de placa',
    'Actualización de software'
  ];

  const handleCostChange = (field, value) => {
    const newData = { ...repairData, [field]: value };
    
    // Calculate net profit when either cost changes
    if (field === 'totalCost' || field === 'partsCost') {
      const total = parseFloat(newData.totalCost) || 0;
      const parts = parseFloat(newData.partsCost) || 0;
      newData.netProfit = total - parts;
    }
    
    setRepairData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with your backend/state management
    console.log('Reparación registrada:', repairData);
    
    // Reset form
    setRepairData({
      orderNumber: '',
      repairType: '',
      totalCost: '',
      partsCost: '',
      netProfit: 0
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Registro de Reparaciones</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Número de Orden</label>
          <input
            type="text"
            value={repairData.orderNumber}
            onChange={(e) => setRepairData({ ...repairData, orderNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Reparación</label>
          <select
            value={repairData.repairType}
            onChange={(e) => setRepairData({ ...repairData, repairType: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Seleccionar tipo</option>
            {repairTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Costo Total</label>
          <input
            type="number"
            value={repairData.totalCost}
            onChange={(e) => handleCostChange('totalCost', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Costo de Piezas</label>
          <input
            type="number"
            value={repairData.partsCost}
            onChange={(e) => handleCostChange('partsCost', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ganancia Neta</label>
          <div className="mt-1 text-xl font-bold text-gray-900">
            ${repairData.netProfit.toFixed(2)}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#F1C40F] text-white px-4 py-2 rounded-md hover:bg-[#F39C12]"
        >
          REGISTRAR REPARACIÓN
        </button>
      </form>
    </div>
  );
}

export default RepairSection;