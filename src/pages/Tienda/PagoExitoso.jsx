// src/pages/Tienda/PagoExitoso.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PagoExitoso() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const details = sessionStorage.getItem('lastOrderDetails');
    if (details) {
      setOrderDetails(JSON.parse(details));
      sessionStorage.removeItem('lastOrderDetails'); // Limpia
    }
  }, []);

  // Función formatear fecha (igual que en AdminOrders)
  const formatDate = (dateString) => {
    if (!dateString) return '-'; try { const op={year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}; return new Date(dateString).toLocaleDateString('es-CL', op); } catch(e){ return dateString; }
  };


  if (!orderDetails) {
    // Mensaje genérico si no hay detalles (ej: si recarga la página)
    return (
      <div className="px-md-4 px-3 py-5 text-center">
        <div className="alert alert-success">
            <h2><i className="bi bi-check-circle-fill"></i> ¡Compra Realizada!</h2>
            <p className="lead">Tu pedido ha sido procesado con éxito.</p>
        </div>
        <Link to="/productos" className="btn btn-primary mt-3">Seguir Comprando</Link>
      </div>
    );
  }

  // Cálculos de totales (igual que en Checkout)
  const subtotal = orderDetails.items?.reduce((sum, item) => sum + item.precio * item.cantidad, 0) || 0;
  const shippingCost = orderDetails.envio || 2500; // Usa el guardado o el default
  const total = orderDetails.total || (subtotal + shippingCost);

  return (
    // Sin container global, con padding
    <div className="px-md-4 px-3 py-5 bg-light"> {/* Fondo claro */}
        <div className="container bg-white p-4 p-md-5 rounded shadow-sm"> {/* Container interno */}

            {/* Mensaje de Éxito */}
            <div className="alert alert-success text-center">
                <h2><i className="bi bi-check-circle-fill me-2"></i> ¡Pago Exitoso!</h2>
                <p className="lead mb-1">Gracias por tu compra, {orderDetails.cliente?.nombreCompleto || orderDetails.cliente?.nombre}.</p>
                <p>Orden Nro: #{orderDetails.id.substring(orderDetails.id.lastIndexOf('_') + 1)}</p>
                <p className="small">Recibirás una confirmación en {orderDetails.cliente?.email}.</p>
            </div>

            {/* Resumen del Pedido (similar a Figura 7) */}
            <div className="row mt-4 g-4">
                {/* Columna Izquierda: Cliente y Envío */}
                <div className="col-md-6">
                    <h5>Información del Cliente</h5>
                    <p className="mb-1"><small><strong>Nombre:</strong> {orderDetails.cliente?.nombreCompleto || `${orderDetails.cliente?.nombre} ${orderDetails.cliente?.apellidos}`}</small></p>
                    <p className="mb-1"><small><strong>Email:</strong> {orderDetails.cliente?.email}</small></p>
                    {orderDetails.cliente?.telefono && <p className="mb-1"><small><strong>Teléfono:</strong> {orderDetails.cliente.telefono}</small></p>}

                    <h5 className="mt-3">Dirección de Envío</h5>
                    <p className="mb-1"><small>{orderDetails.cliente?.direccion}</small></p>
                    {orderDetails.cliente?.departamento && <p className="mb-1"><small>Depto: {orderDetails.cliente.departamento}</small></p>}
                    <p className="mb-1"><small>{orderDetails.cliente?.comuna}, {orderDetails.cliente?.region}</small></p>
                    {orderDetails.cliente?.indicaciones && <p className="mb-1"><small><strong>Indicaciones:</strong> {orderDetails.cliente.indicaciones}</small></p>}
                </div>

                {/* Columna Derecha: Items y Total */}
                <div className="col-md-6">
                    <h5>Resumen de Compra</h5>
                    <div className="table-responsive">
                        <table className="table table-sm"> {/* table-sm para tabla más compacta */}
                            <thead><tr><th>Producto</th><th className="text-center">Cant.</th><th className="text-end">Subtotal</th></tr></thead>
                            <tbody>
                                {orderDetails.items?.map(item => (
                                    <tr key={item.id}>
                                        <td><small>{item.nombre}</small></td>
                                        <td className="text-center"><small>{item.cantidad}</small></td>
                                        <td className="text-end"><small>${(item.precio * item.cantidad).toLocaleString('es-CL')}</small></td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr><td colSpan="2" className="text-end border-top pt-2">Subtotal:</td><td className="text-end border-top pt-2">${subtotal.toLocaleString('es-CL')}</td></tr>
                                <tr><td colSpan="2" className="text-end">Envío:</td><td className="text-end">${shippingCost.toLocaleString('es-CL')}</td></tr>
                                <tr className="fw-bold fs-5"><td colSpan="2" className="text-end pt-2">Total Pagado:</td><td className="text-end pt-2">${total.toLocaleString('es-CL')}</td></tr>
                            </tfoot>
                        </table>
                    </div>
                     <p className="text-center text-muted small mt-3">Fecha Orden: {formatDate(orderDetails.fecha)}</p>
                </div>
            </div>

            {/* Botón Seguir Comprando */}
            <div className="text-center mt-4">
                <Link to="/productos" className="btn btn-primary">Seguir Comprando</Link>
            </div>
        </div>
    </div>
  );
}
export default PagoExitoso;