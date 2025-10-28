// src/pages/Tienda/DetalleProducto.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCart, saveCart, getLoggedInUser, dispatchStorageUpdate } from '../../utils/localStorageHelper';
import { getProductById, obtenerNombreCategoria } from "../../data/products.js";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // Inicia como null
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = getProductById(id);
    setProduct(foundProduct); // Puede ser null si no lo encuentra
    setLoading(false);
    setQuantity(1);
  }, [id]);

  const formatPrice = (price) => { /* ... (igual) ... */ if(typeof price!=='number'||isNaN(price)) return '$???'; return new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',minimumFractionDigits:0}).format(price); };
  const handleQuantityChange = (event) => { /* ... (igual) ... */ let v=parseInt(event.target.value); if(isNaN(v)||v<1) v=1; else if(product&&v>product.stock){v=product.stock; alert(`Stock: ${product.stock}`);} setQuantity(v); };
  const handleAddToCart = () => { /* ... (igual, ya usa product && ...) ... */ if(!getLoggedInUser()){alert('Debes iniciar sesión'); navigate(`/login?redirect=/productos/${id}`); return;} if(!product) return; let cart = getCart(); const idx=cart.findIndex(i=>i.id===product.id); const isOnSale=product&&product.enOferta===true&&typeof product.precioOferta==='number'; const priceToAdd=isOnSale?product.precioOferta:product.precio; if(idx>-1){const current=cart[idx]; const nq=(current.cantidad||0)+quantity; current.precioActual=priceToAdd; if(nq>product.stock){alert(`No puedes añadir más...`); current.cantidad=product.stock;}else{current.cantidad=nq;}}else{cart.push({id:product.id,nombre:product.nombre,precio:product.precio,precioOferta:product.precioOferta,enOferta:product.enOferta,precioActual:priceToAdd,imagen:product.imagen,cantidad:quantity});} saveCart(cart); dispatchStorageUpdate(); alert(`${quantity} ${product.nombre} agregado(s)!`); };


  // Mensajes de Carga y Producto No Encontrado (ya comprueban !product)
  if (loading) { return <div className="px-md-4 px-3 py-5 text-center">Cargando...</div>; }
  if (!product) {
    return (
      <div className="px-md-4 px-3 py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p>El producto con ID "{id}" no existe o fue removido.</p>
        <Link to="/productos" className="btn btn-primary">Volver a Productos</Link>
      </div>
    );
  }

  // --- COMPROBACIÓN AÑADIDA AQUÍ ---
  // Verifica si product existe ANTES de leer sus propiedades
  const isProductOnSale = product && product.enOferta === true && typeof product.precioOferta === 'number';
  // ----------------------------------

  return (
    // Sin container, con padding
    <div className="px-md-4 px-3 py-5">
      <div className="row">
        {/* Columna Imágenes (sin cambios) */}
        <div className="col-md-6 mb-4 mb-md-0">{/* ... Carousel ... */}
            <div id="productCarousel" className="carousel slide" data-bs-ride="carousel"><div className="carousel-inner rounded border">
                {product.imagenes && product.imagenes.length > 0 ? ( product.imagenes.map((img, index) => ( <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}><img src={img} className="d-block w-100" alt={`${product.nombre} ${index+1}`} style={{height:'400px', objectFit:'contain'}}/></div> )) ) : ( <div className="carousel-item active"><img src={product.imagen || 'https://via.placeholder.com/600x400?text=No+Imagen'} className="d-block w-100" alt={product.nombre} style={{height:'400px', objectFit:'contain'}}/></div> )}
            </div>{product.imagenes && product.imagenes.length > 1 && (<> <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true" style={{filter:'invert(1)'}}></span><span className="visually-hidden">Anterior</span></button> <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next"><span className="carousel-control-next-icon" aria-hidden="true" style={{filter:'invert(1)'}}></span><span className="visually-hidden">Siguiente</span></button> </>)}</div>
        </div>

        {/* Columna Detalles */}
        <div className="col-md-6">
          <h2>{product.nombre}</h2>

          {/* Muestra precios (ya usa isProductOnSale que ahora es seguro) */}
          {isProductOnSale ? (
            <div className="mb-3">
              <span className="product-price fs-4 fw-bold text-danger me-2">{formatPrice(product.precioOferta)}</span>
              <span className="text-muted text-decoration-line-through">{formatPrice(product.precio)}</span>
              <span className="badge bg-danger ms-2">¡Oferta!</span>
            </div>
          ) : ( <p className="product-price fs-4 mb-3">{formatPrice(product.precio)}</p> )}

          <p className="text-secondary-custom mb-4">{product.descripcion}</p>
          {product.origen && <p className="mb-2"><strong>Origen:</strong> {product.origen}</p>}
          <p className="mb-2"><strong>Stock:</strong> <span className={product.stock > 0 ? 'text-success':'text-danger'}>{product.stock > 0 ? `${product.stock} u.`:'Agotado'}</span></p>
          <p className="mb-3"><strong>Categoría:</strong> <Link to={`/categoria/${product.categoria}`}>{obtenerNombreCategoria(product.categoria)}</Link></p>

          {/* Botón Añadir (ya comprueba product.stock) */}
          {product.stock > 0 ? ( <div className="d-flex gap-2 mb-4 align-items-center"><label htmlFor="quantityInput" className="form-label me-2 mb-0">Cantidad:</label><input type="number" id="quantityInput" className="form-control" value={quantity} min="1" max={product.stock} onChange={handleQuantityChange} style={{width:'80px'}} aria-label="Cantidad"/> <button className="btn btn-primary flex-grow-1" onClick={handleAddToCart}>🛒 Añadir</button></div> ) : ( <p className="alert alert-warning">Agotado.</p> )}
          <div className="mt-4"><Link to="/productos" className="btn btn-outline-secondary">← Volver</Link></div>
        </div>
      </div>
    </div>
  );
}
export default DetalleProducto;