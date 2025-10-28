// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext'; // Asumo que lo sigues usando

// Layouts
import StoreLayout from './layouts/StoreLayout';
import AdminLayout from './layouts/AdminLayout';

// Páginas Tienda
import Home from './pages/Tienda/home';
import Productos from './pages/Tienda/Productos';
import DetalleProducto from './pages/Tienda/DetalleProducto';
import Carrito from './pages/Tienda/Carrito';
import Contacto from './pages/Tienda/Contacto';
import Nosotros from './pages/Tienda/Nosotros';
import Login from './pages/Tienda/Login';
import Registro from './pages/Tienda/Registro';
// --- NUEVAS PÁGINAS DE TIENDA ---
import Perfil from './pages/Tienda/Perfil';
import Categorias from './pages/Tienda/Categorias';
import Ofertas from './pages/Tienda/Ofertas';
import Blog from './pages/Tienda/Blog';
import Checkout from './pages/Tienda/Checkout';
import PagoExitoso from './pages/Tienda/PagoExitoso';
import PagoFallido from './pages/Tienda/PagoFallido';
// --------------------------------

// Páginas Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import CreateProduct from './pages/admin/CreateProduct';
import CreateUser from './pages/admin/CreateUser';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* --- RUTAS TIENDA --- */}
        <Route path="/" element={<StoreLayout />}>
           <Route index element={<Home />} />
           <Route path="productos" element={<Productos />} />
           <Route path="categoria/:categoryName" element={<Productos />} /> {/* Mantenemos filtro por categoría */}
           <Route path="productos/:id" element={<DetalleProducto />} />
           <Route path="contacto" element={<Contacto />} />
           <Route path="nosotros" element={<Nosotros />} />
           <Route path="carrito" element={<Carrito />} />
           <Route path="login" element={<Login />} />
           <Route path="registro" element={<Registro />} />
           {/* --- NUEVAS RUTAS TIENDA --- */}
           <Route path="perfil" element={<Perfil />} />
           <Route path="categorias" element={<Categorias />} /> {/* Página que lista categorías */}
           <Route path="ofertas" element={<Ofertas />} />
           <Route path="blog" element={<Blog />} />
           <Route path="checkout" element={<Checkout />} />
           <Route path="pago-exitoso" element={<PagoExitoso />} />
           <Route path="pago-fallido" element={<PagoFallido />} />
           {/* --------------------------- */}
        </Route>

        {/* --- RUTAS ADMIN --- */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} />
           <Route path="productos" element={<AdminProducts />} />
           <Route path="productos/nuevo" element={<CreateProduct />} />
           <Route path="usuarios" element={<AdminUsers />} />
           <Route path="usuarios/nuevo" element={<CreateUser />} />
           {/* Puedes añadir más rutas admin aquí si es necesario */}
        </Route>

        {/* --- RUTA 404 --- */}
        <Route path="*" element={<div className="text-center py-5"><h1>404 - Página no encontrada</h1></div>} />
      </Routes>
    </AuthProvider>
  );
}
export default App;