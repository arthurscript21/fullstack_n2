// src/pages/Tienda/PagoFallido.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PagoFallido() {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const details = sessionStorage.getItem('failedOrderDetails');
    if (details) { setOrderDetails(JSON.parse(details)); }
    // No limpiamos sessionStorage aquí para permitir reintentar
  }, []);

  const handleRetry = () => { navigate('/checkout'); }; // Vuelve a la página de checkout

  // Cálculos de totales (igual que en Checkout)
  const subtotal = orderDetails?.items.reduce((sum, item) => sum + item.precio * item.cantidad, 0) || 0;
  const shippingCost = 2500; // Asume estándar
  const total = subtotal + shippingCost;

  return (
    // Sin container global, con padding
    <div className="px-md-4 px-3 py-5 bg-light">
        <div className="container bg-white p-4 p-md-5 rounded shadow-sm">

            {/* Mensaje de Error */}
            <div className="alert alert-danger text-center">
                <h2><i className="bi bi-x-circle-fill me-2"></i> Error en el Pago</h2>
                <p className="lead mb-1">No se pudo procesar tu pago.</p>
                <p className="small">Orden Nro: #{orderDetails?.id?.substring(orderDetails.id.lastIndexOf('_') + 1) || 'N/A'}</p>
                 {/* Mensaje más detallado si es posible */}
                 {/* <p>Razón: Fondos insuficientes / Error de conexión (simulado).</p> */}
            </div>

             {/* Botón Reintentar */}
             <div className="text-center my-4">
                 <button onClick={handleRetry} className="btn btn-warning btn-lg me-2">
                     <i className="bi bi-arrow-clockwise me-2"></i> Volver a Intentar el Pago
                 </button>
             </div>

            {/* Resumen del Pedido Fallido (similar a Figura 8) */}
            {orderDetails && (
                <div className="border rounded p-3 mt-4">
                    <h5 className="mb-3">Detalles del Intento de Compra:</h5>
                     {/* Mostramos datos cliente y dirección resumidos */}
                     <div className="row mb-3">
                         <div className="col-md-6">
                            <p className="mb-1"><small><strong>Cliente:</strong> {orderDetails.cliente?.nombreCompleto || `${orderDetails.cliente?.nombre} ${orderDetails.cliente?.apellidos}`}</small></p>
                            <p className="mb-1"><small><strong>Email:</strong> {orderDetails.cliente?.email}</small></p>
                         </div>
                          <div className="col-md-6">
                            <p className="mb-1"><small><strong>Dirección:</strong> {orderDetails.cliente?.direccion}</small></p>
                            <p className="mb-1"><small>{orderDetails.cliente?.comuna}, {orderDetails.cliente?.region}</small></p>
                         </div>
                     </div>

                    <div className="table-responsive">
                        <table className="table table-sm table-striped"> {/* Con stripes */}
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
                                <tr><td colSpan="2" className="text-end pt-2">Subtotal:</td><td className="text-end pt-2">${subtotal.toLocaleString('es-CL')}</td></tr>
                                <tr><td colSpan="2" className="text-end">Envío:</td><td className="text-end">${shippingCost.toLocaleString('es-CL')}</td></tr>
                                <tr className="fw-bold fs-5"><td colSpan="2" className="text-end pt-2">Total:</td><td className="text-end pt-2">${total.toLocaleString('es-CL')}</td></tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}

            {/* Opciones Adicionales */}
            <div className="text-center mt-4">
                <Link to="/contacto" className="btn btn-outline-secondary btn-sm">Contactar Soporte</Link>
            </div>
        </div>
    </div>
  );
}
export default PagoFallido;