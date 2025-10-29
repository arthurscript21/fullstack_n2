// tests/pages/admin/AdminOrders.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AdminOrders from '../../../src/pages/admin/AdminOrders';

// Mock del helper
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getOrders: vi.fn(),
}));
import { getOrders } from '../../../src/utils/localStorageHelper';

// Mocks de datos
const mockOrders = [
  { id: 'orden_1', fecha: '2025-10-28T10:00:00Z', cliente: { nombre: 'Cliente A', email: 'a@test.com' }, total: 5000, estado: 'Pendiente' },
  { id: 'orden_2', fecha: '2025-10-27T10:00:00Z', cliente: { nombre: 'Cliente B', email: 'b@test.com' }, total: 15000, estado: 'Entregado' },
];

describe('Pruebas para AdminOrders', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('CP1: Debe renderizar el título y la tabla cuando hay órdenes', () => {
    // ARRANGE
    getOrders.mockReturnValue(mockOrders); // Simula que hay órdenes
    render(<BrowserRouter><AdminOrders /></BrowserRouter>);

    // ASSERT
    expect(screen.getByText('Órdenes Recibidas')).toBeInTheDocument();
    // Verifica cabeceras de la tabla
    expect(screen.getByText('Fecha')).toBeInTheDocument();
    expect(screen.getByText('Cliente')).toBeInTheDocument();
    // Verifica datos de las órdenes
    expect(screen.getByText('Cliente A')).toBeInTheDocument();
    expect(screen.getByText('Cliente B')).toBeInTheDocument();
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
    expect(screen.getByText('Entregado')).toBeInTheDocument();
  });

  it('CP2: Debe mostrar un mensaje si no hay órdenes (Renderizado Condicional)', () => {
    // ARRANGE
    getOrders.mockReturnValue([]); // Simula un array vacío
    render(<BrowserRouter><AdminOrders /></BrowserRouter>);

    // ASSERT
    expect(screen.getByText('Órdenes Recibidas')).toBeInTheDocument();
    expect(screen.getByText('No hay órdenes registradas.')).toBeInTheDocument();
    // Verifica que la tabla NO se renderizó
    expect(screen.queryByText('Cliente')).not.toBeInTheDocument();
  });

  it('CP3: Debe renderizar un enlace de "Detalles" para cada orden', () => {
    // ARRANGE
    getOrders.mockReturnValue(mockOrders);
    render(<BrowserRouter><AdminOrders /></BrowserRouter>);

    // ACT
    // Busca todos los enlaces/botones con el texto "Detalles"
    const detailLinks = screen.getAllByRole('link', { name: /Detalles/i });

    // ASSERT
    expect(detailLinks).toHaveLength(2); // Debe haber 2 enlaces (uno por cada orden mock)
    // Verifica que el primer enlace apunte al ID correcto
    expect(detailLinks[0]).toHaveAttribute('href', '/admin/ordenes/orden_1');
  });
});