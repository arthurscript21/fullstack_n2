// src/pages/admin/AdminProducts.jsx
import React from "react";
import { Link } from "react-router-dom";

// 1. Importamos nuestra función de "base de datos"
import { getProductos } from "../../data/db";

function AdminProducts() {
  // 2. Obtenemos los productos llamando a la función
  const productos = getProductos();

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Administrar Productos</h1>
      <p>Aquí puedes agregar, editar y eliminar productos de tu tienda.</p>

      {/* Botón para "Nuevo Producto" (como pide la Figura 10) [cite: 318] */}
      <div className="mb-3">
        <Link to="/admin/productos/nuevo" className="btn btn-primary">
          + Agregar Nuevo Producto
        </Link>
      </div>

      {/* 3. Mostramos los productos en una tabla de Bootstrap  */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Listado de Productos</h5>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Unidad</th> {/* <-- AÑADE ESTA LÍNEA */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio.toLocaleString("es-CL")}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.unidad}</td> {/* <-- AÑADE ESTA LÍNEA */}
                  <td>
                    {/* Botones */}
                    <button className="btn btn-sm btn-outline-secondary me-2">
                      Ver
                    </button>
                    <button className="btn btn-sm btn-outline-primary">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
