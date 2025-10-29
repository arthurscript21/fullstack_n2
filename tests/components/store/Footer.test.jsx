// tests/components/store/Footer.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../../src/components/store/Footer'; // Ajusta la ruta

describe('Pruebas para Footer (Store)', () => {

  // ARRANGE: Renderiza el componente antes de cada prueba
  // Es necesario envolverlo en <BrowserRouter> porque el Footer contiene <Link>
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar el título "HuertoHogar" y la descripción', () => {
    // ASSERT
    expect(screen.getByText('HuertoHogar')).toBeInTheDocument();
    expect(screen.getByText(/Frescura y calidad del campo/i)).toBeInTheDocument();
  });

  it('CP2: Debe renderizar los enlaces de navegación (Enlances y Contacto)', () => {
    // ASSERT
    // Verifica los enlaces
    expect(screen.getByRole('link', { name: /Productos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Nosotros/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contacto/i })).toBeInTheDocument();
    
    // Verifica la información de contacto
    expect(screen.getByText(/info@huertohogar.cl/i)).toBeInTheDocument();
    expect(screen.getByText(/\+56 2 2345 6789/i)).toBeInTheDocument();
  });

  it('CP3: Debe mostrar el año actual en el copyright', () => {
    // ASSERT
    const currentYear = new Date().getFullYear().toString(); // ej: "2025"
    // Busca el texto que contenga el año actual
    expect(screen.getByText(new RegExp(currentYear, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument();
  });
});