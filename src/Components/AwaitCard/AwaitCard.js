import { ref, remove } from 'firebase/database'
import React from 'react'
import { toast } from 'react-toastify'
import { db } from '../Config/fireBaseFile'
import './Awaitcard.css'
export const AwaitCard = ({name, department, interest, typeofjob, phone , comments, id}) => {


    const handleDelete = () =>{
        remove(ref(db, `/${id}`));
        toast.error("Deleted Data", {
            theme: "colored"

        });
    }

  return (
    <div className='awaitcard'>
        <div className="acardicons">
            <i style={{color:"blueviolet"}} style={{ cursor: "pointer" }}  class="fa-solid fa-pen"></i>
            <i class="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => { handleDelete(); }}></i>
        </div>
        <div className="awaitinner">
            <span className='acardt1'>{name}</span>
            <span className='acardt2'>{interest}</span>
            <span className='acardt2'>{typeofjob}</span>
        </div>
        <button className='acardbtn'>Got Offer</button>
        <div className="acardicons2">
            <div style={{display: "flex", alignItems: "center"}}>
            <i class="fa-solid fa-phone acardphone"></i>
            <span style={{ fontSize: "17px", marginLeft: "5px" }}>{phone}</span>
            </div>
            <div  style={{display: "flex", alignItems: "center"}}>
            <i class="fa-solid fa-comment"></i>
            <span style={{ fontSize: "17px", marginLeft: "5px" }}>{comments.length}</span>
            </div>
        </div>
    </div>
  )
}
