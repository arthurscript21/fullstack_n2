import { createContext, useContext, useState } from 'react';

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos un Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Creamos el proveedor del contexto
export const AuthProvider = ({ children }) => {
  // En un caso real, esto vendría de una API o una cookie/token.
  // Por ahora, lo manejamos con un estado simple.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para simular el inicio de sesión
  const login = () => {
    // Aquí iría la lógica para verificar usuario/contraseña contra un backend
    setIsAuthenticated(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};