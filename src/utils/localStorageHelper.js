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

// src/utils/localStorageHelper.js
// ... (otras funciones como getCart, saveCart, etc.)

// --- AÑADE ESTA SECCIÓN PARA CATEGORÍAS ---
const CATEGORIES_KEY = 'huertohogar_categories';

// Datos iniciales si no hay nada guardado
const initialCategories = [
  { key: 'frutas', nombre: 'Frutas' },
  { key: 'verduras', nombre: 'Verduras' },
  { key: 'lacteos', nombre: 'Lácteos' },
  { key: 'organicos', nombre: 'Orgánicos' },
];

// Obtener todas las categorías guardadas
export const getCategories = () => {
  try {
    const storedCategories = localStorage.getItem(CATEGORIES_KEY);
    if (storedCategories) {
      return JSON.parse(storedCategories);
    } else {
      // Si no hay nada, inicializa con las categorías base
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories));
      return initialCategories;
    }
  } catch (e) {
    console.error("Error al leer las categorías", e);
    return initialCategories; // Retorna iniciales en caso de error
  }
};

// Guardar la lista COMPLETA de categorías
export const saveCategories = (categories) => {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    dispatchStorageUpdate(); // Notifica si algo depende de las categorías
  } catch (e) {
    console.error("Error al guardar las categorías", e);
  }
};

// Añadir una nueva categoría (verifica duplicados por 'key')
export const addCategory = (newCategory) => {
  if (!newCategory || !newCategory.key || !newCategory.nombre) return false;
  const categories = getCategories();
  const lowerCaseKey = newCategory.key.toLowerCase().trim().replace(/\s+/g, '-'); // Normaliza la clave
  if (categories.some(cat => cat.key === lowerCaseKey)) {
    console.warn("Intento de añadir categoría duplicada:", lowerCaseKey);
    return false; // Clave ya existe
  }
  const categoryToAdd = { ...newCategory, key: lowerCaseKey }; // Usa la clave normalizada
  categories.push(categoryToAdd);
  saveCategories(categories);
  return true;
};

// Actualizar una categoría existente por su 'key'
export const updateCategory = (categoryKey, updatedData) => {
  let categories = getCategories();
  const index = categories.findIndex(cat => cat.key === categoryKey);
  if (index === -1) return false; // No encontrada

  // No permitimos cambiar la 'key', solo el 'nombre'
  categories[index] = { ...categories[index], nombre: updatedData.nombre };
  saveCategories(categories);
  return true;
};

// Eliminar una categoría por su 'key'
export const deleteCategory = (categoryKey) => {
  let categories = getCategories();
  // **Importante:** Aquí deberías verificar si algún producto usa esta categoría antes de borrarla.
  // Por simplicidad, ahora solo la filtramos.
  // const products = getAdminProducts(); // Necesitarías importar getAdminProducts
  // if (products.some(p => p.categoria === categoryKey)) {
  //   alert(`No se puede eliminar la categoría "${categoryKey}" porque está asignada a uno o más productos.`);
  //   return false;
  // }
  const updatedCategories = categories.filter(cat => cat.key !== categoryKey);
  if (updatedCategories.length === categories.length) return false; // No se encontró/borró
  saveCategories(updatedCategories);
  return true;
};

// Función helper para obtener el nombre legible a partir de la clave
export const getCategoryNameByKey = (key) => {
    const categories = getCategories(); // Lee desde localStorage
    const found = categories.find(cat => cat.key === key);
    return found ? found.nombre : key; // Devuelve nombre o la clave si no se encuentra
};

// ---------------------------------------------

// ... (resto de funciones como dispatchStorageUpdate)