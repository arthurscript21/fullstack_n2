// src/pages/Tienda/PagoFallido.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PagoFallido() {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Recupera los detalles del pedido fallido de sessionStorage
    const details = sessionStorage.getItem('failedOrderDetails');
    if (details) {
      setOrderDetails(JSON.parse(details));
      // No lo removemos para que pueda reintentar
    }
  }, []);

  const handleRetry = () => {
    // Podrías redirigir de nuevo al checkout o a una página de reintento
    // Por simplicidad, volvemos al carrito
    navigate('/carrito');
  };

   // Calcula el total para mostrarlo (asumiendo envío estándar)
   const subtotal = orderDetails?.items.reduce((sum, item) => sum + item.precio * item.cantidad, 0) || 0;
   const shippingCost = 2500;
   const total = subtotal + shippingCost;


  return (
    // Sin container, con padding
    <div className="px-md-4 px-3 py-5">
      <div className="alert alert-danger text-center">
        <h2><i className="bi bi-x-circle-fill"></i> Error en el Pago</h2>
        <p className="lead">No se pudo procesar tu pago.</p>
        <p>Por favor, revisa tus datos o intenta con otro método.</p>
      </div>

      {orderDetails && (
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8">
            <h4>Detalles del Pedido</h4>
            <div className="card">
              <div className="card-body">
                <p><strong>Intento de envío a:</strong> {orderDetails.direccion}, {orderDetails.comuna}</p>
                 <hr/>
                 <h5 className="mb-3">Productos:</h5>
                 {orderDetails.items.map(item => (
                   <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                     <span className="small">{item.nombre} x {item.cantidad}</span>
                     <span className="small">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                   </div>
                 ))}
                 <hr/>
                 <div className="d-flex justify-content-between fw-bold fs-5"><span>Total:</span><span>${total.toLocaleString('es-CL')}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <button onClick={handleRetry} className="btn btn-warning me-2">
          Volver al Carrito e Intentar de Nuevo
        </button>
        <Link to="/contacto" className="btn btn-outline-secondary">Contactar Soporte</Link>
      </div>
    </div>
  );
}

export default PagoFallido;