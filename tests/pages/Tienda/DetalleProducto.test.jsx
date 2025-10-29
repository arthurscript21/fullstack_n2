// tests/pages/Tienda/DetalleProducto.test.jsx - CORREGIDO
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import DetalleProducto from '../../../src/pages/Tienda/DetalleProducto';

// --- Mocks ---
const mockNavigate = vi.fn();
let mockProductId = 'prod_1'; 
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ productId: mockProductId }),
    Link: (props) => <a href={props.to} {...props}>{props.children}</a>, 
  };
});

// Solución Hoisting: Declarar los mocks fuera del vi.mock
const mockGetProductById = vi.fn();
const mockAddProductToCart = vi.fn();
vi.mock('../../../src/utils/localStorageHelper', () => ({
    getProductById: mockGetProductById,
    addProductToCart: mockAddProductToCart,
}));

const mockProduct = {
  id: 'prod_1',
  nombre: 'Tomate Cherry',
  descripcion: 'Los mejores tomates para ensaladas.',
  precio: 5000,
  stock: 20,
  imagen: 'imagen_tomate.jpg',
};
// ----------------

describe('Pruebas para DetalleProducto (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockProductId = 'prod_1';
    mockGetProductById.mockReturnValue(mockProduct);
    mockAddProductToCart.mockReturnValue(true);

    render(<BrowserRouter><DetalleProducto /></BrowserRouter>);
  });

  it('CP3: Debe llamar a addProductToCart y navegar al carrito al añadir', async () => {
    const btnAgregar = screen.getByRole('button', { name: /Agregar al Carrito/i });
    const inputCantidad = screen.getByDisplayValue('1');

    fireEvent.change(inputCantidad, { target: { value: '3' } });

    fireEvent.click(btnAgregar);

    // 1. Verificar llamada al mock
    expect(mockAddProductToCart).toHaveBeenCalledWith(mockProduct, 3);
    
    // 2. Esperar a que la redirección ocurra
    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/carrito'); 
    });
  });
});