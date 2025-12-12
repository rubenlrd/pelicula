import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">InfoPelis</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/peliculas">Películas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/series">Series</Link>
          </li>

          {/* Si NO está logueado */}
          {!user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Registrarse</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Ingresar</Link>
              </li>
            </>
          )}

          {/* Si está logueado */}
          {user && (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Hola, {user.nombre}
              </a>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/cargar">Cargar contenido</Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={onLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
