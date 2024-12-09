import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import ProductControl from './pages/ProductControl';
import Accounting from './pages/Accounting';
import Reports from './pages/Reports';
import VisualSummary from './pages/VisualSummary';
import { SummaryProvider } from './contexts/SummaryContext';

function App() {
  return (
    <Router>
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
            </Routes>
          </main>
        </div>
      </SummaryProvider>
    </Router>
  );
}

export default App;