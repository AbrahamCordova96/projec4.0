import React from 'react';
import BrandModelSelector from './BrandModelSelector';

function DeviceInfo({ data, onChange }) {
  const deviceTypes = ['Móvil', 'Tablet', 'Laptop', 'Otros'];

  const handleBrandModelChange = (brand, model, modelData) => {
    onChange({
      ...data,
      brand: brand,
      model: model,
      suggestedPrice: modelData?.precio,
      quality: modelData?.calidad,
      providerPrice: modelData?.precioProveedor
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Dispositivo</label>
          <select
            value={data.deviceType}
            onChange={(e) => onChange({...data, deviceType: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar...</option>
            {deviceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="col-span-2">
          <BrandModelSelector
            initialBrand={data.brand}
            initialModel={data.model}
            onBrandChange={(brand) => handleBrandModelChange(brand, '', null)}
            onModelChange={(model, modelData) => handleBrandModelChange(data.brand, model, modelData)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción de la Falla</label>
        <textarea
          value={data.faultDescription}
          onChange={(e) => onChange({...data, faultDescription: e.target.value})}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha y Hora de Entrega</label>
        <input
          type="datetime-local"
          value={data.deliveryDateTime}
          onChange={(e) => onChange({...data, deliveryDateTime: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );
}

export default DeviceInfo;