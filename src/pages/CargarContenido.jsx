import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function CargarContenido({ user }) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [anio, setAnio] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [imagen, setImagen] = useState("");
  const [tipo, setTipo] = useState("pelicula");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("contenidos")
      .insert([
        {
          titulo,
          genero,
          año: anio,
          imagen,          
          plataforma,
          tipo,
          likes: 0,
        }
      ]);

    if (error) {
      setMsg("❌ Error al guardar");
      return;
    }

    setMsg("✔ Contenido cargado con éxito");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3>Cargar Película o Serie</h3>

      {msg && (
        <div className="alert alert-info mt-3">{msg}</div>
      )}

      <form className="card p-4 mt-3 shadow" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Género</label>
          <input
            className="form-control"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Año</label>
          <input
            className="form-control"
            type="number"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Plataforma</label>
          <input
            className="form-control"
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">URL Imagen</label>
          <input
            className="form-control"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="pelicula">Película</option>
            <option value="serie">Serie</option>
          </select>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CargarContenido;
