// src/pages/Tienda/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { saveLoggedInUser, getLoggedInUser, getUsersList, dispatchStorageUpdate } from '../../utils/localStorageHelper';

const adminCredenciales = { email: "admin@correo.com", password: "Admin123" };

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (getLoggedInUser()) {
      // Si ya está logueado, redirige a donde iba o a la home de la tienda
      // No redirigimos al admin aquí, eso solo pasa al hacer login
      navigate(redirectPath === '/admin' ? '/' : redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, ingresa correo y contraseña.');
      return;
    }

    // 1. Verificar si es ADMIN
    if (email === adminCredenciales.email && password === adminCredenciales.password) {
      const adminUser = { nombre: 'Administrador', email: adminCredenciales.email, role: 'admin' };
      saveLoggedInUser(adminUser);
      dispatchStorageUpdate();
      alert('Inicio de sesión como Administrador exitoso.');
      // --- REDIRIGE A /admin ---
      navigate('/admin'); // <--- ¡CAMBIO AQUÍ!
      // -------------------------
      return; // Importante salir aquí
    }

    // 2. Verificar usuario normal
    const users = getUsersList();
    // ¡CUIDADO! Comparar contraseñas así es inseguro en una aplicación real.
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userToSave = {
        id: foundUser.id || Date.now().toString(),
        nombre: foundUser.nombre,
        email: foundUser.email,
        role: 'user' // Asignar rol 'user'
      };
      saveLoggedInUser(userToSave);
      dispatchStorageUpdate();
      alert(`Inicio de sesión exitoso. ¡Bienvenido ${foundUser.nombre}!`);
      // Redirige al usuario normal a donde iba o a la home
      navigate(redirectPath === '/admin' ? '/' : redirectPath, { replace: true });
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    // Estructura SIN container, CON padding y flex para centrar
    <div className="px-md-4 px-3 py-5 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 116px)' }}> {/* Ajusta 116px si altura de navbar+footer es distinta */}
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
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
                <button type="submit" className="btn btn-primary w-100 mb-3">Iniciar Sesión</button>
              </form>
              <div className="text-center">
                <p className="mb-2">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
                <Link to="/">← Volver al inicio</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> // CIERRA EL DIV PRINCIPAL
  );
}
export default Login;