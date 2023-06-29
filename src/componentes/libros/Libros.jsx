import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import swal from "sweetalert"
import axios from "axios"
import DetalleLibro from './DetalleLibro'
import { Modal } from 'react-bootstrap'
import "./Libros.css"


const URI = 'http://localhost:8080/api'

function Libros() {

    //variables 
    const [Libros, setLibros] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [librosData, setLibrosData] = useState(null);
    
    useEffect(() => {
        getLibros()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    //metodo que consulta todos los libros
    const getLibros = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: URI + "/listarlibros",
            });
            setLibros(res.data)
        } catch (error) {
          <Link to='/nofound'>Crear Libro</Link>
        }
    }

    //metodo abrir modal
    const openModal = (libros) => {
      setLibrosData(libros);
      setModalIsOpen(true);
    };
  
    //metodo cerrar modal
    const closeModal = () => {
      setModalIsOpen(false);
      setLibrosData(null);
    };

    //metodo para eliminar
    const eliminarLibro = async (id) => {
      swal({
          title: "Eliminar Registro",
          text: "Esta seguro de eliminar el registro",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      })
          .then(async (willDelete) => {
              if (willDelete) {
                  const res = await axios({
                      method: "DELETE",
                      url: URI +"/libros/"+ id,
                  });
                  console.log(res);
                  swal("El registro se borró satisfactoriamente", {
                      icon: "success",
                  }).then((value) => {
                      getLibros()
                  });

              } else {
                  swal("El registro no se borró");
              }
          });
  }

  //vista html
  return (
    <div class="container">
      <br/>
      <div>
        <h2>Listado de libros</h2>
      </div>
      <br/>
      <div className='container' style={{textAlign: 'left'}}>
      <Link to='/crearLibros' className='btn btn-success'>Crear Libro</Link>
      </div>
      <br/>  
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Ver Detalle</th>
          <th scope="col">Nombre</th>
          <th scope="col">Autor</th>
          <th scope="col">ISBN</th>
          <th scope="col">Editar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>                            
        {Libros.map((libros) => (
          <tr key={libros.id}>
            {/* <td> {libros.id} </td> */}
            <td> <img onClick={() => openModal(libros)} src={`http://localhost:8080/api/upload/img/${libros.foto}`} alt="" className="img-thumbnail rounded" style={{ width: "64px", height: "100%", cursor: "pointer" }}/>
              <Modal show={modalIsOpen} onHide={closeModal} className="custom-modal">
                <Modal.Header closeButton>
                  <Modal.Title> <h2>Detalle Libro</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <DetalleLibro data={librosData}/>
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={closeModal}>Cerrar</button>
                </Modal.Footer>
              </Modal>
            </td>
            <td> {libros.nombre } </td>
    <td> {libros.autor.nombre} </td>
    <td> {libros.isbn } </td>
            <td>
              <Link to={`/editarLibros/${libros.id}`} className='btn btn-primary'>Editar</Link>
            </td>
            <td>
              <button onClick={() => eliminarLibro(libros.id)} class='btn btn-danger btn-rounded' >Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>  
    </div>
  )
}

export default Libros
