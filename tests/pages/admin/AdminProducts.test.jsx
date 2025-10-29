// tests/pages/admin/AdminProducts.test.jsx - CORREGIDO
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AdminProducts from '../../../src/pages/admin/AdminProducts';

// --- Mocks ---
// Solución Hoisting: Declarar mocks fuera del vi.mock
const mockGetAllProducts = vi.fn();
const mockSaveProducts = vi.fn();
const mockGetProductsList = vi.fn();

vi.mock('../../../src/utils/localStorageHelper', () => ({
    getAllProducts: mockGetAllProducts,
    saveProducts: mockSaveProducts,
    getProductsList: mockGetProductsList,
}));
window.confirm = vi.fn();

const mockProducts = [
  { id: 'p1', nombre: 'Silla', categoria: 'Muebles', precio: 1000, stock: 5 },
  { id: 'p2', nombre: 'Pala', categoria: 'Herramientas', precio: 2000, stock: 15 },
];
// ----------------

describe('Pruebas para AdminProducts', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm.mockReturnValue(true); // Confirma eliminación por defecto
    mockGetAllProducts.mockReturnValue(mockProducts);
    
    render(<BrowserRouter><AdminProducts /></BrowserRouter>);
  });

  it('CP1: Debe renderizar la tabla con todos los productos', () => {
    expect(screen.getByText(/Gestión de Productos/i)).toBeInTheDocument();
    expect(screen.getByText('Silla')).toBeInTheDocument();
    expect(screen.getByText('Pala')).toBeInTheDocument();
  });

  it('CP2: Debe filtrar productos por nombre de búsqueda', () => {
    const inputBusqueda = screen.getByPlaceholderText(/Buscar por nombre.../i);
    fireEvent.change(inputBusqueda, { target: { value: 'Silla' } });

    expect(screen.getByText('Silla')).toBeInTheDocument();
    expect(screen.queryByText('Pala')).not.toBeInTheDocument();
  });

  it('CP3: Debe llamar a saveProducts y eliminar el producto al confirmar la eliminación', () => {
    const deleteButtons = screen.getAllByRole('button', { name: /Eliminar/i });
    fireEvent.click(deleteButtons[0]); // Eliminar Silla (p1)

    // 1. Verifica confirmación
    expect(window.confirm).toHaveBeenCalledTimes(1);

    // 2. Verifica la llamada a guardar con la lista filtrada
    expect(mockSaveProducts).toHaveBeenCalledTimes(1);
    const savedProducts = mockSaveProducts.mock.calls[0][0];
    expect(savedProducts.length).toBe(1);
    expect(savedProducts[0].nombre).toBe('Pala'); 
  });
});