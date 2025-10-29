// tests/data/usersData.test.js - CORREGIDO
import { describe, it, expect } from 'vitest';
// RUTA CORREGIDA: ../../../src/data/usersData -> ../../src/data/usersData
import { initialUsers, getUserByEmail, saveNewUser } from '../../src/data/usersData';

describe('Pruebas para usersData.js', () => {

  it('CP1: Debe tener un array inicial de usuarios definido y no vacío', () => {
    expect(initialUsers).toBeDefined();
    expect(initialUsers.length).toBeGreaterThan(0);
  });

  it('CP2: getUserByEmail debe retornar un usuario si el email existe', () => {
    // Usamos un email conocido de la lista inicial
    const knownEmail = initialUsers.find(u => u.email)?.email;
    const user = getUserByEmail(knownEmail);
    expect(user).toBeDefined();
    expect(user.email).toBe(knownEmail);
  });

  it('CP3: getUserByEmail debe retornar undefined si el email no existe', () => {
    const user = getUserByEmail('noexiste@test.com');
    expect(user).toBeUndefined();
  });

  it('CP4: saveNewUser debe agregar un nuevo usuario si el email no está en uso', () => {
    const newUserData = {
        id: 'new_id',
        nombre: 'Nuevo Test',
        email: 'nuevo@test.com',
        password: 'password123',
        rol: 'Cliente'
    };
    const initialCount = initialUsers.length;
    
    // Ejecutar saveNewUser (que modifica la lista inicial si no está mockeada)
    saveNewUser(newUserData);
    
    // Verificar que el usuario fue agregado a la lista global
    expect(initialUsers.length).toBe(initialCount + 1);
    expect(getUserByEmail(newUserData.email)).toBeDefined();
  });
});