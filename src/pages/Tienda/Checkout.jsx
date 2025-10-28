// src/pages/Tienda/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCart, clearCart, getLoggedInUser, dispatchStorageUpdate } from '../../utils/localStorageHelper';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '', email: '', telefono: '', direccion: '', comuna: '', region: 'Metropolitana de Santiago', indicaciones: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getLoggedInUser();
    const cart = getCart();
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      navigate('/productos'); // Redirige si no hay carrito
      return;
    }
    setCartItems(cart);

    if (user) {
      // Pre-rellena el formulario si el usuario está logueado
      // Busca datos adicionales si están guardados en la lista de usuarios
       const users = getUsersList(); // Necesitarás importar getUsersList
       const detailedUser = users.find(u => u.email === user.email);
       setFormData(prev => ({
         ...prev,
         nombre: user.nombre || '',
         email: user.email || '',
         telefono: detailedUser?.telefono || '', // Usa ? por si no lo encuentra
         direccion: detailedUser?.direccion || '', // Ajusta esto si 'direccion' en user es la región
       }));
    }
    setLoading(false);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple
    if (!formData.nombre || !formData.email || !formData.direccion || !formData.comuna) {
      alert('Por favor completa Nombre, Email, Dirección y Comuna.');
      return;
    }

    // Simular el proceso de pago
    console.log('Datos de envío:', formData);
    console.log('Carrito:', cartItems);

    // Simular éxito/error aleatorio
    const exito = Math.random() > 0.2; // 80% de éxito

    if (exito) {
      clearCart(); // Limpia el carrito
      dispatchStorageUpdate(); // Actualiza el contador
      // Guarda los datos de envío en sessionStorage para mostrar en la página de éxito
      sessionStorage.setItem('lastOrderDetails', JSON.stringify({ ...formData, items: cartItems }));
      navigate('/pago-exitoso');
    } else {
      // Guarda los datos para reintentar
      sessionStorage.setItem('failedOrderDetails', JSON.stringify({ ...formData, items: cartItems }));
      navigate('/pago-fallido');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  // Asumimos envío estándar fijo aquí, podrías traerlo del carrito si lo guardaste
  const shippingCost = 2500;
  const total = subtotal + shippingCost;

  if (loading) return <div className="px-md-4 px-3 py-5 text-center">Cargando checkout...</div>;

  return (
    // Sin container, con padding
    <div className="px-md-4 px-3 py-5">
      <h2 className="text-center mb-4 section-title">Finalizar Compra</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Columna Formulario de Envío */}
          <div className="col-lg-7">
            <h4>Información de Contacto y Envío</h4>
            <hr/>
            <div className="row g-3">
              <div className="col-md-6"><label htmlFor="nombre" className="form-label">Nombre</label><input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required /></div>
              <div className="col-md-6"><label htmlFor="email" className="form-label">Email</label><input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
              <div className="col-md-6"><label htmlFor="telefono" className="form-label">Teléfono</label><input type="tel" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="+569..." /></div>
              <div className="col-12"><label htmlFor="direccion" className="form-label">Dirección (Calle y Número)</label><input type="text" className="form-control" id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} required /></div>
              <div className="col-md-6"><label htmlFor="comuna" className="form-label">Comuna</label><input type="text" className="form-control" id="comuna" name="comuna" value={formData.comuna} onChange={handleInputChange} required /></div>
              <div className="col-md-6"><label htmlFor="region" className="form-label">Región</label><input type="text" className="form-control" id="region" name="region" value={formData.region} onChange={handleInputChange} required /></div>
              <div className="col-12"><label htmlFor="indicaciones" className="form-label">Indicaciones Adicionales (Opcional)</label><textarea className="form-control" id="indicaciones" name="indicaciones" rows="2" value={formData.indicaciones} onChange={handleInputChange}></textarea></div>
            </div>
          </div>

          {/* Columna Resumen del Carrito */}
          <div className="col-lg-5">
            <h4>Resumen del Pedido</h4>
            <hr/>
            <div className="card shadow-sm">
              <div className="card-body">
                {cartItems.map(item => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <img src={item.imagen || './placeholder.png'} alt={item.nombre} style={{ width: '40px', height: '40px', objectFit: 'contain', marginRight: '10px' }} />
                      <span className="small">{item.nombre} x {item.cantidad}</span>
                    </div>
                    <span className="small">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                  </div>
                ))}
                <hr/>
                <div className="d-flex justify-content-between"><span>Subtotal:</span><span>${subtotal.toLocaleString('es-CL')}</span></div>
                <div className="d-flex justify-content-between"><span>Envío:</span><span>${shippingCost.toLocaleString('es-CL')}</span></div>
                <hr/>
                <div className="d-flex justify-content-between fw-bold fs-5"><span>Total:</span><span>${total.toLocaleString('es-CL')}</span></div>
                <button type="submit" className="btn btn-primary w-100 mt-4">Pagar ${total.toLocaleString('es-CL')}</button>
              </div>
            </div>
             <div className="text-center mt-3">
                 <Link to="/carrito" className="btn btn-sm btn-outline-secondary">← Volver al Carrito</Link>
             </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// Necesitas importar getUsersList de localStorageHelper si lo usas para pre-rellenar
import { getUsersList } from '../../utils/localStorageHelper';

export default Checkout;