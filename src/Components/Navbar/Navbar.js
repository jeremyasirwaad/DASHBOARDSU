import React, { useState } from 'react'
import './Navbar.css'
export const Navbar = ({sidenavopenfun,sidenavstatus}) => {

  // const [arrow, setArrow] = useState(false);

  return (
    <div className='navbarcontainer'>
        <div className="navbarbody">
        <i class={sidenavstatus ? " fa-solid fa-arrow-left " : "fa-solid fa-bars"} onClick={() => {; sidenavopenfun(); }}></i>
        </div>
    </div>
  )
}
