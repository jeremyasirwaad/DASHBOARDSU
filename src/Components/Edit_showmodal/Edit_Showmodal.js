import { onValue, ref } from 'firebase/database'
import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../Config/fireBaseFile'
import { Navbar } from '../Navbar/Navbar'
import { SideNav } from '../SideNav/SideNav'
export const Edit_Showmodal = () => {
    const {id} = useParams()
    useEffect(() => {
        onValue(ref(db, "/completed" + `/${id}`), (snapshot) => {
            console.log(snapshot.val());
        })
    }, []);
    
  return (
    <div>
        <Navbar />
        <SideNav />
    </div>
  )
}
