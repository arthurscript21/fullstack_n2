// src/pages/Tienda/Perfil.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Asegúrate de importar todas las funciones necesarias
import { getLoggedInUser, logoutUser, getUsersList, saveUsersList, saveLoggedInUser, dispatchStorageUpdate } from '../../utils/localStorageHelper';

function Perfil() {
  const [user, setUser] = useState(null); // Estado para los datos actuales del usuario
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si está en modo edición
  const [formData, setFormData] = useState({ nombre: '', telefono: '', direccion: '' }); // Estado para los datos del formulario
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Carga los datos del usuario al iniciar
  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
      navigate('/login?redirect=/perfil'); // Redirige si no está logueado
      return; // Detiene la ejecución si no hay usuario
    }

    // Busca detalles completos en la lista de usuarios
    const users = getUsersList();
    const detailedUser = users.find(u => u.email === loggedInUser.email);
    const currentUser = detailedUser || loggedInUser; // Usa datos detallados si existen
    setUser(currentUser);

    // Pre-rellena el formulario con los datos actuales
    setFormData({
      nombre: currentUser.nombre || '',
      telefono: currentUser.telefono || '',
      direccion: currentUser.direccion || '' // Asume que 'direccion' guarda calle/número/comuna, etc.
    });
    setLoading(false); // Termina la carga
  }, [navigate]); // Solo depende de navigate

  // Maneja cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Activa/desactiva el modo de edición
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Si se cancela la edición, resetea el formulario a los datos actuales del usuario
    if (isEditing && user) {
      setFormData({
        nombre: user.nombre || '',
        telefono: user.telefono || '',
        direccion: user.direccion || ''
      });
    }
  };

  // Guarda los cambios realizados en el formulario
  const handleSave = () => {
    if (!user) return; // Seguridad extra

    // Validaciones básicas (puedes hacerlas más robustas)
    if (!formData.nombre.trim()) {
      alert('El nombre no puede estar vacío.');
      return;
    }

    const users = getUsersList(); // Obtiene la lista actual de usuarios
    const userIndex = users.findIndex(u => u.email === user.email); // Encuentra al usuario actual en la lista

    if (userIndex !== -1) {
      // 1. Actualiza los datos del usuario DENTRO de la lista general
      const updatedUserInList = {
        ...users[userIndex], // Mantiene datos originales (email, password, id, rol)
        nombre: formData.nombre.trim(), // Actualiza con datos del form
        telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim()
      };
      users[userIndex] = updatedUserInList; // Reemplaza el usuario viejo por el actualizado
      saveUsersList(users); // Guarda TODA la lista de usuarios actualizada en localStorage

      // 2. Actualiza la información de la SESIÓN ACTIVA (USER_KEY)
      //    Es importante actualizar el nombre aquí para que se refleje en el Navbar
      const updatedLoggedInUser = {
          ...getLoggedInUser(), // Mantiene id, email, role de la sesión
          nombre: formData.nombre.trim() // Actualiza solo el nombre en la sesión
      };
      saveLoggedInUser(updatedLoggedInUser); // Guarda la sesión actualizada

      // 3. Actualiza el estado local para mostrar los nuevos datos
      setUser(updatedUserInList);
      setIsEditing(false); // Sale del modo edición
      alert('Perfil actualizado con éxito.');

      // 4. Notifica a otros componentes (como el Navbar) que los datos cambiaron
      dispatchStorageUpdate();

    } else {
      alert('Error: No se pudo encontrar el usuario para actualizar. Intenta iniciar sesión de nuevo.');
      // Considera cerrar sesión si ocurre este error
      // logoutUser(); navigate('/login');
    }
  };

  // Cierra la sesión
  const handleLogout = () => {
     if(confirm('¿Está seguro de que desea cerrar sesión?')){
        logoutUser();
        navigate('/'); // Redirige a la home de la tienda
     }
  };

  // Muestra mensaje de carga
  if (loading) return <div className="px-md-4 px-3 py-5 text-center">Cargando perfil...</div>;
  // Si user sigue null después de cargar (no debería pasar si está logueado), no renderiza nada más
  if (!user) return null;

  return (
    // Usa padding para dar espacio
    <div className="px-md-4 px-3 py-5">
      <h2 className="text-center mb-4 section-title">Mi Perfil</h2>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4 p-md-5">
              {/* Muestra el formulario si está editando, sino muestra los datos */}
              {isEditing ? (
                // --- FORMULARIO DE EDICIÓN ---
                <>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                     <label htmlFor="telefono" className="form-label">Teléfono</label>
                     <input type="tel" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="+569xxxxxxxx"/>
                   </div>
                   <div className="mb-3">
                     <label htmlFor="direccion" className="form-label">Dirección</label>
                     <textarea className="form-control" id="direccion" name="direccion" rows="3" value={formData.direccion} onChange={handleInputChange} placeholder="Calle, Número, Comuna, Ciudad..."></textarea>
                   </div>
                   {/* Mostramos el email pero no permitimos editarlo */}
                   <p className="small text-muted mb-4">Email: {user.email} (No editable)</p>
                   {/* Botones Guardar / Cancelar */}
                   <div className="d-flex justify-content-end gap-2 mt-4">
                     <button className="btn btn-secondary" onClick={handleEditToggle}>Cancelar</button>
                     <button className="btn btn-primary" onClick={handleSave}>Guardar Cambios</button>
                   </div>
                </>
              ) : (
                // --- VISTA DE DATOS (NO EDICIÓN) ---
                <>
                  <p><strong>Nombre:</strong> {user.nombre}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Teléfono:</strong> {user.telefono || 'No especificado'}</p>
                  <p><strong>Dirección:</strong> {user.direccion || 'No especificada'}</p>
                  {/* Botón para entrar en modo edición */}
                  <button className="btn btn-outline-primary mt-3" onClick={handleEditToggle}>
                    Editar Información
                  </button>
                  <hr className="my-4" />
                  {/* Botón para cerrar sesión */}
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                   {/* Enlace para volver a la tienda */}
                   <div className="mt-3 text-center">
                        <Link to="/" className="btn btn-sm btn-link">← Volver a la tienda</Link>
                   </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Perfil;