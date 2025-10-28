// src/pages/Tienda/Perfil.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getLoggedInUser, logoutUser, getUsersList, saveUsersList, saveLoggedInUser, dispatchStorageUpdate } from '../../utils/localStorageHelper';

function Perfil() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', telefono: '', direccion: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) { navigate('/login?redirect=/perfil'); return; }
    const users = getUsersList();
    const detailedUser = users.find(u => u.email === loggedInUser.email);
    const currentUser = detailedUser || loggedInUser;
    setUser(currentUser);
    setFormData({ nombre: currentUser.nombre || '', telefono: currentUser.telefono || '', direccion: currentUser.direccion || '' });
    setLoading(false);
  }, [navigate]);

  const handleInputChange = (e) => { const {name,value}=e.target; setFormData(p=>({...p,[name]:value})); };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing && user) { setFormData({ nombre: user.nombre || '', telefono: user.telefono || '', direccion: user.direccion || '' }); }
  };

  const handleSave = () => {
    if (!user) return;
    const users = getUsersList();
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
      const updatedUserInList = { ...users[userIndex], nombre: formData.nombre, telefono: formData.telefono, direccion: formData.direccion };
      users[userIndex] = updatedUserInList;
      saveUsersList(users); // Guarda lista completa
      const updatedLoggedInUser = { ...getLoggedInUser(), nombre: formData.nombre }; // Actualiza sesión
      saveLoggedInUser(updatedLoggedInUser);
      setUser(updatedUserInList); // Actualiza estado local
      setIsEditing(false); alert('Perfil actualizado.'); dispatchStorageUpdate(); // Notifica Navbar
    } else { alert('Error al actualizar.'); }
  };

  const handleLogout = () => { if(confirm('¿Cerrar sesión?')){ logoutUser(); navigate('/'); } };

  if (loading) return <div className="px-md-4 px-3 py-5 text-center">Cargando...</div>;
  if (!user) return null;

  return (
    // Usa padding
    <div className="px-md-4 px-3 py-5">
      <h2 className="text-center mb-4 section-title">Mi Perfil</h2>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow"><div className="card-body p-4 p-md-5">
            {isEditing ? (
              <> {/* Formulario Edición */}
                <div className="mb-3"><label htmlFor="nombre" className="form-label">Nombre</label><input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} /></div>
                <div className="mb-3"><label htmlFor="telefono" className="form-label">Teléfono</label><input type="tel" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} /></div>
                <div className="mb-3"><label htmlFor="direccion" className="form-label">Dirección</label><textarea className="form-control" id="direccion" name="direccion" rows="3" value={formData.direccion} onChange={handleInputChange}></textarea></div>
                <p className="small text-muted mb-4">Email: {user.email} (No editable)</p>
                <div className="d-flex justify-content-end gap-2"><button className="btn btn-secondary" onClick={handleEditToggle}>Cancelar</button><button className="btn btn-primary" onClick={handleSave}>Guardar</button></div>
              </>
            ) : (
              <> {/* Vista Datos */}
                <p><strong>Nombre:</strong> {user.nombre}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Teléfono:</strong> {user.telefono || '-'}</p>
                <p><strong>Dirección:</strong> {user.direccion || '-'}</p>
                <button className="btn btn-outline-primary mt-3" onClick={handleEditToggle}>Editar</button>
                <hr className="my-4" /><button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                <div className="mt-3 text-center"><Link to="/" className="btn btn-sm btn-link">← Volver</Link></div>
              </>
            )}
          </div></div>
        </div>
      </div>
    </div>
  );
}
export default Perfil;