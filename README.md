
🌿 HuertoHogar E-commerce (Full-Stack Simulado)
Este repositorio contiene el código de una aplicación web de comercio electrónico (E-commerce) enfocada en productos frescos y naturales, bajo la marca HuertoHogar.

El proyecto está construido con React y Vite, y simula una arquitectura Full-Stack utilizando localStorage para la persistencia de datos (usuarios, carrito, órdenes y productos del administrador). Cuenta con dos interfaces principales: una tienda para el cliente y un panel de administración.

🚀 Tecnologías Principales
Tecnología	Descripción	Fuente de Verificación
Frontend	React (v19)	package.json
Build Tool	Vite	package.json
Estilos	Bootstrap 5, CSS Modular (Personalizado: index.css, admin-styles.css)	package.json, Archivos CSS
Routing	React Router DOM (v7)	package.json
Testing	Vitest (con JSDOM)	package.json, vite.config.js
Data/Estado	localStorage (Persistencia simple de usuarios, carrito y órdenes)	localStorageHelper.js
✨ Características Destacadas
Doble Interfaz de Usuario:

Tienda (StoreLayout): Rutas públicas para ver productos, ofertas, blog, carrito y el proceso completo de checkout.

Administración (AdminLayout): Panel de gestión con rutas protegidas para admin.

Módulos del Administrador:

Dashboard: Estadísticas rápidas (productos, usuarios, ingresos).

Órdenes: Listado y detalle de órdenes de compra (filtradas y ordenadas por fecha).

Productos: CRUD básico para la gestión de inventario.

Usuarios: Gestión de usuarios con capacidad de editar datos y ver el historial de compras.

Categorías: Gestión de las categorías disponibles.

Reportes: Vista de productos con stock crítico (≤ 10 unidades).

Proceso de Compra Completo: Simulación de carrito, checkout con validación de formularios y páginas de PagoExitoso / PagoFallido.

💻 Instalación y Uso
Asegúrate de tener Node.js y npm (o yarn/pnpm) instalados.

Clonar el repositorio:

Bash
git clone https://aws.amazon.com/es/what-is/repo/
cd fukkstack_n2
Instalar dependencias:

Bash
npm install
Ejecutar en modo desarrollo:

Bash
npm run dev
El proyecto se abrirá en http://localhost:5173/ (o un puerto similar).

Ejecutar pruebas unitarias (Vitest):

Bash
npm test
🔑 Credenciales de Acceso
El sistema maneja dos tipos de usuarios: Cliente y Administrador.

Rol	Email	Contraseña	Ruta de Acceso
Administrador	admin@correo.com	Admin123	/admin
Cliente	(Requiere registro previo)	(Cualquiera)	/perfil
🗺️ Estructura de Rutas (Extracto de App.jsx)
El enrutamiento se define en src/App.jsx.

JavaScript
<Routes>
    {/* Tienda */}
    <Route path="/" element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="perfil" element={<Perfil />} />
        {/* ... otras rutas de la tienda ... */}
    </Route>

    {/* Admin */}
    <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="ordenes" element={<AdminOrders />} />
        <Route path="productos" element={<AdminProducts />} />
        <Route path="usuarios" element={<AdminUsers />} />
        <Route path="usuarios/editar/:userId" element={<EditUser />} />
        <Route path="usuarios/historial/:userIdentifier" element={<UserPurchaseHistory />} />
        <Route path="categorias" element={<AdminCategories />} />
        <Route path="reportes" element={<AdminReports />} />
    </Route>
</Routes>
