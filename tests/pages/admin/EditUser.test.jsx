// tests/pages/admin/EditUser.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import EditUser from '../../../src/pages/admin/EditUser'; // Ajusta la ruta
import { getUsersList, saveUsersList } from '../../../src/utils/localStorageHelper';

// --- Mocks ---

// Datos de usuario para simular
const mockUsers = [
  { id: 'user1', nombre: 'Usuario Original', email: 'original@test.com', telefono: '+56911111111', direccion: 'metropolitana', rol: 'Cliente' },
  { id: 'user2', nombre: 'Admin Original', email: 'admin@test.com', telefono: '+56922222222', direccion: 'valparaiso', rol: 'Admin' },
];
const userToEdit = mockUsers[0]; // Vamos a editar 'user1'

// Mock de localStorageHelper
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getUsersList: vi.fn(),
  saveUsersList: vi.fn(),
}));

// Mock de react-router-dom
const mockNavigate = vi.fn();
// Creamos un mock flexible para useParams que podemos cambiar
let mockUserId = userToEdit.id; // Por defecto editamos user1
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ userId: mockUserId }), // Usa la variable flexible
    Link: (props) => <a href={props.to} {...props}>{props.children}</a>, // Mock simple de Link
  };
});

// Mock de window.alert (el componente lo usa al guardar)
window.alert = vi.fn();
// ----------------

describe('Pruebas para EditUser', () => {

  beforeEach(() => {
    // Resetea todos los mocks antes de cada test
    vi.clearAllMocks();
    mockUserId = userToEdit.id; // Resetea al ID por defecto
    // Simula que getUsersList devuelve nuestra lista mock
    getUsersList.mockReturnValue([...mockUsers]); // Devuelve una copia
    window.alert.mockClear();
    
    render(
      <BrowserRouter>
        <EditUser />
      </BrowserRouter>
    );
  });

  it('CP1: Debe cargar y rellenar el formulario con los datos del usuario (user1)', async () => {
    // ASSERT: Espera a que cargue (loading) y verifica los valores
    expect(await screen.findByLabelText(/Nombre completo/i)).toHaveValue(userToEdit.nombre);
    expect(screen.getByLabelText(/Correo electrónico/i)).toHaveValue(userToEdit.email);
    expect(screen.getByLabelText(/Teléfono/i)).toHaveValue(userToEdit.telefono);
    // En tu componente, 'direccion' se mapea a 'region'
    expect(screen.getByLabelText(/Región/i)).toHaveValue(userToEdit.direccion); 
    expect(screen.getByLabelText(/Seleccione Rol/i)).toHaveValue(userToEdit.rol);
  });

  it('CP2: El campo de correo electrónico debe estar deshabilitado', () => {
    // ASSERT
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeDisabled();
    expect(screen.getByText(/El correo no se puede modificar/i)).toBeInTheDocument();
  });

  it('CP3: Debe guardar los cambios y navegar al enviar formulario válido', async () => {
    // ARRANGE: Nuevos datos
    const nuevoNombre = 'Usuario Modificado';
    const nuevaRegion = 'valparaiso';
    const nuevoRol = 'Admin';

    // ACT: Cambia los valores
    fireEvent.change(await screen.findByLabelText(/Nombre completo/i), { target: { value: nuevoNombre } });
    fireEvent.change(screen.getByLabelText(/Región/i), { target: { value: nuevaRegion } });
    fireEvent.change(screen.getByLabelText(/Seleccione Rol/i), { target: { value: nuevoRol } });

    // Envía el formulario
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Cambios/i }));

    // ASSERT
    // 1. Verifica que se llamó a saveUsersList
    expect(saveUsersList).toHaveBeenCalledTimes(1);

    // 2. Verifica QUÉ se guardó
    const savedData = saveUsersList.mock.calls[0][0]; // Obtiene el [users] array
    const updatedUser = savedData.find(u => u.id === userToEdit.id);
    
    expect(updatedUser.nombre).toBe(nuevoNombre);
    expect(updatedUser.direccion).toBe(nuevaRegion); // Verifica que guardó la región en 'direccion'
    expect(updatedUser.rol).toBe(nuevoRol);
    expect(updatedUser.email).toBe(userToEdit.email); // Verifica que el email no cambió

    // 3. Verifica la alerta y navegación
    expect(window.alert).toHaveBeenCalledWith('Usuario actualizado exitosamente!');
    expect(mockNavigate).toHaveBeenCalledWith('/admin/usuarios');
  });

  it('CP4: Debe mostrar error si el nombre está vacío', async () => {
    // ACT
    fireEvent.change(await screen.findByLabelText(/Nombre completo/i), { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Cambios/i }));

    // ASSERT
    expect(await screen.findByText(/Nombre, Región y Rol son obligatorios/i)).toBeInTheDocument();
    expect(saveUsersList).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('CP5: Debe mostrar error si el teléfono es inválido (corto)', async () => {
    // ACT
    // Tu componente permite teléfono vacío, pero no uno inválido
    fireEvent.change(await screen.findByLabelText(/Teléfono/i), { target: { value: '+569123' } });
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Cambios/i }));

    // ASSERT
    expect(await screen.findByText(/El teléfono debe tener el formato \+569XXXXXXXX o estar vacío/i)).toBeInTheDocument();
    expect(saveUsersList).not.toHaveBeenCalled();
  });

  it('CP6: Debe permitir guardar si el teléfono está vacío', async () => {
    // ACT
    fireEvent.change(await screen.findByLabelText(/Teléfono/i), { target: { value: '' } }); // Vacío
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Cambios/i }));

    // ASSERT
    // No debe mostrar error de teléfono
    expect(screen.queryByText(/El teléfono debe tener el formato/i)).not.toBeInTheDocument();
    // Debe guardar (asumiendo que los otros campos están bien)
    expect(saveUsersList).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('CP7: El botón Cancelar debe ser un enlace a /admin/usuarios', () => {
    // ASSERT
    const cancelButton = screen.getByRole('link', { name: /Cancelar/i });
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveAttribute('href', '/admin/usuarios');
  });

});