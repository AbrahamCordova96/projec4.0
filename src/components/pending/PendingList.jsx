// src/components/pending/PendingList.jsx

import React, { useState } from 'react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import {
  ClockIcon,
  ExclamationCircleIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

function PendingList({ items, onStatusChange, onDelete, onUpdate }) {
  const [editingItem, setEditingItem] = useState(null);
  const [processNotes, setProcessNotes] = useState({});

  const getPanelColor = (status, creationDate) => {
    if (status === 'completed') return 'bg-green-50 border-green-200';
    if (status === 'inProcess') return 'bg-orange-50 border-orange-200';
    if (differenceInDays(new Date(), new Date(creationDate)) > 5) {
      return 'bg-red-50 border-red-200';
    }
    return 'bg-white border-gray-200';
  };

  const handleProcessClick = (itemId) => {
    onStatusChange(itemId, 'inProcess');
  };

  const handleReadyClick = (itemId) => {
    onStatusChange(itemId, 'completed');
  };

  const handleModifyClick = (item) => {
    setEditingItem(item);
  };

  const handleDeleteClick = (itemId) => {
    onDelete(itemId);
  };

  const handleAddProcessNote = (itemId, note) => {
    onStatusChange(itemId, 'inProcess', note);
  };

  return (
    <div className="space-y-4">
      {items.map(item => (
        <div
          key={item.id}
          className={`rounded-lg border p-4 shadow-sm transition-all duration-200 ${getPanelColor(
            item.status,
            item.creationDate
          )}`}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center">
                {item.orderNumber} - {item.customerName}
                {differenceInDays(new Date(), new Date(item.creationDate)) > 5 && (
                  <ExclamationCircleIcon className="w-5 h-5 text-red-500 ml-2" />
                )}
              </h3>
              <p className="text-sm text-gray-600">
                {item.deviceBrand} {item.deviceModel}
              </p>
              <p className="text-sm text-gray-600">
                Proceso: {item.processToPerform}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="w-4 h-4 mr-1" />
                Creado: {format(new Date(item.creationDate), 'dd/MM/yyyy HH:mm', { locale: es })}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="warning"
                size="sm"
                icon={ArrowPathIcon}
                onClick={() => handleProcessClick(item.id)}
              >
                Proceso
              </Button>
              <Button
                variant="success"
                size="sm"
                icon={CheckCircleIcon}
                onClick={() => handleReadyClick(item.id)}
              >
                Pendiente Listo
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={PencilIcon}
                onClick={() => handleModifyClick(item)}
              >
                Modificar Pendiente
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={TrashIcon}
                onClick={() => handleDeleteClick(item.id)}
              >
                Quitar Pendiente
              </Button>
            </div>
          </div>

          {item.processNotes && item.processNotes.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-sm text-gray-700">Notas de Proceso:</h4>
              {item.processNotes.map((note, index) => (
                <div
                  key={index}
                  className="text-sm bg-white p-2 rounded border border-gray-200"
                >
                  <div className="text-gray-500 text-xs">
                    {format(new Date(note.date), 'dd/MM/yyyy HH:mm', { locale: es })}
                  </div>
                  <div className="mt-1">{note.note}</div>
                </div>
              ))}
            </div>
          )}

          {item.status === 'inProcess' && (
            <div className="mt-4 flex space-x-2">
              <input
                type="text"
                value={processNotes[item.id] || ''}
                onChange={(e) => setProcessNotes({
                  ...processNotes,
                  [item.id]: e.target.value
                })}
                placeholder="Agregar nota de proceso..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (processNotes[item.id]?.trim()) {
                    handleAddProcessNote(item.id, processNotes[item.id]);
                    setProcessNotes({
                      ...processNotes,
                      [item.id]: ''
                    });
                  } else {
                    alert('Por favor, ingresa una nota antes de agregarla.');
                  }
                }}
              >
                Agregar Nota
              </Button>
            </div>
          )}
        </div>
      ))}

      {editingItem && (
        <Modal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          title="Modificar Pendiente"
        >
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Proceso a Realizar</span>
              <input
                type="text"
                value={editingItem.processToPerform}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    processToPerform: e.target.value
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Proceso a realizar"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => setEditingItem(null)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (editingItem.processToPerform.trim()) {
                    onUpdate(editingItem.id, { processToPerform: editingItem.processToPerform });
                    setEditingItem(null);
                  } else {
                    alert('El campo "Proceso a Realizar" no puede estar vacío.');
                  }
                }}
              >
                Guardar Cambios
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PendingList;
