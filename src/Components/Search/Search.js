import React, {useState, useEffect} from 'react'
import { SideNav } from '../SideNav/SideNav';
import { ToastContainer, toast } from 'react-toastify';
import './Search.css'
import { onValue, ref, set } from 'firebase/database';
import { db } from '../Config/fireBaseFile';
export const Search = () => {

    useEffect(() => {
        onValue(ref(db, "/finished"), (snapshot) => {
            console.log(snapshot.val())
        })
    }, []);

    const [sidenavopen, setSidenavopen] = useState(false);
    
	const sidenavmanager = () => {
		setSidenavopen(!sidenavopen);
	};

    const toastsucess = () => {
		toast.success("Data Created Sucessfully",{});
	};



  return (
    <div>
        <div className="navbarforedit">
				<div className="editnavcontainer">
					<i
						class={
							sidenavopen ? " fa-solid fa-arrow-left nope" : "fa-solid fa-bars nope"
						}
						onClick={() => {
							sidenavmanager();
						}}
					></i>
				</div>
			</div>
            <SideNav sidenavstatus={sidenavopen} toastmanager={toastsucess} />
			<ToastContainer />
			<div style={{ height: "70px", width: "100vw" }}></div>
    </div>
  )
}
