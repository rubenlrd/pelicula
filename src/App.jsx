import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";
import NavBar from './components/Navbar';
import CarouselPelis from './components/CarouselPelis';
import Footer from './components/Footer';
import Contenedor from './components/Contenedor';
import Home from './pages/Home';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Detalle from "./pages/Detalle";
import Peliculas from "./pages/Peliculas";
import Series from './pages/Series';
import CargarContenido from "./pages/CargarContenido";


function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <>

      <BrowserRouter>
        {/* NAVBAR GLOBAL */}
        <NavBar user={user} onLogout={logout} />

        <CarouselPelis />

        <Contenedor>
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* REGISTRO */}
            <Route path="/register" element={<Register />} />

            {/* LOGUEO */}
            <Route path="/login" element={<Login setUser={setUser} />} />

            {/* LISTA SOLAMENTE PELICULAS */}
            <Route path="/peliculas" element={<Peliculas />} />

            {/* VER PELICULA */}
            <Route path="/pelicula/:id" element={<Detalle user={user} />} />

            {/* VER SERIE */}
            <Route path="/serie/:id" element={<Detalle user={user} />} />

            {/* LISTA SERIES SOLAMENTE */}
            <Route path="/series" element={<Series />} />
            
            {/* CARGA CONTENIDO DE SERIES O PELICULAS */}
            <Route path="/cargar" element={<CargarContenido user={user} />} />

            {/* RUTA 404 */}
            <Route path="*" element={<h2>Página no encontrada</h2>} />
          </Routes>
        </Contenedor>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App