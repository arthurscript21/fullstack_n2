// src/components/admin/UserRow.jsx
import React from 'react';

function UserRow({ user, onDelete }) {
  return (
    <tr>
      <td>{user.nombre}</td>
      <td>{user.email}</td>
      <td>{user.telefono || '-'}</td> {/* Mostrar '-' si no hay teléfono */}
      <td>{user.direccion || '-'}</td> {/* Mostrar '-' si no hay región/dirección */}
      <td>{user.rol || 'Cliente'}</td> {/* Rol por defecto */}
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(user.id)} // Llama a la función onDelete pasada como prop
        >
          Eliminar
        </button>
        {/* Podrías añadir un botón de Editar aquí */}
      </td>
    </tr>
  );
}

export default UserRow;