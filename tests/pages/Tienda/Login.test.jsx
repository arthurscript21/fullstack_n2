// tests/pages/Tienda/Login.test.jsx - CORREGIDO
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from '../../../src/pages/Tienda/Login';

// --- Mocks ---
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

const mockSaveLoggedInUser = vi.fn();
const mockGetUsersList = vi.fn(() => []);
vi.mock('../../../src/utils/localStorageHelper', async (importOriginal) => {
    const actual = await importOriginal();
    return { 
        ...actual,
        getLoggedInUser: vi.fn(() => null),
        saveLoggedInUser: mockSaveLoggedInUser,
        getUsersList: mockGetUsersList,
        dispatchStorageUpdate: vi.fn(),
    };
});
window.alert = vi.fn();
// ----------------

describe('Pruebas para Login (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    render(<BrowserRouter><Login /></BrowserRouter>);
  });

  it('CP1: Debe renderizar el formulario con email y contraseña', () => {
    // CORREGIDO: Usar etiqueta real "Correo"
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Regístrate/i })).toBeInTheDocument();
  });

  it('CP2: Debe iniciar sesión como ADMIN y redirigir a /admin', async () => {
    // CORREGIDO: Usar etiqueta real "Correo" y credenciales definidas en Login.jsx
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'admin@correo.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'Admin123' } });

    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(window.alert).toHaveBeenCalledWith('Inicio de sesión como Administrador exitoso.');
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });

  it('CP3: Debe mostrar error si las credenciales son inválidas', async () => {
    mockGetUsersList.mockReturnValueOnce([]);
    
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'fallo@huerto.cl' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'clavemala' } });
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // CORREGIDO: Buscar el texto de error que se muestra en el DOM
    expect(await screen.findByText(/Correo o contraseña incorrectos./i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  
  it('CP4: Debe mostrar error si faltan campos al enviar', async () => {
    // No rellenar nada, solo enviar
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // El componente maneja el error con setError y lo muestra
    expect(await screen.findByText(/Por favor, ingresa correo y contraseña./i)).toBeInTheDocument();
  });
});