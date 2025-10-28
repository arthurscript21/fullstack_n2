// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// --- CONTEXTO DE AUTENTICACIÓN ---
// Importa el AuthProvider para que el login funcione en toda la app
import { AuthProvider } from './context/AuthContext'; 

// --- LAYOUTS (Plantillas) ---
import StoreLayout from './layouts/StoreLayout'; //
import AdminLayout from './layouts/AdminLayout'; //

// --- PÁGINAS DE LA TIENDA (Las que faltaban importar) ---
import Home from './pages/Tienda/home'; //
import Productos from './pages/Tienda/Productos'; //
import DetalleProducto from './pages/Tienda/DetalleProducto'; //
import Carrito from './pages/Tienda/Carrito'; //
import Contacto from './pages/Tienda/Contacto'; //
import Nosotros from './pages/Tienda/Nosotros'; //
import Login from './pages/Tienda/Login'; //
import Registro from './pages/Tienda/Registro'; //

// --- PÁGINAS DE ADMIN (Ya estaban) ---
import AdminDashboard from './pages/admin/AdminDashboard'; //
import AdminProducts from './pages/admin/AdminProducts'; //
import AdminUsers from './pages/admin/AdminUsers'; //
import CreateProduct from './pages/admin/CreateProduct'; //
import CreateUser from './pages/admin/CreateUser'; //

function App() {

  return (
    // Envolvemos todo en AuthProvider
    <AuthProvider> 
      <Routes>
        
        {/* --- RUTAS DE LA TIENDA (Públicas) --- */}
        {/* Usamos StoreLayout para todas estas páginas */}
        <Route path="/" element={<StoreLayout />}>
           {/* La ruta raíz "/" ahora muestra la Home de la tienda */}
           <Route index element={<Home />} /> 
           
           <Route path="productos" element={<Productos />} />
           {/* Ruta para ver por categoría */}
           <Route path="categoria/:categoryName" element={<Productos />} /> 
           {/* Ruta para ver el detalle */}
           <Route path="productos/:id" element={<DetalleProducto />} /> 
           
           <Route path="contacto" element={<Contacto />} />
           <Route path="nosotros" element={<Nosotros />} />
           <Route path="carrito" element={<Carrito />} />
           <Route path="login" element={<Login />} />
           <Route path="registro" element={<Registro />} />
        </Route>

        {/* --- RUTAS DE ADMINISTRACIÓN (Privadas) --- */}
        {/* Estas rutas se mantienen igual */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} /> {/* /admin */}
           <Route path="productos" element={<AdminProducts />} /> {/* /admin/productos */}
           <Route path="productos/nuevo" element={<CreateProduct />} /> {/* /admin/productos/nuevo */}
           <Route path="usuarios" element={<AdminUsers />} /> {/* /admin/usuarios */}
           <Route path="usuarios/nuevo" element={<CreateUser />} /> {/* /admin/usuarios/nuevo */}
        </Route>

        {/* --- RUTA 404 --- */}
        {/* Se mantiene igual */}
        <Route path="*" element={<h1 className="text-center mt-5">404 - Página no encontrada</h1>} />

      </Routes>
    </AuthProvider>
  );
}

export default App;