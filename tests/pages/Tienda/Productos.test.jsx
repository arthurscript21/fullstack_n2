// tests/pages/Tienda/Productos.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Productos from '../../../src/pages/Tienda/Productos'; // Ajusta la ruta

// Mockear el componente ProductCard, ya que el test se centra en la lógica de filtrado de Productos.jsx
vi.mock('../../../src/components/store/ProductCard', () => ({
  default: ({ product }) => (
    <div data-testid="product-card" data-product-name={product.nombre}>
      {product.nombre} - {product.categoria}
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
  { id: 'p1', nombre: 'Silla de Jardín', categoria: 'Muebles', stock: 10, precio: 10000 },
  { id: 'p2', nombre: 'Mesa de Picnic', categoria: 'Muebles', stock: 5, precio: 20000 },
  { id: 'p3', nombre: 'Rastrillo Metálico', categoria: 'Herramientas', stock: 25, precio: 5000 },
  { id: 'p4', nombre: 'Fertilizante Orgánico', categoria: 'Sustratos', stock: 10, precio: 7000 },
];

// ----------------

describe('Pruebas para Productos (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetAllProducts.mockReturnValue(mockProducts);

    render(
      <BrowserRouter>
        <Productos />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar todos los productos al inicio', () => {
    // ASSERT: 4 productos deben ser visibles
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(4);
    expect(screen.getByText(/Silla de Jardín/i)).toBeInTheDocument();
    expect(screen.getByText(/Rastrillo Metálico/i)).toBeInTheDocument();
  });

  it('CP2: Debe filtrar productos por categoría (Muebles)', () => {
    // ARRANGE: Seleccionar la categoría Muebles
    const selectCategoria = screen.getByLabelText(/Filtrar por Categoría/i);
    fireEvent.change(selectCategoria, { target: { value: 'Muebles' } });

    // ASSERT: Solo 2 productos deben ser visibles
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(2);
    expect(screen.getByText(/Silla de Jardín/i)).toBeInTheDocument();
    expect(screen.getByText(/Mesa de Picnic/i)).toBeInTheDocument();
    expect(screen.queryByText(/Rastrillo Metálico/i)).not.toBeInTheDocument();
  });

  it('CP3: Debe buscar productos por texto (Rastrillo)', () => {
    // ARRANGE: Escribir en la barra de búsqueda
    const inputBusqueda = screen.getByPlaceholderText(/Buscar productos.../i);
    fireEvent.change(inputBusqueda, { target: { value: 'Rastrillo' } });

    // ASSERT: Solo 1 producto debe ser visible
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(1);
    expect(screen.getByText(/Rastrillo Metálico/i)).toBeInTheDocument();
    expect(screen.queryByText(/Silla de Jardín/i)).not.toBeInTheDocument();
  });

  it('CP4: Debe mostrar mensaje de no encontrados si el filtro no coincide', () => {
    // ARRANGE: Escribir un texto que no existe
    const inputBusqueda = screen.getByPlaceholderText(/Buscar productos.../i);
    fireEvent.change(inputBusqueda, { target: { value: 'Inexistente' } });

    // ASSERT: No debe haber tarjetas de producto, y debe haber mensaje de alerta
    expect(screen.queryAllByTestId('product-card')).toHaveLength(0);
    expect(screen.getByText(/No se encontraron productos que coincidan con su búsqueda o filtro/i)).toBeInTheDocument();
  });

  it('CP5: Debe limpiar los filtros al seleccionar "Todas"', () => {
    // 1. Filtrar por Muebles
    const selectCategoria = screen.getByLabelText(/Filtrar por Categoría/i);
    fireEvent.change(selectCategoria, { target: { value: 'Muebles' } });
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);

    // 2. Seleccionar "Todas"
    fireEvent.change(selectCategoria, { target: { value: '' } }); 

    // ASSERT: Vuelven a aparecer los 4 productos
    expect(screen.getAllByTestId('product-card')).toHaveLength(4);
  });
});