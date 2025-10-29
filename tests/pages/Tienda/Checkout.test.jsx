// tests/pages/Tienda/Checkout.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Checkout from '../../../src/pages/Tienda/Checkout'; // Ajusta la ruta

// --- Mocks ---

// Mockear useNavigate (para verificar la redirección)
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

// Mockear AuthContext
const mockLoggedInUser = {
  id: 'cliente_123',
  nombre: 'Cliente Checkout',
  email: 'checkout@test.com',
  telefono: '+56911223344',
  direccion: 'metropolitana',
  rol: 'Cliente',
};
const mockUseAuth = {
  user: mockLoggedInUser,
  login: vi.fn(),
  logout: vi.fn(),
};
vi.mock('../../../src/context/AuthContext', () => ({
  useAuth: () => mockUseAuth,
}));


// Mockear localStorageHelper para carritos y órdenes
const mockGetCart = vi.fn();
const mockSaveOrder = vi.fn();
const mockClearCart = vi.fn();
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getCart: mockGetCart,
  saveOrder: mockSaveOrder,
  clearCart: mockClearCart,
  getLoggedInUser: () => mockLoggedInUser, // Para que el componente lo cargue
}));

// Mock del carrito (3 productos)
const mockCartItems = [
  { id: 'p1', nombre: 'Producto A', precio: 1000, cantidad: 2 }, // Total: 2000
  { id: 'p2', nombre: 'Producto B', precio: 500, cantidad: 1 },  // Total: 500
  { id: 'p3', nombre: 'Producto C', precio: 1500, cantidad: 3 }, // Total: 4500
];
const SUB_TOTAL_MOCK = 2000 + 500 + 4500; // 7000
const ENVIO_MOCK = 3000;
const TOTAL_MOCK = SUB_TOTAL_MOCK + ENVIO_MOCK; // 10000

// Mock de window.alert
window.alert = vi.fn();

// ----------------

describe('Pruebas para Checkout (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCart.mockReturnValue(mockCartItems);
    
    // Renderiza el componente
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar y mostrar el resumen de la orden con el cálculo correcto', () => {
    // ASSERT: Verifica los totales
    expect(screen.getByText(/Subtotal:/i).nextElementSibling).toHaveTextContent(`$${SUB_TOTAL_MOCK.toLocaleString('es-CL')}`);
    expect(screen.getByText(/Costo de Envío:/i).nextElementSibling).toHaveTextContent(`$${ENVIO_MOCK.toLocaleString('es-CL')}`);
    expect(screen.getByText(/Total a Pagar:/i).nextElementSibling).toHaveTextContent(`$${TOTAL_MOCK.toLocaleString('es-CL')}`);

    // ASSERT: Verifica que los productos estén listados
    expect(screen.getByText(/Producto A/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto B/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto C/i)).toBeInTheDocument();
  });
  
  it('CP2: Debe cargar y rellenar el formulario de envío con los datos del usuario logueado', () => {
    // ARRANGE: Los datos del usuario logueado deberían ser los valores por defecto
    expect(screen.getByLabelText(/Nombre Completo/i)).toHaveValue(mockLoggedInUser.nombre);
    expect(screen.getByLabelText(/Correo Electrónico/i)).toHaveValue(mockLoggedInUser.email);
    expect(screen.getByLabelText(/Teléfono de Contacto/i)).toHaveValue(mockLoggedInUser.telefono);
    expect(screen.getByLabelText(/Región de Envío/i)).toHaveValue(mockLoggedInUser.direccion);
  });

  it('CP3: Debe mostrar error si falta el método de pago al intentar confirmar', async () => {
    // ARRANGE: Cambia la dirección y nombre para simular llenado, pero deja el método de pago sin seleccionar
    fireEvent.change(screen.getByLabelText(/Dirección Exacta de Envío/i), { target: { value: 'Calle de prueba 123' } });

    // ACT: Intenta confirmar sin método de pago
    fireEvent.click(screen.getByRole('button', { name: /Confirmar Compra/i }));

    // ASSERT: Muestra el error
    expect(await screen.findByText(/Debe seleccionar un método de pago/i)).toBeInTheDocument();
    expect(mockSaveOrder).not.toHaveBeenCalled();
  });

  it('CP4: Debe crear la orden y redirigir a PagoExitoso al confirmar la compra', async () => {
    // ARRANGE: Llenar el formulario y seleccionar método de pago
    fireEvent.change(screen.getByLabelText(/Dirección Exacta de Envío/i), { target: { value: 'Calle de prueba 123' } });
    fireEvent.click(screen.getByLabelText(/Transferencia Bancaria/i)); // Asumiendo que es un radio/checkbox

    // ACT: Confirma la compra
    fireEvent.click(screen.getByRole('button', { name: /Confirmar Compra/i }));

    // ASSERT
    // 1. Debe llamar a saveOrder
    expect(mockSaveOrder).toHaveBeenCalledTimes(1);
    
    // 2. Verifica el contenido de la orden guardada (parcialmente)
    const savedOrder = mockSaveOrder.mock.calls[0][0]; 
    expect(savedOrder.total).toBe(TOTAL_MOCK);
    expect(savedOrder.productos.length).toBe(3);
    expect(savedOrder.cliente.email).toBe(mockLoggedInUser.email);
    expect(savedOrder.metodoPago).toBe('Transferencia Bancaria');

    // 3. Debe limpiar el carrito
    expect(mockClearCart).toHaveBeenCalledTimes(1);
    
    // 4. Debe navegar a la página de éxito
    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/pago-exitoso', { state: { orderId: savedOrder.id } });
    });
  });

  it('CP5: Debe redirigir a /carrito si el carrito está vacío', () => {
    // ARRANGE: Mockeamos que getCart devuelve un carrito vacío
    mockGetCart.mockReturnValue([]);
    
    // ACT: Re-renderizar (simulando que llega con carrito vacío)
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    // ASSERT: Debe redirigir inmediatamente
    expect(mockNavigate).toHaveBeenCalledWith('/carrito');
    expect(screen.queryByRole('button', { name: /Confirmar Compra/i })).not.toBeInTheDocument();
  });
});