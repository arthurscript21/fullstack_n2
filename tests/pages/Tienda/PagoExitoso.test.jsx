// tests/pages/Tienda/PagoExitoso.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import PagoExitoso from '../../../src/pages/Tienda/PagoExitoso'; // Ajusta la ruta

// --- Mocks ---

const mockOrderId = 'PEDIDO-20231028-1A2B3C4D';

// Mockear useLocation para simular el paso del orderId desde Checkout
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: () => ({
      state: {
        orderId: mockOrderId,
      },
    }),
    Link: (props) => <a href={props.to} {...props}>{props.children}</a>, 
  };
});

// ----------------

describe('Pruebas para PagoExitoso (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    
    render(
      <BrowserRouter>
        <PagoExitoso />
      </BrowserRouter>
    );
  });

  it('CP1: Debe mostrar el mensaje de éxito y el ID de la orden', () => {
    // ASSERT: Título de éxito
    expect(screen.getByRole('heading', { name: /¡Pago Recibido Exitosamente!/i })).toBeInTheDocument();

    // ASSERT: El ID de la orden debe estar presente
    expect(screen.getByText(`Tu número de orden es: ${mockOrderId}`)).toBeInTheDocument();
  });

  it('CP2: Debe tener enlaces para continuar la navegación', () => {
    // ASSERT: Enlace a la tienda
    expect(screen.getByRole('link', { name: /Volver a la Tienda/i })).toHaveAttribute('href', '/productos');
    
    // ASSERT: Enlace para ver perfil (asumiendo que existe)
    expect(screen.getByRole('link', { name: /Ver mi Perfil/i })).toHaveAttribute('href', '/perfil');
  });

  it('CP3: Debe manejar la ausencia del Order ID (caso fallback)', () => {
    // ARRANGE: Mockear useLocation sin state
    vi.mock('react-router-dom', async (importOriginal) => {
        const actual = await importOriginal();
        return {
          ...actual,
          useLocation: () => ({ state: {} }),
          Link: (props) => <a href={props.to} {...props}>{props.children}</a>,
        };
    });

    // ACT: Re-renderizar con el mock sin ID
    render(
      <BrowserRouter>
        <PagoExitoso />
      </BrowserRouter>
    );

    // ASSERT: Debe mostrar un mensaje genérico o un ID por defecto (o manejar la ausencia)
    // Asumiremos que muestra un mensaje genérico o un placeholder.
    expect(screen.getByText(/Tu número de orden es: N\/A/i)).toBeInTheDocument(); 
  });
});