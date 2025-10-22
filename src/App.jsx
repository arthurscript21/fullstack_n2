import { Routes, Route } from 'react-router-dom';

// 1. Importa el "marco" y la "página"
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

function App() {
  return (
    <div>
      {/* Aquí puedes poner un Navbar principal si quieres */}
      
      {/* Definición de las rutas */}
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />

      </Routes>
    </div>
  )
}

export default App