import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";

const OrderDetailModal = ({ order, onClose, onUpdate }) => {
  const [editedOrder, setEditedOrder] = useState(order);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(editedOrder);
    setIsEditing(false);
  };

  const calculatePendingBalance = () => {
    const total = parseFloat(editedOrder.totalPrice) || 0;
    const advance = parseFloat(editedOrder.advance) || 0;
    const discount = parseFloat(editedOrder.discount) || 0;
    return (total - advance - discount).toFixed(2);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Orden #${order.orderNumber}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Información del Cliente</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nombre"
              name="customerName"
              value={editedOrder.customerName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Apellido"
              name="customerLastName"
              value={editedOrder.customerLastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Teléfono"
              name="customerPhone"
              value={editedOrder.customerPhone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Información del Dispositivo</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Tipo"
              name="deviceType"
              value={editedOrder.deviceType}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Marca"
              name="brand"
              value={editedOrder.brand}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Modelo"
              name="model"
              value={editedOrder.model}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Detalles de la Reparación</h3>
          <div className="space-y-4">
            <Input
              label="Descripción de la Falla"
              name="faultDescription"
              value={editedOrder.faultDescription}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Proceso a Realizar"
              name="processToPerform"
              value={editedOrder.processToPerform}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {editedOrder.systemFailures && (
              <Input
                label="Fallas del Sistema"
                name="systemFailures"
                value={editedOrder.systemFailures}
                onChange={handleChange}
                disabled={!isEditing}
              />
            )}
            {editedOrder.physicalDamage && (
              <Input
                label="Daños Físicos"
                name="physicalDamage"
                value={editedOrder.physicalDamage}
                onChange={handleChange}
                disabled={!isEditing}
              />
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Información de Pago</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Precio Total"
              name="totalPrice"
              type="number"
              value={editedOrder.totalPrice}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Adelanto"
              name="advance"
              type="number"
              value={editedOrder.advance}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Saldo Pendiente"
              value={calculatePendingBalance()}
              disabled={true}
            />
            {editedOrder.discount && (
              <Input
                label="Descuento"
                name="discount"
                type="number"
                value={editedOrder.discount}
                onChange={handleChange}
                disabled={!isEditing}
              />
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Fecha de Entrega</h3>
          <Input
            label="Fecha y Hora"
            name="deliveryDateTime"
            value={editedOrder.deliveryDateTime}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </section>

        <div className="flex justify-end space-x-4 mt-6">
          {isEditing ? (
            <>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
              >
                Guardar Cambios
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
              >
                Editar Orden
              </Button>
              <Button
                variant="secondary"
                onClick={onClose}
              >
                Cerrar
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;