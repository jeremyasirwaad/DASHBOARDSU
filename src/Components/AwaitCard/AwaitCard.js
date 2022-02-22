import { onValue, ref, remove, set } from 'firebase/database'
import React,  { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../Config/fireBaseFile'
import { PhoneModal } from '../PhoneModal/PhoneModal'
import './Awaitcard.css'
export const AwaitCard = ({name, department, interest, typeofjob, phone , comments, id, batch, data}) => {
    const [noofComments, setNoofComments] = useState(0);
    const [noofphone, setNoofphone] = useState(0);
    const [phonelist1, setPhonelist1] = useState([]);
    const [summa, setSumma] = useState([]);

  

    // const getcallcount = () => {
    //     const phoneref = ref(db, '/completed' + `/${id}` + '/phone');
    //     onValue(phoneref, (snapshot) => {
    //         return (Object.keys(snapshot.val()).length)
    //       });
    // }
    const phonemodalref = useRef();

    const handleDelete = () =>{
        remove(ref(db, '/completed' + `/${id}`));
        toast.error("Deleted Data", {
            theme: "colored"

        });
    }

  return (
    <div className='awaitcard'>
        <div className="acardicons">
            <Link to = {`/student/true/${id}`}><i style={{color:"blueviolet"}}  class="fa-solid fa-pen"></i></Link>
            <i class="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => { handleDelete(); }}></i>
        </div>
        <div className="awaitinner">
            <div className='stinfo'>
                <span className='acardt1'>{name}</span>
                <span style={{marginLeft:"20px" }}>{department}</span>
                <span style={{marginLeft:"20px" }}>{batch}</span>
            </div>
            <span className='acardt2'>{interest}</span>
            <span className='acardt2'>{typeofjob}</span>
        </div>
        <button className='acardbtn'>Got Offer</button>
        <Link to = {`/student/false/${id}`}><button className='aviewmorebtn'>More</button></Link>
        <div className="acardicons2">
            <div onClick={() => {phonemodalref.current.open()}} style={{cursor: "pointer",display: "flex", alignItems: "center", width: "200px"}}>
            <i class="fa-solid fa-phone acardphone"></i>
            <span style={{ fontSize: "14px", width: "74px" }}>Add Call</span>
            </div>
        </div>
        <PhoneModal ref ={ phonemodalref } id = { id } data = {data} phone = {phone} />
    </div>
  )
}
