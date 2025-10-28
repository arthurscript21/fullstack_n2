// src/pages/admin/AdminOrders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import { getOrders } from '../../utils/localStorageHelper';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedOrders = getOrders();
    loadedOrders.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordena por fecha
    setOrders(loadedOrders);
    setLoading(false);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-CL', options);
    } catch (e) { return dateString; }
  };

  if (loading) return <p>Cargando órdenes...</p>;

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Órdenes Recibidas</h1>
      </div>
      {orders.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  {/* ID corto */}
                  <td>{order.id.substring(order.id.lastIndexOf('_') + 1)}</td>
                  <td>{formatDate(order.fecha)}</td>
                  <td>{order.cliente?.nombre || '-'}</td>
                  <td>{order.cliente?.email || '-'}</td>
                  <td>${(order.total || 0).toLocaleString('es-CL')}</td>
                  <td>
                    <span className={`badge ${
                        order.estado === 'Pendiente' ? 'bg-warning text-dark' :
                        order.estado === 'Enviado' ? 'bg-info text-dark' :
                        order.estado === 'Entregado' ? 'bg-success' : 'bg-secondary'
                      }`}>
                      {order.estado || 'Desconocido'}
                    </span>
                  </td>
                  <td>
                    {/* --- USA Link EN LUGAR DE button --- */}
                    <Link
                      to={`/admin/ordenes/${order.id}`} // Enlace con el ID completo
                      className="btn btn-sm btn-outline-primary" // Mismo estilo
                      title="Ver Detalles"
                    >
                      Detalles
                    </Link>
                    {/* ---------------------------------- */}
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