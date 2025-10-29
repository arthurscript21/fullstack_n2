// tests/pages/admin/AdminDashboard.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AdminDashboard from '../../../src/pages/admin/AdminDashboard';
import { initialUsers } from '../../../src/data/usersData'; // Importa el mock

// Mock de localStorageHelper
vi.mock('../../../src/utils/localStorageHelper', () => ({
  getUsersList: vi.fn(),
  // ... (otras funciones si son necesarias)
}));
import { getUsersList } from '../../../src/utils/localStorageHelper';

// Mock de productsData
vi.mock('../../../src/data/productsData', () => ({
  initialProducts: [
    { id: 'P1', nombre: 'Mock Producto', precio: 1000, stock: 10 },
    { id: 'P2', nombre: 'Mock Producto 2', precio: 500, stock: 5 },
  ],
}));


describe('Pruebas para AdminDashboard', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('CP1: Debe renderizar los títulos y encabezados principales', () => {
    // ARRANGE
    getUsersList.mockReturnValue(initialUsers); // Devuelve usuarios mock
    render(<BrowserRouter><AdminDashboard /></BrowserRouter>);
    
    // ASSERT
    expect(screen.getByText('Bienvenido, Admin')).toBeInTheDocument();
    expect(screen.getByText('Panel de administración general')).toBeInTheDocument();
    expect(screen.getByText('Usuarios Registrados')).toBeInTheDocument();
  });

  it('CP2: Debe mostrar las tarjetas (Cards) con los conteos correctos', () => {
    // ARRANGE
    // Simula 3 usuarios en la lista
    getUsersList.mockReturnValue([
      { id: 'u1', nombre: 'User 1' },
      { id: 'u2', nombre: 'User 2' },
      { id: 'u3', nombre: 'User 3' },
    ]);
    render(<BrowserRouter><AdminDashboard /></BrowserRouter>);

    // ASSERT
    // Busca el título "Productos" y verifica que el valor '2' (del mock de initialProducts) esté
    const productosCard = screen.getByText('Productos').closest('.dashboard-card');
    expect(productosCard).toHaveTextContent('2');

    // Busca el título "Usuarios" y verifica que el valor '3' (del mock de getUsersList) esté
    const usuariosCard = screen.getByText('Usuarios').closest('.dashboard-card');
    expect(usuariosCard).toHaveTextContent('3');
    
    // Verifica el cálculo de ingresos (1000*10 + 500*5 = 12500)
    const ingresosCard = screen.getByText(/Ingresos/i).closest('.dashboard-card');
    expect(ingresosCard).toHaveTextContent(/\$12.500/i); // Formato de moneda
  });

  it('CP3: Debe mostrar una fila de usuario de la lista cargada', () => {
    // ARRANGE
    getUsersList.mockReturnValue([
      { id: 'u1', nombre: 'Juanito Perez', email: 'juanito@test.com', telefono: '1234', direccion: 'Santiago', rol: 'Cliente' }
    ]);
    render(<BrowserRouter><AdminDashboard /></BrowserRouter>);

    // ASSERT
    // Verifica que los datos del usuario mockeado estén en la tabla
    expect(screen.getByText('Juanito Perez')).toBeInTheDocument();
    expect(screen.getByText('juanito@test.com')).toBeInTheDocument();
    expect(screen.getByText('Cliente')).toBeInTheDocument();
  });

});