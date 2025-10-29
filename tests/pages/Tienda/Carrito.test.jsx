// tests/pages/Tienda/Carrito.test.jsx
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Carrito from '../../../src/pages/Tienda/Carrito'; // Ajusta la ruta

// --- Mocks ---

// Mockear useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate, Link: (props) => <a href={props.to} {...props}>{props.children}</a>, };
});

// Mockear localStorageHelper para carrito
const mockGetCart = vi.fn();
const mockUpdateCartItemQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockClearCart = vi.fn();
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getCart: mockGetCart,
  updateCartItemQuantity: mockUpdateCartItemQuantity,
  removeFromCart: mockRemoveFromCart,
  clearCart: mockClearCart,
}));

// Mock del carrito (2 productos)
const mockCartItems = [
  { id: 'p1', nombre: 'Producto X', precio: 1000, cantidad: 2, imagen: 'imgX.jpg' }, // Total: 2000
  { id: 'p2', nombre: 'Producto Y', precio: 5000, cantidad: 1, imagen: 'imgY.jpg' }, // Total: 5000
];
const SUB_TOTAL_MOCK = 7000;

// Mock de window.confirm
window.confirm = vi.fn();

// ----------------

describe('Pruebas para Carrito (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCart.mockReturnValue(mockCartItems);
    window.confirm.mockReturnValue(true); // Confirma por defecto
    
    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar los productos del carrito y calcular el subtotal', () => {
    // ASSERT: Títulos de productos
    expect(screen.getByText('Producto X')).toBeInTheDocument();
    expect(screen.getByText('Producto Y')).toBeInTheDocument();

    // ASSERT: Subtotal
    expect(screen.getByText(/Subtotal/i).nextElementSibling).toHaveTextContent(`$${SUB_TOTAL_MOCK.toLocaleString('es-CL')}`);
  });

  it('CP2: Debe llamar a updateCartItemQuantity al cambiar la cantidad', async () => {
    // Encontrar la fila del Producto X
    const rowX = screen.getByText('Producto X').closest('tr');
    
    // Encontrar el input de cantidad dentro de esa fila
    const inputCantidadX = within(rowX).getByDisplayValue('2');

    // ACT: Cambiar la cantidad a 5
    fireEvent.change(inputCantidadX, { target: { value: '5' } });
    fireEvent.blur(inputCantidadX); // Simular pérdida de foco para que se dispare el cambio

    // ASSERT: 
    expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith('p1', 5);
  });
  
  it('CP3: Debe llamar a removeFromCart al presionar el botón de eliminar y confirmar', () => {
    // ARRANGE: Encontrar el botón de eliminar del Producto Y (asumiendo que es un ícono o 'Eliminar')
    const btnEliminarY = screen.getAllByRole('button', { name: /Eliminar/i })[1]; // El segundo botón

    // ACT: Presionar eliminar
    fireEvent.click(btnEliminarY);

    // ASSERT:
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromCart).toHaveBeenCalledWith('p2');
  });

  it('CP4: Debe llamar a clearCart al presionar el botón de vaciar carrito', () => {
    // ARRANGE: Encontrar el botón de vaciar
    const btnVaciar = screen.getByRole('button', { name: /Vaciar Carrito/i });

    // ACT: Presionar vaciar
    fireEvent.click(btnVaciar);

    // ASSERT:
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it('CP5: Debe mostrar mensaje de carrito vacío si no hay productos', () => {
    // ARRANGE: Mockeamos que getCart devuelve un array vacío
    mockGetCart.mockReturnValue([]);
    
    // ACT: Re-renderizar
    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    // ASSERT
    expect(screen.getByText(/Tu carrito de compras está vacío/i)).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Continuar compra/i })).not.toBeInTheDocument();
  });
}); 