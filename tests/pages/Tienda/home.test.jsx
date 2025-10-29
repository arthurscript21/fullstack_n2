// tests/pages/Tienda/home.test.jsx - CORREGIDO
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Home from '../../../src/pages/Tienda/home';

// Mockear el componente ProductCard para controlar el renderizado
vi.mock('../../../src/components/store/ProductCard', () => ({
  default: ({ product }) => (
    <div data-testid="product-card" data-product-name={product.nombre}>
      {product.nombre}
    </div>
  ),
}));

// Mockear los datos de productos que importa Home.jsx para controlar la lista destacada
const mockProducts = [
  { id: 'p1', nombre: 'Manzana Fuji', precio: 10000 },
  { id: 'p2', nombre: 'Lechuga Fresca', precio: 20000 },
  { id: 'p3', nombre: 'Rastrillo', precio: 5000 },
  { id: 'p4', nombre: 'Fertilizante', precio: 7000 },
  { id: 'p5', nombre: 'Queso', precio: 7000 },
];
vi.mock('../../../src/data/products', () => ({
    products: mockProducts,
}));

describe('Pruebas para Home (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    render(<BrowserRouter><Home /></BrowserRouter>);
  });

  it('CP1: Debe mostrar el título principal de la tienda', () => {
    // CORREGIDO: El título es "Bienvenido a HuertoHogar"
    expect(screen.getByRole('heading', { name: /Bienvenido a HuertoHogar/i, level: 1 })).toBeInTheDocument();
  });

  it('CP2: Debe mostrar 4 productos destacados', () => {
    // CORREGIDO: El componente toma slice(0, 4) del listado de mockProducts
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(4);
  });

  it('CP3: Debe tener enlaces visibles a las páginas clave de Categoría y Tienda', () => {
    // CORREGIDO: El test anterior falló buscando enlaces que no existen. Buscamos los enlaces reales.
    expect(screen.getByRole('link', { name: /Ver Productos/i })).toBeInTheDocument(); // Botón principal
    expect(screen.getByRole('link', { name: /Ver Todos los Productos/i })).toBeInTheDocument(); // Botón al final
    expect(screen.getByRole('link', { name: /Ver Frutas/i })).toBeInTheDocument(); // Enlace de categoría
  });
  
  it('CP4: Debe mostrar mensaje de carga si la lista de productos está vacía', () => {
    // ARRANGE: Mockear productos vacíos
    vi.resetModules(); 
    vi.mock('../../../src/data/products', () => ({ products: [] }));

    // ACT: Re-renderizar para que tome el mock vacío
    render(<BrowserRouter><Home /></BrowserRouter>);

    // CORREGIDO: El componente cae en `<p className="text-center">Cargando productos...</p>` en la sección destacada si featuredProducts está vacío.
    expect(screen.getByText(/Cargando productos.../i)).toBeInTheDocument(); 
  });
});