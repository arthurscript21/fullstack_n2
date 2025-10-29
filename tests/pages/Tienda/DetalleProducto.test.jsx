// tests/pages/Tienda/DetalleProducto.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import DetalleProducto from '../../../src/pages/Tienda/DetalleProducto'; // Ajusta la ruta

// --- Mocks ---

// Mockear react-router-dom
const mockNavigate = vi.fn();
// Mockear useParams para simular el ID del producto en la URL
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

// Mockear localStorageHelper para simular la búsqueda y adición al carrito
const mockGetProductById = vi.fn();
const mockAddProductToCart = vi.fn();
vi.mock('../../../src/utils/localStorageHelper', () => ({
    getProductById: mockGetProductById,
    addProductToCart: mockAddProductToCart,
}));

// Producto de prueba
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
    // Simular que el producto existe
    mockGetProductById.mockReturnValue(mockProduct);
    // Simular que addProductToCart es exitoso
    mockAddProductToCart.mockReturnValue(true);

    render(
      <BrowserRouter>
        <DetalleProducto />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar el detalle del producto cargado', () => {
    // ASSERT: Título, descripción y precio
    expect(screen.getByRole('heading', { name: /Tomate Cherry/i })).toBeInTheDocument();
    expect(screen.getByText(/Los mejores tomates para ensaladas/i)).toBeInTheDocument();
    // Verifica que el precio esté formateado (asumiendo que el componente lo hace)
    expect(screen.getByText(/\$5.000/i)).toBeInTheDocument();
    // El stock debe aparecer
    expect(screen.getByText(/20 unidades disponibles/i)).toBeInTheDocument();
  });

  it('CP2: Debe manejar la cantidad del producto (aumentar y disminuir)', () => {
    const inputCantidad = screen.getByDisplayValue('1');
    const btnAumentar = screen.getByRole('button', { name: /\+/i });
    const btnDisminuir = screen.getByRole('button', { name: /-/i });

    // Aumentar a 2
    fireEvent.click(btnAumentar);
    expect(inputCantidad).toHaveValue(2);

    // Aumentar al máximo de stock (si el componente lo limita, este test falla o se ajusta)
    // Asumimos que podemos aumentar más
    fireEvent.change(inputCantidad, { target: { value: '15' } });
    expect(inputCantidad).toHaveValue(15);
    
    // Disminuir a 1
    fireEvent.click(btnDisminuir);
    expect(inputCantidad).toHaveValue(14);

    // Intentar disminuir por debajo de 1
    fireEvent.change(inputCantidad, { target: { value: '1' } });
    fireEvent.click(btnDisminuir);
    // Debe permanecer en 1
    expect(inputCantidad).toHaveValue(1); 
  });

  it('CP3: Debe llamar a addProductToCart y navegar al carrito al añadir', async () => {
    const btnAgregar = screen.getByRole('button', { name: /Agregar al Carrito/i });
    const inputCantidad = screen.getByDisplayValue('1');

    // ARRANGE: Cambiar la cantidad a 3
    fireEvent.change(inputCantidad, { target: { value: '3' } });

    // ACT
    fireEvent.click(btnAgregar);

    // ASSERT
    // 1. Verificar llamada al mock
    expect(mockAddProductToCart).toHaveBeenCalledWith(mockProduct, 3);
    
    // 2. Esperar a que la redirección ocurra (asumiendo un pequeño delay o función inmediata)
    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/carrito'); 
    });
  });

  it('CP4: Debe mostrar mensaje de error si el producto no se encuentra', () => {
    // ARRANGE: Mockear que el producto no existe
    mockGetProductById.mockReturnValue(null); 

    // ACT: Re-renderizar con el mock actualizado
    render(
        <BrowserRouter><DetalleProducto /></BrowserRouter>
    );

    // ASSERT: Debe mostrar el mensaje de error o redireccionar. 
    // Asumiendo que muestra un mensaje de error simple:
    expect(screen.getByText(/Producto no encontrado/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Agregar al Carrito/i })).not.toBeInTheDocument();
  });

  it('CP5: Debe mostrar el botón "Sin Stock" si el stock es 0', () => {
    // ARRANGE: Mockear un producto sin stock
    mockGetProductById.mockReturnValue({ ...mockProduct, stock: 0 }); 

    // ACT: Re-renderizar
    render(
        <BrowserRouter><DetalleProducto /></BrowserRouter>
    );

    // ASSERT
    expect(screen.getByText(/Sin Stock/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Agregar al Carrito/i })).not.toBeInTheDocument();
  });
});