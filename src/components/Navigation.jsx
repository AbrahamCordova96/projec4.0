import { Menu, Transition } from '@headlessui/react';
import {
  ChartBarIcon,
  ChartPieIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-[#2C3E50] to-[#3498DB] text-white shadow-lg">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Botones de Navegación */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {/* Botón Panel Principal */}
              <Link
                to="/"
                className="px-4 py-2 rounded bg-white/10 text-white shadow-inner"
              >Panel Principal</Link>

              {/* Botón Ver Órdenes Generadas */}
              <Link
                to="/orders"
                className="px-4 py-2 rounded bg-white/10 text-white shadow-inner"
              >Ver Ordenes Generadas</Link>

              {/* Botón Citas */}
              <Link
                to="/appointments"
                className="px-4 py-2 rounded bg-green-500 text-white hever-bg-green-600"
              >Ver Citas</Link>

              {/* Botón Pendientes */}
              <Link
                to="/pending"
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              >Ver Pendientes</Link>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
