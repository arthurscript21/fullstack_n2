// tests/pages/admin/AdminUsers.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AdminUsers from '../../../src/pages/admin/AdminUsers';

// Mock de localStorage
const mockUsers = [
  { id: 'U1', nombre: 'Usuario A', email: 'a@test.com', telefono: '123', direccion: 'Valpo', rol: 'Admin' },
  { id: 'U2', nombre: 'Usuario B', email: 'b@test.com', telefono: '456', direccion: 'Stgo', rol: 'Cliente' },
];

const mockGetItem = vi.fn();
vi.stubGlobal('localStorage', {
  getItem: mockGetItem,
  setItem: vi.fn(),
});

describe('Pruebas para AdminUsers', () => {

  beforeEach(() => { vi.clearAllMocks(); });

  it('CP1: Debe renderizar el título y el botón de "Crear Usuario"', () => {
    // ARRANGE
    mockGetItem.mockReturnValue(JSON.stringify(mockUsers));
    render(<BrowserRouter><AdminUsers /></BrowserRouter>);
    
    // ASSERT
    expect(screen.getByText('Usuarios Registrados')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Crear Usuario/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/admin/usuarios/nuevo');
  });

  it('CP2: Debe mostrar los usuarios cargados desde localStorage', () => {
    // ARRANGE
    mockGetItem.mockReturnValue(JSON.stringify(mockUsers));
    render(<BrowserRouter><AdminUsers /></BrowserRouter>);
    
    // ASSERT
    expect(screen.getByText('Usuario A')).toBeInTheDocument();
    expect(screen.getByText('a@test.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Usuario B')).toBeInTheDocument();
    expect(screen.getByText('b@test.com')).toBeInTheDocument();
    expect(screen.getByText('Cliente')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Eliminar/i })).toHaveLength(2);
  });

  it('CP3: Debe mostrar "No hay usuarios" si localStorage está vacío', () => {
    // ARRANGE
    mockGetItem.mockReturnValue(JSON.stringify([])); // Array vacío
    render(<BrowserRouter><AdminUsers /></BrowserRouter>);
    
    // ASSERT
    expect(screen.getByText('No hay usuarios registrados.')).toBeInTheDocument();
    expect(screen.queryByText('Usuario A')).not.toBeInTheDocument();
  });
});