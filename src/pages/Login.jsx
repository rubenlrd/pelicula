import { useState } from "react";
import { supabase } from "../supabaseClient";
import bcrypt from "bcryptjs";

function Login({ setUser }) {
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // 1️⃣ Buscar usuario por correo
        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .eq("correo", correo)
            .single();

        if (error || !data) {
            setErrorMsg("El correo no existe");
            return;
        }

        const usuario = data;

        // 2️⃣ Comparar contraseña con bcrypt
        const match = await bcrypt.compare(contrasenia, usuario.contrasenia);

        if (!match) {
            setErrorMsg("Contraseña incorrecta");
            return;
        }

        // 3️⃣ Login correcto
        setUser({
            id: usuario.id,
            nombre: usuario.usuario,
            correo: usuario.correo,
        });

        // Limpia el formulario
        setCorreo("");
        setContrasenia("");
        setErrorMsg("");

    };

    return (
        <div className="container mt-5" style={{ maxWidth: "450px" }}>
            <h3 className="text-center mb-4">Iniciar Sesión</h3>

            <form className="card shadow p-4" onSubmit={handleLogin}>

                {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}

                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                        type="email"
                        className="form-control"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary w-100" type="submit">
                    Ingresar
                </button>

            </form>
        </div>
    );
}

export default Login;
