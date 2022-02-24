import { ref, remove } from 'firebase/database'
import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../Config/fireBaseFile'
import './Finishedcard.css'

export const FinishedCard = ({name, department, interest, typeofjob, phone , comments, id, batch, placementdate, placementCompany, Stipend}) => {

    const handledelete =() => {
        remove(ref(db, '/finished' + `/${id}`))
    }

  return (
    <div className='awaitcard'>
    <div className="acardicons">
        <Link to = {`/finished/true/${id}`}><i style={{color:"blueviolet"}}  class="fa-solid fa-pen"></i></Link>
        <i class="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => {handledelete()}}></i>
        {/* <i onClick={() => {console.log(data)}} class="fa-solid fa-check"></i> */}
    </div>
    <div className="awaitinner">
        <div className='stinfo'>
            <span className='acardt1'>{name}</span>
            <span style={{marginLeft:"20px" }}>{department}</span>
            <span style={{marginLeft:"20px" }}>{batch}</span>
        </div>
        <span className='acardt2'>{interest}</span>
        <span className='acardt2'>{typeofjob}</span>
        <div className="placeinfodivcard">
            <span className='companyshow' style={{ fontWeight: "600px" }}>{placementCompany}</span>
            <div>
                <span className='acardt2'>{Stipend}₹</span>
                <span className='acardt2'> {placementdate}</span>
            </div>
        </div>
    </div>

    <Link to = {`/finished/false/${id}`}><button className='viewmorefinishedbtn'>View More</button></Link>
</div>
  )
}
