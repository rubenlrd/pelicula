import { useState } from "react";
import { supabase } from "../supabaseClient";
import bcrypt from "bcryptjs";

function Register() {
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!usuario || !correo || !contrasenia) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);

      // Hashear contraseña
      const hashed = await bcrypt.hash(contrasenia, 10);

      // Insertar en Supabase
      const { error } = await supabase.from("usuarios").insert([
        {
          usuario,
          correo,
          contrasenia: hashed,
        },
      ]);

      if (error) {
        setError("Error al registrar: " + error.message);
      } else {
        setMensaje("Registro exitoso. ¡Ya podés iniciar sesión!");
        setUsuario("");
        setCorreo("");
        setContrasenia("");
      }
    } catch (err) {
      setError("Error inesperado: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Registro de Usuario</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <form className="card shadow p-4" onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}

export default Register;
