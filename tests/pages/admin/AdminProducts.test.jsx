// tests/pages/admin/AdminProducts.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AdminProducts from '../../../src/pages/admin/AdminProducts';

// Mock de localStorage
const mockProducts = [
  { id: 'P1', nombre: 'Producto Mock 1', precio: 1000, stock: 10, imagen: 'img1.jpg' },
  { id: 'P2', nombre: 'Producto Mock 2', precio: 500, stock: 5, imagen: 'img2.jpg' },
];

// Mockeamos localStorage.getItem
const mockGetItem = vi.fn();
vi.stubGlobal('localStorage', {
  getItem: mockGetItem,
  setItem: vi.fn(), // Necesario aunque no lo usemos
});

describe('Pruebas para AdminProducts', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('CP1: Debe renderizar el título y el botón de "Añadir Producto"', () => {
    // ARRANGE
    mockGetItem.mockReturnValue(JSON.stringify(mockProducts)); // Simula datos
    render(<BrowserRouter><AdminProducts /></BrowserRouter>);
    
    // ASSERT
    expect(screen.getByText('Gestión de Productos')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Añadir Producto/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/admin/productos/nuevo');
  });

  it('CP2: Debe mostrar los productos cargados desde localStorage', () => {
    // ARRANGE
    mockGetItem.mockReturnValue(JSON.stringify(mockProducts)); // Simula datos
    render(<BrowserRouter><AdminProducts /></BrowserRouter>);
    
    // ASSERT
    // Verifica que los datos de los mocks estén en la tabla
    expect(screen.getByText('Producto Mock 1')).toBeInTheDocument();
    expect(screen.getByText('Producto Mock 2')).toBeInTheDocument();
    expect(screen.getByText('$1.000')).toBeInTheDocument(); // Precio formateado
    expect(screen.getAllByRole('button', { name: /Editar/i })).toHaveLength(2); // Dos botones de editar
  });

  it('CP3: Debe mostrar "No hay productos" si localStorage está vacío', () => {
    // ARRANGE
    mockGetItem.mockReturnValue(JSON.stringify([])); // Simula array vacío
    render(<BrowserRouter><AdminProducts /></BrowserRouter>);
    
    // ASSERT
    expect(screen.getByText('No hay productos disponibles.')).toBeInTheDocument();
    expect(screen.queryByText('Producto Mock 1')).not.toBeInTheDocument();
  });
});