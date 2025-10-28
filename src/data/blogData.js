// src/data/blogData.js
// Datos simulados para el blog

export const blogPosts = [
  {
    id: 'receta-manzana', // ID único para la URL
    titulo: 'Deliciosa Tarta de Manzana Casera',
    fecha: '2025-10-25', // Fecha de publicación
    autor: 'Equipo HuertoHogar',
    resumen: 'Aprende a preparar una tarta de manzana crujiente y sabrosa con ingredientes frescos de nuestra tienda.', // Texto corto para la lista
    imagen: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // URL de imagen
    contenido: `
      <h2>Ingredientes Frescos, Sabor Inigualable</h2>
      <p>Para esta receta, recomendamos usar nuestras Manzanas Fuji frescas. Su dulzor y textura son perfectos...</p>
      <p>Necesitarás:</p>
      <ul>
        <li>5 Manzanas Fuji de HuertoHogar</li>
        <li>200g de harina</li>
        <li>100g de mantequilla fría</li>
        <li>50g de azúcar</li>
        <li>Canela al gusto</li>
        <li>1 huevo (opcional, para barnizar)</li>
      </ul>
      <h3>Preparación:</h3>
      <ol>
        <li>Precalienta el horno a 180°C.</li>
        <li>Prepara la masa quebrada mezclando harina, mantequilla fría en cubos y azúcar hasta obtener una textura arenosa. Añade un poco de agua fría si es necesario.</li>
        <li>Estira la masa y forra un molde para tarta. Pincha la base con un tenedor.</li>
        <li>Pela, descorazona y corta las manzanas en láminas finas.</li>
        <li>Distribuye las manzanas sobre la masa. Espolvorea con azúcar y canela.</li>
        <li>Si deseas, puedes hacer un enrejado con tiras de masa sobrante por encima. Barniza con huevo batido.</li>
        <li>Hornea durante 40-45 minutos o hasta que la masa esté dorada y las manzanas tiernas.</li>
      </ol>
      <p>¡Disfruta de un postre casero y saludable!</p>
    ` // Contenido completo (HTML simple)
  },
  {
    id: 'beneficios-organicos',
    titulo: '¿Por Qué Elegir Productos Orgánicos?',
    fecha: '2025-10-20',
    autor: 'Nutricionista Invitado',
    resumen: 'Descubre los beneficios para tu salud y el medio ambiente al consumir alimentos orgánicos.',
    imagen: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    contenido: `
      <h2>Más Allá del Sabor: Salud y Sostenibilidad</h2>
      <p>Los alimentos orgánicos se cultivan siguiendo prácticas agrícolas que respetan el medio ambiente y buscan mantener la biodiversidad. Al no utilizar pesticidas ni fertilizantes químicos sintéticos, contribuyen a la salud del suelo y del agua.</p>
      <h3>Beneficios Principales:</h3>
      <ul>
        <li><strong>Menor exposición a residuos químicos:</strong> Al evitar pesticidas sintéticos, reduces la ingesta potencial de estas sustancias.</li>
        <li><strong>Suelo más sano:</strong> Las prácticas orgánicas mejoran la estructura y fertilidad del suelo a largo plazo.</li>
        <li><strong>Apoyo a la biodiversidad:</strong> Fomentan un ecosistema más rico en los campos de cultivo.</li>
        <li><strong>Sabor auténtico:</strong> Muchos consumidores reportan un sabor más intenso en productos orgánicos.</li>
      </ul>
      <p>En HuertoHogar, estamos comprometidos con ofrecerte una selección cuidada de <a href="/categoria/organicos">productos orgánicos</a>, apoyando a productores locales que comparten nuestra visión de un futuro más sostenible.</p>
    `
  }
  // Añade más posts aquí si lo deseas
];

// Función para obtener un post por su ID
export const getPostById = (id) => {
  return blogPosts.find(post => post.id === id);
};