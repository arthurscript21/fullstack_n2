// tests/pages/Tienda/Carrito.test.jsx - CORREGIDO
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Carrito from '../../../src/pages/Tienda/Carrito';

// --- Mocks ---
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate, Link: (props) => <a href={props.to} {...props}>{props.children}</a>, };
});

// Solución al error de Hoisting: Declarar los mocks antes del vi.mock
const mockGetCart = vi.fn();
const mockUpdateCartItemQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockClearCart = vi.fn();
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getCart: mockGetCart,
  updateCartItemQuantity: mockUpdateCartItemQuantity,
  removeFromCart: mockRemoveFromCart,
  clearCart: mockClearCart,
  getProductById: vi.fn(), // Añadido por si se usa
}));

const mockCartItems = [
  { id: 'p1', nombre: 'Producto X', precio: 1000, cantidad: 2, imagen: 'imgX.jpg', stock: 10 },
  { id: 'p2', nombre: 'Producto Y', precio: 5000, cantidad: 1, imagen: 'imgY.jpg', stock: 10 },
];
const SUB_TOTAL_MOCK = 7000;
window.confirm = vi.fn();

describe('Pruebas para Carrito (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCart.mockReturnValue(mockCartItems);
    window.confirm.mockReturnValue(true);
    
    render(<BrowserRouter><Carrito /></BrowserRouter>);
  });

  it('CP1: Debe renderizar los productos del carrito y calcular el subtotal', () => {
    expect(screen.getByText('Producto X')).toBeInTheDocument();
    // CORREGIDO: Subtotal más robusto
    const subtotalText = screen.getByText(/Subtotal/i);
    expect(subtotalText.closest('tr').cells[1]).toHaveTextContent(`$${SUB_TOTAL_MOCK.toLocaleString('es-CL')}`);
  });

  it('CP2: Debe llamar a updateCartItemQuantity al cambiar la cantidad', async () => {
    const rowX = screen.getByText('Producto X').closest('tr');
    const inputCantidadX = within(rowX).getByDisplayValue('2');
    fireEvent.change(inputCantidadX, { target: { value: '5' } });
    fireEvent.blur(inputCantidadX); 

    expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith('p1', 5);
  });
  
  it('CP3: Debe llamar a removeFromCart al presionar el botón de eliminar y confirmar', () => {
    // Busca el primer botón de eliminar
    const btnEliminarY = screen.getAllByRole('button', { name: /Eliminar/i })[0]; 
    fireEvent.click(btnEliminarY);

    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromCart).toHaveBeenCalledWith('p1');
  });

  it('CP5: Debe mostrar mensaje de carrito vacío si no hay productos', () => {
    mockGetCart.mockReturnValue([]);
    render(<BrowserRouter><Carrito /></BrowserRouter>);

    expect(screen.getByText(/Tu carrito de compras está vacío/i)).toBeInTheDocument();
  });
});