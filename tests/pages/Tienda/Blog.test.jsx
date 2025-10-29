// tests/pages/Tienda/Blog.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Blog from '../../../src/pages/Tienda/Blog'; // Ajusta la ruta

// --- Mocks ---

// Mockear los datos de blog (asumiendo que los importa de blogData.js o similar)
const mockBlogArticles = [
  { id: 1, title: 'Artículo 1: Cultivo de Rosas', author: 'Autor A', date: '2023-10-01', snippet: 'Intro A' },
  { id: 2, title: 'Artículo 2: Tipos de Sustrato', author: 'Autor B', date: '2023-10-15', snippet: 'Intro B' },
  { id: 3, title: 'Artículo 3: Riego Eficiente', author: 'Autor A', date: '2023-10-20', snippet: 'Intro C' },
];

// Mockear la importación de datos
vi.mock('../../../src/data/blogData', () => ({
  blogArticles: mockBlogArticles,
}));

// ----------------

describe('Pruebas para Blog (Tienda)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );
  });

  it('CP1: Debe renderizar el título principal de la sección', () => {
    expect(screen.getByRole('heading', { name: /Nuestro Blog/i, level: 1 })).toBeInTheDocument();
  });

  it('CP2: Debe mostrar todos los artículos del blog', () => {
    // ASUMIENDO que cada artículo muestra su título
    expect(screen.getByRole('heading', { name: /Artículo 1: Cultivo de Rosas/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Artículo 2: Tipos de Sustrato/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Artículo 3: Riego Eficiente/i })).toBeInTheDocument();
  });

  it('CP3: Cada artículo debe contener la información básica (Autor y Fecha)', () => {
    // Verificar el primer artículo
    const article1 = screen.getByRole('heading', { name: /Artículo 1:/i }).closest('div');
    expect(within(article1).getByText(/Autor A/i)).toBeInTheDocument();
    // Verifica que existe un enlace para ver el detalle
    expect(within(article1).getByRole('link', { name: /Leer Más/i })).toBeInTheDocument();
  });
  
  it('CP4: El enlace de cada artículo debe apuntar a la ruta de detalle correcta', () => {
    const article1Link = screen.getByRole('link', { name: /Leer Más/i, exact: false }).closest('a');
    // Verifica que el href use el ID del artículo
    expect(article1Link).toHaveAttribute('href', '/blog/1');
  });

  it('CP5: Debe mostrar un mensaje si no hay artículos disponibles', () => {
    // ARRANGE: Mockear que no hay artículos
    vi.mock('../../../src/data/blogData', () => ({
        blogArticles: [],
    }));

    // ACT: Re-renderizar
    render(
        <BrowserRouter>
            <Blog />
        </BrowserRouter>
    );

    // ASSERT
    expect(screen.getByText(/No hay artículos publicados en el blog por el momento/i)).toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});