
// src/pages/Tienda/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { saveLoggedInUser, getLoggedInUser, getUsersList, dispatchStorageUpdate } from '../../utils/localStorageHelper';

// Credenciales fijas del ADMIN (solo para demostración)
const adminCredenciales = {
    email: "admin@correo.com",
    password: "Admin123"
};


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/'; // Página a la que redirigir después del login, por defecto a home

  // Si ya está logueado, redirigir
   useEffect(() => {
       if (getLoggedInUser()) {
           navigate(redirectPath, { replace: true }); // replace: true evita que pueda volver a login con el botón atrás
       }
   }, [navigate, redirectPath]);


  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); // Limpia errores previos

    if (!email || !password) {
      setError('Por favor, ingresa correo y contraseña.');
      return;
    }

    // 1. Verificar si es ADMIN
    if (email === adminCredenciales.email && password === adminCredenciales.password) {
        const adminUser = {
            nombre: 'Administrador', // Nombre fijo para admin
            email: adminCredenciales.email,
            role: 'admin' // Rol específico
        };
        saveLoggedInUser(adminUser);
        dispatchStorageUpdate(); // Notifica al Navbar
        // IMPORTANTE: Redirigir al dashboard de admin si existe esa ruta
         alert('Inicio de sesión como Administrador exitoso.');
        // navigate('/admin'); // Cambia esto si tienes ruta de admin
         navigate('/'); // De momento redirige a home
        return;
    }


    // 2. Verificar si es usuario normal desde la lista
    const users = getUsersList(); // Obtiene la lista de usuarios registrados
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userToSave = {
        id: foundUser.id || Date.now().toString(), // Asegura un ID
        nombre: foundUser.nombre,
        email: foundUser.email,
        role: 'user' // Rol de usuario normal
      };
      saveLoggedInUser(userToSave);
      dispatchStorageUpdate(); // Notifica al Navbar
      alert(`Inicio de sesión exitoso. ¡Bienvenido ${foundUser.nombre}!`);
      navigate(redirectPath, { replace: true }); // Redirige a la página guardada o a home
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-describedby="emailHelp"
                  />
                   {/* Opcional: <div id="emailHelp" className="form-text">Usa tu correo @duocuc.cl o @gmail.com</div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
              </form>
              <div className="text-center mt-3">
                <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
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

export default Login;
