import { useState } from "react";
import { Link } from "react-router-dom";
import { BsHeart } from "react-icons/bs";

function CardPelicula({ data, onLike }) {
  const [likesCount, setLikesCount] = useState(data.likes);
  const [loading, setLoading] = useState(false);

  const addLike = async () => {
    if (loading) return;
    setLoading(true);

    const newLikes = likesCount + 1;
    setLikesCount(newLikes);

    try {
      await onLike(newLikes);
    } catch {
      setLikesCount(likesCount); // revert back si falla
    }

    setLoading(false);
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm h-100">
        <img
          src={data.imagen}
          className="card-img-top"
          alt={data.titulo}
          style={{ height: "400px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="mb-3">{data.titulo}</h5>

          {/* BOTÓN DE LIKE */}
          <button
            className="btn btn-outline-danger d-flex align-items-center gap-2 mb-3"
            onClick={addLike}
            disabled={loading}
          >
            <BsHeart size={20} />
            {likesCount}
          </button>

          {/* BOTÓN VER MÁS */}
          <Link
            to={`/${data.tipo}/${data.id}`}
            className="btn btn-primary mt-auto"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardPelicula;

// import { useState } from "react";
// import { BsHeart } from "react-icons/bs";

// function CardPelicula({ data, onLike }) {
//   const [likesCount, setLikesCount] = useState(data.likes);
//   const [loading, setLoading] = useState(false);

//   const addLike = async () => {
//     if (loading) return;
//     setLoading(true);

//     const newLikes = likesCount + 1;
//     setLikesCount(newLikes);

//     //Traigo la desde la función onLike 
//     try {
//       await onLike(newLikes);
//     } catch {
//       setLikesCount(likesCount); // revertir si falla
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="col-md-4 mb-3">
//       <div className="card shadow-sm h-100">
//         <img
//           src={data.imagen}
//           className="card-img-top"
//           alt={data.titulo}
//           style={{ height: "400px", objectFit: "cover" }}
//         />

//         <div className="card-body">
//           <h5>{data.titulo}</h5>

//           <button
//             className="btn btn-outline-danger d-flex align-items-center gap-2"
//             onClick={addLike}
//             disabled={loading}
//           >
//             <BsHeart size={20} />
//             {likesCount}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CardPelicula;
