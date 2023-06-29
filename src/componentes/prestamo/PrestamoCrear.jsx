import React from 'react'
import axios from "axios";
import { useState , useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import swal from "sweetalert"
import moment from 'moment/moment';

const URI = 'http://localhost:8080/api'

function PrestamoCrear() {
  
  
  const navigate = useNavigate();
  const [libros, setLibros] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [fecha, setFecha] = useState('');
  const [fechaD, setFechaD] = useState('');
  const [devuelto, setDevuelto] = useState('');
  const [idlibro, setIdlibro] = useState('');
  const [idpersona, setIdpersona] = useState('');

 
  
  
  useEffect(() => {
    getLibros();
    getPersonas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLibros = async () => {
    try {
      const res = await axios.get(URI + '/listarlibros');
      setLibros(res.data);
    } catch (error) {
      navigate('/error404');
    }
  };

  const getPersonas = async () => {
    try {
      const res = await axios.get(URI + '/listarPersonas');
      setPersonas(res.data);
    } catch (error) {
      navigate('/error404');
    }
  };

  const Save = async (event) => {
    try {

      event.preventDefault();
      const fechaPrestamoDate = new moment(fecha).format('YYYY-MM-DD');
      const fechaDevolucionDate = moment(fechaD).format('YYYY-MM-DD');

      const insertPrestamos = await axios.post(URI + '/prestamos', {
        fechaPrestamo : fechaPrestamoDate,
        fechaDevolucion : fechaDevolucionDate,
        devuelto: devuelto,
        idLibro : idlibro,
        idPersona : idpersona,
        
      });
      swal('Prestamo Creado', ' Prestamo creado con éxito', 'success');
      navigate('/prestamoLibros');
      
    } catch (error) {
      swal(
        'Error',
        JSON.parse(error.request.response).errors[0].message,
        'error'
      );
    }
  };

//vista html
  return (
    <div className="container">
      <form onSubmit={Save}>
        <div class="row form-group">
          <h2>
            <label>Registro Prestamo</label>
          </h2>
          
        </div>
        
        <div className="row form-group">
          <div className="col">
            <label for="fecha">Fecha Solicitud</label>
            <input value={fecha}onChange={(e) => setFecha(e.target.value)} type="date" className="form-control" placeholder="Selecione una fecha" name="fecha" required/>
          </div>
          <div class="col">
          <label for="fechad">Fecha Devolucion</label>
            <input value={fechaD}onChange={(e) => setFechaD(e.target.value)} type="date" className="form-control" placeholder="Selecione una fecha" name="fecha" required/>
          </div>
        </div> <br/>
        <div className="row form-group">
        <div className="col">
            <label for="devuelto">Devuelto</label>
            <select className="form-select" value={devuelto} onChange={(e) => setDevuelto(e.target.value)} name="devuelto" required>
              <option value="">--- seleccionar ---</option>
                  <option value={'SI'}>SI</option>
                  <option value={'NO'}>NO</option>
            </select>
          </div>
          <div className="col">
            <label for="libro">Libro</label>
            <select className="form-select" value={idlibro} onChange={(e) => setIdlibro(e.target.value)} name="libros" required>
              <option value="">--- seleccionar un libro ---</option>
                {libros.map((libro) => (
                  <option key={libro.id} value={libro.id}>{libro.nombre}</option>
                ))}
            </select>
          </div>
        </div><br/>
        <div className="row form-group">
          <div className="col">
            <label for="persona">Persona</label>
            <select className="form-select" value={idpersona} onChange={(e) => setIdpersona(e.target.value)} name="personas" required>
              <option value="">--- seleccionar persona ---</option>
                {personas.map((persona) => (
                  <option key={persona.id}  value={persona.id}>{persona.nombre}</option>
                ))}
            </select>
          </div> 
        </div><br/>
        <div classNme='row form-group'>  
  </div>
  <div className='form-group row'>
        <div className='col-sm-1'>
        <button type="submit" class='btn btn-primary'>Guardar</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default PrestamoCrear