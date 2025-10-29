// tests/pages/admin/AdminReports.test.jsx
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AdminReports from '../../../src/pages/admin/AdminReports'; // Ajusta la ruta si es necesario
import { initialProducts } from '../../../src/data/productsData'; // Importamos los datos reales

// --- Mocks ---

// Mock de initialProducts por si localStorage falla
// (Usaremos los datos reales importados para el fallback, 
// pero definimos productos mock para los tests de localStorage)
const mockProducts = [
  { id: 'p1', nombre: 'Producto Crítico 1', stock: 5, precio: 1000, imagen: 'img1.jpg' },
  { id: 'p2', nombre: 'Producto Normal', stock: 50, precio: 2000, imagen: 'img2.jpg' },
  { id: 'p3', nombre: 'Producto Crítico 2 (Borde)', stock: 10, precio: 750, imagen: 'img3.jpg' },
  { id: 'p4', nombre: 'Producto Sano', stock: 11, precio: 1500, imagen: 'img4.jpg' },
];

// Mock de localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
// ----------------

describe('Pruebas para AdminReports', () => {

  beforeEach(() => {
    // Limpiamos mocks y localStorage antes de cada test
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('CP1: Debe mostrar mensaje de "Buenas noticias" si no hay productos críticos', () => {
    // ARRANGE: Guardamos solo productos con stock > 10
    const productosSanos = mockProducts.filter(p => p.stock > 10);
    localStorage.setItem('huertohogar_products_admin', JSON.stringify(productosSanos));

    // ACT
    render(<BrowserRouter><AdminReports /></BrowserRouter>);

    // ASSERT
    expect(screen.getByText(/¡Buenas noticias! No hay productos con stock crítico actualmente/i)).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('CP2: Debe mostrar la tabla con productos críticos (stock <= 10)', () => {
    // ARRANGE: Guardamos la lista mixta de productos
    localStorage.setItem('huertohogar_products_admin', JSON.stringify(mockProducts));

    // ACT
    render(<BrowserRouter><AdminReports /></BrowserRouter>);

    // ASSERT
    // Debe estar la tabla
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    // Deben estar los productos críticos
    expect(screen.getByText('Producto Crítico 1')).toBeInTheDocument();
    expect(screen.getByText('Producto Crítico 2 (Borde)')).toBeInTheDocument();

    // NO deben estar los productos sanos
    expect(screen.queryByText('Producto Normal')).not.toBeInTheDocument();
    expect(screen.queryByText('Producto Sano')).not.toBeInTheDocument();
  });

  it('CP3: Debe mostrar el stock y precio correctos en la tabla', () => {
    // ARRANGE: Guardamos solo un producto crítico para facilitar la revisión
    const productoCritico = mockProducts.find(p => p.id === 'p1'); // Stock 5, Precio 1000
    localStorage.setItem('huertohogar_products_admin', JSON.stringify([productoCritico]));

    // ACT
    render(<BrowserRouter><AdminReports /></BrowserRouter>);

    // ASSERT
    const row = screen.getByText(productoCritico.nombre).closest('tr');
    
    // Verificar stock (con la clase de badge)
    const stockCell = within(row).getByText(productoCritico.stock.toString());
    expect(stockCell).toBeInTheDocument();
    expect(stockCell).toHaveClass('badge bg-danger');

    // Verificar precio formateado (tu componente usa 'es-CL')
    // Nota: El espacio en $1.000 puede ser un "non-breaking space"
    expect(within(row).getByText(/\$1.000/i)).toBeInTheDocument(); 
  });

  it('CP4: Debe usar initialProducts como fallback si localStorage está vacío', () => {
    // ARRANGE: localStorage está vacío (se limpió en beforeEach)
    // El test ahora depende de los datos reales en 'initialProducts'
    
    // ACT
    render(<BrowserRouter><AdminReports /></BrowserRouter>);

    // ASSERT
    // Asumimos que 'initialProducts' tiene productos críticos (ej: 'Tomate Cherry' con stock 5)
    // Si 'initialProducts' no tuviera críticos, este test fallaría y debería
    // ajustarse para esperar el mensaje de "Buenas noticias".
    const productoInicialCritico = initialProducts.find(p => p.stock <= 10);

    if (productoInicialCritico) {
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText(productoInicialCritico.nombre)).toBeInTheDocument();
    } else {
      expect(screen.getByText(/¡Buenas noticias!/i)).toBeInTheDocument();
    }
  });

  it('CP5: Debe mostrar el título "Reportes"', () => {
    // ARRANGE
    localStorage.setItem('huertohogar_products_admin', JSON.stringify(mockProducts));

    // ACT
    render(<BrowserRouter><AdminReports /></BrowserRouter>);

    // ASSERT
    expect(screen.getByRole('heading', { name: /Reportes/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Productos con Stock Crítico/i, level: 4 })).toBeInTheDocument();
  });

});