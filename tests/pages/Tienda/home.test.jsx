// tests/pages/Tienda/Home.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Home from '../../../src/pages/Tienda/home'; // Ajusta la ruta

// --- Mocks ---

// Mockear el componente ProductCard, ya que el test se centra en la lógica de Home.
// Usamos el mismo mock simple que en Productos.test.jsx
vi.mock('../../../src/components/store/ProductCard', () => ({
  default: ({ product }) => (
    <div data-testid="product-card" data-product-name={product.nombre}>
      {product.nombre}
    </div>
  ),
}));

// Mockear localStorageHelper para obtener productos
const mockGetAllProducts = vi.fn();
vi.mock('../../../src/utils/localStorageHelper', () => ({
    getAllProducts: mockGetAllProducts,
}));

// Productos de prueba
const mockProducts = [
  { id: 'p1', nombre: 'Silla Destacada', precio: 10000 },
  { id: 'p2', nombre: 'Mesa Destacada', precio: 20000 },
  { id: 'p3', nombre: 'Rastrillo Común', precio: 5000 }, // No destacado, si tu Home filtra
  { id: 'p4', nombre: 'Fertilizante Orgánico', precio: 7000 },
];

// ----------------

describe('Pruebas para Home (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    // Simular que getAllProducts devuelve la lista completa
    mockGetAllProducts.mockReturnValue(mockProducts);

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  it('CP1: Debe mostrar el título principal de la tienda', () => {
    // ASUMIENDO un título como 'Huerto Hogar' o un slogan
    expect(screen.getByText(/¡Bienvenido a Huerto Hogar!/i)).toBeInTheDocument();
  });

  it('CP2: Debe mostrar productos en la sección destacada', () => {
    // Si la página de inicio muestra todos los productos o una selección
    // Aquí verificamos que al menos se renderizan algunos
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/Silla Destacada/i)).toBeInTheDocument();
  });

  it('CP3: Debe tener enlaces visibles a las páginas clave (Tienda, Ofertas, Blog)', () => {
    // Enlaces de navegación rápida o llamados a la acción
    expect(screen.getByRole('link', { name: /Ver todos los productos/i })).toHaveAttribute('href', '/productos');
    expect(screen.getByRole('link', { name: /Ver Ofertas/i })).toHaveAttribute('href', '/ofertas');
    expect(screen.getByRole('link', { name: /Ir al Blog/i })).toHaveAttribute('href', '/blog');
  });
  
  it('CP4: Debe mostrar mensaje si no hay productos disponibles', () => {
    // ARRANGE
    mockGetAllProducts.mockReturnValue([]); 

    // ACT: Re-renderizar
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // ASSERT
    expect(screen.getByText(/¡Lo sentimos, no hay productos disponibles en este momento!/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId('product-card')).toHaveLength(0);
  });
});