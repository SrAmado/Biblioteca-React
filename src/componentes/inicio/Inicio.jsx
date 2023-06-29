import React from 'react'
import usePersonalizado from '../hook/usePersonalizado'

function Inicio() {
  return (
    <div className='container'>
      <div> <br/>
        <h2>Biblioteca Amado</h2>
      </div>
      <div className='container'>
        <p>Este es un sitio que simula el funcionamiento de una biblioteca, en este sitio podras encontrar cualquier tipo de libro.</p>
      </div>
      <div>
        <p><h3>Alquiler de libros</h3></p>
      </div>
      <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <h3>Sedes</h3>
          <ul className='list-unstyled text-right'>
            <li className='pl-0'>Bogotá</li>
            <li className='pl-0'>Medellin</li>
            <li className='pl-0'>Cali</li>
            <li className='pl-0'>Bucaramanga</li>
            <li className='pl-0'>Manizalez</li>
            <li className='pl-0'>Barranquilla</li>
            <li className='pl-0'>Neiva</li>
          </ul>
        </div>
        <div className='col-md-6'>
          <h3>Algunos de nuestros autores</h3>
          <ul className='list-unstyled text-right'>
            <li className='pl-0'>Gabriel García Marquez</li>
            <li className='pl-0'>Victor Hugo</li>
            <li className='pl-0'>Jane Austen</li>
            <li className='pl-0'>Charles Dickens</li>
            <li className='pl-0'>Miguel de Cervantes</li>
            <li className='pl-0'>Turman Capote</li>
            <li className='pl-0'>Goethe</li>
          </ul>
        </div>
      </div>
      <div>
        <h3>Hook personalizado</h3>
        {usePersonalizado()}
      </div>
      </div><br/><br/>
      <div>
        <p>Dirección princiapal Calle 56 # 13-23 Bogotá. DC</p>
      </div>
    </div>
  )
}

export default Inicio