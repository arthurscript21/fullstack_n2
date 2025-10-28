// src/pages/Tienda/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCart, clearCart, getLoggedInUser, dispatchStorageUpdate, saveOrder, getUsersList } from '../../utils/localStorageHelper';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', apellidos: '', email: '', telefono: '', direccion: '', departamento: '', comuna: '', region: 'Metropolitana de Santiago', indicaciones: '', cardNumber: '', cardExpiry: '', cardCvv: '' });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
     const user = getLoggedInUser(); const cart = getCart();
     if (cart.length === 0) { navigate('/productos'); return; } setCartItems(cart);
     if (user) {
         const users = getUsersList(); const detailedUser = users.find(u => u.email === user.email);
         const nameParts = (user.nombre || '').split(' '); const nombre = nameParts[0] || ''; const apellidos = nameParts.slice(1).join(' ') || '';
         // Pre-rellena datos si el usuario está logueado
         setFormData(prev => ({ ...prev, nombre: nombre, apellidos: apellidos, email: user.email || '', telefono: detailedUser?.telefono || '', direccion: detailedUser?.direccion || '', /* Podrías añadir comuna/region si los guardas */ }));
     } setLoading(false);
     // Nota: Como dice el PDF, si el usuario inició sesión, los datos se añaden automáticamente
  }, [navigate]);

  const handleInputChange = (e) => { /* ... (igual que antes) ... */ const {name,value}=e.target; let v=value; if(name==='cardNumber'){v=value.replace(/\D/g,'').substring(0,16).replace(/(.{4})/g,'$1 ').trim();} else if(name==='cardExpiry'){v=value.replace(/\D/g,'').substring(0,4); if(v.length>2) v=`${v.substring(0,2)}/${v.substring(2)}`;} else if(name==='cardCvv'){v=value.replace(/\D/g,'').substring(0,4);} setFormData(p=>({...p,[name]:v})); if(errors[name])setErrors(p=>({...p,[name]:null})); };
  const validateForm = () => { /* ... (validación igual que antes) ... */ const e={}; if(!formData.nombre.trim())e.nombre='Nombre req.'; if(!formData.apellidos.trim())e.apellidos='Apellidos req.'; if(!formData.email.trim())e.email='Email req.'; else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))e.email='Email inválido.'; if(!formData.direccion.trim())e.direccion='Dirección req.'; if(!formData.comuna.trim())e.comuna='Comuna req.'; if(!formData.region.trim())e.region='Región req.'; if(formData.telefono&&!/^\+?56\s?9\s?\d{8}$/.test(formData.telefono.trim()))e.telefono='Formato: +569xxxxxxxx.'; const cn=formData.cardNumber.replace(/\s/g,''); if(!cn)e.cardNumber='N° Tarjeta req.'; else if(cn.length<13||cn.length>16)e.cardNumber='N° Tarjeta inválido.'; if(!formData.cardExpiry.trim())e.cardExpiry='Fecha req.'; else if(!/^\d{2}\/\d{2}$/.test(formData.cardExpiry))e.cardExpiry='Formato MM/AA.'; if(!formData.cardCvv.trim())e.cardCvv='CVV req.'; else if(formData.cardCvv.length<3||formData.cardCvv.length>4)e.cardCvv='CVV inválido.'; setErrors(e); return Object.keys(e).length===0; };
  const handleSubmit = (e) => { /* ... (lógica de submit igual que antes) ... */
     e.preventDefault(); if (!validateForm()) { alert('Corrige los errores.'); return; }
     const sub=cartItems.reduce((s,i)=>s+i.precio*i.cantidad,0); const ship=2500; const tot=sub+ship; const exito=Math.random()>0.1;
     if(exito){ const ord={id:`orden_${Date.now()}`,fecha:new Date().toISOString(),cliente:{...formData, nombreCompleto: `${formData.nombre} ${formData.apellidos}`.trim()},items:cartItems.map(i=>({id:i.id,nombre:i.nombre,cantidad:i.cantidad,precio:i.precio})),envio:ship,total:tot,estado:'Pendiente'}; if(saveOrder(ord)){clearCart();dispatchStorageUpdate();sessionStorage.setItem('lastOrderDetails',JSON.stringify(ord));navigate('/pago-exitoso');}else{alert('Error al guardar.');}}
     else{sessionStorage.setItem('failedOrderDetails',JSON.stringify({...formData,items:cartItems}));navigate('/pago-fallido');}
  };

  const subtotalCalc = cartItems.reduce((s, i) => s + i.precio * i.cantidad, 0); const shipCostCalc = 2500; const totalCalc = subtotalCalc + shipCostCalc;
  if (loading) return <div className="px-md-4 px-3 py-5 text-center">Cargando...</div>;

  return (
    // Sin container global, con padding
    <div className="px-md-4 px-3 py-5 bg-light"> {/* Fondo claro como en Figura 6 */}
      {/* Container interno para centrar el contenido principal */}
      <div className="container bg-white p-4 p-md-5 rounded shadow-sm"> {/* Fondo blanco y sombra */}
        <h2 className="text-center mb-4 section-title">Carrito de Compra</h2>
        <p className="text-center text-muted mb-4">Completa la siguiente información</p>

        {/* --- Resumen del Carrito Arriba (Tabla) --- */}
        <div className="table-responsive mb-4 border rounded">
          <table className="table align-middle mb-0"> {/* align-middle para centrar verticalmente */}
            <thead className="table-light">
              <tr>
                <th style={{ width: '10%' }}>Imagen</th>
                <th>Nombre</th>
                <th className="text-end">Precio</th>
                <th className="text-center" style={{ minWidth: '80px' }}>Cantidad</th> {/* Ancho mínimo */}
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td><img src={item.imagen || './ph.png'} alt={item.nombre} style={{ width: '50px', height: '50px', objectFit: 'contain' }}/></td>
                  <td>{item.nombre}</td>
                  <td className="text-end">${(item.precio || 0).toLocaleString('es-CL')}</td>
                  <td className="text-center">{item.cantidad || 1}</td>
                  <td className="text-end">${((item.precio || 0) * (item.cantidad || 1)).toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
            {/* Pie de tabla opcional con subtotal si quieres */}
             {/* <tfoot className="table-light">
                 <tr>
                    <td colSpan="4" className="text-end fw-bold">Subtotal Carrito:</td>
                    <td className="text-end fw-bold">${subtotalCalc.toLocaleString('es-CL')}</td>
                 </tr>
             </tfoot> */}
          </table>
        </div>
        {/* --- Fin Resumen Carrito --- */}

        <form onSubmit={handleSubmit} noValidate>
          {/* Fila principal para dividir formulario y total */}
          <div className="row g-lg-5 g-md-4 g-3">
            {/* Columna Izquierda: Formularios */}
            <div className="col-lg-8">
              {/* Información Cliente */}
              <h4 className="mb-3">Información del Cliente</h4>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label htmlFor="nombre">Nombre <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${errors.nombre?'is-invalid':''}`} id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellidos">Apellidos <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${errors.apellidos?'is-invalid':''}`} id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required />
                  {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
                </div>
                <div className="col-12"> {/* Email ocupa todo el ancho */}
                  <label htmlFor="email">Email <span className="text-danger">*</span></label>
                  <input type="email" className={`form-control ${errors.email?'is-invalid':''}`} id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                {/* <div className="col-md-6"><label htmlFor="telefono">Teléfono</label><input type="tel" className={`form-control ${errors.telefono?'is-invalid':''}`} id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="+569xxxxxxxx"/>{errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}</div> */}
              </div>

              {/* Dirección Entrega */}
              <h4 className="mb-3">Dirección de Entrega</h4>
              <div className="row g-3 mb-4">
                <div className="col-md-9"> {/* Calle más ancha */}
                   <label htmlFor="direccion">Calle y Número <span className="text-danger">*</span></label>
                   <input type="text" className={`form-control ${errors.direccion?'is-invalid':''}`} id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} required />
                   {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                </div>
                <div className="col-md-3">
                   <label htmlFor="departamento">Depto (Op.)</label>
                   <input type="text" className="form-control" id="departamento" name="departamento" value={formData.departamento} onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                   <label htmlFor="region">Región <span className="text-danger">*</span></label>
                   {/* Convertido a Select como en Figura 6 */}
                   <select className={`form-select ${errors.region?'is-invalid':''}`} id="region" name="region" value={formData.region} onChange={handleInputChange} required>
                       <option value="Metropolitana de Santiago">Metropolitana de Santiago</option>
                       {/* Añade más regiones si es necesario */}
                       <option value="Valparaíso">Valparaíso</option>
                       <option value="Biobío">Biobío</option>
                       {/* ... */}
                   </select>
                   {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                </div>
                 <div className="col-md-6">
                   <label htmlFor="comuna">Comuna <span className="text-danger">*</span></label>
                   {/* Convertido a Select como en Figura 6 - requiere lógica o lista */}
                   <input type="text" className={`form-control ${errors.comuna?'is-invalid':''}`} id="comuna" name="comuna" value={formData.comuna} onChange={handleInputChange} placeholder="Ej: Cerrillos" required />
                   {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
                 </div>
                <div className="col-12">
                   <label htmlFor="indicaciones">Indicaciones (Op.)</label>
                   <textarea className="form-control" id="indicaciones" name="indicaciones" rows="2" value={formData.indicaciones} onChange={handleInputChange} placeholder="Ej: Entre calles..., color del edificio..."></textarea>
                </div>
              </div>

              {/* Información de Pago */}
              <h4 className="mb-3">Información de Pago (Simulado)</h4>
               <div className="row g-3">
                 <div className="col-12"><label htmlFor="cardNumber">N° Tarjeta <span className="text-danger">*</span></label><input type="text" inputMode="numeric" className={`form-control ${errors.cardNumber?'is-invalid':''}`} id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" maxLength="19" required />{errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}</div>
                 <div className="col-md-6"><label htmlFor="cardExpiry">Exp (MM/AA) <span className="text-danger">*</span></label><input type="text" inputMode="numeric" className={`form-control ${errors.cardExpiry?'is-invalid':''}`} id="cardExpiry" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/AA" maxLength="5" required />{errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}</div>
                 <div className="col-md-6"><label htmlFor="cardCvv">CVV <span className="text-danger">*</span></label><input type="text" inputMode="numeric" className={`form-control ${errors.cardCvv?'is-invalid':''}`} id="cardCvv" name="cardCvv" value={formData.cardCvv} onChange={handleInputChange} placeholder="123" maxLength="4" required />{errors.cardCvv && <div className="invalid-feedback">{errors.cardCvv}</div>}</div>
               </div>
               <p className="small text-muted mt-3">Nota: Datos simulados.</p>

            </div> {/* Fin columna izquierda */}

            {/* Columna Derecha: Total y Pagar */}
            <div className="col-lg-5">
              {/* Usamos una alerta azul para el total como en Figura 6 */}
              <div className="alert alert-primary text-center" role="alert">
                  <h4 className="alert-heading">Total a Pagar</h4>
                  <p className="display-6 fw-bold mb-0">${totalCalc.toLocaleString('es-CL')}</p>
              </div>

              {/* Botón Pagar */}
              <div className="d-grid gap-2"> {/* d-grid para botón ancho */}
                  <button type="submit" className="btn btn-primary btn-lg"> {/* Botón más grande */}
                      Pagar Ahora ${totalCalc.toLocaleString('es-CL')}
                  </button>
                  <Link to="/carrito" className="btn btn-outline-secondary">← Volver al Carrito</Link>
              </div>
            </div> {/* Fin columna derecha */}
          </div> {/* Fin row principal */}
        </form>
      </div> {/* Fin container interno */}
    </div> // Fin div principal
  );
}
export default Checkout;