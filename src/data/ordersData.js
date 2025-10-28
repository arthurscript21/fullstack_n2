// src/data/ordersData.js
// Datos simulados de órdenes para el panel de admin

export const initialOrders = [
  {
    id: 'ORD-001',
    fecha: '2024-10-25T10:30:00Z',
    clienteNombre: 'Cliente Ejemplo',
    clienteEmail: 'cliente@ejemplo.com',
    direccion: 'Av. Principal 123, Santiago, Metropolitana',
    estado: 'Completado',
    items: [
      { id: 'FR001', nombre: 'Manzanas Fuji', precio: 1200, cantidad: 2 },
      { id: 'VR001', nombre: 'Zanahorias Orgánicas', precio: 900, cantidad: 1 },
    ],
    subtotal: 3300,
    envio: 2500,
    total: 5800,
  },
  {
    id: 'ORD-002',
    fecha: '2024-10-24T15:45:00Z',
    clienteNombre: 'Admin Ejemplo',
    clienteEmail: 'admin@ejemplo.com',
    direccion: 'Calle Falsa 456, Valparaíso, Valparaíso',
    estado: 'Pendiente',
    items: [
      { id: 'PL003', nombre: 'Queso de Cabra', precio: 4590, cantidad: 1 },
    ],
    subtotal: 4590,
    envio: 2500,
    total: 7090,
  },
  {
    id: 'ORD-003',
    fecha: '2024-10-23T11:00:00Z',
    clienteNombre: 'Juan Pérez',
    clienteEmail: 'juan.perez@gmail.com',
    direccion: 'El Roble 789, Concepción, Biobío',
    estado: 'Enviado',
    items: [
      { id: 'FR002', nombre: 'Naranjas Valencia', precio: 1000, cantidad: 5 },
      { id: 'PL001', nombre: 'Leche Entera', precio: 1200, cantidad: 2 },
      { id: 'PO001', nombre: 'Miel Orgánica', precio: 3990, cantidad: 1 },
    ],
    subtotal: 11390,
    envio: 2500,
    total: 13890,
  },
];

// Función para obtener todas las órdenes (simulada)
export const getOrders = () => {
  // En un futuro, aquí podrías leer de localStorage si guardas órdenes
  return initialOrders;
};

// Función para obtener una orden por ID
export const getOrderById = (id) => {
  return initialOrders.find(order => order.id === id);
};