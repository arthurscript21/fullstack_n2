// src/utils/localStorageHelper.js

// Claves
const CART_KEY = 'huertohogar_cart';
const USER_KEY = 'huertohogar_user';
const USERS_LIST_KEY = 'huertohogar_users';

// --- Carrito ---
export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (e) { console.error("Error leer carrito", e); return []; }
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  dispatchStorageUpdate();
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  dispatchStorageUpdate();
};

// --- Autenticación ---
export const saveLoggedInUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getLoggedInUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (e) { console.error("Error leer usuario", e); return null; }
};

// --- FUNCIÓN DE LOGOUT (¡REVISA ESTA LÍNEA!) ---
export const logoutUser = () => { // <--- ASEGÚRATE QUE TENGA 'export' Y EL NOMBRE SEA EXACTO
    localStorage.removeItem(USER_KEY);
    dispatchStorageUpdate(); // Avisa que el usuario cerró sesión
};

export const saveUsersList = (users) => {
    try {
        localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
    } catch (e) {
        console.error("Error al guardar lista de usuarios", e);
    }
};

export const getUsersList = () => {
    try {
        const users = localStorage.getItem(USERS_LIST_KEY);
        return users ? JSON.parse(users) : [];
    } catch (e) { console.error("Error leer lista usuarios", e); return []; }
};

export const addUserToList = (newUser) => {
    const users = getUsersList();
    if (users.some(u => u.email === newUser.email)) {
        return false; // Usuario ya existe
    }
    users.push(newUser);
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
    return true; // Usuario agregado
};

// --- Evento ---
export const dispatchStorageUpdate = () => {
  window.dispatchEvent(new Event('storageUpdate')); // Asegúrate que el evento sea 'storageUpdate'
};