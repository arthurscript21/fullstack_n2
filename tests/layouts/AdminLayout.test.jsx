// tests/layouts/AdminLayout.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '../../../src/layouts/AdminLayout'; // Ajusta la ruta

// Hacemos "mocks" de los componentes hijos para aislar la prueba al Layout.
// Le decimos a Vitest: "Cuando alguien importe Sidebar, dale este componente falso".
vi.mock('../../../src/components/admin/Sidebar', () => ({
  // 'default' es necesario para importaciones 'export default'
  default: () => <aside data-testid="mock-sidebar">Sidebar Mock</aside> 
}));

vi.mock('../../../src/components/admin/Footer', () => ({
  default: () => <footer data-testid="mock-admin-footer">Footer Admin Mock</footer>
}));


describe('Pruebas para AdminLayout', () => {

  // ARRANGE: Renderiza el AdminLayout dentro de un Router
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          {/* Definimos una ruta que usa AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Definimos una ruta hija de ejemplo que se renderizará en el Outlet */}
            <Route index element={<div>Página Hija de Prueba</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  });

  it('CP1: Debe renderizar el Sidebar del admin', () => {
    // ASSERT
    // Busca el componente "mockeado" por su texto o data-testid
    expect(screen.getByText('Sidebar Mock')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
  });

  it('CP2: Debe renderizar el Footer del admin', () => {
    // ASSERT
    expect(screen.getByText('Footer Admin Mock')).toBeInTheDocument();
    expect(screen.getByTestId('mock-admin-footer')).toBeInTheDocument();
  });

  it('CP3: Debe renderizar el contenido de la página hija (Outlet)', () => {
    // ASSERT
    // Verifica que el contenido de la ruta anidada (el Outlet) se esté mostrando
    expect(screen.getByText('Página Hija de Prueba')).toBeInTheDocument();
  });
});