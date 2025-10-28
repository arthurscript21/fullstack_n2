// src/layouts/StoreLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/store/Navbar';
import Footer from '../components/store/Footer';

function StoreLayout() {
  return (
    <div>
      <Navbar />
      {/* El main ahora no tiene un contenedor global */}
      <main>
        <Outlet /> {/* Cada página pondrá su propio contenedor si lo necesita */}
      </main>
      <Footer />
    </div>
  );
}

export default StoreLayout;