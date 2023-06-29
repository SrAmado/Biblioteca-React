import React from 'react'
import { Link } from 'react-router-dom';

function Menu() {
  return (
  <div >
    <nav className='navbar navbar-expand-lg navbar-light bg-primary'>
      <div className='collapse navbar-collapse' id="navbarNav">
        <ul className='navbar-nav'>
          <li className='nav-item active'>
            <Link className='navbar-brand' to="/Inicio">
              <button className='btn btn-primary'>
                <i className='fa-solid fa-money-bill text-white'></i>Inicio
              </button> 
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='navbar-brand' to="/libros">
              <button className='btn btn-primary'>
                <i className='fa-solid fa-money-bill'></i>Listado Libros
              </button> 
            </Link> 
          </li>
          <li className='nav-item'>
            <Link className='navbar-brand' to="/prestamoLibros">
              <button className='btn btn-primary'>
                <i className='fa-solid fa-money-bill'></i>Alquilar Libros
              </button>
            </Link> 
          </li>
        </ul>
      </div>
    </nav>
  </div>

  
  
  )
}

export default Menu
