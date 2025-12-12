import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Detalle({ user }) {
    const { id } = useParams(); // ID de película o serie
    const [pelicula, setPelicula] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");

    // === 1) CARGAR DETALLE DE PELÍCULA ===
    const loadDetalle = async () => {
        const { data, error } = await supabase
            .from("contenidos")
            .select("*")
            .eq("id", id)
            .single();

        if (!error) setPelicula(data);
    };

    // === 2) CARGAR COMENTARIOS (JOIN CON USUARIOS) ===
    const loadComentarios = async () => {
        const { data, error } = await supabase
            .from("comentarios")
            .select("id, contenido, created_at, usuarios (usuario)")
            .eq("pelicula_id", id)
            .order("created_at", { ascending: false });

        if (!error) setComentarios(data);
    };

    // === 3) GUARDAR COMENTARIO ===
    const agregarComentario = async () => {
        if (!nuevoComentario.trim()) return;

        const { error } = await supabase.from("comentarios").insert({
            contenido: nuevoComentario,     
            usuario_id: user.id,                   
            pelicula_id: id,
        });

        if (!error) {
            setNuevoComentario("");
            loadComentarios(); // refrescar lista
        }
    };

    // === CARGAR TODO AL ENTRAR ===
    useEffect(() => {
        loadDetalle();
        loadComentarios();
    }, [id]);

    if (!pelicula) return <h3 className="text-center mt-5">Cargando...</h3>;

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <div className="row">
                    {/* IMAGEN */}
                    <div className="col-md-4">
                        <img
                            src={pelicula.imagen}
                            alt={pelicula.titulo}
                            className="img-fluid rounded"
                        />
                    </div>

                    {/* INFORMACIÓN */}
                    <div className="col-md-8">
                        <h2>{pelicula.titulo}</h2>
                        <p className="text-muted">Genero: {pelicula.genero}</p>
                        <p className="text-muted">Año: {pelicula.anio}</p>
                        <p className="text-muted">Donde ver: {pelicula.plataforma}</p>
                        <p className="text-muted">Tipo: {pelicula.tipo}</p>
                    </div>
                </div>

                <hr />

                {/* === COMENTARIOS === */}
                <h4>Comentarios</h4>

                {/* FORMULARIO SOLO SI ESTÁ LOGUEADO */}
                {user ? (
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="2"
                            placeholder="Escribe un comentario..."
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                        ></textarea>

                        <button
                            className="btn btn-primary mt-2"
                            onClick={agregarComentario}
                        >
                            Agregar comentario
                        </button>
                    </div>
                ) : (
                    <p className="text-muted">
                        Debes <a href="/login">iniciar sesión</a> para comentar.
                    </p>
                )}

                {/* LISTA COMENTARIOS */}
                <ul className="list-group mt-3">
                    {comentarios.length === 0 && (
                        <li className="list-group-item text-muted">
                            No hay comentarios aún.
                        </li>
                    )}

                    {comentarios.map((c) => (
                        <li key={c.id} className="list-group-item">
                            <strong>{c.usuarios?.usuario}: </strong>
                            {c.contenido}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Detalle;

