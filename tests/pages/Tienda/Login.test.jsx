// tests/pages/Tienda/Login.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from '../../../src/pages/Tienda/Login'; // Ajusta la ruta

// --- Mocks ---

// Mockear useNavigate (para verificar la redirección)
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

// Mockear AuthContext (para controlar la función login)
const mockLogin = vi.fn();
const mockContextValue = {
  user: null, // Usuario no logueado por defecto
  login: mockLogin,
  logout: vi.fn(),
};
vi.mock('../../../src/context/AuthContext', () => ({
  useAuth: () => mockContextValue,
}));

// Mockear window.alert (el componente lo usa)
window.alert = vi.fn();

// ----------------

describe('Pruebas para Login (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    // Renderiza el componente
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar el formulario con email y contraseña', () => {
    // ASSERT: Verifica que los campos principales existan
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /¿No tienes cuenta\? Regístrate aquí/i })).toBeInTheDocument();
  });

  it('CP2: Debe llamar a la función login con credenciales válidas y redirigir', async () => {
    // ARRANGE: Simular que la función login es exitosa
    mockLogin.mockResolvedValue({ success: true, user: { email: 'admin@huerto.cl', rol: 'Admin' } });

    // ACT: Ingresar credenciales
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'admin@huerto.cl' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'admin123' } });

    // Enviar formulario
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // ASSERT
    // 1. Verificar llamada al mock de login
    expect(mockLogin).toHaveBeenCalledWith('admin@huerto.cl', 'admin123');

    // 2. Esperar a que la redirección ocurra
    await waitFor(() => {
      // Como el usuario simulado es Admin, debería redirigir al panel
      expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard'); 
    });

    // 3. Verificar que no se mostró alerta de error
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('CP3: Debe mostrar alerta si las credenciales son inválidas', async () => {
    // ARRANGE: Simular que la función login falla
    mockLogin.mockResolvedValue({ success: false, message: 'Credenciales inválidas.' });

    // ACT: Ingresar credenciales inválidas y enviar
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'fallo@huerto.cl' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'clavemala' } });
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // ASSERT
    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Error al iniciar sesión: Credenciales inválidas.');
    });
    
    // Verificar que NO hubo navegación
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('CP4: Debe mostrar error si faltan campos al enviar', async () => {
    // ACT: Intentar enviar sin ingresar nada
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // ASSERT: El componente debería mostrar el mensaje de validación del navegador (requerido)
    // Pero si se usan las validaciones del componente, podríamos testear eso.
    // Asumiendo que el componente maneja el error si los campos están vacíos (aunque sea por el `required`):
    expect(mockLogin).not.toHaveBeenCalled();
    // No podemos testear fácilmente los errores `required` de HTML con RTL, 
    // pero verificamos que no intenta llamar a la función de autenticación.
  });
});