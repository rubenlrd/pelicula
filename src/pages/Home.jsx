import { peliculas } from "../data/peliculas";
import CardPelicula from "../components/CardPelicula";

function Home() {
  // Filtramos por tipo
  const soloPeliculas = peliculas.filter(p => p.tipo === "pelicula");
  const soloSeries = peliculas.filter(p => p.tipo === "serie");

  return (
    <div className="container my-4">
      <h2 className="text-center mb-5">Películas y Series Populares</h2>

      {/* 🎬 Sección de Películas */}
      <section className="mb-5">
        <h3 className="mb-3 border-bottom pb-2">
          🎬 Películas
        </h3>
        <div className="row">
          {soloPeliculas.length > 0 ? (
            soloPeliculas.map(p => (
              <CardPelicula key={p.id} data={p} />
            ))
          ) : (
            <p className="text-muted">No hay películas disponibles.</p>
          )}
        </div>
      </section>

      {/* 📺 Sección de Series */}
      <section>
        <h3 className="mb-3 border-bottom pb-2">
          📺 Series
        </h3>
        <div className="row">
          {soloSeries.length > 0 ? (
            soloSeries.map(p => (
              <CardPelicula key={p.id} data={p} />
            ))
          ) : (
            <p className="text-muted">No hay series disponibles.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;

