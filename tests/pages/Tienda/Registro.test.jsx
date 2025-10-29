// tests/pages/Tienda/Registro.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Registro from '../../../src/pages/Tienda/Registro';

// --- Mocks ---
vi.mock('../../../src/utils/localStorageHelper', () => ({
  addUserToList: vi.fn(),
  getLoggedInUser: vi.fn(() => null),
}));
import { addUserToList } from '../../../src/utils/localStorageHelper';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});
// ----------------

describe('Pruebas para Registro (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    render(<BrowserRouter><Registro /></BrowserRouter>);
  });

  it('CP1: Debe renderizar todos los campos del formulario', () => {
    // CORREGIDO: Usar etiquetas reales (Nombre, Correo, Dirección, Teléfono)
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  it('CP2: Debe mostrar error si el nombre es inválido', async () => {
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '+56911223344' } });

    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    expect(await screen.findByText(/El nombre debe tener entre 1 y 25 caracteres/i)).toBeInTheDocument();
    expect(addUserToList).not.toHaveBeenCalled();
  });

  it('CP3: Debe mostrar error si el correo no es válido', async () => {
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Usuario Test' } });
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@dominioinvalido.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '+56911223344' } });

    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    expect(await screen.findByText(/Correo inválido. Solo se aceptan @duocuc.cl y @gmail.com/i)).toBeInTheDocument();
    expect(addUserToList).not.toHaveBeenCalled();
  });

   it('CP4: Debe mostrar error si la contraseña es inválida (corta)', async () => {
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Usuario Test' } });
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '+56911223344' } });

    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    expect(await screen.findByText(/La contraseña debe tener entre 7 y 12 caracteres/i)).toBeInTheDocument();
    expect(addUserToList).not.toHaveBeenCalled();
  });

  it('CP5: Debe mostrar error si el teléfono es inválido', async () => {
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Usuario Test' } });
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '+5691122' } });

    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    expect(await screen.findByText(/El teléfono debe tener el formato \+569 seguido de 8 dígitos/i)).toBeInTheDocument();
    expect(addUserToList).not.toHaveBeenCalled();
  });


  it('CP6: Debe llamar a addUserToList y navigate al enviar formulario válido', async () => {
    addUserToList.mockReturnValue(true);

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Usuario Válido' } });
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'valido@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'passwordvalido' } });
    fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Dirección Válida 123' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '+56987654321' } });

    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    expect(addUserToList).toHaveBeenCalledTimes(1);
    expect(addUserToList).toHaveBeenCalledWith(expect.objectContaining({
      nombre: 'Usuario Válido', email: 'valido@gmail.com', direccion: 'Dirección Válida 123', telefono: '+56987654321',
    }));

    expect(await screen.findByText(/¡Registro exitoso!/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    }, { timeout: 2500 });
  });

 it('CP7: Debe mostrar error si addUserToList devuelve false (email duplicado)', async () => {
    addUserToList.mockReturnValue(false);

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Usuario Duplicado' } });
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'duplicado@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'passwordvalido' } });
    fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Dirección 456' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '+56911112222' } });

    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    expect(addUserToList).toHaveBeenCalledTimes(1);
    expect(await screen.findByText(/El correo electrónico ya está registrado/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

});