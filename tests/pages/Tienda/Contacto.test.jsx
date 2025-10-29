// tests/pages/Tienda/Contacto.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Contacto from '../../../src/pages/Tienda/Contacto'; // Ajusta la ruta

// --- Mocks ---
// Mock de window.alert (el componente lo usa)
window.alert = vi.fn();
// ----------------

describe('Pruebas para Contacto (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    window.alert.mockClear();
    
    render(
      <BrowserRouter>
        <Contacto />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar el formulario y los campos principales', () => {
    // ASSERT: Título y campos
    expect(screen.getByRole('heading', { name: /Contáctanos/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Tu Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tu Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar Mensaje/i })).toBeInTheDocument();
  });

  // --------------------------------------------------------------------------
  // CP2 REVISADO: PRUEBA EXPLÍCITA DE VALIDACIÓN EN PANTALLA
  // --------------------------------------------------------------------------
  it('CP2: Debe mostrar error si falta un campo al enviar (ej. Nombre)', async () => {
    // ARRANGE: Rellenar con datos válidos, excepto el campo que se quiere validar (Nombre)
    fireEvent.change(screen.getByLabelText(/Tu Nombre/i), { target: { value: '' } }); // Dejar vacío
    fireEvent.change(screen.getByLabelText(/Tu Correo Electrónico/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Asunto/i), { target: { value: 'Consulta' } });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Cuerpo del mensaje' } });

    // ACT: Enviar formulario
    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensaje/i }));

    // ASSERT: Verifica que el error se muestre en pantalla (esto requiere que tu componente
    // tenga un estado de error y lo muestre)
    // NOTA: Si tu componente usa un mensaje de error diferente, ajusta el texto a buscar.
    expect(await screen.findByText(/Todos los campos son obligatorios/i)).toBeInTheDocument();
    
    // Verifica que el envío simulado y exitoso (alert) NO fue llamado.
    expect(window.alert).not.toHaveBeenCalled(); 
  });
  
  // --------------------------------------------------------------------------
  // CP3 REVISADO: Debe limpiar los campos al enviar datos válidos
  // --------------------------------------------------------------------------
  it('CP3: Debe mostrar mensaje de éxito y limpiar el formulario al enviar datos válidos', async () => {
    // ARRANGE: Rellenar todos los campos
    const inputNombre = screen.getByLabelText(/Tu Nombre/i);
    const inputEmail = screen.getByLabelText(/Tu Correo Electrónico/i);
    const inputAsunto = screen.getByLabelText(/Asunto/i);
    const textareaMensaje = screen.getByLabelText(/Mensaje/i);

    fireEvent.change(inputNombre, { target: { value: 'Tester' } });
    fireEvent.change(inputEmail, { target: { value: 'tester@test.com' } });
    fireEvent.change(inputAsunto, { target: { value: 'Consulta sobre pedido' } });
    fireEvent.change(textareaMensaje, { target: { value: 'Mi mensaje de prueba' } });

    // ACT: Enviar formulario
    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensaje/i }));

    // ASSERT
    // 1. Debe mostrar alerta de éxito (o mensaje Toast)
    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Mensaje enviado con éxito. Te responderemos pronto.');
    });
    
    // 2. Los campos deben limpiarse
    await waitFor(() => {
        expect(inputNombre).toHaveValue('');
        expect(inputEmail).toHaveValue('');
        expect(inputAsunto).toHaveValue('');
        expect(textareaMensaje).toHaveValue('');
    });
  });

  // --------------------------------------------------------------------------
  // CP4 AGREGADO: Prueba de formato de correo (que falla antes del envío)
  // --------------------------------------------------------------------------
  it('CP4: Debe mostrar error si el correo es inválido', async () => {
    // ARRANGE: Rellenar con correo inválido
    fireEvent.change(screen.getByLabelText(/Tu Nombre/i), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByLabelText(/Tu Correo Electrónico/i), { target: { value: 'correo_invalido' } });
    fireEvent.change(screen.getByLabelText(/Asunto/i), { target: { value: 'Consulta' } });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Mi mensaje' } });

    // ACT: Enviar formulario
    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensaje/i }));
    
    // ASSERT: Asumiendo que tu componente tiene una validación custom de email 
    // y muestra un mensaje de error específico.
    expect(await screen.findByText(/Correo electrónico inválido/i)).toBeInTheDocument();
    expect(window.alert).not.toHaveBeenCalled();
  });
});