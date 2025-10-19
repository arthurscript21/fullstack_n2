import React from 'react';

import DataCard from '../../components/admin/DataCard';
import ModuleLink from '../../components/admin/ModuleLink';

function AdminDashboard() {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Dashboard</h1>
      <p className="mb-4">Resumen de las actividades diarias</p>

      <div className="row">
        <div className="col-xl-4 col-md-6">
          <DataCard title="Compras" value="1,234" colorClass="text-bg-primary" />
        </div>
        <div className="col-xl-4 col-md-6">
          <DataCard title="Productos" value="400" colorClass="text-bg-success" />
        </div>
        <div className="col-xl-4 col-md-6">
          <DataCard title="Clientes" value="1,890" colorClass="text-bg-warning" />
        </div>
      </div>

      <h2 className="mt-4 mb-3">Módulos de Administración</h2>
      <div className="row">
        <ModuleLink 
          title="Dashboard" 
          description="Visión general de todas las métricas."
          to="/" 
        />
        <ModuleLink 
          title="Órdenes" 
          description="Gestión y seguimiento de las órdenes."
          to="/ordenes"
        />
        <ModuleLink 
          title="Productos" 
          description="Administrar inventario y detalles."
          to="/productos"
        />
        <ModuleLink 
          title="Categorías" 
          description="Organizar productos por categorías."
          to="/categorias"
        />
        <ModuleLink 
          title="Usuarios" 
          description="Gestión de cuentas de usuario y roles."
          to="/usuarios"
        />
        <ModuleLink 
          title="Reportes" 
          description="Generación de informes detallados."
          to="/reportes"
        />
        <ModuleLink 
          title="Perfil" 
          description="Administración de información personal."
          to="/perfil"
        />
        <ModuleLink 
          title="Tienda" 
          description="Visualizar la tienda en tiempo real."
          to="/tienda"
        />
      </div>
    </div>
  );
}

export default AdminDashboard;