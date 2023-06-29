import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import swal from "sweetalert"

const URI = 'http://localhost:8080/api'

function DetalleLibro(props) {
    
    const { data } = props;
    const [file, setFile] = useState(null);
    const [fotoLibro, setFotoLibro] = useState(data?.foto);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const subirFoto = async (event) => {
      event.preventDefault();
  
      if (!file) {
        swal('¡Error al subir', 'Debe seleccionar una foto', 'error');
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('archivo', file);
        formData.append('id', data?.id);
  
        const res = await axios.post(URI + '/libros/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log(res.data);
        setFotoLibro(res.data.nombreArchivo); 
        swal('¡Foto subida con éxito!', 'Éxito', 'success');
      } catch (error) {
        console.log(error);
      }
    };

   
    

    
  return (
    <div>
      <div className='container'>
      <div className='row'>
        <div className='col-sm'>
          <ul   className='list-group text-dark mb-3'>
            <li className='list-group--item active'><b>Nombre: </b>{data?.nombre}</li>
            <li className='list-group--item'><b>Autor: </b>{data?.autor.nombre}</li>
            <li className='list-group--item'><b>ISBN: </b> {data?.isbn}</li>
            <li className='list-group--item'><b>Sinopsis: </b>{data?.sinopsis}</li>
            <li className='list-group--item'><b>Criticas: </b>{data?.criticas}</li>
          </ul>
          <form onSubmit={subirFoto}>
            <div className='input-group'>
              <input type="file" className='form-control' id="fotoLibro" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={handleFileChange} />
              <button className='btn btn-outline-primary' type="submit" id="inputGroupFileAddon04">Subir</button>
            </div>
          </form>
        </div>
        <div className='col-sm'>
          <img src={`http://localhost:8080/api/upload/img/${data?.foto}`} alt=""className='img-thumbnail rounded'/>
        </div>
      </div>
      </div>          
    </div>
  )
}

export default DetalleLibro