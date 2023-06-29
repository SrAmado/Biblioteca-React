import React from 'react'
import axios from "axios";
import { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert"

const URI = 'http://localhost:8080/api'

function CrearLibros() {


  const navigate = useNavigate();
  const [Autores, setAutores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [criticas, setCriticas] = useState('');
  const [autor, setAutor] = useState('');
  
  

  useEffect(() => {
    getAutores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAutores = async () => {
    try {
      const res = await axios.get(URI + '/listarAutores');
      setAutores(res.data);
    } catch (error) {
      navigate('/error404');
    }
  };

  const Save = async (event) => {
    try {

      event.preventDefault();
      const insertLibros = await axios.post(URI + '/libros', {
        nombre: nombre,
        isbn: isbn,
        sinopsis: sinopsis,
        criticas: criticas,
        autor: { id_autores: autor },
        
      });
      swal('Libro Creado', ' Libro creado con éxito', 'success');
      navigate('/libros');
      
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
            <label>Registro Nuevos Libros</label>
          </h2>
          
        </div>
        <div className="row form-group">
          <div className="col">
            <label for="nombreLibro">Nombre</label>
            <input value={nombre}onChange={(e) => setNombre(e.target.value)} type="text" className="form-control" placeholder="Escriba el nombre del libro" name="nombreLibro" required/>
          </div>
          <div class="col">
          <label for="isbn">Código ISBN</label>
            <input value={isbn}onChange={(e) => setIsbn(e.target.value)} type="text" className="form-control" placeholder="Escriba código ISBN" name="autor" required/>
          </div>
        </div> <br/>
        <div class="row form-group">
          <div className="col">
            <label for="sinopsis">Sinopsis</label>
            <input value={sinopsis}onChange={(e) => setSinopsis(e.target.value)}  type="text" className="form-control" placeholder="Escriba la sinopsis" name="isbn" required/>
          </div>
          <div className="col">
          <label for="criticas">criticas</label>
            <input value={criticas}onChange={(e) => setCriticas(e.target.value)} type="text" className="form-control" placeholder="Escriba las críticas" name="sinopsis" required/>
          </div>
        </div><br/>
        <div className="row form-group">
          <div className="col">
            <label for="criticas">Autor</label>
            <select
  className="form-select"
  value={autor}
  onChange={(e) => setAutor(e.target.value)}
  name="autores"
  required
>
  <option value="">--- seleccionar un autor ---</option>
  {Autores.map((autor) => (
    <option key={autor.id_autores} value={autor.id_autores}>{autor.nombre}</option>
  ))}
</select>
          </div>
          <div className='col'></div>
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

export default CrearLibros