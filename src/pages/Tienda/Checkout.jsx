// src/pages/Tienda/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCart, clearCart, getLoggedInUser, dispatchStorageUpdate, saveOrder, getUsersList } from '../../utils/localStorageHelper';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', direccion: '', comuna: '', region: 'Metropolitana de Santiago', indicaciones: '' });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
     const user = getLoggedInUser(); const cart = getCart();
     if (cart.length === 0) { navigate('/productos'); return; } setCartItems(cart);
     if (user) {
         const users = getUsersList(); const detailedUser = users.find(u => u.email === user.email);
         setFormData(prev => ({ ...prev, nombre: user.nombre || '', email: user.email || '', telefono: detailedUser?.telefono || '', direccion: detailedUser?.direccion || '', }));
     } setLoading(false);
  }, [navigate]);

  const handleInputChange = (e) => { const {name,value}=e.target; setFormData(p=>({...p,[name]:value})); if(errors[name]){setErrors(p=>({...p,[name]:null}));} };
  const validateForm = () => {
     const newErrors = {}; if (!formData.nombre.trim()) newErrors.nombre='Nombre requerido.'; if (!formData.email.trim()) newErrors.email='Email requerido.'; else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email='Email inválido.'; if (!formData.direccion.trim()) newErrors.direccion='Dirección requerida.'; if (!formData.comuna.trim()) newErrors.comuna='Comuna requerida.'; setErrors(newErrors); return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
     e.preventDefault(); if (!validateForm()) { alert('Corrige los errores.'); return; }
     const sub=cartItems.reduce((s,i)=>s+i.precio*i.cantidad,0); const ship=2500; const tot=sub+ship; const exito=Math.random()>0.1; // 90% éxito
     if(exito){ const ord={id:`orden_${Date.now()}`,fecha:new Date().toISOString(),cliente:{...formData},items:cartItems.map(i=>({id:i.id,nombre:i.nombre,cantidad:i.cantidad,precio:i.precio})),envio:ship,total:tot,estado:'Pendiente'}; if(saveOrder(ord)){clearCart();dispatchStorageUpdate();sessionStorage.setItem('lastOrderDetails',JSON.stringify(ord));navigate('/pago-exitoso');}else{alert('Error al guardar.');}}
     else{sessionStorage.setItem('failedOrderDetails',JSON.stringify({...formData,items:cartItems}));navigate('/pago-fallido');}
  };

  const subtotalCalc = cartItems.reduce((s, i) => s + i.precio * i.cantidad, 0); const shipCostCalc = 2500; const totalCalc = subtotalCalc + shipCostCalc;
  if (loading) return <div className="px-md-4 px-3 py-5 text-center">Cargando...</div>;

  return (
    // Usa padding
    <div className="px-md-4 px-3 py-5">
      <h2 className="text-center mb-4 section-title">Finalizar Compra</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-lg-5 g-md-4 g-3">
          {/* Columna Formulario */}
          <div className="col-lg-7 order-lg-1">
            <h4>Información de Contacto y Envío</h4> <hr className="mb-4"/>
            <div className="row g-3">
              {/* Campos con validación */}
              <div className="col-md-6"><label htmlFor="nombre" className="form-label">Nombre <span className="text-danger">*</span></label><input type="text" className={`form-control ${errors.nombre ? 'is-invalid':''}`} id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />{errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}</div>
              <div className="col-md-6"><label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label><input type="email" className={`form-control ${errors.email ? 'is-invalid':''}`} id="email" name="email" value={formData.email} onChange={handleInputChange} required />{errors.email && <div className="invalid-feedback">{errors.email}</div>}</div>
              <div className="col-md-6"><label htmlFor="telefono" className="form-label">Teléfono</label><input type="tel" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} /></div>
              <div className="col-12"><label htmlFor="direccion" className="form-label">Dirección <span className="text-danger">*</span></label><input type="text" className={`form-control ${errors.direccion ? 'is-invalid':''}`} id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} required />{errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}</div>
              <div className="col-md-6"><label htmlFor="comuna" className="form-label">Comuna <span className="text-danger">*</span></label><input type="text" className={`form-control ${errors.comuna ? 'is-invalid':''}`} id="comuna" name="comuna" value={formData.comuna} onChange={handleInputChange} required />{errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}</div>
              <div className="col-md-6"><label htmlFor="region" className="form-label">Región</label><input type="text" className="form-control" id="region" name="region" value={formData.region} onChange={handleInputChange} required /></div>
              <div className="col-12"><label htmlFor="indicaciones" className="form-label">Indicaciones (Op.)</label><textarea className="form-control" id="indicaciones" name="indicaciones" rows="2" value={formData.indicaciones} onChange={handleInputChange}></textarea></div>
            </div>
          </div>
          {/* Columna Resumen */}
          <div className="col-lg-5 order-lg-2">
            <h4>Resumen del Pedido</h4> <hr className="mb-4"/>
            <div className="card shadow-sm sticky-top" style={{top:'20px'}}><div className="card-body">
              {cartItems.map(item => ( <div key={item.id} className="d-flex justify-content-between align-items-center mb-2"><div className="d-flex align-items-center"><img src={item.imagen||'./ph.png'} alt={item.nombre} style={{width:'40px',height:'40px',objectFit:'contain',marginRight:'10px'}}/> <span className="small">{item.nombre} x {item.cantidad}</span></div> <span className="small">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span></div> ))} <hr/>
              <div className="d-flex justify-content-between"><span>Subtotal:</span><span>${subtotalCalc.toLocaleString('es-CL')}</span></div>
              <div className="d-flex justify-content-between"><span>Envío:</span><span>${shipCostCalc.toLocaleString('es-CL')}</span></div> <hr/>
              <div className="d-flex justify-content-between fw-bold fs-5"><span>Total:</span><span>${totalCalc.toLocaleString('es-CL')}</span></div>
              <button type="submit" className="btn btn-primary w-100 mt-4">Pagar ${totalCalc.toLocaleString('es-CL')}</button>
            </div></div>
            <div className="text-center mt-3"><Link to="/carrito" className="btn btn-sm btn-outline-secondary">← Volver al Carrito</Link></div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Checkout;