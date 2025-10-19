import { Routes, Route } from 'react-router-dom';

// Importa tus páginas (¡con las rutas correctas!)


// Importa tu Layout y tu Dashboard de admin
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

// Importa tu ruta protegida (ver Paso 3)


function App() {
  return (
    <Routes>
      {/* --- Rutas Públicas --- */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* --- Rutas de Administración --- */}
      {/* Este "Route" envuelve a todas las páginas de admin.
        Usa el AdminLayout como "marco".
      */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* La ruta "index" es lo que se muestra en "/admin" */}
        <Route index element={<AdminDashboard />} /> 
        
        {/* Aquí agregarás las otras páginas del admin (Productos, Usuarios, etc.) */}
        {/* <Route path="productos" element={<AdminProductos />} /> */}
        {/* <Route path="usuarios" element={<AdminUsuarios />} /> */}
      </Route>

    </Routes>
  );
}

export default App;