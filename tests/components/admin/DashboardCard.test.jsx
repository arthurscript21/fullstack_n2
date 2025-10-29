// tests/components/admin/DashboardCard.test.jsx
import { render, screen } from '@testing-library/react';
import DashboardCard from '../../../src/components/admin/DashboardCard'; // Ajusta la ruta

// Mock de un ícono de ejemplo
const mockIcon = <svg data-testid="mock-icon"></svg>;

describe('Pruebas para DashboardCard (Admin)', () => {

  it('CP1: Debe renderizar el título y el valor correctamente', () => {
    // Arrange
    render(<DashboardCard title="Ventas Totales" value="1,234" />);
    
    // Act (No hay acción, solo renderizado)

    // Assert
    expect(screen.getByText('Ventas Totales')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('CP2: Debe aplicar el color de fondo por defecto (primary) si no se especifica', () => {
    // Arrange
    const { container } = render(<DashboardCard title="Ventas" value="10" />);
    
    // Act
    const cardElement = container.firstChild; // El div principal

    // Assert
    expect(cardElement).toHaveClass('bg-primary');
  });

  it('CP3: Debe aplicar una clase de color específica (ej: bg-success) si se pasa como prop', () => {
    // Arrange
    const { container } = render(<DashboardCard title="Usuarios" value="50" color="success" />);
    
    // Act
    const cardElement = container.firstChild;

    // Assert
    expect(cardElement).toHaveClass('bg-success');
    expect(cardElement).not.toHaveClass('bg-primary');
  });

});