// src/pages/admin/AdminOrderDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../../data/ordersData'; // Importamos la función

function AdminOrderDetail() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundOrder = getOrderById(id);
    setOrder(foundOrder);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <p>Cargando detalle de la orden...</p>;
  }

  if (!order) {
    return (
      <div className="alert alert-danger">
        <h4>Orden no encontrada</h4>
        <p>La orden con ID "{id}" no existe.</p>
        <Link to="/admin/ordenes" className="btn btn-secondary">Volver a Órdenes</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Detalle de Orden: {order.id}</h3>
        <Link to="/admin/ordenes" className="btn btn-outline-secondary">
          ← Volver a Órdenes
        </Link>
      </div>
      
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3">Información del Cliente</h5>
        <p className="mb-1"><strong>Nombre:</strong> {order.clienteNombre}</p>
        <p className="mb-1"><strong>Email:</strong> {order.clienteEmail}</p>
        <p className="mb-1"><strong>Dirección de Envío:</strong> {order.direccion}</p>
      </div>

      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">Resumen de Productos</h5>
        {order.items.map(item => (
          <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
            <span className="small">{item.nombre} x {item.cantidad}</span>
            <span className="small">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between">
          <span>Subtotal:</span>
          <span>${order.subtotal.toLocaleString('es-CL')}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Envío:</span>
          <span>${order.envio.toLocaleString('es-CL')}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Total Pagado:</span>
          <span>${order.total.toLocaleString('es-CL')}</span>
        </div>
         <hr />
         <div className="d-flex justify-content-between fw-bold fs-5">
           <span>Estado:</span>
           <span className="text-primary">{order.estado}</span>
         </div>
      </div>
    </div>
  );
}

export default AdminOrderDetail;