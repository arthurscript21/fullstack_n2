// src/data/products.js

export const products = [
    {
        id: 'FR001',
        nombre: 'Manzanas Fuji',
        precio: 1200,
        // enOferta: false, // Puedes añadir false si quieres ser explícito
        categoria: 'frutas',
        imagen: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 150,
        descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.',
        origen: 'Valle del Maule, Chile'
    },
    {
        id: 'FR002',
        nombre: 'Naranjas Valencia',
        precio: 1000,
        precioOferta: 850,  // <-- AÑADIDO
        enOferta: true,     // <-- AÑADIDO
        categoria: 'frutas',
        imagen: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1587381420277-5c3c371c3ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 200,
        descripcion: 'Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.',
        origen: 'Región de Valparaíso, Chile'
    },
    {
        id: 'FR003',
        nombre: 'Plátanos Cavendish',
        precio: 800,
        categoria: 'frutas',
        imagen: 'https://collectagroup.com/wp-content/uploads/2023/06/shutterstock_1555060544.jpg',
        imagenes: [ /* ... */ ], stock: 250, descripcion: 'Plátanos maduros y dulces...', origen: 'Región de O\'Higgins, Chile'
    },
    {
        id: 'FR004',
        nombre: 'Plátanos Maduros',
        precio: 1490,
        categoria: 'frutas',
        imagen: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [ /* ... */ ], stock: 180, descripcion: 'Plátanos perfectamente maduros...', origen: 'Región de O\'Higgins, Chile'
    },
    {
        id: 'FR005',
        nombre: 'Manzanas Frescas',
        precio: 1990,
        categoria: 'frutas',
        imagen: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [ /* ... */ ], stock: 120, descripcion: 'Manzanas frescas y crujientes...', origen: 'Valle del Maule, Chile'
    },
    {
        id: 'VR001',
        nombre: 'Zanahorias Orgánicas',
        precio: 900,
        // precioOferta: 750, // Ejemplo que diste, lo dejo comentado por ahora
        // enOferta: true,
        categoria: 'verduras',
        imagen: 'https://5aldia.cl/wp-content/uploads/2018/03/zanahoria.jpg',
        imagenes: [ /* ... */ ], stock: 100, descripcion: 'Zanahorias crujientes cultivadas sin pesticidas...', origen: 'Región de O\'Higgins, Chile'
    },
    {
        id: 'VR002',
        nombre: 'Espinacas Frescas',
        precio: 700,
        categoria: 'verduras',
        imagen: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [ /* ... */ ], stock: 80, descripcion: 'Espinacas frescas y nutritivas...', origen: 'Región Metropolitana, Chile'
    },
    {
        id: 'VR003',
        nombre: 'Pimientos Tricolores',
        precio: 1500,
        precioOferta: 1300, // <-- AÑADIDO
        enOferta: true,     // <-- AÑADIDO
        categoria: 'verduras',
        imagen: 'https://editorial.aristeguinoticias.com/wp-content/uploads/2024/09/pimiento-2-2092024.jpg',
        imagenes: [ /* ... */ ], stock: 120, descripcion: 'Pimientos rojos, amarillos y verdes...', origen: 'Región de Valparaíso, Chile'
    },
    {
        id: 'VR004',
        nombre: 'Lechuga Fresca',
        precio: 990,
        categoria: 'verduras',
        imagen: 'https://images.unsplash.com/photo-1566842600175-97dca3dfc3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [ /* ... */ ], stock: 90, descripcion: 'Lechuga fresca y crujiente...', origen: 'Región Metropolitana, Chile'
    },
    {
        id: 'PO001',
        nombre: 'Miel Orgánica',
        precio: 3990,
        categoria: 'organicos',
        imagen: 'https://abejasenagricultura.org/wp-content/uploads/2020/12/miel_abeja-900x450.jpg',
        imagenes: [ /* ... */ ], stock: 50, descripcion: 'Miel pura y orgánica...', origen: 'Región del Maule, Chile'
    },
    {
        id: 'PO002',
        nombre: 'Aceite de Oliva Extra Virgen',
        precio: 5990,
        precioOferta: 5500, // <-- AÑADIDO (Ejemplo)
        enOferta: true,     // <-- AÑADIDO (Ejemplo)
        categoria: 'organicos',
        imagen: 'https://images.unsplash.com/photo-1593791412322-7b78e5ecb341?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [ /* ... */ ], stock: 40, descripcion: 'Aceite de oliva extra virgen...', origen: 'Región de Coquimbo, Chile'
    },
    {
        id: 'PL001',
        nombre: 'Leche Entera',
        precio: 1200,
        categoria: 'lacteos',
        imagen: 'https://static.elcorreo.com/www/multimedia/202002/26/media/leche.jpg',
        imagenes: [ /* ... */ ], stock: 60, descripcion: 'Leche entera fresca...', origen: 'Región de Los Lagos, Chile'
    },
    {
        id: 'PL002',
        nombre: 'Yogurt Natural',
        precio: 1890,
        categoria: 'lacteos',
        imagen: 'https://images.unsplash.com/photo-1567337710288-93f3cb0e1e4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [ /* ... */ ], stock: 70, descripcion: 'Yogurt natural cremoso...', origen: 'Región de Los Lagos, Chile'
    },
    {
        id: 'PL003',
        nombre: 'Queso de Cabra',
        precio: 4590,
        categoria: 'lacteos',
        imagen: 'https://images.unsplash.com/photo-1589985270826-4b7fe135a9c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [ /* ... */ ], stock: 30, descripcion: 'Queso de cabra artesanal...', origen: 'Región de La Araucanía, Chile'
    }
];

// Función para obtener un producto por su ID
export const getProductById = (id) => {
    return products.find(p => p.id === id);
};

// Función para obtener productos por categoría (o todos si no se especifica)
export const getProductsByCategory = (category) => {
    if (!category) return products;
    return products.filter(p => p.categoria === category);
};

// Función para obtener nombres de categorías legibles
export const obtenerNombreCategoria = (categoriaKey) => {
    const categorias = {
        'frutas': 'Frutas Frescas',
        'verduras': 'Verduras Orgánicas',
        'organicos': 'Productos Orgánicos',
        'lacteos': 'Productos Lácteos'
    };
    return categorias[categoriaKey] || categoriaKey.charAt(0).toUpperCase() + categoriaKey.slice(1); // Devuelve nombre o capitaliza clave
};