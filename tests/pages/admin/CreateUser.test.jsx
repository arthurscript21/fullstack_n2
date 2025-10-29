// tests/pages/admin/CreateUser.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import CreateUser from '../../../src/pages/admin/CreateUser';

// Mocks (igual que en CreateProduct)
const mockSetItem = vi.fn();
vi.stubGlobal('localStorage', {
  getItem: vi.fn(() => '[]'), // Asume que la lista de usuarios está vacía
  setItem: mockSetItem,
});
vi.stubGlobal('alert', vi.fn());
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('Pruebas para CreateUser (Formulario)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    render(<BrowserRouter><CreateUser /></BrowserRouter>);
  });

  it('CP1: Debe renderizar los campos principales (Nombre, Correo, Contraseña)', () => {
    // ASSERT
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument(); // Busca por texto exacto
    expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Seleccione Rol/i)).toBeInTheDocument();
  });

  it('CP2: Debe mostrar error si las contraseñas no coinciden', async () => {
    // ARRANGE: Llenar campos requeridos pero con contraseñas distintas
    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), { target: { value: '654321' } });
    fireEvent.change(screen.getByLabelText(/Región/i), { target: { value: 'metropolitana' } });

    // ACT
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Usuario/i }));

    // ASSERT
    expect(await screen.findByText('Las contraseñas no coinciden.')).toBeInTheDocument();
    expect(mockSetItem).not.toHaveBeenCalled(); // No debe guardar
  });

  it('CP3: Debe mostrar error si el correo no es válido', async () => {
    // ARRANGE
    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'bad-email.com' } }); // Correo inválido
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Región/i), { target: { value: 'metropolitana' } });

    // ACT
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Usuario/i }));

    // ASSERT
    expect(await screen.findByText('El correo debe ser @duocuc.cl o @gmail.com.')).toBeInTheDocument();
    expect(mockSetItem).not.toHaveBeenCalled();
  });

  it('CP4: Debe guardar el usuario si todos los campos son válidos', async () => {
    // ARRANGE
    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '+56988887777' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Región/i), { target: { value: 'metropolitana' } });
    fireEvent.change(screen.getByLabelText(/Seleccione Rol/i), { target: { value: 'Admin' } });

    // ACT
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Usuario/i }));

    // ASSERT
    // Verifica que se llamó a la alerta de éxito
    expect(window.alert).toHaveBeenCalledWith('Usuario creado exitosamente!');
    // Verifica que se guardó en localStorage
    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem.mock.calls[0][0]).toBe('huertohogar_users');
    expect(mockSetItem.mock.calls[0][1]).toContain('Test User');
    expect(mockSetItem.mock.calls[0][1]).toContain('Admin');
    // Verifica que redirige
    expect(mockNavigate).toHaveBeenCalledWith('/admin/usuarios');
  });

});