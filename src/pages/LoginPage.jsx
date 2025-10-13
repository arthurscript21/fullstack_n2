import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulamos un inicio de sesión exitoso
    login();
    // Redirigimos al usuario al panel de administrador
    navigate('/admin');
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <p>Ingresa tus credenciales (simulado).</p>
      <button onClick={handleLogin}>Iniciar Sesión como Admin</button>
    </div>
  );
}

export default LoginPage;