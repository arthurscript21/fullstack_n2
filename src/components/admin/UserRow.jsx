// src/components/admin/UserRow.jsx
import React from "react";
import { Link } from "react-router-dom";

function UserRow({ user, onDelete }) {
  // Codificamos el email para usarlo de forma segura en la URL
  const userIdentifier = encodeURIComponent(user.email);

  return (
    <tr>
      <td>{user.nombre}</td>
      <td>{user.email}</td>
      <td>{user.telefono || "-"}</td>
      <td>{user.direccion || "-"}</td>
      <td>{user.rol || "Cliente"}</td>
      <td>
        <Link
          to={`/admin/usuarios/editar/${user.id}`}
          className="btn btn-warning btn-sm me-2"
          title="Editar Usuario"
        >
          Editar
        </Link>
        {/* --- AÑADIR BOTÓN HISTORIAL --- */}
        <Link
          to={`/admin/usuarios/historial/${userIdentifier}`} // Usamos el email codificado
          className="btn btn-info btn-sm me-2" // Estilo azul claro
          title="Ver Historial de Compras"
        >
          Historial
        </Link>
        {/* ----------------------------- */}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(user.id)}
          title="Eliminar Usuario"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default UserRow;