// tests/components/store/Navbar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Navbar from '../../../src/components/store/Navbar';

// --- ARRANGE (Mocks) ---
// Mock de las funciones que vienen de localStorageHelper
// Usamos vi.mock para reemplazar el módulo entero
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getLoggedInUser: vi.fn(),
  getCart: vi.fn(),
  logoutUser: vi.fn(),
  dispatchStorageUpdate: vi.fn(),
}));

// Mock del hook useNavigate de react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual, // Mantenemos Link, NavLink, etc.
    useNavigate: () => mockNavigate, // Sobrescribimos useNavigate
  };
});

// Importamos los mocks para poder controlarlos
import { getLoggedInUser, getCart, logoutUser } from '../../../src/utils/localStorageHelper';

describe('Pruebas para Navbar (Store)', () => {

  beforeEach(() => {
    // Limpia los mocks antes de cada test
    vi.clearAllMocks();
    // Simula que el usuario confirma el 'window.confirm'
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
  });

  it('CP1: Debe mostrar "Iniciar Sesión" y "Crear Cuenta" si no hay usuario (Renderizado Condicional)', () => {
    // ARRANGE
    getLoggedInUser.mockReturnValue(null); // Simula usuario no logueado
    getCart.mockReturnValue([]); // Simula carrito vacío
    
    render(<BrowserRouter><Navbar /></BrowserRouter>);

    // ASSERT
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByText('Crear Cuenta')).toBeInTheDocument();
    expect(screen.queryByText(/Hola,/i)).not.toBeInTheDocument(); // Verifica que "Hola, ..." NO esté
  });

  it('CP2: Debe mostrar "Hola, [Nombre]" y el menú dropdown si el usuario SÍ está logueado (Renderizado Condicional)', () => {
    // ARRANGE
    getLoggedInUser.mockReturnValue({ nombre: 'Juanito', role: 'user' }); // Simula usuario logueado
    getCart.mockReturnValue([]);
    
    render(<BrowserRouter><Navbar /></BrowserRouter>);

    // ASSERT
    expect(screen.getByText(/Hola, Juanito/i)).toBeInTheDocument(); // Verifica saludo
    expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument(); // Verifica que "Iniciar Sesión" NO esté
    expect(screen.queryByText('Crear Cuenta')).not.toBeInTheDocument();
  });

  it('CP3: Debe llamar a logoutUser() y navigate("/") al hacer clic en "Cerrar Sesión" (Evento)', () => {
    // ARRANGE
    getLoggedInUser.mockReturnValue({ nombre: 'Juanito', role: 'user' });
    getCart.mockReturnValue([]);
    
    render(<BrowserRouter><Navbar /></BrowserRouter>);
    
    // ACT
    // 1. Abrir el dropdown (haciendo clic en el saludo)
    const dropdownToggle = screen.getByText(/Hola, Juanito/i);
    fireEvent.click(dropdownToggle);
    
    // 2. Hacer clic en el botón "Cerrar Sesión" (que ahora está visible)
    const logoutButton = screen.getByRole('button', { name: /Cerrar Sesión/i });
    fireEvent.click(logoutButton);

    // ASSERT
    expect(window.confirm).toHaveBeenCalledTimes(1); // Verificamos la confirmación
    expect(logoutUser).toHaveBeenCalledTimes(1); // Verificamos que se llamó a la función de logout
    expect(mockNavigate).toHaveBeenCalledTimes(1); // Verificamos que se llamó a navigate
    expect(mockNavigate).toHaveBeenCalledWith('/'); // Verificamos que redirigió a la home
  });

  it('CP4: Debe mostrar el contador del carrito (Props/Estado)', () => {
    // ARRANGE
    getLoggedInUser.mockReturnValue(null);
    getCart.mockReturnValue([ // Simula un carrito con 3 items
      { id: 'P1', cantidad: 2 },
      { id: 'P2', cantidad: 1 }
    ]); 
    
    render(<BrowserRouter><Navbar /></BrowserRouter>);

    // ASSERT
    // Busca el badge (la "pastilla" del contador)
    const cartBadge = screen.getByText('3'); // 2 + 1 = 3
    expect(cartBadge).toBeInTheDocument();
    expect(cartBadge).toHaveClass('badge');
  });

});