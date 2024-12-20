// src/pages/Pendientes.jsx

import { useState, useEffect } from 'react';
import PendingList from '../components/pending/PendingList';
import Button from '../components/common/Button';
import { BellIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Dropdown from '../components/common/Dropdown';
import Fuse from 'fuse.js';
import { differenceInDays } from 'date-fns';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

function Pendientes() {
  const [pendingItems, setPendingItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [fuse, setFuse] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadPendingItems = () => {
      const savedItems = localStorage.getItem('pendingItems');
      if (savedItems) {
        try {
          const items = JSON.parse(savedItems);
          const validatedItems = items.map(item => ({
            ...item,
            creationDate: item.creationDate || new Date().toISOString(),
            deliveryDate: item.deliveryDate || null,
            processNotes: item.processNotes || []
          }));
          setPendingItems(validatedItems);
          console.log('Pendientes cargados:', validatedItems); // Log para depuración
          const options = {
            keys: ['orderNumber', 'customerName', 'deviceModel'],
            threshold: 0.3
          };
          setFuse(new Fuse(validatedItems, options));
          // Generar notificaciones
          const overdueItems = validatedItems.filter(item => differenceInDays(new Date(), new Date(item.creationDate)) > 5 && item.status !== 'completed');
          setNotifications(overdueItems);
        } catch (error) {
          console.error('Error al cargar pendientes:', error);
          setPendingItems([]);
        }
      }
    };
    loadPendingItems();
  }, []);

  const savePendingItems = (items) => {
    localStorage.setItem('pendingItems', JSON.stringify(items));
    setPendingItems(items);
    // Actualizar notificaciones
    const overdueItems = items.filter(item => differenceInDays(new Date(), new Date(item.creationDate)) > 5 && item.status !== 'completed');
    setNotifications(overdueItems);
  };

  const handleStatusChange = (itemId, newStatus, processNote = '') => {
    const updatedItems = pendingItems.map(item => {
      if (item.id === itemId) {
        const updatedProcessNotes = processNote 
          ? [...item.processNotes, { note: processNote, date: new Date().toISOString() }]
          : item.processNotes;
        return {
          ...item,
          status: newStatus,
          processNotes: updatedProcessNotes,
          lastUpdated: new Date().toISOString()
        };
      }
      return item;
    });
    savePendingItems(updatedItems);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('¿Está seguro de eliminar este pendiente?')) {
      const updatedItems = pendingItems.filter(item => item.id !== itemId);
      savePendingItems(updatedItems);
    }
  };

  const handleUpdateItem = (itemId, updatedData) => {
    const updatedItems = pendingItems.map(item => 
      item.id === itemId ? { ...item, ...updatedData } : item
    );
    savePendingItems(updatedItems);
  };

  const filterItems = () => {
    if (fuse && searchTerm) {
      return fuse.search(searchTerm).map(result => result.item)
        .filter(item => filterStatus === 'all' || item.status === filterStatus);
    }
    return pendingItems
      .filter(item => filterStatus === 'all' || item.status === filterStatus)
      .filter(item => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          item.orderNumber?.toLowerCase().includes(searchLower) ||
          item.customerName?.toLowerCase().includes(searchLower) ||
          item.deviceModel?.toLowerCase().includes(searchLower)
        );
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pendientes</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar pendientes..."
              className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dropdown
            label={
              <div className="flex items-center">
                <FunnelIcon className="w-5 h-5 mr-2" />
                Filtrar por Estado
              </div>
            }
            items={[
              { label: 'Todos', onClick: () => setFilterStatus('all') },
              { label: 'En Proceso', onClick: () => setFilterStatus('inProcess') },
              { label: 'Completados', onClick: () => setFilterStatus('completed') }
            ]}
          />
          {notifications.length > 0 && (
            <div className="relative">
              <Button variant="warning" icon={BellIcon} tooltip="Notificaciones">
                <span>{notifications.length}</span>
              </Button>
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-700">Pendientes con más de 5 días</h2>
                  <ul className="mt-2 space-y-2">
                    {notifications.map(item => (
                      <li key={item.id} className="flex items-center text-sm text-red-600">
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        Orden #{item.orderNumber} - {item.customerName}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <PendingList
        items={filterItems()}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteItem}
        onUpdate={handleUpdateItem}
      />
    </div>
  );
}

export default Pendientes;
