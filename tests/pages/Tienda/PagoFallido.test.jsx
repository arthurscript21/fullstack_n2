// tests/pages/Tienda/PagoFallido.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import PagoFallido from '../../../src/pages/Tienda/PagoFallido'; // Ajusta la ruta si es necesario

// --- Mocks ---

// Mockear useNavigate (para verificar la redirección si el usuario presiona Reintentar)
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { 
    ...actual, 
    useNavigate: () => mockNavigate,
    Link: (props) => <a href={props.to} {...props}>{props.children}</a>, // Mock simple de Link
  };
});

// ----------------

describe('Pruebas para PagoFallido (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    
    render(
      <BrowserRouter>
        <PagoFallido />
      </BrowserRouter>
    );
  });

  it('CP1: Debe mostrar el título de error y el mensaje de fallo', () => {
    // ASSERT: Título de error
    expect(screen.getByRole('heading', { name: /¡El Pago ha Fallado!/i, level: 1 })).toBeInTheDocument();
    
    // ASSERT: Mensaje de error (genérico)
    expect(screen.getByText(/Ha ocurrido un error durante el procesamiento de tu pago/i)).toBeInTheDocument();
  });

  it('CP2: Debe ofrecer opciones de navegación y reintento', () => {
    // ASSERT: Botón de reintento (usando role button para el evento click)
    const btnReintentar = screen.getByRole('button', { name: /Reintentar Pago/i });
    expect(btnReintentar).toBeInTheDocument();
    
    // ASSERT: Enlace al carrito
    expect(screen.getByRole('link', { name: /Volver al Carrito/i })).toHaveAttribute('href', '/carrito');
    
    // ASSERT: Enlace a la tienda
    expect(screen.getByRole('link', { name: /Ir a la Tienda/i })).toHaveAttribute('href', '/productos');
  });

  it('CP3: El botón de Reintentar Pago debe navegar a la página de checkout', () => {
    const btnReintentar = screen.getByRole('button', { name: /Reintentar Pago/i });

    // ACT: Click en reintentar
    fireEvent.click(btnReintentar);

    // ASSERT: Navega al checkout
    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });
});