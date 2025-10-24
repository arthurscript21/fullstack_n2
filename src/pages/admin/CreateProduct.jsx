// src/pages/admin/CreateProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    imagen: '',
    categoria: 'frutas', // Valor inicial, puedes ajustarlo
    descripcion: '', // Añadido
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validaciones
    if (!formData.nombre || !formData.precio || !formData.stock) {
      setError('Nombre, precio y stock son obligatorios.');
      return;
    }
    const precioNum = parseFloat(formData.precio);
    const stockNum = parseInt(formData.stock, 10);
    if (isNaN(precioNum) || precioNum < 0) {
      setError('El precio debe ser un número válido.');
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      setError('El stock debe ser un número entero válido.');
      return;
    }

    // Lógica para guardar (usando localStorage para el ejemplo)
    try {
      const storedProducts = localStorage.getItem('huertohogar_products_admin');
      const products = storedProducts ? JSON.parse(storedProducts) : [];

      const newProduct = {
        id: `${formData.categoria.substring(0,2).toUpperCase()}${Date.now().toString().slice(-3)}`, // Generar ID simple
        nombre: formData.nombre.trim(),
        precio: precioNum,
        stock: stockNum,
        imagen: formData.imagen.trim() || '', // Usar URL o dejar vacío
        categoria: formData.categoria,
        descripcion: formData.descripcion.trim() || `Descripción de ${formData.nombre.trim()}`, // Descripción por defecto
      };

      products.push(newProduct);
      localStorage.setItem('huertohogar_products_admin', JSON.stringify(products));

      setMessage(`Producto "${newProduct.nombre}" guardado exitosamente!`);
      // Resetear formulario después de un pequeño retraso
      setTimeout(() => {
          setFormData({ nombre: '', precio: '', stock: '', imagen: '', categoria: 'frutas', descripcion: '' });
          setMessage('');
          // Opcional: Redirigir a la lista de productos
          // navigate('/admin/productos');
      }, 1500);


    } catch (err) {
      setError('Error al guardar el producto. Inténtalo de nuevo.');
      console.error("Error saving product:", err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h1>Añadir Nuevo Producto</h1>
      <hr/>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del producto</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            placeholder="Ej: Manzana Fuji"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

         <div className="row g-3 mb-3">
            <div className="col-md-6">
                <label htmlFor="precio" className="form-label">Precio (CLP)</label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    className="form-control"
                    placeholder="Ej: 1500"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                    min="0"
                    step="10" // Ajusta el paso si quieres
                />
            </div>
             <div className="col-md-6">
                 <label htmlFor="stock" className="form-label">Stock (unidades)</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    className="form-control"
                    placeholder="Ej: 50"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    step="1"
                />
             </div>
         </div>

        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            className="form-select"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="frutas">Frutas</option>
            <option value="verduras">Verduras</option>
            <option value="organicos">Orgánicos</option>
            <option value="lacteos">Lácteos</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">URL de la Imagen (Opcional)</label>
          <input
            type="url"
            id="imagen"
            name="imagen"
            className="form-control"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={formData.imagen}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="descripcion" className="form-label">Descripción (Opcional)</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="form-control"
            rows="3"
            placeholder="Breve descripción del producto"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>


        <div className="d-flex justify-content-end gap-2">
           <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/productos')}>Volver a Productos</button>
          <button type="submit" className="btn btn-primary">Guardar Producto</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;