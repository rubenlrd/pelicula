
import { useState } from "react";
import CardPelicula from "../components/CardPelicula";
import Paginacion from "../components/Paginacion";
import { usePeliculas } from "../hooks/usePeliculas";
import { useSeries } from "../hooks/useSeries";
import { useRealtimeLikes } from "../hooks/useRealtimeLikes";

function Home() {
  const [pagePeliculas, setPagePeliculas] = useState(1);
  const [pageSeries, setPageSeries] = useState(1);

  useRealtimeLikes();

  const { peliculasQuery, likeMutation: likePelicula } =
    usePeliculas(pagePeliculas);

  const { seriesQuery, likeMutation: likeSerie } =
    useSeries(pageSeries);

  if (peliculasQuery.isLoading || seriesQuery.isLoading)
    return <p>Cargando...</p>;

  return (
    <div>

      {/* PELÍCULAS */}
      <h2>🎬 Películas Populares</h2>

      <h4>Top 6</h4>
      <div className="row">
        {peliculasQuery.data.top.map((p) => (
          <CardPelicula
            key={p.id}
            data={p}
            onLike={(newLikes) => likePelicula.mutate({ id: p.id, newLikes })}
          />
        ))}
      </div>

      <h4>Más películas</h4>
      <div className="row">
        {peliculasQuery.data.paginadas.map((p) => (
          <CardPelicula
            key={p.id}
            data={p}
            onLike={(newLikes) => likePelicula.mutate({ id: p.id, newLikes })}
          />
        ))}
      </div>

      <Paginacion page={pagePeliculas} setPage={setPagePeliculas} />

      <hr className="my-5" />

      {/* SERIES */}
      <h2>📺 Series Populares</h2>

      <h4>Top 6</h4>
      <div className="row">
        {seriesQuery.data.top.map((s) => (
          <CardPelicula
            key={s.id}
            data={s}
            onLike={(newLikes) => likeSerie.mutate({ id: s.id, newLikes })}
          />
        ))}
      </div>

      <h4>Más series</h4>
      <div className="row">
        {seriesQuery.data.paginadas.map((s) => (
          <CardPelicula
            key={s.id}
            data={s}
            onLike={(newLikes) => likeSerie.mutate({ id: s.id, newLikes })}
          />
        ))}
      </div>

      <Paginacion page={pageSeries} setPage={setPageSeries} />
    </div>
  );
}

export default Home;