// src/data/usersData.js
// En una app real, esto vendría de una API o localStorage persistente.
// Usamos un array simple para el ejemplo.

export const initialUsers = [
  // Puedes precargar usuarios si lo deseas, similar a users.json
   { id: 'u_1', nombre: 'Admin Ejemplo', email: 'admin@ejemplo.com', telefono: '+56911111111', direccion: 'metropolitana', rol: 'Admin' },
   { id: 'u_2', nombre: 'Cliente Ejemplo', email: 'cliente@ejemplo.com', telefono: '+56922222222', direccion: 'valparaiso', rol: 'Cliente' },
];



export function addUser(users, newUser) {
  if (users.some(u => u.email === newUser.email)) {
    alert('El correo ya está registrado');
    return users; 
  }
  return [...users, { ...newUser, id: `u_${Date.now()}` }];
}

export function deleteUser(users, userId) {
    return users.filter(u => u.id !== userId);
}
