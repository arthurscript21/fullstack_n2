// tests/pages/admin/AdminOrderDetail.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import AdminOrderDetail from '../../../src/pages/admin/AdminOrderDetail';

// Mock del helper
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getOrders: vi.fn(),
}));
import { getOrders } from '../../../src/utils/localStorageHelper';

// Mock de datos
const mockOrder = {
  id: 'orden_123',
  fecha: '2025-10-28T10:00:00Z',
  cliente: { nombre: 'Cliente A', email: 'a@test.com', direccion: 'Calle Falsa 123', comuna: 'Springfield' },
  items: [
    { id: 'P1', nombre: 'Producto 1', cantidad: 2, precioUnitarioPagado: 1000 },
  ],
  envio: 500,
  total: 2500,
  estado: 'Pendiente'
};

// Wrapper para simular la ruta
const renderComponent = (orderId) => {
  return render(
    // MemoryRouter es para probar rutas. Le decimos que estamos en /admin/ordenes/ID
    <MemoryRouter initialEntries={[`/admin/ordenes/${orderId}`]}>
      <Routes>
        {/* La ruta DEBE coincidir con la de App.jsx */}
        <Route path="/admin/ordenes/:id" element={<AdminOrderDetail />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Pruebas para AdminOrderDetail', () => {

  beforeEach(() => { vi.clearAllMocks(); });

  it('CP1: Debe mostrar los detalles de la orden si el ID es válido', () => {
    // ARRANGE
    getOrders.mockReturnValue([mockOrder]); // Simula que la orden existe
    renderComponent('orden_123'); // Renderiza en la URL /admin/ordenes/orden_123

    // ASSERT
    expect(screen.getByText(/Detalle Orden #123/i)).toBeInTheDocument();
    expect(screen.getByText('Cliente A')).toBeInTheDocument();
    expect(screen.getByText('a@test.com')).toBeInTheDocument();
    expect(screen.getByText('Calle Falsa 123')).toBeInTheDocument();
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('$2.500')).toBeInTheDocument(); // Total
  });

  it('CP2: Debe mostrar "Orden no encontrada" si el ID es inválido', () => {
    // ARRANGE
    getOrders.mockReturnValue([mockOrder]); // La lista tiene la orden 123
    renderComponent('ID_FALSO'); // Renderiza en la URL /admin/ordenes/ID_FALSO

    // ASSERT
    expect(screen.getByText('Orden no encontrada')).toBeInTheDocument();
    expect(screen.queryByText('Cliente A')).not.toBeInTheDocument(); // Asegura que no se muestren datos
  });

  it('CP3: Debe tener un enlace para "Volver a Órdenes"', () => {
    // ARRANGE
    getOrders.mockReturnValue([mockOrder]);
    renderComponent('orden_123');
    
    // ASSERT
    const link = screen.getByRole('link', { name: /Volver a Órdenes/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/admin/ordenes');
  });
});