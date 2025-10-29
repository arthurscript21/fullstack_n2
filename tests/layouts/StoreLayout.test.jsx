// tests/layouts/StoreLayout.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import StoreLayout from '../../../src/layouts/StoreLayout'; // Ajusta la ruta

// Mocks de los componentes hijos (Navbar y Footer de la tienda)
vi.mock('../../../src/components/store/Navbar', () => ({
  default: () => <nav data-testid="mock-navbar">Navbar Mock</nav>
}));

vi.mock('../../../src/components/store/Footer', () => ({
  default: () => <footer data-testid="mock-store-footer">Footer Tienda Mock</footer>
}));

describe('Pruebas para StoreLayout', () => {

  // ARRANGE: Renderiza el StoreLayout
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<StoreLayout />}>
            <Route index element={<div>Contenido de Página Tienda</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  });

  it('CP1: Debe renderizar el Navbar de la tienda', () => {
    // ASSERT
    expect(screen.getByText('Navbar Mock')).toBeInTheDocument();
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
  });

  it('CP2: Debe renderizar el Footer de la tienda', () => {
    // ASSERT
    expect(screen.getByText('Footer Tienda Mock')).toBeInTheDocument();
    expect(screen.getByTestId('mock-store-footer')).toBeInTheDocument();
  });

  it('CP3: Debe renderizar el contenido de la página hija (Outlet) dentro de un tag <main>', () => {
    // ASSERT
    expect(screen.getByText('Contenido de Página Tienda')).toBeInTheDocument();
    
    // Verifica que el contenido esté dentro de un <main>
    const mainElement = screen.getByRole('main');
    expect(mainElement).toContainElement(screen.getByText('Contenido de Página Tienda'));
  });
});