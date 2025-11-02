function CarouselPelis() {
  return (
    <div id="carouselPelis" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/banner/el-origen.jpg"
            className="d-block w-100"
            alt="Película 1"
          />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
            <h5>El Origen</h5>
            <p>Un viaje por los sueños dentro de los sueños.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/banner/interstellar.jpg"
            className="d-block w-100"
            alt="Película 2"
          />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
            <h5>Interstellar</h5>
            <p>Explorando los límites del universo y del tiempo.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/banner/batman-dark-knight.jpg"
            className="d-block w-100"
            alt="Película 3"
          />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
            <h5>The Dark Knight</h5>
            <p>El caballero oscuro que protege Gotham.</p>
          </div>
        </div>
      </div>

      {/* Controles */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselPelis"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselPelis"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  )
}

export default CarouselPelis
