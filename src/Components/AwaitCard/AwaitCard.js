import React from 'react'
import './Awaitcard.css'
export const AwaitCard = () => {
  return (
    <div className='awaitcard'>
        <div className="acardicons">
            <i style={{color:"blueviolet"}} class="fa-solid fa-pen"></i>
            <i class="fa-solid fa-trash"></i>
        </div>
        <div className="awaitinner">
            <span className='acardt1'>Jeremy Asirwaad</span>
            <span className='acardt2'>FullStack</span>
            <span className='acardt2'>Internship</span>
        </div>
        <button className='acardbtn'>Got Offer</button>
        <div className="acardicons2">
            <div style={{display: "flex", alignItems: "center"}}>
            <i class="fa-solid fa-phone acardphone"></i>
            <span style={{ fontSize: "17px", marginLeft: "5px" }}>5</span>
            </div>
            <div  style={{display: "flex", alignItems: "center"}}>
            <i class="fa-solid fa-comment"></i>
            <span style={{ fontSize: "17px", marginLeft: "5px" }}>5</span>
            </div>
        </div>
    </div>
  )
}
