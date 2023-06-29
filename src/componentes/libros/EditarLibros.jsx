import React from 'react'
import axios from "axios";
import { useState , useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const URI = 'http://localhost:8080/api'

function EditarLibros() {

  //variables
  const [Autores, setAutores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [criticas, setCriticas] = useState('');
  const [autor, setAutor] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();


  const Save = async (event) => {
    try {
      event.preventDefault();
      const actualizarLibros = await axios.put(
        URI + '/libros/' + id,
        {
          nombre: nombre,
          isbn: isbn,
          sinopsis: sinopsis,
          criticas: criticas,
          autor: { id_autores: autor },
        }
      );
      swal('Libro Actualizado', 'Libro Actualizado con éxito', 'success');
      navigate('/libros');
      
    } catch (error) {
      swal(
        'Error',
        JSON.parse(error.request.response).errors[0].message,
        'error'
      );
    }
  };


  useEffect(() => {
    const getAutores = async () => {
      try {
        const res = await axios.get(URI + '/listarAutores');
        setAutores(res.data);
      } catch (error) {
        navigate('/error404');
      }
    };

    //metodo consultar por id
    const getLibrosById = async () => {
      try {
        const resLibros = await axios.get(URI + '/libros/' + id);
        setNombre(resLibros.data.nombre);
        setIsbn(resLibros.data.isbn);
        setSinopsis(resLibros.data.sinopsis);
        setCriticas(resLibros.data.criticas);
        setAutor(resLibros.data.autor.id_autores);
      } catch (error) {
        swal('Error', error.message, 'error');
      }
    };
    getAutores();
    getLibrosById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //vista html
  return (
    <div className='container'>
    <form onSubmit={Save}>
      <div class='row form-group'>
        <h2>
          <label>Actualizar Libro</label>
        </h2>
         
      </div>
      <div className='row form-group'>
        <div className='col'>
          <label for="nombreLibro">Nombre</label>
          <input value={nombre}onChange={(e) => setNombre(e.target.value)} type="text" className='form-control' placeholder="Escriba el nombre del libro" name="nombreLibro" required/>
        </div>
        <div className="col">
        <label for="isbn">Código ISBN</label>
          <input minlength="4" value={isbn}onChange={(e) => setIsbn(e.target.value)} type="text" className='form-control' placeholder="Escriba código ISBN" name="autor" required/>
        </div>
      </div> <br/>
      <div className='row form-group'>
        <div className='col'>
          <label for="sinopsis">Sinopsis</label>
          <input value={sinopsis}onChange={(e) => setSinopsis(e.target.value)}  type="text" className='form-control' placeholder="Escriba la sinopsis" name="isbn" required/>
        </div>
        <div className='col'>
        <label for="criticas">criticas</label>
          <textarea value={criticas}onChange={(e) => setCriticas(e.target.value)} type="text" className='form-control' placeholder="Escriba las críticas" name="sinopsis" required/>
        </div>
      </div><br/>
      <div className='row form-group'>
        <div className='col'>
          <label for="criticas">Autor</label>
          <select
className='form-select'
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

export default EditarLibros
