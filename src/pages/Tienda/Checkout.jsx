// src/pages/Tienda/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCart, clearCart, getLoggedInUser, dispatchStorageUpdate, saveOrder, getUsersList } from '../../utils/localStorageHelper';

function Checkout() {
  console.log("Checkout: Componente renderizando..."); // LOG 1: Inicio del render
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', email: '', telefono: '', direccion: '', departamento: '', comuna: '', region: 'Metropolitana de Santiago', indicaciones: '',
    cardNumber: '', cardExpiry: '', cardCvv: '' // Campos tarjeta
  });
  const [loading, setLoading] = useState(true); // Empieza cargando
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Checkout: useEffect ejecutándose..."); // LOG 2: Inicio del useEffect

    const user = getLoggedInUser();
    const cart = getCart();

    // Comprueba si el carrito está vacío
    if (!cart || cart.length === 0) { // Añadida comprobación !cart
      console.log("Checkout: Carrito vacío o inválido, redirigiendo..."); // LOG 3a: Carrito vacío
      // alert('Tu carrito está vacío.'); // Quitado alert
      navigate('/productos');
      // No llamamos a setLoading(false) aquí porque navegamos fuera
      return; // Importante detener la ejecución aquí
    }

    console.log("Checkout: Carrito con items, seteando estado..."); // LOG 3b: Carrito OK
    setCartItems(cart);

    // Pre-rellena datos si el usuario está logueado
    if (user) {
      console.log("Checkout: Usuario logueado, buscando detalles..."); // LOG 4: Usuario logueado
      try {
        const users = getUsersList();
        // Asegurarse de que user.email exista antes de buscar
        const detailedUser = user.email ? users.find(u => u.email === user.email) : null;
        const nameParts = (user.nombre || '').split(' ');
        const nombre = nameParts[0] || '';
        const apellidos = nameParts.slice(1).join(' ') || '';

        setFormData(prev => ({
          ...prev,
          nombre: nombre,
          apellidos: apellidos,
          email: user.email || '',
          telefono: detailedUser?.telefono || '',
          direccion: detailedUser?.direccion || '',
        }));
        console.log("Checkout: Datos de usuario pre-rellenados."); // LOG 5: Datos pre-rellenados
      } catch (error) {
          console.error("Checkout: Error al buscar/procesar datos de usuario:", error); // LOG DE ERROR
          // Si hay un error, continuamos sin pre-rellenar pero quitamos el loading
      }
    } else {
        console.log("Checkout: Usuario no logueado."); // LOG 4b: No logueado
    }

    // Marca la carga como completada <<< ¡Punto Crítico!
    console.log("Checkout: Llamando a setLoading(false)..."); // LOG 6: Antes de quitar carga
    setLoading(false);

  }, [navigate]); // Dependencia: navigate

  // --- El resto del componente ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'cardNumber') { formattedValue = value.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim(); }
    else if (name === 'cardExpiry') { formattedValue = value.replace(/\D/g, '').substring(0, 4); if (formattedValue.length > 2) formattedValue = `${formattedValue.substring(0, 2)}/${formattedValue.substring(2)}`; }
    else if (name === 'cardCvv') { formattedValue = value.replace(/\D/g, '').substring(0, 4); }
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
   };

  const validateForm = () => {
     const newErrors = {};
     if (!formData.nombre.trim()) newErrors.nombre='Nombre requerido.'; if (!formData.apellidos.trim()) newErrors.apellidos='Apellidos requeridos.';
     if (!formData.email.trim()) newErrors.email='Email requerido.'; else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email='Email inválido.';
     if (!formData.direccion.trim()) newErrors.direccion='Dirección requerida.'; if (!formData.comuna.trim()) newErrors.comuna='Comuna requerida.'; if (!formData.region.trim()) newErrors.region='Región requerida.';
     if (formData.telefono && !/^\+?56\s?9\s?\d{8}$/.test(formData.telefono.trim())) newErrors.telefono = 'Formato: +569xxxxxxxx.';
     const rawCardNumber = formData.cardNumber.replace(/\s/g, ''); if (!rawCardNumber) newErrors.cardNumber = 'N° Tarjeta requerido.'; else if (rawCardNumber.length < 13 || rawCardNumber.length > 16) newErrors.cardNumber = 'N° Tarjeta inválido (13-16 dígitos).';
     if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Fecha requerida.'; else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = 'Formato MM/AA inválido.';
     if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV requerido.'; else if (formData.cardCvv.length < 3 || formData.cardCvv.length > 4) newErrors.cardCvv = 'CVV inválido (3-4 dígitos).';
     setErrors(newErrors); return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
     e.preventDefault(); if (!validateForm()) { alert('Corrige los errores.'); return; }
     const sub=cartItems.reduce((s,i)=>s+(i.precioActual||i.precio||0)*i.cantidad,0); const ship=2500; const tot=sub+ship; const exito=Math.random()>0.1;
     if(exito){ const ord={id:`orden_${Date.now()}`,fecha:new Date().toISOString(),cliente:{...formData, nombreCompleto: `${formData.nombre} ${formData.apellidos}`.trim()},items:cartItems.map(i=>({id:i.id,nombre:i.nombre,cantidad:i.cantidad,precioUnitarioPagado:i.precioActual||i.precio||0,precioOriginal:i.precio,precioOferta:i.precioOferta,enOferta:i.enOferta})),envio:ship,total:tot,estado:'Pendiente'}; if(saveOrder(ord)){clearCart();dispatchStorageUpdate();sessionStorage.setItem('lastOrderDetails',JSON.stringify(ord));navigate('/pago-exitoso');}else{alert('Error al guardar.');}}
     else{sessionStorage.setItem('failedOrderDetails',JSON.stringify({...formData,items:cartItems}));navigate('/pago-fallido');}
  };

  const subtotalCalc = cartItems.reduce((s, i) => s + (i.precioActual || i.precio || 0) * (i.cantidad || 0), 0);
  const shipCostCalc = 2500;
  const totalCalc = subtotalCalc + shipCostCalc;
  const formatPrice = (price) => { if(typeof price!=='number'||isNaN(price)) return '$???'; return new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',minimumFractionDigits:0}).format(price); };

  console.log("Checkout: Preparando para retornar JSX. Loading:", loading, "Cart Items:", cartItems); // LOG 7: Antes del return (añadido cartItems)

  if (loading) {
      console.log("Checkout: Retornando mensaje 'Cargando...'"); // LOG 8a: Retorna Cargando
      return <div className="px-md-4 px-3 py-5 text-center">Cargando...</div>;
  }

  // --- Añadida comprobación extra por si el carrito se vació entre renders ---
  if (cartItems.length === 0) {
      console.warn("Checkout: Renderizando, ¡pero el carrito está vacío! Redirigiendo...");
      // navigate('/productos'); // Redirige si inesperadamente está vacío
      return <div className="px-md-4 px-3 py-5 text-center">Tu carrito está vacío. <Link to="/productos">Volver a productos</Link></div>; // O muestra un mensaje
  }
  // --------------------------------------------------------------------

  console.log("Checkout: Retornando JSX principal del formulario."); // LOG 8b: Retorna Formulario
  return (
    <div className="px-md-4 px-3 py-5 bg-light">
       <div className="container bg-white p-4 p-md-5 rounded shadow-sm">
        <h2 className="text-center mb-4 section-title">Finalizar Compra</h2>
        {/* Resumen Carrito Arriba */}
        <div className="table-responsive mb-4 border rounded">
          <table className="table align-middle mb-0">
            <thead className="table-light"><tr><th>Imagen</th><th>Nombre</th><th className="text-end">Precio Unit.</th><th className="text-center">Cant.</th><th className="text-end">Subtotal</th></tr></thead>
            <tbody>
              {cartItems.map(item => { const price = item.precioActual||item.precio||0; return (<tr key={item.id}><td><img src={item.imagen||'./ph.png'} alt={item.nombre} style={{width:'50px',height:'50px',objectFit:'contain'}}/></td><td>{item.nombre}</td><td className="text-end">{formatPrice(price)}</td><td className="text-center">{item.cantidad||1}</td><td className="text-end">{formatPrice(price*(item.cantidad||1))}</td></tr>); })}
            </tbody>
          </table>
        </div>
        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-lg-5 g-md-4 g-3">
            {/* Columna Izquierda: Formularios */}
            <div className="col-lg-7 order-lg-1">
              {/* Info Cliente */}
              <h4 className="mb-3">Información Cliente</h4>
              <div className="row g-3 mb-4">
                <div className="col-md-6"><label htmlFor="nombre">Nombre <span className="text-danger">*</span></label><input type="text" className={`form-control ${errors.nombre?'is-invalid':''}`} id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />{errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}</div>
                <div className="col-md-6"><label htmlFor="apellidos">Apellidos <span className="text-danger">*</span></label><input type="text" className={`form-control ${errors.apellidos?'is-invalid':''}`} id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required />{errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}</div>
                <div className="col-12"><label htmlFor="email">Email <span className="text-danger">*</span></label><input type="email" className={`form-control ${errors.email?'is-invalid':''}`} id="email" name="email" value={formData.email} onChange={handleInputChange} required />{errors.email && <div className="invalid-feedback">{errors.email}</div>}</div>
              </div>
              {/* Dirección */}
              <h4 className="mb-3">Dirección Entrega</h4>
              <div className="row g-3 mb-4">
                <div className="col-md-9"><label htmlFor="direccion">Calle y N° <span className="text-danger">*</span></label><input type="text" className={`form-control ${errors.direccion?'is-invalid':''}`} id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} required />{errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}</div>
                <div className="col-md-3"><label htmlFor="departamento">Depto (Op.)</label><input type="text" className="form-control" id="departamento" name="departamento" value={formData.departamento} onChange={handleInputChange} /></div>
                <div className="col-md-6"><label htmlFor="region">Región <span className="text-danger">*</span></label><select className={`form-select ${errors.region?'is-invalid':''}`} id="region" name="region" value={formData.region} onChange={handleInputChange} required><option value="Metropolitana de Santiago">Metropolitana</option><option value="Valparaíso">Valparaíso</option><option value="Biobío">Biobío</option></select>{errors.region && <div className="invalid-feedback">{errors.region}</div>}</div>
                <div className="col-md-6"><label htmlFor="comuna">Comuna <span className="text-danger">*</span></label><input type="text" className={`form-control ${errors.comuna?'is-invalid':''}`} id="comuna" name="comuna" value={formData.comuna} onChange={handleInputChange} required />{errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}</div>
                <div className="col-12"><label htmlFor="indicaciones">Indicaciones (Op.)</label><textarea className="form-control" id="indicaciones" name="indicaciones" rows="2" value={formData.indicaciones} onChange={handleInputChange}></textarea></div>
              </div>
              {/* Pago */}
              <h4 className="mb-3">Pago (Simulado)</h4>
              <div className="row g-3">
                <div className="col-12"><label htmlFor="cardNumber">N° Tarjeta <span className="text-danger">*</span></label><input type="text" inputMode="numeric" className={`form-control ${errors.cardNumber?'is-invalid':''}`} id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" maxLength="19" required />{errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}</div>
                <div className="col-md-6"><label htmlFor="cardExpiry">Exp (MM/AA) <span className="text-danger">*</span></label><input type="text" inputMode="numeric" className={`form-control ${errors.cardExpiry?'is-invalid':''}`} id="cardExpiry" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/AA" maxLength="5" required />{errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}</div>
                <div className="col-md-6"><label htmlFor="cardCvv">CVV <span className="text-danger">*</span></label><input type="text" inputMode="numeric" className={`form-control ${errors.cardCvv?'is-invalid':''}`} id="cardCvv" name="cardCvv" value={formData.cardCvv} onChange={handleInputChange} placeholder="123" maxLength="4" required />{errors.cardCvv && <div className="invalid-feedback">{errors.cardCvv}</div>}</div>
              </div>
            </div>
            {/* Columna Derecha: Total y Pagar */}
            <div className="col-lg-5 order-lg-2">
              <div className="card shadow-sm">
                <div className="card-header"><h5>Total a Pagar</h5></div>
                <div className="card-body">
                  <div className="d-flex justify-content-between"><span>Subtotal Prod.:</span><span>{formatPrice(subtotalCalc)}</span></div>
                  <div className="d-flex justify-content-between mb-3"><span>Envío:</span><span>{formatPrice(shipCostCalc)}</span></div> <hr/>
                  <div className="d-flex justify-content-between fw-bold fs-4 mb-4"><span>Total:</span><span>{formatPrice(totalCalc)}</span></div>
                  <button type="submit" className="btn btn-primary btn-lg w-100">Pagar Ahora {formatPrice(totalCalc)}</button>
                  <div className="text-center mt-3"><Link to="/carrito" className="btn btn-sm btn-outline-secondary">← Volver al Carrito</Link></div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Checkout;