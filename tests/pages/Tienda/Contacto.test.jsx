// tests/pages/Tienda/Contacto.test.jsx - CORREGIDO
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Contacto from '../../../src/pages/Tienda/Contacto'; 

window.alert = vi.fn();

describe('Pruebas para Contacto (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    window.alert.mockClear();
    render(<BrowserRouter><Contacto /></BrowserRouter>);
  });

  it('CP1: Debe renderizar el formulario y los campos principales', () => {
    // CORREGIDO: Título, Nombre Completo, Correo Electrónico, Mensaje (Asunto no existe)
    expect(screen.getByRole('heading', { name: /Contáctanos/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    // El CP original falló buscando "Asunto"
    expect(screen.queryByLabelText(/Asunto/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar Mensaje/i })).toBeInTheDocument();
  });

  it('CP2: Debe llamar a alert con el nombre al enviar', async () => {
    // CORREGIDO: Testea el comportamiento real del componente (llama a alert)
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'tester@test.com' } });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Mensaje de prueba' } });
    
    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensaje/i }));

    await waitFor(() => {
         expect(window.alert).toHaveBeenCalledWith('Gracias por tu mensaje, Tester. (Simulación).');
    });
  });
  
  it('CP3: Debe limpiar el formulario al enviar', async () => {
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'tester@test.com' } });
    
    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensaje/i }));

    // Los campos deben limpiarse (función reset)
    await waitFor(() => {
        expect(screen.getByLabelText(/Nombre Completo/i)).toHaveValue('');
        expect(screen.getByLabelText(/Correo Electrónico/i)).toHaveValue('');
    });
  });

  it('CP4: Debe mostrar información de contacto y ubicaciones', () => {
    // CORREGIDO: Buscar contenido estático
    expect(screen.getByText(/info@huertohogar.cl/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Ubicaciones/i, level: 5 })).toBeInTheDocument();
    expect(screen.getByText(/📍 Santiago - Av. Principal 123/i)).toBeInTheDocument();
  });
});