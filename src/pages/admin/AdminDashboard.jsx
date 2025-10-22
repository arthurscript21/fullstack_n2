// src/pages/Admin/AdminDashboard.jsx
import React from 'react';
import DashboardCard from '../../components/admin/DashboardCard';
// Si usas react-icons u otra librería, importa los iconos aquí
// import { FaBox, FaUsers, FaChartBar } from 'react-icons/fa';

function AdminDashboard() {
  // Datos de ejemplo (eventualmente vendrán de tu estado o API)
  const productCount = 400; // [cite: 289]
  const customerCount = 1890; // Similar a 'Usuarios' en Fig 9 [cite: 290]
  const reportCount = 50; // Ejemplo para reportes

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Resumen de las actividades diarias</p> {/* [cite: 283] */}

      <div className="row">
        {/* Tarjeta de Compras (ejemplo adaptado de Fig 9) */}
        <div className="col-md-4">
           <DashboardCard
            title="Compras"
             // [cite: 285]
            color="primary"
            // icon={<FaShoppingCart size={30} />} // Ejemplo con icono
          />
        </div>
         {/* Tarjeta de Productos */}
        <div className="col-md-4">
          <DashboardCard
            // [cite: 289]
            value={productCount}
            color="success"
            // icon={<FaBox size={30} />}
          />
        </div>
         {/* Tarjeta de Clientes/Usuarios */}
         <div className="col-md-4">
           <DashboardCard
            title="Clientes" // O "Usuarios"
            value={customerCount}
            color="warning"
            // icon={<FaUsers size={30} />}
          />
        </div>
         {/* Podrías añadir una tarjeta para Reportes si quieres */}
         {/*
         <div className="col-md-4">
           <DashboardCard
             title="Reportes"
             value={reportCount}
             color="info"
             // icon={<FaChartBar size={30} />}
           />
         </div>
         */}
      </div>

       {/* Aquí podrías añadir más secciones como gráficos o tablas resumen */}

    </div>
  );
}

export default AdminDashboard;