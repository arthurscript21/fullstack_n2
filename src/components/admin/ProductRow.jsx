// src/components/admin/ProductRow.jsx
import React, { useState } from 'react';

function ProductRow({ product, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProduct({ ...product }); 
  };

  const handleCancel = () => {
    setIsEditing(false);
    
  };

  const handleSave = () => {
    onSave(editedProduct); 
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convertir a número si es precio o stock
    const newValue = (name === 'precio' || name === 'stock') ? parseInt(value, 10) || 0 : value;
    setEditedProduct(prev => ({ ...prev, [name]: newValue }));
  };

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${product.nombre}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <tr>
      <td>
        <img
          src={product.imagen || 'https://via.placeholder.com/50'} // Placeholder si no hay imagen
          alt={product.nombre}
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
        />
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="nombre"
            className="form-control form-control-sm"
            value={editedProduct.nombre}
            onChange={handleChange}
          />
        ) : (
          product.nombre
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            name="stock"
            className="form-control form-control-sm"
            value={editedProduct.stock}
            onChange={handleChange}
            style={{ width: '80px' }}
          />
        ) : (
          product.stock
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            name="precio"
            className="form-control form-control-sm"
            value={editedProduct.precio}
            onChange={handleChange}
             style={{ width: '100px' }}
          />
        ) : (
          `$${product.precio.toLocaleString('es-CL')} CLP`
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Guardar</button>
            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancelar</button>
          </>
        ) : (
          <>
            <button className="btn btn-warning btn-sm me-2" onClick={handleEdit}>Editar</button>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>Eliminar</button>
          </>
        )}
      </td>
    </tr>
  );
}

export default ProductRow;