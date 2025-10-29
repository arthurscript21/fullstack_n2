// tests/components/admin/UserRow.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import UserRow from '../../../src/components/admin/UserRow';

// Mock de datos de usuario
const mockUser = {
  id: 'U1',
  nombre: 'Juana Bodoque',
  email: 'juana@example.com',
  telefono: '+56912345678',
  direccion: 'Metropolitana', // o 'region'
  rol: 'Cliente'
};

const mockUserSinDatos = {
  id: 'U2',
  nombre: 'Pedro Pascal',
  email: 'pedro@example.com',
  telefono: null, // Sin teléfono
  direccion: null, // Sin dirección
  rol: 'Admin'
};

const mockOnDelete = vi.fn();

// Wrapper para renderizar dentro de <table><tbody>
const renderComponent = (userProps) => {
  render(
    <table>
      <tbody>
        <UserRow user={userProps} onDelete={mockOnDelete} />
      </tbody>
    </table>
  );
};

describe('Pruebas para UserRow (Admin)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('CP1: Debe renderizar todos los datos del usuario (nombre, email, rol, etc.)', () => {
    renderComponent(mockUser);

    expect(screen.getByText('Juana Bodoque')).toBeInTheDocument();
    expect(screen.getByText('juana@example.com')).toBeInTheDocument();
    expect(screen.getByText('+56912345678')).toBeInTheDocument();
    expect(screen.getByText('Metropolitana')).toBeInTheDocument();
    expect(screen.getByText('Cliente')).toBeInTheDocument();
  });

  it('CP2: Debe mostrar guiones "-" si faltan datos opcionales (teléfono, dirección)', () => {
    renderComponent(mockUserSinDatos);

    expect(screen.getByText('Pedro Pascal')).toBeInTheDocument();
    expect(screen.getByText('pedro@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument(); // Muestra rol

    // Busca los guiones (placeholder)
    // Usamos getAllByText porque puede haber más de un guion
    expect(screen.getAllByText('-').length).toBeGreaterThanOrEqual(2);
  });

  it('CP3: Debe llamar a onDelete con el ID del usuario al hacer clic en Eliminar', () => {
    renderComponent(mockUser);

    // Act
    const deleteButton = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(deleteButton);

    // Assert
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith('U1'); // Verifica el ID correcto
  });

});