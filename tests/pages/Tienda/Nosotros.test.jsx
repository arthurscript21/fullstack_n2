// tests/pages/Tienda/Nosotros.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Nosotros from '../../../src/pages/Tienda/Nosotros'; // Ajusta la ruta

// ----------------

describe('Pruebas para Nosotros (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <BrowserRouter>
        <Nosotros />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar el título principal de la sección', () => {
    expect(screen.getByRole('heading', { name: /Nuestra Historia y Misión/i, level: 1 })).toBeInTheDocument();
  });

  it('CP2: Debe contener secciones clave (Misión, Visión, Valores)', () => {
    // ASUMIENDO que el componente tiene estas secciones como subtítulos
    expect(screen.getByRole('heading', { name: /Misión/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Visión/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Nuestros Valores/i, level: 2 })).toBeInTheDocument();
  });

  it('CP3: Debe contener texto descriptivo sobre la empresa', () => {
    // Verifica que haya texto substancial en la página (el contenido estático)
    // Buscamos un fragmento de texto común en las páginas "Acerca de"
    expect(screen.getByText(/somos una empresa dedicada a/i, { exact: false })).toBeInTheDocument();
  });
});