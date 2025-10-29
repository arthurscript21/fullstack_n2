// tests/data/blogData.test.js
import { describe, it, expect } from 'vitest';
import { blogPosts, getPostById } from '../../../src/data/blogData'; // Ajusta la ruta

describe('Pruebas para blogData.js', () => {

  it('CP1: Debe exportar un array de posts (blogPosts)', () => {
    // ARRANGE & ACT (Solo importar)
    
    // ASSERT
    // Verifica que blogPosts sea un array
    expect(Array.isArray(blogPosts)).toBe(true);
    // Verifica que el array no esté vacío
    expect(blogPosts.length).toBeGreaterThan(0);
  });

  it('CP2: getPostById debe devolver el post correcto para un ID válido', () => {
    // ARRANGE
    const validId = 'receta-manzana'; // Asume que este ID existe en tus datos
    
    // ACT
    const post = getPostById(validId);

    // ASSERT
    expect(post).toBeDefined(); // Verifica que encontró algo
    expect(typeof post).toBe('object'); // Verifica que sea un objeto
    expect(post.id).toBe(validId); // Verifica que sea el ID correcto
    expect(post.titulo).toContain('Tarta de Manzana'); // Verifica parte del título
  });

  it('CP3: getPostById debe devolver undefined para un ID inválido', () => {
    // ARRANGE
    const invalidId = 'id-que-no-existe-123';
    
    // ACT
    const post = getPostById(invalidId);

    // ASSERT
    expect(post).toBeUndefined(); // Verifica que no encontró nada
  });
});