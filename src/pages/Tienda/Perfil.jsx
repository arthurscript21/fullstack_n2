// src/pages/Tienda/Perfil.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser, logoutUser, getUsersList, saveUsersList } from '../../utils/localStorageHelper'; // Asegúrate de tener saveUsersList si permites editar

function Perfil() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
      navigate('/login?redirect=/perfil'); // Redirige si no está logueado
    } else {
      // Busca los detalles completos del usuario en la lista (si es necesario)
      const users = getUsersList();
      const detailedUser = users.find(u => u.email === loggedInUser.email);
      setUser(detailedUser || loggedInUser); // Usa el detallado si existe, sino el de sesión
    }
  }, [navigate]);

  const handleLogout = () => {
    if (confirm('¿Cerrar sesión?')) {
      logoutUser();
      navigate('/');
    }
  };

  if (!user) {
    return <div className="px-md-4 px-3 py-5 text-center">Cargando perfil...</div>;
  }

  return (
    // Sin container, con padding
    <div className="px-md-4 px-3 py-5">
      <h2 className="text-center mb-4 section-title">Mi Perfil</h2>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4 p-md-5">
              <p><strong>Nombre:</strong> {user.nombre}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Teléfono:</strong> {user.telefono || 'No especificado'}</p>
              <p><strong>Dirección:</strong> {user.direccion || 'No especificada'}</p>
              {/* Aquí podrías añadir un botón/formulario para editar datos */}
              {/* <button className="btn btn-secondary mt-3">Editar Información</button> */}
              <hr className="my-4" />
              <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;