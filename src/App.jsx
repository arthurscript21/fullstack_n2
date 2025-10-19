import { Routes, Route } from 'react-router-dom';

// 1. Importa el "marco" y la "página"
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

function App() {
  return (
    <Routes>
      {/* 2. Ruta "padre" para el admin */}
      <Route path="/admin" element={<AdminLayout />}>
        
        {/* 3. Ruta "hija" (la que se muestra por defecto) */}
        {/* 'index' significa que esta es la página que se
            mostrará en la ruta exacta del padre ("/admin") */}
        <Route index element={<AdminDashboard />} />

        {/* (Aquí pondremos las rutas de productos, usuarios, etc. más tarde) */}
        {/* <Route path="productos" element={<AdminProducts />} /> */}
      
      </Route>

      {/* (Aquí pondremos las rutas públicas como Home y Login más tarde) */}
      {/* <Route path="/" element={<HomePage />} /> */}

    </Routes>
  );
}

export default App;