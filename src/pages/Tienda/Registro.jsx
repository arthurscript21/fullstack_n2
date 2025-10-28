// src/pages/Tienda/Registro.jsx
// ... (imports y lógica igual)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUserToList, getLoggedInUser } from '../../utils/localStorageHelper';

function Registro() {
  const [nombre, setNombre] = useState(''); /* ...otros estados */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('+569');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => { if (getLoggedInUser()) navigate('/', { replace: true }); }, [navigate]);

  const handleTelefonoChange = (e) => { /* ...lógica igual... */
    let v = e.target.value; if (!v.startsWith('+569')) v = '+569';
    setTelefono('+569' + v.substring(4).replace(/\D/g, '').substring(0, 8));
  };

  const handleSubmit = (event) => { /* ...lógica de submit igual... */
    event.preventDefault(); setError(''); setSuccess('');
    if (nombre.length === 0 || nombre.length > 25) { setError('Nombre entre 1 y 25 caracteres.'); return; }
    const emailRegex = /^[^\s@]+@(duocuc\.cl|gmail\.com)$/;
    if (!emailRegex.test(email)) { setError('Correo inválido (@duocuc.cl o @gmail.com).'); return; }
    if (password.length < 7 || password.length > 12) { setError('Contraseña entre 7 y 12 caracteres.'); return; }
    if (telefono.length !== 12) { setError('Teléfono formato +569XXXXXXXX.'); return; }
    if (!direccion) { setError('Dirección obligatoria.'); return; }
    const newUser = { id: Date.now().toString(), nombre, email, password, direccion, telefono };
    if (addUserToList(newUser)) {
      setSuccess('¡Registro exitoso! Redirigiendo...'); setNombre(''); /*...limpiar otros...*/ setEmail(''); setPassword(''); setDireccion(''); setTelefono('+569');
      setTimeout(() => navigate('/login'), 2000);
    } else { setError('El correo ya está registrado.'); }
  };

  return (
    // Quitamos "container", añadimos padding horizontal (px-md-4) y vertical (py-5)
    <div className="px-md-4 py-5 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 116px)' }}> {/* Centrar verticalmente */}
      <div className="row justify-content-center w-100">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Crear Cuenta</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className="mb-3"><label htmlFor="nombreInput" className="form-label">Nombre</label><input type="text" className="form-control" id="nombreInput" value={nombre} onChange={(e) => setNombre(e.target.value)} required maxLength="25" /><div className="form-text">Máx 25.</div></div>
                {/* Email */}
                <div className="mb-3"><label htmlFor="emailInputReg" className="form-label">Correo</label><input type="email" className="form-control" id="emailInputReg" value={email} onChange={(e) => setEmail(e.target.value)} required /><div className="form-text">@duocuc.cl o @gmail.com.</div></div>
                {/* Contraseña */}
                <div className="mb-3"><label htmlFor="passwordInputReg" className="form-label">Contraseña</label><input type="password" className="form-control" id="passwordInputReg" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="7" maxLength="12" /><div className="form-text">7-12 caracteres.</div></div>
                {/* Dirección */}
                <div className="mb-3"><label htmlFor="direccionInput" className="form-label">Dirección</label><textarea className="form-control" id="direccionInput" rows="3" value={direccion} onChange={(e) => setDireccion(e.target.value)} required></textarea></div>
                {/* Teléfono */}
                <div className="mb-4"><label htmlFor="telefonoInput" className="form-label">Teléfono</label><input type="tel" className="form-control" id="telefonoInput" value={telefono} onChange={handleTelefonoChange} required placeholder="+569xxxxxxxx" maxLength="12" /><div className="form-text">+569XXXXXXXX</div></div>
                <button type="submit" className="btn btn-primary w-100 mb-3">Registrarse</button>
              </form>
              <div className="text-center"><p className="mb-2">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p><Link to="/">← Volver al inicio</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div> // CIERRA EL DIV PRINCIPAL
  );
}

export default Registro;