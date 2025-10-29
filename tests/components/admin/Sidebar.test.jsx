// tests/components/admin/Sidebar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Sidebar from '../../../src/components/admin/Sidebar';

// Mock de react-router-dom: Específicamente el hook useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal(); // Importa el módulo real
  return {
    ...actual, // Mantén todo lo demás (como NavLink)
    useNavigate: () => mockNavigate, // Sobrescribe solo useNavigate
  };
});

describe('Pruebas para Sidebar (Admin)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    // Simula que el usuario confirma el 'window.confirm'
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
    // Renderiza el componente dentro de BrowserRouter porque usa NavLink
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar el logo/título "HuertoHogar"', () => {
    expect(screen.getByText('HuertoHogar')).toBeInTheDocument();
  });

  it('CP2: Debe renderizar los enlaces de navegación principales', () => {
    // Busca los enlaces por su rol y nombre (accesibilidad)
    expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Productos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Usuarios/i })).toBeInTheDocument();
    // Añade el de Órdenes que agregamos
    expect(screen.getByRole('link', { name: /Órdenes/i })).toBeInTheDocument();
  });

  it('CP3: Debe llamar a navigate("/") al hacer clic en "Cerrar sesión"', () => {
    // Act
    const logoutButton = screen.getByRole('button', { name: /Cerrar sesión/i });
    fireEvent.click(logoutButton);

    // Assert
    expect(window.confirm).toHaveBeenCalledTimes(1); // Verifica que se pidió confirmación
    expect(mockNavigate).toHaveBeenCalledTimes(1); // Verifica que se llamó a navigate
    expect(mockNavigate).toHaveBeenCalledWith('/'); // Verifica que redirigió a la home
  });

});