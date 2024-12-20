// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import ProductControl from './pages/ProductControl';
import Accounting from './pages/Accounting';
import Reports from './pages/Reports';
import VisualSummary from './pages/VisualSummary';
import Orders from './pages/Orders';
import Pendientes from './pages/Pendientes'; // Importar Pendientes
import Citas from './pages/Citas'; // Añadir esta importación
import { SummaryProvider } from './contexts/SummaryContext';

// Agregar configuración de flags futuros
const routerOptions = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatRoutes: true,
  }
};

function App() {
  return (
    <Router {...routerOptions}>
      <SummaryProvider>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductControl />} />
              <Route path="/accounting" element={<Accounting />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/summary" element={<VisualSummary />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/pendientes" element={<Pendientes />} /> {/* Ruta añadida para Pendientes */}
              {/* Opcional: Ruta alias para "/pending" */}
              <Route path="/pending" element={<Pendientes />} />
              <Route path="/appointments" element={<Citas />} /> {/* Añadir esta ruta */}
            </Routes>
          </main>
        </div>
      </SummaryProvider>
    </Router>
  );
}

export default App;
