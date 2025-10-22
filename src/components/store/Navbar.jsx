// src/components/store/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

// Importar el JS de Bootstrap para que funcionen los dropdowns
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getCart, getLoggedInUser, clearLoggedInUser, clearCart, dispatchStorageUpdate } from '../../utils/localStorageHelper.js';
function Navbar() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Función para actualizar el estado desde localStorage
  const updateStateFromStorage = () => {
    const currentCart = getCart();
    // Suma las cantidades de todos los items en el carrito
    const totalItems = currentCart.reduce((sum, item) => sum + (item.cantidad || 0), 0);
    setCartItemCount(totalItems);

    const currentUser = getLoggedInUser();
    setUser(currentUser);
  };

  useEffect(() => {
    // Carga inicial
    updateStateFromStorage();

    // Escucha el evento personalizado para actualizar cuando cambie el storage
    window.addEventListener('storageUpdated', updateStateFromStorage);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('storageUpdated', updateStateFromStorage);
    };
  }, []); // El array vacío asegura que esto se ejecute solo al montar y desmontar

  const handleLogout = () => {
    clearLoggedInUser();
    clearCart(); // Opcional: limpiar carrito al cerrar sesión
    setUser(null);
    setCartItemCount(0);
    dispatchStorageUpdate(); // Notifica a otros componentes (aunque aquí ya actualizamos localmente)
    navigate('/'); // Redirige al inicio
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container">
        {/* Brand/Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5222/5222668.png"
            alt="Logo HuertoHogar"
            width="30" height="30"
            className="d-inline-block align-text-top me-2"
           />
          HuertoHogar
        </Link>

        {/* Botón Toggler para móviles */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavStore" aria-controls="navbarNavStore" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del Navbar */}
        <div className="collapse navbar-collapse" id="navbarNavStore">
          {/* Links Principales (izquierda) */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Inicio</NavLink> {/* 'end' asegura que solo esté activo en la ruta exacta */}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">Productos</NavLink>
            </li>
             <li className="nav-item">
               <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink> {/* Enlace a Nosotros */}
             </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
            </li>
            {/* Añadir más links si es necesario (Ofertas, Blog...) */}
          </ul>

          {/* Links de Usuario y Carrito (derecha) */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrito">
                🛒 Carrito <span className="badge bg-warning text-dark">{cartItemCount}</span>
              </NavLink>
            </li>

            {/* Lógica condicional para mostrar Login/Registro o Menú de Usuario */}
            {user ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.nombre} {/* Muestra el nombre del usuario */}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  {/* Puedes añadir links a perfil, pedidos, etc. si existen */}
                  <li><a className="dropdown-item" href="#">Mi Perfil</a></li>
                  <li><a className="dropdown-item" href="#">Mis Pedidos</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                </ul>
              </li>
            ) : (
              <> {/* Fragmento para agrupar los botones de login/registro */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink>
                </li>
                <li className="nav-item">
                   <NavLink className="btn btn-outline-light ms-lg-2" to="/registro">Crear Cuenta</NavLink>
                 </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;