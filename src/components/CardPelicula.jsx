import { useState } from "react";
import { supabase } from "../supabaseClient";
import { BsHeart } from "react-icons/bs";

function CardPelicula({ data }) {
  const [likesCount, setLikesCount] = useState(data.likes || 0);
  const [loadingLike, setLoadingLike] = useState(false);

  const addLike = async () => {
    if (loadingLike) return; // evita doble clic rápido
    setLoadingLike(true);

    const newCount = likesCount + 1;

    // Actualizar en Supabase
    const { error } = await supabase
      .from("contenidos")
      .update({ likes: newCount })
      .eq("id", data.id);

    if (!error) {
      setLikesCount(newCount); // solo avanzar si no hubo error
    } else {
      console.error("Error al sumar like:", error);
    }

    setLoadingLike(false);
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 shadow-sm">
        <img
          src={data.imagen}
          className="card-img-top"
          alt={data.titulo}
          style={{ height: "400px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h5 className="card-title">{data.titulo}</h5>

          <p className="card-text mb-2">
            <strong>Género:</strong> {data.genero} <br />
            <strong>Año:</strong> {data.anio} <br />
            <strong>Plataforma:</strong> {data.plataforma}
          </p>

          {/* ❤️ BOTÓN LIKE SOLO SUMA */}
          <button
            onClick={addLike}
            className="btn btn-outline-danger d-flex align-items-center gap-2"
            disabled={loadingLike}
          >
            <BsHeart size={22} />
            <span>{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardPelicula;
