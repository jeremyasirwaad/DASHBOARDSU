import { onValue, ref, remove, set } from 'firebase/database'
import React,  { useRef, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db } from '../Config/fireBaseFile'
import { PhoneModal } from '../PhoneModal/PhoneModal'
import './Awaitcard.css'
export const AwaitCard = ({name, department, interest, typeofjob, phone , comments, id, batch, data}) => {
    const [noofComments, setNoofComments] = useState(0);
    const [noofphone, setNoofphone] = useState(0);
    const [phonelist1, setPhonelist1] = useState([]);
    const [summa, setSumma] = useState([]);

    useEffect(() => {
        const phoneref = ref(db, '/completed' + `/${id}` + '/phone');
        onValue(phoneref, (snapshot) => {
            setSumma([]);
            // setNoofphone(Object.keys(snapshot.val()).length)
            Object.values(snapshot.val()).map((shapchild) => {
                setSumma((oldobj) => [...oldobj, shapchild]);
            })

          });
    },[])

    const getcallcount = () => {
        const phoneref = ref(db, '/completed' + `/${id}` + '/phone');
        onValue(phoneref, (snapshot) => {
            return (Object.keys(snapshot.val()).length)
          });
    }

    console.log(summa);
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
            <i style={{color:"blueviolet"}}  class="fa-solid fa-pen"></i>
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
        <div className="acardicons2">
            <div style={{display: "flex", alignItems: "center"}}>
            <i class="fa-solid fa-phone acardphone" onClick={() => {phonemodalref.current.open()}}></i>
            <span style={{ fontSize: "17px", marginLeft: "5px" }}>{summa.length}</span>
            </div>
            <div  style={{display: "flex", alignItems: "center"}}>
            </div>
        </div>
        <PhoneModal ref ={ phonemodalref } id = { id } data = {data} phone = {phone} />
    </div>
  )
}
