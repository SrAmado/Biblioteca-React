import React from 'react'
import Menu from './Menu'
import { Outlet } from 'react-router';

export default function Header() {
  return (
    <div>
      <Menu/>
      <Outlet/>
    </div>
  )
}
