// tests/pages/Tienda/Perfil.test.jsx - CORREGIDO
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Perfil from '../../../src/pages/Tienda/Perfil';

// --- Mocks ---
// Solución Hoisting: Declarar los mocks fuera del vi.mock
const mockSaveUsersList = vi.fn();
const mockGetUsersList = vi.fn();
const mockUpdateLoggedInUser = vi.fn();

vi.mock('../../../src/utils/localStorageHelper', () => ({
  getUsersList: mockGetUsersList,
  saveUsersList: mockSaveUsersList,
  updateLoggedInUser: mockUpdateLoggedInUser, 
}));

// Usuario de sesión mockeado
const mockLoggedInUser = {
  id: 'cliente_123',
  nombre: 'Cliente Test',
  email: 'cliente@test.com',
  telefono: '+56900000000',
  direccion: 'metropolitana', // En el componente se mapea a Región
  rol: 'Cliente',
};

// Mock del AuthContext
const mockUseAuth = vi.fn(() => ({ user: mockLoggedInUser }));
vi.mock('../../../src/context/AuthContext', () => ({
  useAuth: mockUseAuth,
}));

window.alert = vi.fn();
// ----------------

describe('Pruebas para Perfil (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Configuración del mock de getUsersList: debe devolver la lista COMPLETA
    mockGetUsersList.mockReturnValue([
      mockLoggedInUser,
      { id: 'otro_456', nombre: 'Otro', email: 'otro@test.com', rol: 'Admin' }
    ]);

    render(<BrowserRouter><Perfil /></BrowserRouter>);
  });

  it('CP1: Debe renderizar y rellenar los campos con los datos del usuario logueado', async () => {
    // CORREGIDO: Usar etiqueta 'Nombre completo' y 'Teléfono'
    expect(await screen.findByDisplayValue(mockLoggedInUser.nombre)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockLoggedInUser.email)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toHaveValue(mockLoggedInUser.telefono);
    expect(screen.getByLabelText(/Región/i)).toHaveValue(mockLoggedInUser.direccion);
  });

  it('CP3: Debe guardar los cambios y actualizar el usuario al enviar formulario válido', async () => {
    const nuevoNombre = 'Nuevo Nombre';
    const nuevaRegion = 'valparaiso';
    
    // ACT: Cambia los valores
    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: nuevoNombre } });
    fireEvent.change(screen.getByLabelText(/Región/i), { target: { value: nuevaRegion } });

    fireEvent.submit(screen.getByRole('button', { name: /Guardar Cambios/i }));

    // 1. Verifica que se llamó a saveUsersList
    expect(mockSaveUsersList).toHaveBeenCalledTimes(1);

    // 3. Verifica que se llamó a updateLoggedInUser con los nuevos datos
    expect(mockUpdateLoggedInUser).toHaveBeenCalledWith(expect.objectContaining({
      nombre: nuevoNombre,
      direccion: nuevaRegion,
    }));

    // 4. Verifica la alerta de éxito
    expect(window.alert).toHaveBeenCalledWith('Perfil actualizado exitosamente!');
  });
});