// src/pages/admin/CreateUser.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '+569',
    region: '',
    clave: '',
    confirmar_clave: '',
    rol: 'Cliente', // Rol por defecto
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
     // Validar teléfono para mantener formato
    if (name === 'telefono') {
        if (!value.startsWith('+569')) {
           setFormData(prev => ({ ...prev, telefono: '+569' + value.replace(/\D/g, '').substring(0, 8) }));
        } else {
             const numbers = value.substring(4).replace(/\D/g, '');
             setFormData(prev => ({ ...prev, telefono: '+569' + numbers.substring(0, 8) }));
        }
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // Validaciones básicas
    if (!formData.nombre || !formData.correo || !formData.region || !formData.rol || !formData.clave) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    const emailRegex = /^[^\s@]+@(duocuc\.cl|gmail\.com)$/; // Validar dominio
    if (!emailRegex.test(formData.correo)) {
      setError('El correo debe ser @duocuc.cl o @gmail.com.');
      return;
    }
     if (formData.telefono.length !== 12) {
      setError('El teléfono debe tener el formato +569XXXXXXXX.');
      return;
    }
    if (formData.clave.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (formData.clave !== formData.confirmar_clave) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Lógica para guardar (usando localStorage para el ejemplo)
    try {
      const storedUsers = localStorage.getItem('huertohogar_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      if (users.some(u => u.email === formData.correo)) {
        setError('El correo electrónico ya está registrado.');
        return;
      }

      const newUser = {
        id: `u_${Date.now()}`, // Generar ID simple
        nombre: formData.nombre,
        email: formData.correo,
        telefono: formData.telefono,
        direccion: formData.region, // Usar 'direccion' como en el JS original
        rol: formData.rol,
        // No guardamos la contraseña en este ejemplo simple, ¡NUNCA lo hagas en producción!
      };

      users.push(newUser);
      localStorage.setItem('huertohogar_users', JSON.stringify(users));

      alert('Usuario creado exitosamente!');
      navigate('/admin/usuarios'); // Redirigir a la lista de usuarios

    } catch (err) {
      setError('Error al guardar el usuario. Inténtalo de nuevo.');
      console.error("Error saving user:", err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <h1>Crear Nuevo Usuario</h1>
      <hr />

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {error && <div className="alert alert-danger">{error}</div>}

        <fieldset className="mb-3">
          <legend className="fs-5 mb-3">Datos personales</legend>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
              placeholder="Ej: Juan Pérez"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <small className="form-text text-muted">Ingrese nombre y apellido.</small>
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              className="form-control"
              placeholder="ejemplo@duocuc.cl o ejemplo@gmail.com"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            <small className="form-text text-muted">Debe ser @duocuc.cl o @gmail.com.</small>
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className="form-control"
              placeholder="+56912345678"
              value={formData.telefono}
              onChange={handleChange}
              maxLength="12" // +569 + 8 dígitos
              required
            />
            <small className="form-text text-muted">Formato: +569XXXXXXXX</small>
          </div>
          <div className="mb-3">
            <label htmlFor="region" className="form-label">Región</label>
            <select
              id="region"
              name="region"
              className="form-select"
              value={formData.region}
              onChange={handleChange}
              required
            >
<option value="">Seleccione una región</option>
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
            </select>
          </div>
        </fieldset>

        <fieldset className="mb-3">
          <legend className="fs-5 mb-3">Seguridad</legend>
          <div className="mb-3 position-relative">
            <label htmlFor="clave" className="form-label">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              id="clave"
              name="clave"
              className="form-control"
              value={formData.clave}
              onChange={handleChange}
              required
              minLength="6"
            />
            <button
               type="button"
               onClick={() => setShowPassword(!showPassword)}
               className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-2"
               style={{ zIndex: 5, marginTop: '16px' }} // Ajuste para alinear con input
               tabIndex="-1" // Evitar que sea enfocable
            >
               {showPassword ? 'Ocultar' : 'Mostrar'}
             </button>
            <small className="form-text text-muted">Mínimo 6 caracteres.</small>
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="confirmar_clave" className="form-label">Confirmar contraseña</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmar_clave"
              name="confirmar_clave"
              className="form-control"
              value={formData.confirmar_clave}
              onChange={handleChange}
              required
              minLength="6"
            />
             <button
               type="button"
               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-2"
               style={{ zIndex: 5, marginTop: '16px' }}
               tabIndex="-1"
            >
               {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
             </button>
            <small className="form-text text-muted">Repita la contraseña.</small>
          </div>
        </fieldset>

        <fieldset className="mb-4">
            <legend className="fs-5 mb-3">Rol</legend>
             <div className="mb-3">
                <label htmlFor="rol" className="form-label">Seleccione Rol</label>
                <select
                  id="rol"
                  name="rol"
                  className="form-select"
                  value={formData.rol}
                  onChange={handleChange}
                  required
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Admin">Administrador</option>
                </select>
             </div>
        </fieldset>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/usuarios')}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Guardar Usuario</button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;