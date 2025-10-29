// tests/components/admin/Footer.test.jsx
import { render, screen } from '@testing-library/react';
import Footer from '../../../src/components/admin/Footer';

describe('Pruebas para Footer (Admin)', () => {

  it('CP1: Debe renderizar el texto de copyright', () => {
    render(<Footer />);
    // Usamos una expresión regular ( /.../i ) para encontrar el texto ignorando mayúsculas/minúsculas
    expect(screen.getByText(/HuertoHogar Admin Panel/i)).toBeInTheDocument();
  });

  it('CP2: Debe mostrar el año actual dinámicamente', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    
    // Verifica que el año actual esté en el texto
    expect(screen.getByText(new RegExp(currentYear, 'i'))).toBeInTheDocument();
  });

  it('CP3: Debe tener la clase CSS correcta para el estilo', () => {
    const { container } = render(<Footer />);
    // container.firstChild se refiere al tag <footer ...>
    expect(container.firstChild).toHaveClass('admin-footer');
  });
});