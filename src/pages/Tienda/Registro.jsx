
// src/pages/Tienda/Registro.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUserToList, getLoggedInUser } from '../../utils/localStorageHelper';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('+569'); // Inicia con prefijo
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

   // Si ya está logueado, redirigir a home
   useEffect(() => {
       if (getLoggedInUser()) {
           navigate('/', { replace: true });
       }
   }, [navigate]);

   // Validación de teléfono mientras se escribe
   const handleTelefonoChange = (e) => {
        let value = e.target.value;
        // Asegurar que siempre empiece con +569
        if (!value.startsWith('+569')) {
            value = '+569';
        }
        // Permitir solo números después del prefijo y limitar longitud
        const numberPart = value.substring(4).replace(/\D/g, ''); // Quita no-dígitos
        value = '+569' + numberPart.substring(0, 8); // Limita a 8 dígitos después del prefijo
        setTelefono(value);
   };


  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones del HTML original adaptadas
    if (nombre.length === 0 || nombre.length > 25) {
      setError('El nombre debe tener entre 1 y 25 caracteres.');
      return;
    }

    const emailRegex = /^[^\s@]+@(duocuc\.cl|gmail\.com)$/; //
    if (!emailRegex.test(email)) {
      setError('Correo inválido. Solo se aceptan @duocuc.cl y @gmail.com.');
      return;
    }

    if (password.length < 7 || password.length > 12) {
      setError('La contraseña debe tener entre 7 y 12 caracteres.');
      return;
    }

     if (telefono.length !== 12) { // +569 (4) + 8 dígitos = 12
         setError('El teléfono debe tener el formato +569 seguido de 8 dígitos.');
         return;
     }


    if (!direccion) {
        setError('La dirección de entrega es obligatoria.');
        return;
    }

    // Crear objeto de usuario
    const newUser = {
      id: Date.now().toString(), // ID simple basado en timestamp
      nombre,
      email,
      password, // Guardar contraseña (en una app real, esto se hashea en backend)
      direccion,
      telefono
    };

    // Intentar agregar usuario a la lista en localStorage
    const added = addUserToList(newUser);

    if (added) {
      setSuccess('¡Registro exitoso! Serás redirigido al inicio de sesión.');
      // Limpiar formulario
      setNombre('');
      setEmail('');
      setPassword('');
      setDireccion('');
      setTelefono('+569');
      // Redirigir a login después de un momento
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError('El correo electrónico ya está registrado. Intenta iniciar sesión.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6"> {/* Un poco más ancho */}
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Crear Cuenta</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className="mb-3">
                  <label htmlFor="nombreInput" className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreInput"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    maxLength="25"
                  />
                  <div className="form-text">Máximo 25 caracteres.</div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="emailInputReg" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInputReg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="form-text">Solo @duocuc.cl y @gmail.com.</div>
                </div>

                {/* Contraseña */}
                <div className="mb-3">
                  <label htmlFor="passwordInputReg" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordInputReg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="7"
                    maxLength="12"
                  />
                  <div className="form-text">Entre 7 y 12 caracteres.</div>
                </div>

                {/* Dirección */}
                <div className="mb-3">
                   <label htmlFor="direccionInput" className="form-label">Dirección de Entrega</label>
                   <textarea
                       className="form-control"
                       id="direccionInput"
                       rows="3"
                       value={direccion}
                       onChange={(e) => setDireccion(e.target.value)}
                       required
                   ></textarea>
                </div>

                {/* Teléfono */}
                 <div className="mb-3">
                     <label htmlFor="telefonoInput" className="form-label">Teléfono de Contacto</label>
                     <input
                         type="tel"
                         className="form-control"
                         id="telefonoInput"
                         value={telefono}
                         onChange={handleTelefonoChange}
                         required
                         placeholder="+569xxxxxxxx"
                         maxLength="12" // Incluye el prefijo
                     />
                      <div className="form-text">Formato: +569 seguido de 8 dígitos.</div>
                 </div>


                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
              </form>
              <div className="text-center mt-3">
                <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
              </div>
               <div className="text-center mt-3">
                   <Link to="/">← Volver al inicio</Link>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
