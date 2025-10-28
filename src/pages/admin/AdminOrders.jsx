// src/pages/admin/AdminOrders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../data/ordersData'; // Importamos los datos simulados

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga de datos
    const fetchedOrders = getOrders();
    setOrders(fetchedOrders);
    setLoading(false);
  }, []);

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'Completado': return 'badge bg-success';
      case 'Pendiente': return 'badge bg-warning text-dark';
      case 'Enviado': return 'badge bg-info text-dark';
      case 'Cancelado': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Órdenes y Boletas</h1>
        {/* Podrías añadir un botón para crear órdenes manualmente si quisieras */}
      </div>

      {orders.length === 0 ? (
        <p>No se encontraron órdenes.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover admin-table">
            <thead>
              <tr>
                <th>ID Orden</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  {/* Formateamos la fecha (simple) */}
                  <td>{new Date(order.fecha).toLocaleDateString('es-CL')}</td>
                  <td>{order.clienteNombre}</td>
                  <td>${order.total.toLocaleString('es-CL')}</td>
                  <td>
                    <span className={getStatusBadge(order.estado)}>
                      {order.estado}
                    </span>
                  </td>
                  <td>
                    <Link 
                      to={`/admin/ordenes/${order.id}`} 
                      className="btn btn-info btn-sm"
                    >
                      Ver Detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;