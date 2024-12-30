import { UserIcon, UserCircleIcon, PhoneIcon } from '@heroicons/react/24/outline';

function CustomerInfo({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-gray-700 uppercase mb-4">Datos del Cliente</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Nombre</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={data.customerName}
              onChange={(e) => onChange({...data, customerName: e.target.value})}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              placeholder="nombre del cliente"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">apellido</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserCircleIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={data.customerLastName}
              onChange={(e) => onChange({...data, customerLastName: e.target.value})}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="apellido del cliente"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">teléfono</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PhoneIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            value={data.customerPhone}
            onChange={(e) => onChange({...data, customerPhone: e.target.value})}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="teléfono del cliente"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;