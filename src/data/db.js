// src/data/db.js

// 1. Datos simulados (Frutas y Verduras)
const productos = [
  {
    id: 1,
    nombre: "Manzana Fuji",
    precio: 1290,
    stock: 150,
    categoria: "Frutas",
    unidad: "kg" // Añadí unidad como ejemplo
  },
  {
    id: 2,
    nombre: "Lechuga Costina",
    precio: 890,
    stock: 80,
    categoria: "Verduras",
    unidad: "unidad"
  },
  {
    id: 3,
    nombre: "Plátano",
    precio: 1390,
    stock: 200,
    categoria: "Frutas",
    unidad: "kg"
  },
  {
    id: 4,
    nombre: "Tomate Larga Vida",
    precio: 1590,
    stock: 120,
    categoria: "Verduras",
    unidad: "kg"
  },
  {
    id: 5,
    nombre: "Palta Hass",
    precio: 4990,
    stock: 70,
    categoria: "Verduras",
    unidad: "kg"
  }
];

// 2. Funciones CRUD (Crear, Leer, Actualizar, Eliminar)

/**
 * Función para "Leer" (Read) todos los productos.
 * En una app real, aquí harías: return fetch('mi-api/productos')
 */
export const getProductos = () => {
  return productos;
}

// (Más adelante agregaremos crearProducto, actualizarProducto, etc.)