import NavBar from './components/Navbar';
import CarouselPelis from './components/CarouselPelis';
import Footer from './components/Footer';
import Contenedor from './components/Contenedor';
import Home from './pages/Home';



function App() {
 
  return (
    <>
      <NavBar />
      <CarouselPelis />
      <Contenedor>
        <Home />
      </Contenedor>
      <Footer />
    </>
  )
}

export default App
