// tests/pages/Tienda/Registro.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Registro from '../../../src/pages/Tienda/Registro'; // Asegúrate que la ruta sea correcta

// --- Mocks ---
// Mockear localStorageHelper para controlar addUserToList y getLoggedInUser
vi.mock('../../../src/utils/localStorageHelper', () => ({
  addUserToList: vi.fn(),
  getLoggedInUser: vi.fn(() => null), // Por defecto, no está logueado
}));
import { addUserToList } from '../../../src/utils/localStorageHelper';

// Mockear useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});
// ----------------

describe('Pruebas para Registro (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks(); // Limpia mocks antes de cada test
    // Renderiza el componente dentro de BrowserRouter porque usa Link y useNavigate
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar todos los campos del formulario', () => {
    // ASSERT: Verifica que los labels y campos principales existan
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument(); // Búsqueda exacta si es necesario
    expect(screen.getByLabelText(/Dirección de Entrega/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono de Contacto/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  it('CP2: Debe mostrar error si el nombre es inválido', async () => {
    // ARRANGE: Deja el nombre vacío, llena otros campos requeridos
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Dirección de Entrega/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Teléfono de Contacto/i), { target: { value: '+56911223344' } });

    // ACT: Intenta enviar el formulario
    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    // ASSERT: Espera que aparezca el mensaje de error específico
    expect(await screen.findByText(/El nombre debe tener entre 1 y 25 caracteres/i)).toBeInTheDocument();
    // Verifica que la función para guardar NO fue llamada
    expect(addUserToList).not.toHaveBeenCalled();
  });

  it('CP3: Debe mostrar error si el correo no es válido', async () => {
    // ARRANGE: Llena campos con correo inválido
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Usuario Test' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'test@dominioinvalido.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Dirección de Entrega/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Teléfono de Contacto/i), { target: { value: '+56911223344' } });

    // ACT
    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    // ASSERT
    expect(await screen.findByText(/Correo inválido. Solo se aceptan @duocuc.cl y @gmail.com/i)).toBeInTheDocument();
    expect(addUserToList).not.toHaveBeenCalled();
  });

   it('CP4: Debe mostrar error si la contraseña es inválida (corta)', async () => {
    // ARRANGE
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Usuario Test' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123' } }); // Contraseña corta
    fireEvent.change(screen.getByLabelText(/Dirección de Entrega/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Teléfono de Contacto/i), { target: { value: '+56911223344' } });

    // ACT
    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    // ASSERT
    expect(await screen.findByText(/La contraseña debe tener entre 7 y 12 caracteres/i)).toBeInTheDocument();
    expect(addUserToList).not.toHaveBeenCalled();
  });

  it('CP5: Debe mostrar error si el teléfono es inválido', async () => {
    // ARRANGE
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Usuario Test' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Dirección de Entrega/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Teléfono de Contacto/i), { target: { value: '+5691122' } }); // Teléfono corto

    // ACT
    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    // ASSERT
    expect(await screen.findByText(/El teléfono debe tener el formato \+569 seguido de 8 dígitos/i)).toBeInTheDocument();
    expect(addUserToList).not.toHaveBeenCalled();
  });


  it('CP6: Debe llamar a addUserToList y navigate al enviar formulario válido', async () => {
    // ARRANGE: Simula que addUserToList retorna 'true' (éxito)
    addUserToList.mockReturnValue(true);

    // Llena todos los campos correctamente
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Usuario Válido' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'valido@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'passwordvalido' } });
    fireEvent.change(screen.getByLabelText(/Dirección de Entrega/i), { target: { value: 'Dirección Válida 123' } });
    fireEvent.change(screen.getByLabelText(/Teléfono de Contacto/i), { target: { value: '+56987654321' } });

    // ACT
    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    // ASSERT
    // Verifica que addUserToList fue llamado una vez
    expect(addUserToList).toHaveBeenCalledTimes(1);
    // Verifica el argumento con el que fue llamado addUserToList (parcialmente)
    expect(addUserToList).toHaveBeenCalledWith(expect.objectContaining({
      nombre: 'Usuario Válido',
      email: 'valido@gmail.com',
      direccion: 'Dirección Válida 123',
      telefono: '+56987654321',
    }));

    // Espera a que aparezca el mensaje de éxito
    expect(await screen.findByText(/¡Registro exitoso!/i)).toBeInTheDocument();

    // Espera a que la navegación ocurra (debido al setTimeout en el componente)
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    }, { timeout: 2500 }); // Ajusta el timeout si es necesario
  });

 it('CP7: Debe mostrar error si addUserToList devuelve false (email duplicado)', async () => {
    // ARRANGE: Simula que addUserToList retorna 'false' (email ya existe)
    addUserToList.mockReturnValue(false);

    // Llena todos los campos correctamente
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Usuario Duplicado' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'duplicado@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'passwordvalido' } });
    fireEvent.change(screen.getByLabelText(/Dirección de Entrega/i), { target: { value: 'Dirección 456' } });
    fireEvent.change(screen.getByLabelText(/Teléfono de Contacto/i), { target: { value: '+56911112222' } });

    // ACT
    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }));

    // ASSERT
    expect(addUserToList).toHaveBeenCalledTimes(1); // Se intentó agregar
    expect(await screen.findByText(/El correo electrónico ya está registrado/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled(); // No debe navegar
  });

});