// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ProductControl from './pages/ProductControl';
import Accounting from './pages/Accounting';
import Reports from './pages/Reports';
import VisualSummary from './pages/VisualSummary';
import Orders from './pages/Orders';
import Pendientes from './pages/Pendientes'; // Importar Pendientes
import Citas from './pages/Citas'; // Añadir esta importación
import AppSettings from './pages/AppSettings';
import UserManagement from './pages/UserManagement';
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
    <BrowserRouter {...routerOptions}>
      <SummaryProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<ProductControl />} />
                  <Route path="accounting" element={<Accounting />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="summary" element={<VisualSummary />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="pendientes" element={<Pendientes />} />
                  <Route path="pending" element={<Pendientes />} />
                  <Route path="appointments" element={<Citas />} />
                  <Route path="app-settings" element={<AppSettings />} />
                  <Route path="user-management" element={<UserManagement />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </SummaryProvider>
    </BrowserRouter>
  );
}

export default App;
