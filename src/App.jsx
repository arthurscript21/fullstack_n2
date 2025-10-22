// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css'; // Asegúrate que App.css exista o remueve esta línea
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap globalmente

// Importa tus páginas y layouts
// import Home from './pages/Home'; // Si tienes una página Home pública
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
// Importa otras páginas de admin aquí a medida que las crees
// import AdminProducts from './pages/Admin/AdminProducts';

function App() {
  return (
    <>
      {/* Navbar eliminado */}

      <Routes>
        {/* Rutas Públicas - Puedes agregar una Home si la necesitas */}
        {/* <Route path='/' element={<Home />} /> */}
        {/* <Route path='/login' element={<Login />} /> */}
        {/* ... otras rutas públicas ... */}

        {/* Rutas de Administración anidadas bajo AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
           {/* La ruta index (solo /admin) muestra el dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* Otras rutas de admin irán aquí */}
           <Route path="productos" element={<div>Página de Productos Admin</div>} /> {/* Ejemplo */}
           <Route path="ordenes" element={<div>Página de Órdenes Admin</div>} /> {/* Ejemplo */}
           <Route path="categorias" element={<div>Página de Categorías Admin</div>} /> {/* Ejemplo */}
           <Route path="usuarios" element={<div>Página de Usuarios Admin</div>} /> {/* Ejemplo */}
           <Route path="reportes" element={<div>Página de Reportes Admin</div>} /> {/* Ejemplo */}
           {/* <Route path="productos" element={<AdminProducts />} /> */}
           {/* ... otras rutas de admin ... */}
        </Route>

        {/* Ruta principal si no hay home, podría redirigir a /admin o mostrar algo */}
        <Route path="/" element={<div><h1>Bienvenido</h1><p>Ir a <a href="/admin">Admin</a></p></div>} />


        {/* Puedes añadir una ruta para página no encontrada */}
        {/* <Route path="*" element={<h1>404 - Página no encontrada</h1>} /> */}

      </Routes>
    </>
  );
}

export default App;