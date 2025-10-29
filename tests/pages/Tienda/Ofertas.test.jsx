// tests/pages/Tienda/Ofertas.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Ofertas from '../../../src/pages/Tienda/Ofertas'; // Ajusta la ruta

// --- Mocks ---

// Mockear el componente ProductCard
vi.mock('../../../src/components/store/ProductCard', () => ({
  default: ({ product }) => (
    <div data-testid="product-card" data-product-name={product.nombre}>
      {product.nombre} - ¡Oferta!
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
  { id: 'p1', nombre: 'Silla con Descuento', oferta: true, precio: 10000 },
  { id: 'p2', nombre: 'Mesa Precio Normal', oferta: false, precio: 20000 },
  { id: 'p3', nombre: 'Rastrillo en Liquidación', oferta: true, precio: 5000 },
];

// ----------------

describe('Pruebas para Ofertas (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetAllProducts.mockReturnValue(mockProducts);

    render(
      <BrowserRouter>
        <Ofertas />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar el título de la sección de ofertas', () => {
    expect(screen.getByRole('heading', { name: /Ofertas Especiales/i, level: 1 })).toBeInTheDocument();
  });

  it('CP2: Debe mostrar solo los productos marcados como oferta', () => {
    // ASSERT: Solo 2 productos deben ser visibles
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(2);
    expect(screen.getByText(/Silla con Descuento/i)).toBeInTheDocument();
    expect(screen.getByText(/Rastrillo en Liquidación/i)).toBeInTheDocument();

    // NO debe estar el producto normal
    expect(screen.queryByText(/Mesa Precio Normal/i)).not.toBeInTheDocument();
  });

  it('CP3: Debe mostrar mensaje si no hay ofertas disponibles', () => {
    // ARRANGE
    const noOffersProducts = mockProducts.filter(p => !p.oferta);
    mockGetAllProducts.mockReturnValue(noOffersProducts); 

    // ACT: Re-renderizar
    render(
      <BrowserRouter>
        <Ofertas />
      </BrowserRouter>
    );

    // ASSERT
    expect(screen.getByText(/Actualmente no hay ofertas disponibles/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId('product-card')).toHaveLength(0);
  });
});