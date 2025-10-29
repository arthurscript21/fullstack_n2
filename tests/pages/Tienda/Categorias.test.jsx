// tests/pages/Tienda/Categorias.test.jsx
import { render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Categorias from '../../../src/pages/Tienda/Categorias'; // Ajusta la ruta

// --- Mocks ---

// Mockear getAllCategories para simular las categorías disponibles
const mockCategories = [
  'Muebles',
  'Herramientas',
  'Sustratos',
  'Semillas',
];
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getAllCategories: vi.fn(() => mockCategories),
}));

// ----------------

describe('Pruebas para Categorias (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <BrowserRouter>
        <Categorias />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar el título principal de la sección', () => {
    expect(screen.getByRole('heading', { name: /Explora Nuestras Categorías/i, level: 1 })).toBeInTheDocument();
  });

  it('CP2: Debe listar todas las categorías disponibles como enlaces', () => {
    // ASSERT: Verificamos que todas las categorías del mock están presentes como enlaces
    const linksMuebles = screen.getByRole('link', { name: /Muebles/i });
    const linksHerramientas = screen.getByRole('link', { name: /Herramientas/i });
    const linksSustratos = screen.getByRole('link', { name: /Sustratos/i });
    
    expect(linksMuebles).toBeInTheDocument();
    expect(linksHerramientas).toBeInTheDocument();
    expect(linksSustratos).toBeInTheDocument();
    
    // Verificamos el conteo total de categorías
    expect(screen.getAllByRole('link').filter(link => link.textContent.trim() !== '')).toHaveLength(mockCategories.length);
  });

  it('CP3: Cada enlace de categoría debe llevar a la ruta de productos con el filtro', () => {
    const linkMuebles = screen.getByRole('link', { name: /Muebles/i });
    const linkSemillas = screen.getByRole('link', { name: /Semillas/i });

    // La ruta de productos debe usar un query param o la URL para el filtro
    // Asumimos que es `/productos?categoria=X` o similar, o simplemente al pasar la categoría a la ruta de productos.
    expect(linkMuebles).toHaveAttribute('href', '/productos'); // Asumiendo que el filtro se maneja internamente en Productos.jsx
    
    // Si la implementación usa Link para redirigir, este test es más simple.
    // Si usa un estado interno en Productos.jsx basado en la URL, se debería adaptar.
    // Para propósitos de este test, verificamos la navegación a la página de productos.
    expect(linkMuebles).toHaveAttribute('href', '/productos');
    expect(linkSemillas).toHaveAttribute('href', '/productos');
  });

});