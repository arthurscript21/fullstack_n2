// src/pages/admin/AdminOrderDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// --- CAMBIO 1: Importar getOrders de localStorageHelper ---
// import { getOrderById } from '../../data/ordersData'; // <-- QUITAR ESTA LÍNEA
import { getOrders } from '../../utils/localStorageHelper'; // <-- AÑADIR ESTA LÍNEA
// --------------------------------------------------------

function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- CAMBIO 2: Buscar la orden en la lista de localStorage ---
    const allOrders = getOrders(); // Obtener TODAS las órdenes de localStorage
    const foundOrder = allOrders.find(o => o.id === id); // Buscar por ID
    // -----------------------------------------------------------
    setOrder(foundOrder); // Guardar la orden encontrada (o null si no se encontró)
    setLoading(false);
  }, [id]); // Dependencia sigue siendo el ID de la URL

  // --- El resto del componente permanece igual ---
  if (loading) {
    return <p>Cargando detalle de la orden...</p>;
  }

  if (!order) {
    return (
      <div className="alert alert-danger">
        <h4>Orden no encontrada</h4>
        {/* Muestra el ID que se buscó */}
        <p>La orden con ID "{id}" no existe en localStorage.</p>
        <Link to="/admin/ordenes" className="btn btn-secondary">Volver a Órdenes</Link>
      </div>
    );
  }

  // Función para formatear fechas (puedes moverla a un helper si la usas en varios sitios)
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('es-CL', options);
    } catch (e) { return dateString; }
  };

  // Formatear precios
   const formatPrice = (price) => {
     if (typeof price !== 'number' || isNaN(price)) return '$???';
     return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price);
   };


  return (
    <div className="container mt-4" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
         {/* Muestra ID corto en el título */}
        <h3>Detalle Orden: #{order.id.substring(order.id.lastIndexOf('_') + 1)}</h3>
        <Link to="/admin/ordenes" className="btn btn-outline-secondary">
          ← Volver
        </Link>
      </div>

      {/* Tarjeta Cliente/Envío */}
      <div className="card p-4 shadow-sm mb-4">
        <div className="row">
            <div className="col-md-6">
                 <h5 className="mb-3">Cliente</h5>
                 <p className="mb-1"><small><strong>Nombre:</strong> {order.cliente?.nombreCompleto || `${order.cliente?.nombre || ''} ${order.cliente?.apellidos || ''}`.trim()}</small></p>
                 <p className="mb-1"><small><strong>Email:</strong> {order.cliente?.email}</small></p>
                 {order.cliente?.telefono && <p className="mb-0"><small><strong>Teléfono:</strong> {order.cliente.telefono}</small></p>}
            </div>
             <div className="col-md-6 mt-3 mt-md-0">
                 <h5 className="mb-3">Envío</h5>
                 <p className="mb-1"><small>{order.cliente?.direccion}</small></p>
                 {order.cliente?.departamento && <p className="mb-1"><small>Depto: {order.cliente.departamento}</small></p>}
                 <p className="mb-1"><small>{order.cliente?.comuna}, {order.cliente?.region}</small></p>
                 {order.cliente?.indicaciones && <p className="mb-0"><small><strong>Indicaciones:</strong> {order.cliente.indicaciones}</small></p>}
             </div>
        </div>
        <hr/>
         <div className="d-flex justify-content-between align-items-center">
             <small className="text-muted">Fecha Orden: {formatDate(order.fecha)}</small>
             <span className={`badge fs-6 ${ // Badge más grande
                 order.estado === 'Pendiente' ? 'bg-warning text-dark' :
                 order.estado === 'Enviado' ? 'bg-info text-dark' :
                 order.estado === 'Entregado' ? 'bg-success' : 'bg-secondary'
               }`}>
               {order.estado || 'Desconocido'}
             </span>
         </div>
      </div>

      {/* Tarjeta Productos/Totales */}
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">Productos</h5>
         <div className="table-responsive">
             <table className="table table-sm">
                 <thead><tr><th>Producto</th><th className="text-center">Cant.</th><th className="text-end">Precio Unit.</th><th className="text-end">Subtotal</th></tr></thead>
                 <tbody>
                     {order.items?.map(item => (
                         <tr key={item.id}>
                             <td><small>{item.nombre}</small></td>
                             <td className="text-center"><small>{item.cantidad}</small></td>
                             <td className="text-end"><small>{formatPrice(item.precioUnitarioPagado)}</small></td>
                             <td className="text-end"><small>{formatPrice(item.precioUnitarioPagado * item.cantidad)}</small></td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
        <hr />
        <div className="d-flex justify-content-end mb-1"><span className="me-3">Subtotal Productos:</span><span>{formatPrice(order.items?.reduce((sum, i) => sum + i.precioUnitarioPagado * i.cantidad, 0) || 0)}</span></div>
        <div className="d-flex justify-content-end mb-1"><span>Costo Envío:</span><span>{formatPrice(order.envio)}</span></div>
        <hr />
        <div className="d-flex justify-content-end fw-bold fs-5"><span>Total Pagado:</span><span>{formatPrice(order.total)}</span></div>
      </div>

       {/* Podrías añadir botones para cambiar estado de la orden aquí */}
       {/* <div className="mt-4 text-end">
           <button className="btn btn-info me-2">Marcar como Enviado</button>
           <button className="btn btn-success">Marcar como Entregado</button>
       </div> */}

    </div>
  );
}

export default AdminOrderDetail;