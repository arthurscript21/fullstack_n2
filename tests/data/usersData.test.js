// tests/data/usersData.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initialUsers, addUser, deleteUser } from '../../../src/data/usersData'; // Ajusta la ruta

describe('Pruebas para usersData.js', () => {

  let mockAlert;

  // Mock de window.alert antes de cada prueba
  beforeEach(() => {
    // Espía alert y haz que no haga nada
    mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  // Limpia el mock después de cada prueba
  afterEach(() => {
    mockAlert.mockRestore();
  });

  it('CP1: addUser debe agregar un nuevo usuario a la lista', () => {
    // ARRANGE
    const usersActuales = [...initialUsers]; // Copia de los usuarios iniciales
    const nuevoUsuario = { id: 'u_3', nombre: 'Nuevo Usuario', email: 'nuevo@test.com' };
    
    // ACT
    const listaActualizada = addUser(usersActuales, nuevoUsuario);

    // ASSERT
    expect(listaActualizada.length).toBe(usersActuales.length + 1); // Verifica que el largo aumentó en 1
    // Verifica que el nuevo usuario esté en la lista (buscándolo por email)
    expect(listaActualizada.find(u => u.email === 'nuevo@test.com')).toBeDefined();
  });

  it('CP2: addUser NO debe agregar un usuario si el email ya existe y debe mostrar alerta', () => {
    // ARRANGE
    const usersActuales = [...initialUsers];
    const usuarioDuplicado = { id: 'u_4', nombre: 'Duplicado', email: 'cliente@ejemplo.com' }; // Email ya existe en initialUsers
    
    // ACT
    const listaSinCambios = addUser(usersActuales, usuarioDuplicado);

    // ASSERT
    expect(listaSinCambios.length).toBe(usersActuales.length); // El largo no debe cambiar
    expect(mockAlert).toHaveBeenCalledTimes(1); // Verifica que se llamó a la alerta
    expect(mockAlert).toHaveBeenCalledWith('El correo ya está registrado'); // Verifica el mensaje
  });

  it('CP3: deleteUser debe eliminar al usuario correcto de la lista', () => {
    // ARRANGE
    const usersActuales = [...initialUsers];
    const idParaBorrar = 'u_2'; // ID del Cliente Ejemplo
    
    // ACT
    const listaActualizada = deleteUser(usersActuales, idParaBorrar);

    // ASSERT
    expect(listaActualizada.length).toBe(usersActuales.length - 1); // El largo debe disminuir
    // Verifica que el usuario borrado YA NO esté en la lista
    expect(listaActualizada.find(u => u.id === idParaBorrar)).toBeUndefined();
    // Verifica que los otros usuarios SÍ sigan
    expect(listaActualizada.find(u => u.id === 'u_1')).toBeDefined(); 
  });
});