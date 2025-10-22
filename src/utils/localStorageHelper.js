// src/utils/localStorageHelper.js

// Claves para guardar en localStorage
const CART_KEY = 'huertoHogarCart'; // Cambiado para evitar conflictos
const USER_KEY = 'huertoHogarUser'; // Cambiado para evitar conflictos
const USERS_LIST_KEY = 'huertoHogarUsersList'; // Para la lista de usuarios registrados

// --- Funciones Genéricas ---
const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (ex) {
        console.error("Error guardando en localStorage:", key, ex);
    }
};

const loadFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (ex) {
        console.error("Error cargando desde localStorage:", key, ex);
        return null; // Devuelve null en caso de error de parseo
    }
};

const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (ex) {
        console.error("Error eliminando de localStorage:", key, ex);
    }
};

// --- Funciones Específicas del Carrito ---
export const getCart = () => loadFromLocalStorage(CART_KEY) || []; // Devuelve array vacío si no hay nada

export const saveCart = (cart) => saveToLocalStorage(CART_KEY, cart);

export const clearCart = () => removeFromLocalStorage(CART_KEY);

// --- Funciones Específicas del Usuario Logueado ---
export const getLoggedInUser = () => loadFromLocalStorage(USER_KEY);

export const saveLoggedInUser = (user) => saveToLocalStorage(USER_KEY, user);

export const clearLoggedInUser = () => removeFromLocalStorage(USER_KEY);

// --- Funciones para la Lista de Usuarios Registrados ---
export const getUsersList = () => loadFromLocalStorage(USERS_LIST_KEY) || []; // Devuelve array vacío

export const saveUsersList = (users) => saveToLocalStorage(USERS_LIST_KEY, users);

export const addUserToList = (newUser) => {
    const users = getUsersList();
    // Simple verificación para evitar duplicados por email
    if (!users.some(user => user.email === newUser.email)) {
        users.push(newUser);
        saveUsersList(users);
        return true; // Indica éxito
    }
    return false; // Indica que el email ya existe
};

// --- Disparador de eventos para actualizar UI ---
// (Una forma simple de notificar cambios a otros componentes como Navbar)
export const dispatchStorageUpdate = () => {
    window.dispatchEvent(new Event('storageUpdated'));
};