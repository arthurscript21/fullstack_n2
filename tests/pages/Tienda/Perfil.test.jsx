// tests/pages/Tienda/Perfil.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Perfil from '../../../src/pages/Tienda/Perfil'; // Ajusta la ruta

// Importar el mock del AuthContext
import { useAuth } from '../../../src/context/AuthContext'; 

// Mockear localStorageHelper para getUsersList y saveUsersList
const mockSaveUsersList = vi.fn();
const mockGetUsersList = vi.fn();
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getUsersList: mockGetUsersList,
  saveUsersList: mockSaveUsersList,
  updateLoggedInUser: vi.fn(), // Mock para la función que actualiza el usuario en sesión
}));
import { updateLoggedInUser } from '../../../src/utils/localStorageHelper';

// Usuario de sesión mockeado
const mockLoggedInUser = {
  id: 'cliente_123',
  nombre: 'Cliente Test',
  email: 'cliente@test.com',
  telefono: '+56900000000',
  direccion: 'metropolitana',
  rol: 'Cliente',
};

// Mock del AuthContext
vi.mock('../../../src/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock de window.alert
window.alert = vi.fn();

// ----------------

describe('Pruebas para Perfil (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    // Configuración del mock de AuthContext
    useAuth.mockReturnValue({ user: mockLoggedInUser });
    
    // Configuración del mock de getUsersList: debe devolver la lista COMPLETA
    mockGetUsersList.mockReturnValue([
      mockLoggedInUser,
      { id: 'otro_456', nombre: 'Otro', email: 'otro@test.com', rol: 'Admin' }
    ]);

    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar y rellenar los campos con los datos del usuario logueado', async () => {
    // ASSERT: Verifica que los campos tienen los valores iniciales
    expect(await screen.findByDisplayValue(mockLoggedInUser.nombre)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockLoggedInUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockLoggedInUser.telefono)).toBeInTheDocument();
    expect(screen.getByLabelText(/Región/i)).toHaveValue(mockLoggedInUser.direccion);
  });

  it('CP2: El campo de correo electrónico debe estar deshabilitado', () => {
    // ASSERT
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeDisabled();
  });


  it('CP3: Debe guardar los cambios y actualizar el usuario en localStorage al enviar formulario válido', async () => {
    // ARRANGE: Nuevos datos
    const nuevoNombre = 'Nuevo Nombre';
    const nuevaRegion = 'valparaiso';
    const nuevoTelefono = '+56998765432';

    // ACT: Cambia los valores
    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: nuevoNombre } });
    fireEvent.change(screen.getByLabelText(/Región/i), { target: { value: nuevaRegion } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: nuevoTelefono } });


    // Envía el formulario
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Cambios/i }));

    // ASSERT
    // 1. Verifica que se llamó a saveUsersList
    expect(mockSaveUsersList).toHaveBeenCalledTimes(1);

    // 2. Verifica QUÉ se guardó (solo el usuario editado debe tener los nuevos datos)
    const savedUsersList = mockSaveUsersList.mock.calls[0][0]; 
    const updatedUserInList = savedUsersList.find(u => u.id === mockLoggedInUser.id);
    
    expect(updatedUserInList.nombre).toBe(nuevoNombre);
    expect(updatedUserInList.direccion).toBe(nuevaRegion);
    expect(updatedUserInList.telefono).toBe(nuevoTelefono);

    // 3. Verifica que se llamó a updateLoggedInUser con los nuevos datos
    expect(updateLoggedInUser).toHaveBeenCalledWith(expect.objectContaining({
      nombre: nuevoNombre,
      direccion: nuevaRegion,
      telefono: nuevoTelefono,
      // Se mantiene el rol y el email
      email: mockLoggedInUser.email,
      rol: mockLoggedInUser.rol,
    }));

    // 4. Verifica la alerta de éxito
    expect(window.alert).toHaveBeenCalledWith('Perfil actualizado exitosamente!');
  });

  it('CP4: Debe mostrar error si el nombre está vacío', async () => {
    // ACT
    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Cambios/i }));

    // ASSERT
    expect(await screen.findByText(/Nombre y Región son obligatorios/i)).toBeInTheDocument();
    expect(mockSaveUsersList).not.toHaveBeenCalled();
  });
  
  it('CP5: Debe mostrar error si el teléfono es inválido', async () => {
    // ACT
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '+569123' } });
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Cambios/i }));

    // ASSERT
    expect(await screen.findByText(/El teléfono debe tener el formato \+569XXXXXXXX o estar vacío/i)).toBeInTheDocument();
    expect(mockSaveUsersList).not.toHaveBeenCalled();
  });
});