// src/components/admin/UserRow.jsx
import React from "react";
import { Link } from "react-router-dom"; // <-- Importar Link

function UserRow({ user, onDelete }) {
  return (
    <tr>
      <td>{user.nombre}</td>
      <td>{user.email}</td>
      <td>{user.telefono || "-"}</td>
      <td>{user.direccion || "-"}</td>
      <td>{user.rol || "Cliente"}</td>
      <td>
        {/* --- AÑADIR BOTÓN EDITAR --- */}
        <Link
          to={`/admin/usuarios/editar/${user.id}`}
          className="btn btn-warning btn-sm me-2"
        >
          Editar
        </Link>
        {/* --------------------------- */}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(user.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
