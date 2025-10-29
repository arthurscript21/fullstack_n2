// tests/pages/Tienda/DetalleBlog.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import DetalleBlog from '../../../src/pages/Tienda/DetalleBlog'; // Ajusta la ruta

// --- Mocks ---

// Artículo completo de prueba
const mockArticle = {
  id: 1, 
  title: 'Artículo de Prueba: Riego en Verano', 
  author: 'Bot Test', 
  date: '2023-11-01', 
  content: 'Este es el **contenido** completo del artículo. Es muy largo e informativo.',
  imagen: 'img_riego.jpg'
};

// Mockear la fuente de datos (blogData o función de búsqueda)
const mockFindArticleById = vi.fn(() => mockArticle);
vi.mock('../../../src/data/blogData', () => ({
  findArticleById: mockFindArticleById,
}));

// Mockear useParams para simular el ID del artículo
let mockArticleId = '1'; 
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ articleId: mockArticleId }),
    Link: (props) => <a href={props.to} {...props}>{props.children}</a>,
  };
});

// ----------------

describe('Pruebas para DetalleBlog (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockArticleId = '1';
    mockFindArticleById.mockReturnValue(mockArticle);
    
    render(
      <BrowserRouter>
        <DetalleBlog />
      </BrowserRouter>
    );
  });

  it('CP1: Debe cargar y mostrar el título, autor, fecha y contenido del artículo', () => {
    // ASSERT: Título
    expect(screen.getByRole('heading', { name: /Artículo de Prueba: Riego en Verano/i, level: 1 })).toBeInTheDocument();
    
    // ASSERT: Autor y fecha
    expect(screen.getByText(/Bot Test/i)).toBeInTheDocument();
    expect(screen.getByText(/1 de noviembre de 2023/i)).toBeInTheDocument(); // Asumiendo formato de fecha
    
    // ASSERT: Contenido
    expect(screen.getByText(/Este es el contenido completo del artículo/i)).toBeInTheDocument();
  });
  
  it('CP2: Debe mostrar un mensaje de error si el artículo no se encuentra', () => {
    // ARRANGE: Simular que no se encuentra el artículo
    mockArticleId = '999';
    mockFindArticleById.mockReturnValue(null);
    
    // ACT: Re-renderizar
    render(
      <BrowserRouter>
        <DetalleBlog />
      </BrowserRouter>
    );

    // ASSERT: Mensaje de no encontrado
    expect(screen.getByText(/Lo sentimos, el artículo de blog no fue encontrado/i)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Artículo de Prueba/i })).not.toBeInTheDocument();
  });
});