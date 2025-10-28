// src/utils/localStorageHelper.js

// Claves (constantes para evitar errores de tipeo)
const CART_KEY = 'huertohogar_cart';
const USER_KEY = 'huertohogar_user';
const USERS_LIST_KEY = 'huertohogar_users';
const ORDERS_KEY = 'huertohogar_orders'; // Clave para órdenes

// --- Carrito ---
export const getCart = () => {
  try { const cart = localStorage.getItem(CART_KEY); return cart ? JSON.parse(cart) : []; }
  catch (e) { console.error("Error leer carrito", e); return []; }
};
export const saveCart = (cart) => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); dispatchStorageUpdate(); };
export const clearCart = () => { localStorage.removeItem(CART_KEY); dispatchStorageUpdate(); };

// --- Autenticación ---
export const saveLoggedInUser = (user) => { localStorage.setItem(USER_KEY, JSON.stringify(user)); };
export const getLoggedInUser = () => {
  try { const user = localStorage.getItem(USER_KEY); return user ? JSON.parse(user) : null; }
  catch (e) { console.error("Error leer usuario", e); return null; }
};
export const logoutUser = () => { localStorage.removeItem(USER_KEY); dispatchStorageUpdate(); };

// --- Lista de Usuarios ---
export const getUsersList = () => {
  try { const users = localStorage.getItem(USERS_LIST_KEY); return users ? JSON.parse(users) : []; }
  catch (e) { console.error("Error leer lista usuarios", e); return []; }
};
export const addUserToList = (newUser) => {
  const users = getUsersList(); if (users.some(u => u.email === newUser.email)) return false;
  users.push(newUser); localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users)); return true;
};
export const saveUsersList = (users) => { // Para editar perfil
  try { localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users)); }
  catch (e) { console.error("Error guardar lista usuarios", e); }
};

// --- ÓRDENES (¡AQUÍ ESTÁ!) ---
// Obtener todas las órdenes guardadas
export const getOrders = () => { // <--- ¡ASEGÚRATE QUE ESTA FUNCIÓN EXISTA Y TENGA 'export'!
  try {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : []; // Devuelve array vacío si no hay órdenes
  } catch (e) {
    console.error("Error al leer las órdenes", e);
    return [];
  }
};

// Guardar una nueva orden
export const saveOrder = (newOrder) => { // <--- ¡ASEGÚRATE QUE ESTA FUNCIÓN EXISTA Y TENGA 'export'!
  try {
    const orders = getOrders(); // Obtiene las órdenes existentes
    orders.push(newOrder); // Añade la nueva orden al array
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); // Guarda el array actualizado
    return true;
  } catch (e) {
    console.error("Error al guardar la orden", e);
    return false;
  }
};
// ------------------------------

// --- Evento de Actualización ---
export const dispatchStorageUpdate = () => {
  window.dispatchEvent(new Event('storageUpdate'));
};