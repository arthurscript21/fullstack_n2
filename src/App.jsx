// src/App.jsx
import { Routes, Route, Link, Navigate } from 'react-router-dom'; // <-- AÑADE Navigate
import './App.css';


// Layouts y Páginas
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import CreateProduct from './pages/admin/CreateProduct';
import CreateUser from './pages/admin/CreateUser';

function App() {

  return (
    <>
      <Routes>
        {/* --- RUTA RAÍZ CORREGIDA --- */}
        {/* Redirige automáticamente de "/" a "/admin" */}
        <Route path="/" element={<Navigate replace to="/admin" />} />

        {/* --- RUTAS DE ADMINISTRACIÓN (SIN CAMBIOS) --- */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} /> {/* /admin */}
           <Route path="productos" element={<AdminProducts />} /> {/* /admin/productos */}
           <Route path="productos/nuevo" element={<CreateProduct />} /> {/* /admin/productos/nuevo */}
           <Route path="usuarios" element={<AdminUsers />} /> {/* /admin/usuarios */}
           <Route path="usuarios/nuevo" element={<CreateUser />} /> {/* /admin/usuarios/nuevo */}

           {/* Rutas Placeholder */}
           <Route path="ordenes" element={<div>Página de Órdenes (Admin) - En construcción</div>} />
           <Route path="categorias" element={<div>Página de Categorías (Admin) - En construcción</div>} />
           <Route path="reportes" element={<div>Página de Reportes (Admin) - En construcción</div>} />
        </Route>

        {/* Ruta para página no encontrada */}
        <Route path="*" element={<h1 className="text-center mt-5">404 - Página no encontrada</h1>} />

      </Routes>
    </>
  );
}

export default App;