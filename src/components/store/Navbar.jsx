// src/components/store/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
// Asegúrate que dispatchStorageUpdate esté importado correctamente
import { getLoggedInUser, logoutUser, getCart, dispatchStorageUpdate } from '../../utils/localStorageHelper';

// No necesitas importar el JS de Bootstrap aquí si ya está en main.jsx
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0); // Renombrado de cartItemCount para claridad
  const navigate = useNavigate();

  // Función para actualizar el estado del navbar
  const updateNavbarState = () => { // Renombrado de updateStateFromStorage
    setUser(getLoggedInUser());
    const currentCart = getCart();
    const totalItems = currentCart.reduce((sum, item) => sum + (item.cantidad || 0), 0);
    setCartCount(totalItems);
  };

  useEffect(() => {
    updateNavbarState(); // Carga inicial
    // Usa 'storageUpdate' (el evento definido en localStorageHelper)
    window.addEventListener('storageUpdate', updateNavbarState);
    return () => { // Limpia el listener al desmontar
      window.removeEventListener('storageUpdate', updateNavbarState);
    };
  }, []); // Array vacío para ejecutar solo al montar/desmontar

  const handleLogout = () => {
    if (confirm('¿Está seguro de que desea cerrar sesión?')) { // Agregado confirmación
        logoutUser(); // Llama a la función correcta
        // Opcional: limpiar carrito al cerrar sesión (descomenta si lo necesitas)
        // clearCart();
        updateNavbarState(); // Actualiza el estado del Navbar inmediatamente
        // dispatchStorageUpdate(); // No es estrictamente necesario aquí si ya actualizas localmente
        navigate('/'); // Redirige al inicio
    }
  };

  return (
    // navbar-custom viene de tu index.css (asegúrate que exista si quieres ese estilo)
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom shadow-sm sticky-top">
      {/* Container CENTRA el contenido del Navbar */}
      <div className="container">
        {/* Brand/Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5222/5222668.png"
            alt="Logo HuertoHogar"
            width="30" height="30"
            className="d-inline-block align-text-top me-2"
           />
          HuertoHogar
        </Link>

        {/* Botón Toggler */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavStore" aria-controls="navbarNavStore" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido Colapsable */}
        <div className="collapse navbar-collapse" id="navbarNavStore">
          {/* Links Principales */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <li className="nav-item"><NavLink className="nav-link" to="/" end>Inicio</NavLink></li>
             <li className="nav-item"><NavLink className="nav-link" to="/categorias">Categorías</NavLink></li>
             <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
             <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
             <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
             <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
             {/* --- LINK BLOG (Visible) --- */}
             <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
             {/* ------------------------- */}
             {user && user.role === 'admin' && ( <li className="nav-item"><Link className="nav-link text-warning fw-bold" to="/admin">Admin</Link></li> )}
          </ul>

          {/* Carrito y Login/Usuario */}
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrito">
                🛒 Carrito{' '}
                { cartCount > 0 && (<span className="badge bg-warning text-dark rounded-pill">{cartCount}</span>)}
              </NavLink>
            </li>
            {user ? (
              // Menú desplegable si está logueado
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarUserDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Hola, {user.nombre}</a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarUserDropdown">
                  <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                </ul>
              </li>
            ) : (
              // Botones si no está logueado
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink></li>
                <li className="nav-item"><NavLink className="btn btn-sm btn-outline-warning ms-lg-2" to="/registro">Crear Cuenta</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div> {/* Fin del container */}
    </nav>
  );
}

export default Navbar;