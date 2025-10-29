// tests/components/store/ProductCard.test.jsx

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../../src/components/store/ProductCard';

// Importamos intl para formateo de moneda (necesario en algunos entornos de test)
import 'intl';
import 'intl/locale-data/jsonp/es-CL'; // Para $1.500

// ARRANGE (Datos de prueba)
const mockProductNormal = {
  id: 'TEST001',
  nombre: 'Manzana de Prueba',
  precio: 1500,
  categoria: 'frutas',
  imagen: 'manzana.jpg'
  // No tiene enOferta
};

const mockProductOferta = {
  id: 'OFERTA001',
  nombre: 'Naranja en Oferta',
  precio: 1000,
  precioOferta: 800, // <--- Precio de oferta
  enOferta: true,      // <--- Marcado en oferta
  categoria: 'frutas',
  imagen: 'naranja.jpg'
};

describe('Pruebas para ProductCard (Store)', () => {

  // CP1: Prueba de Renderizado y Props (PDF)
  it('Debe renderizar nombre, precio normal y enlace si NO está en oferta', () => {
    // ARRANGE
    render(
      <BrowserRouter> {/* ProductCard usa <Link>, necesita el Router */}
        <ProductCard product={mockProductNormal} />
      </BrowserRouter>
    );

    // ACT (Sin acción)

    // ASSERT
    expect(screen.getByText('Manzana de Prueba')).toBeInTheDocument();
    // El componente capitaliza la primera letra de la categoría
    expect(screen.getByText('Frutas')).toBeInTheDocument();
    
    // Verifica el precio normal formateado
    expect(screen.getByText('$1.500')).toBeInTheDocument();
    expect(screen.getByText('$1.500')).toHaveClass('text-success'); // Color verde
    
    // Verifica que el badge "¡Oferta!" NO esté
    expect(screen.queryByText('¡Oferta!')).not.toBeInTheDocument();
    
    // Verifica que el enlace "Ver Detalles" apunte al ID correcto
    const link = screen.getByRole('link', { name: /Ver Detalles/i });
    expect(link).toHaveAttribute('href', '/productos/TEST001');
  });

  // CP2: Prueba de Renderizado Condicional y Props (PDF)
  it('Debe mostrar precio de oferta, precio tachado y badge si ESTÁ en oferta', () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <ProductCard product={mockProductOferta} />
      </BrowserRouter>
    );

    // ACT (Sin acción)

    // ASSERT
    expect(screen.getByText('Naranja en Oferta')).toBeInTheDocument();

    // Verifica precio de oferta
    expect(screen.getByText('$800')).toBeInTheDocument();
    expect(screen.getByText('$800')).toHaveClass('text-danger'); // Color rojo

    // Verifica precio original tachado
    expect(screen.getByText('$1.000')).toBeInTheDocument();
    expect(screen.getByText('$1.000')).toHaveClass('text-decoration-line-through');

    // Verifica que el badge "¡Oferta!" SÍ esté
    expect(screen.getByText('¡Oferta!')).toBeInTheDocument();
    expect(screen.getByText('¡Oferta!')).toHaveClass('badge');
  });

  // CP3: Prueba de Props (Imagen)
  it('Debe renderizar la imagen con el alt y src correctos', () => {
     // ARRANGE
    render(
      <BrowserRouter>
        <ProductCard product={mockProductNormal} />
      </BrowserRouter>
    );
    
    // ACT
    const img = screen.getByRole('img'); // Busca la imagen

    // ASSERT
    expect(img).toHaveAttribute('src', 'manzana.jpg');
    expect(img).toHaveAttribute('alt', 'Manzana de Prueba');
  });
});