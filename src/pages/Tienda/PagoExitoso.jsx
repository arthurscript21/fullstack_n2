// src/pages/Tienda/PagoExitoso.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PagoExitoso() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Recupera los detalles del pedido de sessionStorage
    const details = sessionStorage.getItem('lastOrderDetails');
    if (details) {
      setOrderDetails(JSON.parse(details));
      sessionStorage.removeItem('lastOrderDetails'); // Limpia para no mostrarlo de nuevo
    }
    // Si no hay detalles, podría redirigir o mostrar un mensaje genérico
  }, []);

  if (!orderDetails) {
    return (
      <div className="px-md-4 px-3 py-5 text-center">
        <h2>¡Compra Realizada!</h2>
        <p>Tu pedido ha sido procesado con éxito.</p>
        <Link to="/productos" className="btn btn-primary mt-3">Seguir Comprando</Link>
      </div>
    );
  }

  // Calcula el total para mostrarlo (asumiendo envío estándar)
  const subtotal = orderDetails.items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const shippingCost = 2500;
  const total = subtotal + shippingCost;

  return (
    // Sin container, con padding
    <div className="px-md-4 px-3 py-5">
      <div className="alert alert-success text-center">
        <h2><i className="bi bi-check-circle-fill"></i> ¡Pago Exitoso!</h2>
        <p className="lead">Gracias por tu compra, {orderDetails.nombre}.</p>
        <p>Recibirás una confirmación en {orderDetails.email}.</p>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-lg-8">
          <h4>Resumen del Pedido</h4>
          <div className="card">
            <div className="card-body">
              <p><strong>Enviado a:</strong> {orderDetails.direccion}, {orderDetails.comuna}, {orderDetails.region}</p>
              {orderDetails.indicaciones && <p><strong>Indicaciones:</strong> {orderDetails.indicaciones}</p>}
              <hr/>
              <h5 className="mb-3">Productos:</h5>
              {orderDetails.items.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                   <div className="d-flex align-items-center">
                      <img src={item.imagen || './placeholder.png'} alt={item.nombre} style={{ width: '30px', height: '30px', objectFit: 'contain', marginRight: '8px' }} />
                      <span className="small">{item.nombre} x {item.cantidad}</span>
                   </div>
                   <span className="small">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                </div>
              ))}
              <hr/>
               <div className="d-flex justify-content-between"><span>Subtotal:</span><span>${subtotal.toLocaleString('es-CL')}</span></div>
               <div className="d-flex justify-content-between"><span>Envío:</span><span>${shippingCost.toLocaleString('es-CL')}</span></div>
               <hr/>
               <div className="d-flex justify-content-between fw-bold fs-5"><span>Total Pagado:</span><span>${total.toLocaleString('es-CL')}</span></div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-primary">Seguir Comprando</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoExitoso;