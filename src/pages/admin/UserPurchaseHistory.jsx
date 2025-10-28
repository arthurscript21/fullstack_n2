// src/pages/admin/UserPurchaseHistory.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrders } from '../../utils/localStorageHelper'; // Importa getOrders
import { getUsersList } from '../../utils/localStorageHelper'; // Para obtener nombre si es necesario

function UserPurchaseHistory() {
  const { userIdentifier } = useParams(); // Obtiene el email codificado de la URL
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Decodifica el identificador para obtener el email real
    const decodedEmail = decodeURIComponent(userIdentifier);
    setUserEmail(decodedEmail);

    // Opcional: Buscar el nombre del usuario
    const users = getUsersList();
    const currentUser = users.find(u => u.email === decodedEmail);
    setUserName(currentUser ? currentUser.nombre : decodedEmail); // Muestra email si no encuentra nombre

    // Carga todas las órdenes y filtra por email del cliente
    const allOrders = getOrders();
    const filteredOrders = allOrders.filter(order => order.cliente?.email === decodedEmail);

    // Ordena por fecha (más reciente primero)
    filteredOrders.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    setUserOrders(filteredOrders);
    setLoading(false);
  }, [userIdentifier]); // Depende del identificador en la URL

  // Funciones de formato (puedes moverlas a un helper)
  const formatDate = (dateString) => {
    if (!dateString) return '-'; try { const op={year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}; return new Date(dateString).toLocaleDateString('es-CL', op); } catch(e){ return dateString; }
  };
  const formatPrice = (price) => { if(typeof price!=='number'||isNaN(price)) return '$???'; return new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',minimumFractionDigits:0}).format(price); };

  if (loading) return <p>Cargando historial de compras...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Muestra el nombre o email del usuario */}
        <h3>Historial de Compras: {userName}</h3>
        <Link to="/admin/usuarios" className="btn btn-outline-secondary">
          ← Volver a Usuarios
        </Link>
      </div>

      {userOrders.length === 0 ? (
        <div className="alert alert-info">
          Este usuario no tiene órdenes registradas.
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID Orden</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map(order => (
                <tr key={order.id}>
                  {/* ID corto */}
                  <td>{order.id.substring(order.id.lastIndexOf('_') + 1)}</td>
                  <td>{formatDate(order.fecha)}</td>
                  <td>{formatPrice(order.total)}</td>
                  <td>
                    <span className={`badge ${
                        order.estado === 'Pendiente' ? 'bg-warning text-dark' :
                        order.estado === 'Enviado' ? 'bg-info text-dark' :
                        order.estado === 'Entregado' ? 'bg-success' : 'bg-secondary'
                      }`}>
                      {order.estado || 'Desconocido'}
                    </span>
                  </td>
                  <td>
                    {/* Enlace al detalle de la orden */}
                    <Link
                      to={`/admin/ordenes/${order.id}`} // Enlace a la vista de detalle existente
                      className="btn btn-sm btn-outline-primary"
                      title="Ver Detalles de la Orden"
                    >
                      Ver Orden
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserPurchaseHistory;