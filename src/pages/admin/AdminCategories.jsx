// src/pages/admin/AdminCategories.jsx
import React, { useState, useEffect } from 'react';
import { products, obtenerNombreCategoria } from '../../data/products'; // Usamos los productos para obtener las categorías actuales

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Obtenemos categorías únicas de los productos existentes
    const uniqueCategories = [...new Set(products.map(p => p.categoria))];
    // Convertimos a un formato más útil si es necesario (opcional)
    const categoryObjects = uniqueCategories.map(catKey => ({
      key: catKey,
      nombre: obtenerNombreCategoria(catKey)
    }));
    setCategories(categoryObjects);
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    setMessage('');
    if (!newCategoryName.trim()) {
      alert('El nombre de la categoría no puede estar vacío.');
      return;
    }
    // **Simulación:** En una app real, aquí guardarías la nueva categoría
    // en tu fuente de datos (API, localStorage, etc.)
    // Por ahora, solo mostramos un mensaje y limpiamos el input.
    console.log(`Simulando guardado de categoría: ${newCategoryName}`);
    setMessage(`Categoría "${newCategoryName}" añadida (simulación).`);
    // Opcional: Podrías añadirla a la lista visualmente, pero no persistirá
    // setCategories(prev => [...prev, { key: newCategoryName.toLowerCase(), nombre: newCategoryName }]);
    setNewCategoryName('');
    setShowAddForm(false); // Ocultar formulario después de añadir
    setTimeout(() => setMessage(''), 3000); // Limpiar mensaje después de 3 seg
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Categorías</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)} // Muestra/oculta el form
        >
          {showAddForm ? 'Cancelar' : 'Añadir Nueva Categoría'}
        </button>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      {/* Formulario para añadir categoría (se muestra condicionalmente) */}
      {showAddForm && (
        <form onSubmit={handleAddCategory} className="card p-3 mb-4 shadow-sm">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de la nueva categoría"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-success">Guardar Categoría</button>
          </div>
        </form>
      )}

      <h5>Categorías Actuales (Basadas en Productos)</h5>
      {categories.length === 0 ? (
        <p>No se encontraron categorías en los productos existentes.</p>
      ) : (
        <ul className="list-group">
          {categories.map(category => (
            <li key={category.key} className="list-group-item d-flex justify-content-between align-items-center">
              {category.nombre}
              {/* Podrías añadir botones de Editar/Eliminar aquí en el futuro */}
              {/* <span className="badge bg-secondary">{category.key}</span> */}
            </li>
          ))}
        </ul>
      )}
       <p className="mt-3 text-muted small">
         Nota: La lista muestra categorías derivadas de los productos actuales. Añadir una categoría aquí es una simulación y no afectará la selección al crear/editar productos hasta que se implemente la persistencia completa de categorías.
       </p>
    </div>
  );
}

export default AdminCategories;