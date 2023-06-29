import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import swal from "sweetalert"


const URI = 'http://localhost:8080/api'


function PrestamoLibros() {

  //variables 
const [Prestamos, setPrestamos] = useState([]);


useEffect(() => {
    getPrestamos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

//metodo que consulta todos los libros
const getPrestamos = async () => {
    try {
        const res = await axios({
            method: "GET",
            url: URI + "/listarPrestamos",
        });
        setPrestamos(res.data)
    } catch (error) {
      <Link to='/nofound'>falla error</Link>
    }
}

//metodo para eliminar
const eliminarPrestamo = async (id) => {
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
                  url: URI +"/prestamo/"+ id,
              });
              console.log(res);
              swal("El registro se borró satisfactoriamente", {
                  icon: "success",
              }).then((value) => {
                  getPrestamos()
              });

          } else {
              swal("El registro no se borró");
          }
      });

  
}


//vista html
return (
  <div class='container'>
    <br/>
    <div>
      <h2>Histórico Prestamos</h2>
    </div>
    <br/>
    <div className='container' style={{textAlign: 'left'}}>
    <Link to='/prestamoCrear' className='btn btn-success'>Solicitar Prestamo</Link>
    </div>
    <br/>  
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Fecha Solicitud</th>
        <th scope="col">Fecha Devolución</th>
        <th scope="col">Devuelto</th>
        <th scope="col">Persona</th>
        <th scope="col">Libro</th>
        <th scope="col">Eliminar</th>
      </tr>
    </thead>
    <tbody>                            
      {Prestamos.map((prestamo) => (
        <tr >
          <td>{new Date(prestamo.fechaPrestamo).toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'}).split('/').join('-')}</td>
          <td>{new Date(prestamo.fechaDevolucion).toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'}).split('/').join('-')}</td>
          <td>{prestamo.devuelto }</td>
          <td>{prestamo.idPersona }</td>
          <td>{prestamo.idLibro}</td>
          <td>
            <button onClick={() => eliminarPrestamo(prestamo.id)} class='btn btn-danger btn-rounded' >Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>  
  </div>
  )
}


export default PrestamoLibros