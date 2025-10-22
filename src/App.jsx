// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Layouts y Páginas Importadas
import StoreLayout from './layouts/StoreLayout';

import Home from './pages/Tienda/Home';
import Productos from './pages/Tienda/Productos';
import DetalleProducto from './pages/Tienda/DetalleProducto';
import Carrito from './pages/Tienda/Carrito';
import Contacto from './pages/Tienda/Contacto';
import Login from './pages/Tienda/Login';
import Registro from './pages/Tienda/Registro';
import Nosotros from './pages/Tienda/Nosotros.jsx'; // <-- Añade esta línea

// Importaciones del Admin (AHORA DESCOMENTADAS)
import AdminLayout from './layouts/AdminLayout.jsx'; // Asegúrate que este archivo exista
import AdminDashboard from './pages/admin/AdminDashboard.jsx'; // Asegúrate que este archivo exista

function App() {
  return (
    <Routes>
      {/* --- Rutas de la Tienda (Públicas) --- */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/categoria/:categoryName" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Route>

      {/* --- Rutas del Admin (AHORA ACTIVAS) --- */}
      {/* Cualquier ruta que empiece con /admin usará AdminLayout */}
      <Route path="/admin/*" element={<AdminLayout />}>
           {/* La ruta exacta /admin mostrará el AdminDashboard */}
           {/* NOTA: Para que rutas anidadas funcionen DENTRO de AdminDashboard,
               ese componente necesitaría su propio <Routes> y <Route>.
               Por simplicidad ahora, /admin/* carga AdminLayout y dentro se renderizará AdminDashboard
               si la ruta es /admin o /admin/loquesea (porque usamos '*' y AdminDashboard es el único elemento).
               Una estructura más robusta definiría rutas anidadas aquí.
           */}
            <Route path="*" element={<AdminDashboard />} />
           {/* Aquí podrías añadir más rutas específicas del admin si las necesitas,
               por ejemplo: <Route path="usuarios" element={<AdminUsuarios />} /> */}
      </Route>


      {/* --- Ruta para páginas no encontradas (404) --- */}
      <Route path="*" element={
        <StoreLayout> {/* Mantenemos el layout de la tienda para el 404 */}
          <div className="container text-center py-5">
            <h2>404 - Página no encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
          </div>
        </StoreLayout>
      } />
    </Routes>
  );
}

export default App;