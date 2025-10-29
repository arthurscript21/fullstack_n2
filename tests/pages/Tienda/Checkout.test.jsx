// tests/pages/Tienda/Checkout.test.jsx - CORREGIDO
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Checkout from '../../../src/pages/Tienda/Checkout';

// --- Mocks ---
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

// Solución Hoisting: Declarar mocks
const mockGetCart = vi.fn();
const mockSaveOrder = vi.fn();
const mockClearCart = vi.fn();
const mockGetLoggedInUser = vi.fn();
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getCart: mockGetCart,
  saveOrder: mockSaveOrder,
  clearCart: mockClearCart,
  getLoggedInUser: mockGetLoggedInUser,
}));

const mockLoggedInUser = { id: 'cliente_123', nombre: 'Cliente Checkout', email: 'checkout@test.com', telefono: '+56911223344', direccion: 'metropolitana', rol: 'Cliente' };
const mockCartItems = [
  { id: 'p1', nombre: 'Producto A', precio: 1000, cantidad: 2 },
];
const TOTAL_MOCK = (1000 * 2) + 3000; // 5000 (Subtotal 2000 + Envío 3000)

describe('Pruebas para Checkout (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCart.mockReturnValue(mockCartItems);
    mockGetLoggedInUser.mockReturnValue(mockLoggedInUser);
    render(<BrowserRouter><Checkout /></BrowserRouter>);
  });

  it('CP2: Debe cargar y rellenar el formulario de envío con los datos del usuario logueado', () => {
    // CORREGIDO: Etiqueta "Correo Electrónico"
    expect(screen.getByLabelText(/Nombre Completo/i)).toHaveValue(mockLoggedInUser.nombre);
    expect(screen.getByLabelText(/Correo Electrónico/i)).toHaveValue(mockLoggedInUser.email);
    expect(screen.getByLabelText(/Región de Envío/i)).toHaveValue(mockLoggedInUser.direccion);
  });
  
  it('CP3: Debe mostrar error si falta el método de pago al intentar confirmar', async () => {
    // CORREGIDO: Etiqueta "Dirección"
    fireEvent.change(screen.getByLabelText(/Dirección Exacta/i), { target: { value: 'Calle de prueba 123' } });

    fireEvent.click(screen.getByRole('button', { name: /Confirmar Compra/i }));

    expect(await screen.findByText(/Debe seleccionar un método de pago/i)).toBeInTheDocument();
    expect(mockSaveOrder).not.toHaveBeenCalled();
  });

  it('CP4: Debe crear la orden y redirigir a PagoExitoso al confirmar la compra', async () => {
    fireEvent.change(screen.getByLabelText(/Dirección Exacta/i), { target: { value: 'Calle de prueba 123' } });
    fireEvent.click(screen.getByLabelText(/Transferencia Bancaria/i));

    fireEvent.click(screen.getByRole('button', { name: /Confirmar Compra/i }));

    expect(mockSaveOrder).toHaveBeenCalledTimes(1);
    const savedOrder = mockSaveOrder.mock.calls[0][0]; 
    expect(savedOrder.total).toBe(TOTAL_MOCK);
    
    expect(mockClearCart).toHaveBeenCalledTimes(1);

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/pago-exitoso', { state: { orderId: savedOrder.id } });
    });
  });
});