// tests/pages/admin/CreateProduct.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import CreateProduct from '../../../src/pages/admin/CreateProduct';

// Mock de localStorage y alert
const mockSetItem = vi.fn();
vi.stubGlobal('localStorage', {
  getItem: vi.fn(() => '[]'), // Simula que siempre está vacío o puedes mockear datos
  setItem: mockSetItem,
});
vi.stubGlobal('alert', vi.fn());

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('Pruebas para CreateProduct (Formulario)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    render(<BrowserRouter><CreateProduct /></BrowserRouter>);
  });

  it('CP1: Debe renderizar los campos del formulario (Nombre, Precio, Stock)', () => {
    // ASSERT
    expect(screen.getByLabelText(/Nombre del producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Precio \(CLP\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Stock \(unidades\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoría/i)).toBeInTheDocument();
  });

  it('CP2: Debe mostrar un error de validación si se envía el formulario vacío (Evento y Estado)', async () => {
    // ACT
    // (usamos fireEvent.submit en lugar de click en el botón para formularios)
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Producto/i }));

    // ASSERT
    // Espera a que aparezca el mensaje de error
    expect(await screen.findByText(/Nombre, precio y stock son obligatorios/i)).toBeInTheDocument();
    // Verifica que localStorage NO fue llamado
    expect(mockSetItem).not.toHaveBeenCalled();
  });

  it('CP3: Debe llamar a localStorage.setItem y mostrar alerta al enviar formulario válido', async () => {
    // ARRANGE: Llenar el formulario
    fireEvent.change(screen.getByLabelText(/Nombre del producto/i), { target: { value: 'Test Prod' } });
    fireEvent.change(screen.getByLabelText(/Precio \(CLP\)/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/Stock \(unidades\)/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Categoría/i), { target: { value: 'verduras' } });

    // ACT: Enviar formulario
    fireEvent.submit(screen.getByRole('button', { name: /Guardar Producto/i }));

    // ASSERT
    // Espera a que aparezca el mensaje de éxito
    expect(await screen.findByText(/guardado exitosamente/i)).toBeInTheDocument();
    
    // Verifica que localStorage SÍ fue llamado
    expect(mockSetItem).toHaveBeenCalledTimes(1);
    // Verifica que el primer argumento de setItem sea la clave correcta
    expect(mockSetItem.mock.calls[0][0]).toBe('huertohogar_products_admin');
    // Verifica que el segundo argumento contenga los datos nuevos
    expect(mockSetItem.mock.calls[0][1]).toContain('Test Prod');
    expect(mockSetItem.mock.calls[0][1]).toContain('123');
    expect(mockSetItem.mock.calls[0][1]).toContain('verduras');
  });

});