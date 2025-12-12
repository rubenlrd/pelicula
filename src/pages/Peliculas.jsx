import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CardPelicula from "../components/CardPelicula";

function Peliculas() {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    const loadPeliculas = async () => {
      const { data, error } = await supabase
        .from("contenidos")
        .select("*")
        .eq("tipo", "pelicula")
        .order("likes", { ascending: false });

      if (!error) setPeliculas(data);
    };

    loadPeliculas();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Películas</h2>
      <div className="row">
        {peliculas.map((p) => (
          <CardPelicula key={p.id} data={p} onLike={() => {}} />
        ))}
      </div>
    </div>
  );
}

export default Peliculas;
