import React, { useState } from 'react';
import { MagnifyingGlassIcon, CalendarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ onSearch }) => {
  const [criteria, setCriteria] = useState({
    nombre: '',
    fecha: '',
    motivo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newCriteria = { ...criteria, [name]: value };
    setCriteria(newCriteria);
    onSearch(newCriteria);
  };

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <div className="relative flex-1 min-w-[200px]">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="nombre"
          placeholder="Buscar por nombre"
          value={criteria.nombre}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="relative flex-1 min-w-[200px]">
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="date"
          name="fecha"
          value={criteria.fecha}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="relative flex-1 min-w-[200px]">
        <ChatBubbleBottomCenterTextIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="motivo"
          placeholder="Buscar por motivo"
          value={criteria.motivo}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
