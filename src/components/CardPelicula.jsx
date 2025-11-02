import { useState } from "react";
import { BsHeart, BsHeartFill, BsChatDots } from "react-icons/bs";

function CardPelicula({ data }) {
  const [like, setLike] = useState(false);
  const [comentarios, setComentarios] = useState([]); // guarda los comentarios
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [mostrarInput, setMostrarInput] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };

  const toggleComentar = () => {
    setMostrarInput(!mostrarInput);
  };

  const agregarComentario = (e) => {
    e.preventDefault();
    if (nuevoComentario.trim() !== "") {
      setComentarios([...comentarios, nuevoComentario]);
      setNuevoComentario("");
      setMostrarInput(false);
    }
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
            <strong>Año:</strong> {data.año} <br />
            <strong>Plataforma:</strong> {data.plataforma}
          </p>

          {/* ❤️ y 💬 botones */}
          <div className="d-flex justify-content-between align-items-center">
            <button
              onClick={toggleLike}
              className="btn btn-outline-danger border-0"
              title={like ? "Quitar me gusta" : "Dar me gusta"}
            >
              {like ? (
                <BsHeartFill size={22} color="red" />
              ) : (
                <BsHeart size={22} />
              )}
            </button>

            <div className="d-flex align-items-center">
              <BsChatDots size={20} className="me-1 text-primary" />
              <span className="me-2">{comentarios.length}</span>
              <button
                onClick={toggleComentar}
                className="btn btn-sm btn-outline-primary"
              >
                Comentar
              </button>
            </div>
          </div>

          {/* 📝 Caja para agregar comentario */}
          {mostrarInput && (
            <form onSubmit={agregarComentario} className="mt-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Escribe tu comentario..."
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
              />
              <button type="submit" className="btn btn-sm btn-primary">
                Enviar
              </button>
            </form>
          )}

          {/* 📋 Lista de comentarios */}
          {comentarios.length > 0 && (
            <ul className="list-group list-group-flush mt-3">
              {comentarios.map((c, index) => (
                <li key={index} className="list-group-item small">
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardPelicula;
