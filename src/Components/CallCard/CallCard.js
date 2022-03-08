import { ref, remove, update } from 'firebase/database';
import React, {useState} from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../Config/fireBaseFile';
import { onValue } from 'firebase/database';
import './callcard.css'
export const CallCard = ({name, index, cperson, cpersondesig, site, whatsapp, id, stid,status}) => {

    const [newname, setNewname] = useState(name);
    const [newcperson, setNewcperson] = useState(cperson);
    const [newcpersondesig, setnewCpersondesig] = useState(cpersondesig);
    const [newsite, setNewsite] = useState(site);
    const [newwhatsapp, setNewwhatsapp] = useState(whatsapp);

    const [editcall, setEditcall] = useState(true);

    const updatecalllist = () => {
        let callliss;
		onValue(ref(db, "/calldata/calllist"), (snapshot) => {
			if(snapshot.val() !== null & snapshot.val() !==undefined)
			{
				callliss = snapshot.val();
			}
            console.log(callliss)
		})


		if(callliss !== null && callliss !== undefined)
		{
			callliss = callliss.filter((e) => !e.includes((stid+ 1).slice(0,11) + name));
			// console.log(compnamelis1)
			callliss.push(stid.slice(0,11) + newname);

			update(ref(db, "/calldata"),{
				calllist: callliss
			})
		}

        // const phlistref = ref(db,`/finished` + `/${stid}` + "/phone" + `/${id}`)
        update(ref(db,`/${status}` + `/${stid}` + "/phone" + `/${id}` ),{
            contactperson: newcperson,
            contdesg: newcpersondesig,
            name: newname,
            website: newsite,
            whatsappgrp: newwhatsapp,
        })

        toast.success(`Updated Call ${index + 1} Successfully`);

        setEditcall(true);
    }

    const deletecall = () => {
        const phlistref = ref(db,`/${status}` + `/${stid}` + "/phone" + `/${id}`)
        remove(phlistref);
        toast.success(`Call Data Deleted`);
    }

  return (
    <div className='callcard'>
        <ToastContainer />
        <div className='callcardheaddiv'>
        <h5 className='callcardhead'>Call {index + 1}</h5>
        {
            editcall ? ( <div><i class="fa-solid fa-pen-to-square" onClick={() => { setEditcall(false); toast.success(`Edit Mode Turned On for Call ${index + 1}`) }}></i></div> ) : (<div><i class="fa-solid fa-floppy-disk" onClick={() => { updatecalllist(); }}></i></div>)
        }
        <i class="fa-solid fa-trash" onClick={() => { deletecall(); }}></i>
        
        </div>
        <div className="ccarddiv">
            <span>Company Name</span>
            <input type="text" value={newname} disabled = {editcall} onChange = {(e) => {setNewname(e.target.value)}}/>
        </div>
        <div className="ccarddiv">
            <span>Comapany Website</span>
            <input type="text" value={newsite} disabled = {editcall} onChange = {(e) => {setNewsite(e.target.value)}}/>
        </div>
        <div className="ccarddiv">
            <span>Contact Person</span>
            <input type="text" value={newcperson} disabled = {editcall} onChange = {(e) => {setNewcperson(e.target.value)}}/>
        </div>
        <div className="ccarddiv">
            <span>Contact Person Designation</span>
            <input type="text" value = {newcpersondesig} disabled = {editcall} onChange = {(e) => {setnewCpersondesig(e.target.value)}}/>
        </div>
        <div className="ccarddiv">
            <span>Whatsapp Grp</span>
            <input type="text" value = {newwhatsapp} disabled = {editcall} onChange = {(e) => {setNewwhatsapp(e.target.value)}}/>
        </div>

    </div>
  )
}
