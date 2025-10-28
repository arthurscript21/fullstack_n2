// src/pages/Tienda/Contacto.jsx
import React from 'react';

function Contacto() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    alert(`Gracias por tu mensaje, ${nombre}. (Simulación).`);
    event.target.reset();
  };

  return (
    // Quitamos "container", añadimos padding horizontal (px-md-4) y vertical (py-5)
    <div className="px-md-4 py-5">
      <h2 className="text-center mb-5 section-title">Contáctanos</h2>
      <div className="row g-5">

        {/* Columna del Formulario */}
        <div className="col-md-6">
          <h4 className="mb-4">Envíanos un mensaje</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3"><label htmlFor="nombre" className="form-label">Nombre Completo</label><input type="text" className="form-control" id="nombre" name="nombre" required /></div>
            <div className="mb-3"><label htmlFor="email" className="form-label">Correo Electrónico</label><input type="email" className="form-control" id="email" name="email" required /></div>
            <div className="mb-3"><label htmlFor="telefono" className="form-label">Teléfono (Opcional)</label><input type="tel" className="form-control" id="telefono" name="telefono" /></div>
            <div className="mb-3"><label htmlFor="mensaje" className="form-label">Mensaje</label><textarea className="form-control" id="mensaje" name="mensaje" rows="5" required></textarea></div>
            <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
          </form>
        </div>

        {/* Columna de Información y Tiendas */}
        <div className="col-md-6">
          <h4 className="mb-4">Información de Contacto</h4>
          <p><strong>Email:</strong> info@huertohogar.cl</p>
          <p><strong>Teléfono:</strong> +56 2 2345 6789</p>
          <p><strong>Horario:</strong> Lunes a Sábado 9:00 - 20:00</p>

          <h4 className="mt-5 mb-4">Nuestras Tiendas</h4>
          <div className="card">
            <div className="card-body">
               <h5 className="card-title">Ubicaciones</h5>
                <ul className="list-unstyled mb-0"> {/* mb-0 para quitar margen inferior */}
                  <li className="mb-2">📍 Santiago - Av. Principal 123</li>
                  <li className="mb-2">📍 Valparaíso - Prat 987</li>
                  <li className="mb-2">📍 Concepción - Barros Arana 147</li>
                  <li className="mb-2">📍 Puerto Montt - Costanera 456</li>
                  <li className="mb-2">📍 Villarica - Calle Lagos 789</li>
                  <li className="mb-2">📍 Nacimiento - Av. Central 321</li>
                  <li className="mb-0">📍 Viña del Mar - 3 Norte 654</li> {/* mb-0 en el último */}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div> // CIERRA EL DIV PRINCIPAL
  );
}

export default Contacto;