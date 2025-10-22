// src/data/products.js

// Copiado de fullstack_p1/sic/tienda/JS/detalleProducto.js
export const products = [
    {
        id: 'FR001',
        nombre: 'Manzanas Fuji',
        precio: 1200,
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
        imagenes: [
            'https://collectagroup.com/wp-content/uploads/2023/06/shutterstock_1555060544.jpg',
            'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1547516508-4c1f9c7c4ac3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 250,
        descripcion: 'Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.',
        origen: 'Región de O\'Higgins, Chile'
    },
    {
        id: 'FR004',
        nombre: 'Plátanos Maduros',
        precio: 1490,
        categoria: 'frutas',
        imagen: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1547516508-4c1f9c7c4ac3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 180,
        descripcion: 'Plátanos perfectamente maduros, ideales para postres, batidos y recetas dulces. Su punto óptimo de maduración garantiza el máximo sabor y dulzura.',
        origen: 'Región de O\'Higgins, Chile'
    },
    {
        id: 'FR005',
        nombre: 'Manzanas Frescas',
        precio: 1990,
        categoria: 'frutas',
        imagen: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 120,
        descripcion: 'Manzanas frescas y crujientes, recién cosechadas del huerto. Perfectas para consumir como snack saludable o incorporar en diversas recetas.',
        origen: 'Valle del Maule, Chile'
    },
    {
        id: 'VR001',
        nombre: 'Zanahorias Orgánicas',
        precio: 900,
        categoria: 'verduras',
        imagen: 'https://5aldia.cl/wp-content/uploads/2018/03/zanahoria.jpg',
        imagenes: [
            'https://5aldia.cl/wp-content/uploads/2018/03/zanahoria.jpg',
            'https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 100,
        descripcion: 'Zanahorias crujientes cultivadas sin pesticidas en la Región de O\'Higgins. Excelente fuente de vitamina A and fibra, ideales para ensaladas, jugos o como snack saludable.',
        origen: 'Región de O\'Higgins, Chile'
    },
    {
        id: 'VR002',
        nombre: 'Espinacas Frescas',
        precio: 700,
        categoria: 'verduras',
        imagen: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 80,
        descripcion: 'Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.',
        origen: 'Región Metropolitana, Chile'
    },
    {
        id: 'VR003',
        nombre: 'Pimientos Tricolores',
        precio: 1500,
        categoria: 'verduras',
        imagen: 'https://editorial.aristeguinoticias.com/wp-content/uploads/2024/09/pimiento-2-2092024.jpg',
        imagenes: [
            'https://editorial.aristeguinoticias.com/wp-content/uploads/2024/09/pimiento-2-2092024.jpg',
            'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1587381420277-5c3c371c3ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 120,
        descripcion: 'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.',
        origen: 'Región de Valparaíso, Chile'
    },
    {
        id: 'VR004',
        nombre: 'Lechuga Fresca',
        precio: 990,
        categoria: 'verduras',
        imagen: 'https://images.unsplash.com/photo-1566842600175-97dca3dfc3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1566842600175-97dca3dfc3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 90,
        descripcion: 'Lechuga fresca y crujiente, perfecta para ensaladas. Cultivada de manera sostenible y cosechada en su punto óptimo de frescura para garantizar su sabor y textura.',
        origen: 'Región Metropolitana, Chile'
    },
    {
        id: 'PO001',
        nombre: 'Miel Orgánica',
        precio: 3990,
        categoria: 'organicos',
        imagen: 'https://abejasenagricultura.org/wp-content/uploads/2020/12/miel_abeja-900x450.jpg',
        imagenes: [
            'https://abejasenagricultura.org/wp-content/uploads/2020/12/miel_abeja-900x450.jpg',
            'https://images.unsplash.com/photo-1587381420277-5c3c371c3ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1547516508-4c1f9c7c4ac3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 50,
        descripcion: 'Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.',
        origen: 'Región del Maule, Chile'
    },
    {
        id: 'PO002',
        nombre: 'Aceite de Oliva Extra Virgen',
        precio: 5990,
        categoria: 'organicos',
        imagen: 'https://images.unsplash.com/photo-1593791412322-7b78e5ecb341?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1593791412322-7b78e5ecb341?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1587381420277-5c3c371c3ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1547516508-4c1f9c7c4ac3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 40,
        descripcion: 'Aceite de oliva extra virgen de primera prensada en frío. Ideal para aderezos, marinadas y para realzar el sabor de tus platos con su aroma y textura excepcionales.',
        origen: 'Región de Coquimbo, Chile'
    },
    {
        id: 'PL001',
        nombre: 'Leche Entera',
        precio: 1200,
        categoria: 'lacteos',
        imagen: 'https://static.elcorreo.com/www/multimedia/202002/26/media/leche.jpg',
        imagenes: [
            'https://static.elcorreo.com/www/multimedia/202002/26/media/leche.jpg',
            'https://images.unsplash.com/photo-1587381420277-5c3c371c3ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1547516508-4c1f9c7c4ac3?ixlib=rb-4.0.3&auto=format&fit=c crop&w=500&q=80'
        ],
        stock: 60,
        descripcion: 'Leche entera fresca de granjas locales responsables. Rica en calcio y nutrientes esenciales, perfecta para complementar una dieta equilibrada.',
        origen: 'Región de Los Lagos, Chile'
    },
    {
        id: 'PL002',
        nombre: 'Yogurt Natural',
        precio: 1890,
        categoria: 'lacteos',
        imagen: 'https://images.unsplash.com/photo-1567337710288-93f3cb0e1e4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1567337710288-93f3cb0e1e4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1587381420277-5c3c371c3ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1547516508-4c1f9c7c4ac3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 70,
        descripcion: 'Yogurt natural cremoso, sin conservantes ni aditivos. Elaborado con leche de vacas alimentadas con pasto natural, ideal para desayunos saludables y snacks.',
        origen: 'Región de Los Lagos, Chile'
    },
    {
        id: 'PL003',
        nombre: 'Queso de Cabra',
        precio: 4590,
        categoria: 'lacteos',
        imagen: 'https://images.unsplash.com/photo-1589985270826-4b7fe135a9c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1589985270826-4b7fe135a9c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1587381420277-5c3c371c3ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1547516508-4c1f9c7c4ac3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        stock: 30,
        descripcion: 'Queso de cabra artesanal, suave y con carácter. Elaborado tradicionalmente con leche de cabra criolla, perfecto para tablas de quesos y recetas gourmet.',
        origen: 'Región de La Araucanía, Chile'
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
    return categorias[categoriaKey] || categoriaKey; // Devuelve el nombre legible o la clave si no se encuentra
};