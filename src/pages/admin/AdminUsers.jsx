// src/pages/admin/AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserRow from '../../components/admin/UserRow';
import { initialUsers } from '../../data/usersData'; 

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 

  // Simular carga de datos (reemplazar con fetch o carga inicial)
  useEffect(() => {
    // Intentar cargar desde localStorage o usar datos iniciales
    const storedUsers = localStorage.getItem('huertohogar_users');
    if (storedUsers) {
        try {
            setUsers(JSON.parse(storedUsers));
        } catch (error) {
            console.error("Error parsing users from localStorage:", error);
            setUsers(initialUsers); // Usar iniciales si hay error
            localStorage.setItem('huertohogar_users', JSON.stringify(initialUsers)); 
            // Guardar iniciales
        }
    } else {
        setUsers(initialUsers);
        localStorage.setItem('huertohogar_users', JSON.stringify(initialUsers)); 
        // Guardar iniciales
    }
    setLoading(false);
  }, []);

  // Función para eliminar usuario
  const handleDeleteUser = (userId) => {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('huertohogar_users', JSON.stringify(updatedUsers)); // Actualizar localStorage
      alert('Usuario eliminado.');
    }
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Usuarios Registrados</h1>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
          Crear Usuario
        </Link>
      </div>

      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Región/Dirección</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <UserRow
                  key={user.id || user.email} 
                  // Usar email como fallback si no hay id
                  user={user}
                  onDelete={handleDeleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;