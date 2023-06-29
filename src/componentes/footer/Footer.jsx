import React from 'react'
import "./Footer.css"

function Footer() {
  return (
    <div>
      <footer className='footer bg-primary rounded-top text-center'>
        <div className='container py-2'>
          <p className='text-white my-2'>
            &copy; {'Arlenson Amado'}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer