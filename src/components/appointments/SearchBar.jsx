import React, { useState } from 'react';

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
    <div className="search-bar">
      <input
        type="text"
        name="nombre"
        placeholder="Buscar por nombre"
        value={criteria.nombre}
        onChange={handleChange}
        className="input"
      />
      <input
        type="date"
        name="fecha"
        placeholder="Buscar por fecha"
        value={criteria.fecha}
        onChange={handleChange}
        className="input"
      />
      <input
        type="text"
        name="motivo"
        placeholder="Buscar por motivo"
        value={criteria.motivo}
        onChange={handleChange}
        className="input"
      />
    </div>
  );
};

export default SearchBar;
