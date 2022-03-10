import { onValue, ref, remove, update } from 'firebase/database'
import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../Config/fireBaseFile'
import './Finishedcard.css'

export const FinishedCard = ({name, department, interest, typeofjob, phone , comments, id, batch, placementdate, placementCompany, Stipend}) => {

    const handledelete =() => {
        let snaps;
        let snapsyear;
        let snapscall;
        let snapsdepart;
        onValue(ref(db, "/compnamedata/companylist"),(snapshot) => {
            if(snapshot.val() !== null && snapshot.val() !== undefined)
            {
                snaps = snapshot.val();
            }
        })

        onValue(ref(db, "/yeardata/year"),(snapshot) => {
            if(snapshot.val() !== null && snapshot.val() !== undefined)
            {
                snapsyear = snapshot.val();
            }
        })

        onValue(ref(db, "/calldata/calllist"),(snapshot) => {
            if(snapshot.val() !== null && snapshot.val() !== undefined)
            {
                snapscall = snapshot.val();
            }
        })

        onValue(ref(db, "/departdata/depart"),(snapshot) => {
            if(snapshot.val() !== null && snapshot.val() !== undefined)
            {
                snapsdepart = snapshot.val();
            }
        })


            let fillist;
            if(snaps !== undefined)
            {
                fillist = snaps.filter((e) => !e.includes(id.slice(0,11)));
            }
            let fillyearlist;
            if(snapsyear !== undefined)
            {
                 fillyearlist = snapsyear.filter((e) => !e.includes(id.slice(0,11)));
            }
            let fillcalllist;
            if(snapscall!== undefined)
            {
                fillcalllist = snapscall.filter((e) => !e.includes(id.slice(0,11)));
            }
            let filldepartlist;
            if(snapsdepart!== undefined)
            {
                filldepartlist = snapsdepart.filter((e) => !e.includes(id.slice(0,11)));
            }
            
            // console.log(fillcalllist)
            // console.log(snapscall)
            // console.log(id.slice(0,11));
            update(ref(db, "/compnamedata"),{
                companylist: fillist
            })
    
            update(ref(db, "/yeardata"),{
                year:fillyearlist
            })

            update(ref(db, "/calldata"),{
                calllist:fillcalllist
            })

            update(ref(db, "/departdata"),{
                depart:filldepartlist
            })
        
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
            <span style={{marginLeft:"10px" }}>{department}</span>
            <span style={{marginLeft:"10px" }}>{batch}</span>
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
