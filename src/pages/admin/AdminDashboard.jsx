// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../../components/admin/DashboardCard'; // Revisa si este componente sigue siendo necesario o si usas las clases directamente
import UserRow from '../../components/admin/UserRow'; // Para la tabla de usuarios
import { initialProducts } from '../../data/productsData';
import { initialUsers } from '../../data/usersData';

function AdminDashboard() {
  // Estado para usuarios y productos (simulado)
  const [products, setProducts] = useState(initialProducts);
  const [users, setUsers] = useState([]);

   // Cargar usuarios (simulado desde localStorage o inicial)
   useEffect(() => {
     const storedUsers = localStorage.getItem('huertohogar_users');
     setUsers(storedUsers ? JSON.parse(storedUsers) : initialUsers);
   }, []);

  const productCount = products.length;
  const userCount = users.length;
  // Simulación de ingresos (puedes hacerla más compleja)
  const incomeEstimate = products.reduce((sum, p) => sum + (p.precio * (p.stock || 0)), 0);

  const handleDeleteUser = (userId) => {
    // Implementa la lógica de borrado si es necesario aquí también
    if (confirm('¿Eliminar usuario? Esta acción es permanente.')) {
        const updatedUsers = users.filter(u => u.id !== userId);
        setUsers(updatedUsers);
        localStorage.setItem('huertohogar_users', JSON.stringify(updatedUsers));
        alert('Usuario eliminado desde el dashboard.');
    }
  };


  return (
    <div>
      {/* Topbar similar a home.html */}
      <header className="admin-topbar">
        <h2>Bienvenido, Admin</h2>
        <p>Panel de administración general</p>
      </header>

      {/* Sección de Cards */}
      <section className="dashboard-cards-container" aria-label="Estadísticas rápidas">
        {/* Card Productos */}
        <article className="dashboard-card card-productos">
          <h3>Productos</h3>
          <p>{productCount}</p>
        </article>
        {/* Card Usuarios */}
        <article className="dashboard-card card-usuarios">
          <h3>Usuarios</h3>
          <p>{userCount}</p>
        </article>
        {/* Card Ingresos */}
        <article className="dashboard-card card-ingresos">
          <h3>Ingresos (Estimado)</h3>
          <p>${incomeEstimate.toLocaleString('es-CL')}</p>
        </article>
      </section>

      {/* Sección Tabla Usuarios (como en home.html) */}
      <section className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Usuarios Registrados</h3>
          <Link to="/admin/usuarios/nuevo" className="btn-create-header">
            Crear usuario
          </Link>
        </div>
        {users.length === 0 ? (
           <p>No hay usuarios registrados.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table table table-striped"> {/* Añadir table-striped de bootstrap opcionalmente */}
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Región</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mostrar solo los primeros 5 usuarios o todos */}
                  {users.slice(0, 5).map(user => (
                     <UserRow
                        key={user.id || user.email}
                        user={user}
                        onDelete={handleDeleteUser} // Pasar la función de borrado
                      />
                  ))}
                </tbody>
              </table>
               {users.length > 5 && (
                 <div className="text-center mt-3">
                    <Link to="/admin/usuarios">Ver todos los usuarios...</Link>
                 </div>
               )}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;