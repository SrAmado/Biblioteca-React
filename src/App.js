import './App.css';
import Inicio from './componentes/inicio/Inicio';
import Libros from './componentes/libros/Libros';
import EditarLibros from './componentes/libros/EditarLibros';
import CrearLibros from './componentes/libros/CrearLibros';
import Header from './componentes/header/Header';
import Footer from './componentes/footer/Footer';
import { Route, Routes } from 'react-router';
import DetalleLibro from './componentes/libros/DetalleLibro';
import PrestamoLibros from './componentes/prestamo/PrestamoLibros';
import PrestamoCrear from './componentes/prestamo/PrestamoCrear';
import PrestamoActualizar from './componentes/prestamo/PrestamoActualizar';
import Error404 from './componentes/Error404';

function App() {
  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/inicio" element={<Inicio />} />
        <Route exact path="/libros" element={<Libros />} />
        <Route exact path="/crearLibros" element={<CrearLibros />} />
        <Route exact path="/editarLibros/:id" element={<EditarLibros />} />
        <Route exact path="/detalleLibros/:id" element={<DetalleLibro />} />
        <Route exact path="/libro" element={<DetalleLibro />} />
        <Route exact path="/prestamoLibros" element={<PrestamoLibros />} />
        <Route exact path="/prestamoCrear" element={<PrestamoCrear />} />
        <Route exact path="/prestamoActualizar/:id" element={<PrestamoActualizar />} />
        <Route exact path="/error404" element={<Error404 />} />
      </Routes>
     
      <Footer/>
      
    </div>
  );
}

export default App;
