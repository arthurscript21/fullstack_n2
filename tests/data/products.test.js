// tests/data/products.test.js
import { describe, it, expect } from 'vitest';
import {
  products,
  getProductById,
  getProductsByCategory,
  obtenerNombreCategoria
} from '../../../src/data/products'; // Ajusta la ruta

describe('Pruebas para products.js', () => {

  it('CP1: getProductById debe devolver el producto correcto para un ID válido', () => {
    // ARRANGE
    const idValido = 'FR001'; // Manzanas Fuji
    
    // ACT
    const product = getProductById(idValido);

    // ASSERT
    expect(product).toBeDefined();
    expect(product.id).toBe(idValido);
    expect(product.nombre).toBe('Manzanas Fuji');
  });

  it('CP2: getProductsByCategory debe devolver solo productos de esa categoría', () => {
    // ARRANGE
    const categoria = 'frutas';
    
    // ACT
    const filteredProducts = getProductsByCategory(categoria);

    // ASSERT
    expect(filteredProducts).toBeDefined();
    expect(filteredProducts.length).toBeGreaterThan(0);
    // Verifica que CADA producto en el array devuelto sea de la categoría 'frutas'
    expect(filteredProducts.every(p => p.categoria === categoria)).toBe(true);
    // Verifica que no haya incluido de otra categoría (ej: 'verduras')
    expect(filteredProducts.some(p => p.categoria === 'verduras')).toBe(false);
  });

  it('CP3: obtenerNombreCategoria debe formatear el nombre correctamente', () => {
    // ARRANGE
    const keyFrutas = 'frutas';
    const keyVerduras = 'verduras';
    const keyDesconocida = 'otraCosa';

    // ACT
    const nombreFrutas = obtenerNombreCategoria(keyFrutas);
    const nombreVerduras = obtenerNombreCategoria(keyVerduras);
    const nombreDesconocida = obtenerNombreCategoria(keyDesconocida); // Prueba con una clave no definida

    // ASSERT
    expect(nombreFrutas).toBe('Frutas Frescas');
    expect(nombreVerduras).toBe('Verduras Orgánicas');
    expect(nombreDesconocida).toBe('otraCosa'); // Debe devolver la clave original si no la encuentra
  });

  it('CP4: getProductById debe devolver undefined para un ID inválido', () => {
    // ARRANGE
    const idInvalido = 'ID_FALSO_999';
    
    // ACT
    const product = getProductById(idInvalido);

    // ASSERT
    expect(product).toBeUndefined();
  });
});