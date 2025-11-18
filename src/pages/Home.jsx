
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CardPelicula from "../components/CardPelicula";

function Home() {
  const [peliculas, setPeliculas] = useState([]);
  const [series, setSeries] = useState([]);
  const [carga, setCarga] = useState(true);

  useEffect(() => { //trae los datos en forma asincronicxa de la base de datos
    const cargarDatos = async () => {
      const { data, error } = await supabase
        .from("contenidos")
        .select("*")
        .order("likes", { ascending: false }); //Ordena por LIKES en forma descendente

      if (error) {
        console.error("Error al cargar:", error);
        return;
      }

      // Separa la películas de las series
      setPeliculas(data.filter(item => item.tipo === "pelicula"));
      setSeries(data.filter(item => item.tipo === "serie"));

      setCarga(false);
    };

    cargarDatos();
  }, []);

  if (carga) return <p className="text-center mt-4">Cargando...</p>;

  return (
    <>
      <h2 className="mb-4 text-center">🎬 Películas (más populares primero)</h2>
      <div className="row mb-5">
        {peliculas.map(item => (
          <CardPelicula key={item.id} data={item} />
        ))}
      </div>

      <h2 className="mb-4 text-center">📺 Series (más populares primero)</h2>
      <div className="row">
        {series.map(item => (
          <CardPelicula key={item.id} data={item} />
        ))}
      </div>
    </>
  );
}

export default Home;
