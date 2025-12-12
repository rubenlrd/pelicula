import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CardPelicula from "../components/CardPelicula";

function Series() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const loadSeries = async () => {
      const { data, error } = await supabase
        .from("contenidos")
        .select("*")
        .eq("tipo", "serie")
        .order("likes", { ascending: false });

      if (!error) setSeries(data);
    };

    loadSeries();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Series</h2>
      <div className="row">
        {series.map((s) => (
          <CardPelicula key={s.id} data={s} onLike={() => {}} />
        ))}
      </div>
    </div>
  );
}

export default Series;
