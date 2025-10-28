// src/pages/admin/EditUser.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getUsersList, saveUsersList } from '../../utils/localStorageHelper'; // Importamos helpers

function EditUser() {
  const navigate = useNavigate();
  const { userId } = useParams(); // Obtenemos el ID del usuario de la URL
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '', // El correo no será editable
    telefono: '',
    region: '',
    rol: 'Cliente',
  });
  const [originalUser, setOriginalUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const users = getUsersList();
    const userToEdit = users.find(u => u.id === userId);

    if (userToEdit) {
      setOriginalUser(userToEdit);
      setFormData({
        nombre: userToEdit.nombre || '',
        correo: userToEdit.email || '', // Mostramos correo pero no permitimos edición
        telefono: userToEdit.telefono || '',
        region: userToEdit.direccion || '', // Asumiendo que 'direccion' guarda la región
        rol: userToEdit.rol || 'Cliente',
      });
    } else {
      setError('Usuario no encontrado.');
    }
    setLoading(false);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validar teléfono para mantener formato
    if (name === 'telefono') {
      let phoneValue = value;
      if (!phoneValue.startsWith('+569')) { phoneValue = '+569'; }
      const numbers = phoneValue.substring(4).replace(/\D/g, '');
      setFormData(prev => ({ ...prev, telefono: '+569' + numbers.substring(0, 8) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones (similares a CreateUser, pero sin clave y correo único)
    if (!formData.nombre || !formData.region || !formData.rol) {
      setError('Nombre, Región y Rol son obligatorios.');
      return;
    }
    // Permite teléfono vacío, pero si existe, valida formato
    if (formData.telefono && formData.telefono.length !== 12) {
        setError('El teléfono debe tener el formato +569XXXXXXXX o estar vacío.');
        return;
    }


    try {
      let users = getUsersList(); // Usamos let para poder reasignar
      const userIndex = users.findIndex(u => u.id === userId);

      if (userIndex === -1) {
        setError('Error: Usuario no encontrado para actualizar.');
        return;
      }

      // Actualizamos el usuario en la lista creando un nuevo array
      users = users.map((user, index) => {
        if (index === userIndex) {
          return {
            ...user, // Mantenemos ID, email y clave si existiera
            nombre: formData.nombre.trim(),
            telefono: formData.telefono.trim(),
            direccion: formData.region, // Actualizamos 'direccion' con la región
            rol: formData.rol,
          };
        }
        return user;
      });


      saveUsersList(users); // Guardamos la lista actualizada

      alert('Usuario actualizado exitosamente!');
      navigate('/admin/usuarios'); // Redirigir a la lista

    } catch (err) {
      setError('Error al guardar los cambios. Inténtalo de nuevo.');
      console.error("Error updating user:", err);
    }
  };

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error && !originalUser) return <div className="alert alert-danger">{error} <Link to="/admin/usuarios">Volver</Link></div>;

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <h1>Editar Usuario</h1>
      <hr />

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {error && <div className="alert alert-danger">{error}</div>}

        <fieldset className="mb-3">
          <legend className="fs-5 mb-3">Datos personales</legend>
          {/* Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre completo</label>
            <input type="text" id="nombre" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
          </div>
          {/* Correo (No editable) */}
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input type="email" id="correo" name="correo" className="form-control" value={formData.correo} readOnly disabled />
            <small className="form-text text-muted">El correo no se puede modificar.</small>
          </div>
          {/* Teléfono */}
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input type="tel" id="telefono" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} maxLength="12" placeholder="+569..." />
            <small className="form-text text-muted">Formato: +569XXXXXXXX (Opcional)</small>
          </div>
          {/* Región */}
          <div className="mb-3">
            <label htmlFor="region" className="form-label">Región</label>
            <select id="region" name="region" className="form-select" value={formData.region} onChange={handleChange} required>
              <option value="">Seleccione una región</option>
              {/* --- Asegúrate de tener TODAS las opciones aquí --- */}
              <option value="arica">Arica y Parinacota</option>
              <option value="tarapaca">Tarapacá</option>
              <option value="antofagasta">Antofagasta</option>
              <option value="atacama">Atacama</option>
              <option value="coquimbo">Coquimbo</option>
              <option value="valparaiso">Valparaíso</option>
              <option value="metropolitana">Metropolitana de Santiago</option>
              <option value="ohiggins">Libertador General Bernardo O'Higgins</option>
              <option value="maule">Maule</option>
              <option value="nuble">Ñuble</option>
              <option value="biobio">Biobío</option>
              <option value="araucania">La Araucanía</option>
              <option value="losrios">Los Ríos</option>
              <option value="loslagos">Los Lagos</option>
              <option value="aysen">Aysén del General Carlos Ibáñez del Campo</option>
              <option value="magallanes">Magallanes y de la Antártica Chilena</option>
              {/* -------------------------------------------------- */}
            </select>
          </div>
        </fieldset>

        {/* Rol */}
        <fieldset className="mb-4">
          <legend className="fs-5 mb-3">Rol</legend>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">Seleccione Rol</label>
            <select id="rol" name="rol" className="form-select" value={formData.rol} onChange={handleChange} required>
              <option value="Cliente">Cliente</option>
              <option value="Admin">Administrador</option>
            </select>
             <small className="form-text text-muted">Define si el usuario puede acceder al panel de administración.</small>
          </div>
        </fieldset>

        {/* Botones */}
        <div className="d-flex justify-content-end gap-2">
          <Link to="/admin/usuarios" className="btn btn-outline-secondary">Cancelar</Link>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;