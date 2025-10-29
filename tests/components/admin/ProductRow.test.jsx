// tests/components/admin/ProductRow.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest'; // vi es el objeto global de Vitest (similar a jest)
import ProductRow from '../../../src/components/admin/ProductRow';

// Datos de prueba
const mockProduct = {
  id: 'PROD1',
  nombre: 'Tomate Cherry',
  stock: 50,
  precio: 1500,
  imagen: 'tomate.jpg'
};

// Mock de las funciones prop
const mockOnSave = vi.fn();
const mockOnDelete = vi.fn();

// Vitest necesita que envolvamos el <tr> en <table><tbody>
const renderComponent = (props) => {
  return render(
    <table>
      <tbody>
        <ProductRow {...props} />
      </tbody>
    </table>
  );
};

describe('Pruebas para ProductRow (Admin)', () => {

  // Limpia los mocks después de cada prueba
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('CP1: Debe renderizar en modo "Ver" (view mode) por defecto', () => {
    renderComponent({ product: mockProduct, onSave: mockOnSave, onDelete: mockOnDelete });

    // Assert - Verifica que los datos estén visibles
    expect(screen.getByText('Tomate Cherry')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText(/\$1\.500/i)).toBeInTheDocument(); // Formato de precio
    
    // Assert - Verifica que los botones "Editar" y "Eliminar" estén
    expect(screen.getByRole('button', { name: /Editar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Eliminar/i })).toBeInTheDocument();
    
    // Assert - Verifica que los botones "Guardar" y "Cancelar" NO estén
    expect(screen.queryByRole('button', { name: /Guardar/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Cancelar/i })).not.toBeInTheDocument();
  });

  it('CP2: Debe cambiar a modo "Editar" (edit mode) al hacer clic en Editar', () => {
    renderComponent({ product: mockProduct, onSave: mockOnSave, onDelete: mockOnDelete });

    // Act - Simula clic en el botón Editar
    fireEvent.click(screen.getByRole('button', { name: /Editar/i }));

    // Assert - Verifica que los inputs (TextBox) aparezcan
    // getByDisplayValue encuentra inputs por su valor actual
    expect(screen.getByDisplayValue('Tomate Cherry')).toBeInTheDocument();
    expect(screen.getByDisplayValue('50')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1500')).toBeInTheDocument(); // El input de precio usa el número

    // Assert - Verifica que los botones "Guardar" y "Cancelar" aparezcan
    expect(screen.getByRole('button', { name: /Guardar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
  });

  it('CP3: Debe llamar a la función onDelete con el ID correcto al hacer clic en Eliminar', () => {
    // Simula que el usuario confirma el 'window.confirm'
    vi.spyOn(window, 'confirm').mockImplementation(() => true);

    renderComponent({ product: mockProduct, onSave: mockOnSave, onDelete: mockOnDelete });

    // Act - Simula clic en el botón Eliminar
    fireEvent.click(screen.getByRole('button', { name: /Eliminar/i }));

    // Assert
    expect(mockOnDelete).toHaveBeenCalledTimes(1); // Verifica que la función fue llamada
    expect(mockOnDelete).toHaveBeenCalledWith('PROD1'); // Verifica que fue llamada CON el ID correcto
  });

  // Prueba extra (Estado y Evento)
  it('CP4: Debe llamar a onSave con los datos actualizados al editar y guardar', () => {
    renderComponent({ product: mockProduct, onSave: mockOnSave, onDelete: mockOnDelete });

    // Act 1: Entrar en modo edición
    fireEvent.click(screen.getByRole('button', { name: /Editar/i }));

    // Act 2: Cambiar los valores de los inputs
    const nombreInput = screen.getByDisplayValue('Tomate Cherry');
    const stockInput = screen.getByDisplayValue('50');
    fireEvent.change(nombreInput, { target: { value: 'Tomate Editado' } });
    fireEvent.change(stockInput, { target: { value: '100' } });

    // Act 3: Guardar
    fireEvent.click(screen.getByRole('button', { name: /Guardar/i }));

    // Assert
    expect(mockOnSave).toHaveBeenCalledTimes(1);
    // Verifica que onSave fue llamado con el objeto de producto actualizado
    expect(mockOnSave).toHaveBeenCalledWith({
      id: 'PROD1',
      nombre: 'Tomate Editado',
      stock: 100, // Debe convertir el '100' (string) a 100 (number)
      precio: 1500, // El precio no se cambió
      imagen: 'tomate.jpg'
    });
  });
});