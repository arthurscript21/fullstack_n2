// src/pages/admin/AdminCategories.jsx
import React, { useState, useEffect } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../utils/localStorageHelper'; // Importa las nuevas funciones

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null); // Guarda la {key, nombre} de la cat. en edición
  const [newCategoryName, setNewCategoryName] = useState(''); // Para añadir nueva
  const [editCategoryName, setEditCategoryName] = useState(''); // Para editar existente
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // Para éxito o error

  // Carga inicial y recarga si las categorías cambian
  const loadCategories = () => {
    setLoading(true);
    setCategories(getCategories());
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const clearMessages = () => setMessage({ text: '', type: '' });

  // --- MANEJADORES ---
  const handleShowAddForm = () => {
    setShowAddForm(true);
    setEditingCategory(null); // Asegura que no estemos editando
    clearMessages();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingCategory(null);
    setNewCategoryName('');
    setEditCategoryName('');
    clearMessages();
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    clearMessages();
    const name = newCategoryName.trim();
    if (!name) { setMessage({ text: 'El nombre no puede estar vacío.', type: 'danger' }); return; }

    // Generamos una clave simple (en real podría ser un slug)
    const key = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (!key) { setMessage({ text: 'Nombre inválido para generar clave.', type: 'danger' }); return; }


    const success = addCategory({ key, nombre: name });
    if (success) {
      setMessage({ text: `Categoría "${name}" añadida.`, type: 'success' });
      setNewCategoryName('');
      setShowAddForm(false);
      loadCategories(); // Recarga la lista
    } else {
      setMessage({ text: `La clave "${key}" derivada del nombre ya existe o hubo un error.`, type: 'danger' });
    }
     setTimeout(clearMessages, 4000);
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setEditCategoryName(category.nombre); // Pre-rellena input de edición
    setShowAddForm(false); // Oculta form de añadir si estaba visible
    clearMessages();
  };

  const handleEditSubmit = (e) => {
      e.preventDefault();
      clearMessages();
      const name = editCategoryName.trim();
      if (!name) { setMessage({ text: 'El nombre no puede estar vacío.', type: 'danger' }); return; }
      if (!editingCategory) return;

      const success = updateCategory(editingCategory.key, { nombre: name });
      if (success) {
          setMessage({ text: `Categoría "${editingCategory.key}" actualizada.`, type: 'success' });
          setEditingCategory(null); // Sale del modo edición
          loadCategories(); // Recarga la lista
      } else {
          setMessage({ text: 'Error al actualizar la categoría.', type: 'danger' });
      }
      setTimeout(clearMessages, 4000);
  };


  const handleDeleteClick = (category) => {
    clearMessages();
    if (confirm(`¿Está seguro de eliminar la categoría "${category.nombre}"? Esta acción no se puede deshacer.`)) {
      // **Advertencia:** Falta la validación de si hay productos usando esta categoría.
      const success = deleteCategory(category.key);
      if (success) {
        setMessage({ text: `Categoría "${category.nombre}" eliminada.`, type: 'success' });
        loadCategories(); // Recarga la lista
      } else {
        setMessage({ text: `Error al eliminar la categoría "${category.nombre}". Es posible que esté en uso.`, type: 'danger' });
      }
      setTimeout(clearMessages, 4000);
    }
  };

  if (loading) return <p>Cargando categorías...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Categorías</h1>
        {!showAddForm && !editingCategory && (
          <button className="btn btn-primary" onClick={handleShowAddForm}>
            Añadir Nueva Categoría
          </button>
        )}
      </div>

      {/* Mensajes */}
      {message.text && (
        <div className={`alert alert-${message.type || 'info'} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={clearMessages} aria-label="Close"></button>
        </div>
      )}

      {/* Formulario Añadir */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="card p-3 mb-4 shadow-sm bg-light">
          <label htmlFor="newCategoryName" className="form-label fw-bold">Nueva Categoría</label>
          <div className="input-group">
            <input
              type="text" id="newCategoryName" className="form-control"
              placeholder="Nombre de la categoría" value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)} required
            />
            <button type="submit" className="btn btn-success">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
      )}

      {/* Formulario Editar (se muestra en lugar de la fila normal) */}
      {/* (Se integra en la tabla/lista abajo) */}

      {/* Lista de Categorías */}
      <h5>Categorías Existentes</h5>
      {categories.length === 0 ? (
        <p>No hay categorías definidas. Añade una nueva.</p>
      ) : (
        <div className="list-group">
          {categories.map(category => (
            <div key={category.key} className="list-group-item list-group-item-action">
              {editingCategory?.key === category.key ? (
                // --- Formulario de Edición ---
                <form onSubmit={handleEditSubmit} className="d-flex align-items-center gap-2">
                   <input type="text" className="form-control form-control-sm" value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)} required />
                   <button type="submit" className="btn btn-success btn-sm">Guardar</button>
                   <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancelar</button>
                </form>
              ) : (
                // --- Vista Normal de la Fila ---
                <div className="d-flex justify-content-between align-items-center">
                  <span>{category.nombre} <small className="text-muted">({category.key})</small></span>
                  <div>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(category)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(category)}>Eliminar</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminCategories;