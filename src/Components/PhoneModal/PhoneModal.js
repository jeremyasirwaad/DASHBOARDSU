import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import "../Addmodal/Addmodal.css";
import { motion, AnimatePresence, animations } from "framer-motion";
import { set, ref, update, child, onValue, push, get, remove } from "firebase/database";
import { db } from "../Config/fireBaseFile";
import { uid } from "uid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PhoneModal.css";
export const PhoneModal = forwardRef((props, refm) => {
	const [open, setOpen] = useState(false);
	const [phonelist, setPhonelist] = useState([]);
	const [callDetails, setCallDetails] = useState({
		CompanyName: "",
		CompanyWebsite: "",
		ContactPerson: "",
		ContactPersonDesignation: "",
        WhatsAppGrp: ""
	});
	const [callprev, setCallprev] = useState([]);

	useEffect(() => {
		onValue(ref(db,"/calldata"),(snapshot)=> {
			if(snapshot.val() !== null && snapshot.val() !== undefined)
			{
				setCallprev(snapshot.val().calllist);
				
			}
		})
	}, []);

	useImperativeHandle(refm, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	const onChangehandler = (e) => {
		const current = new Date();
		const date = `${current.getDate()}/${
			current.getMonth() + 1
		}/${current.getFullYear()}`;
		const { name, value } = e.target;
		setCallDetails({
			...callDetails,
			[name]: value,
			Date: date,
		});
	};

	const formatestring = (string) => {
		let string1 = string.replaceAll(' ','');
		let string2 = string1.toLowerCase();
		let string3 = string2.charAt(0).toUpperCase() + string2.slice(1);
		return string3;
		// console.log(string3);
	}

	const addCallDetails = () => {
		if (callDetails.CompanyName === "") {
			toast.error("Enter Company Name", {
				theme: "colored",
			});
			return 0;
		}

		callprev.push(`${props.id}` + formatestring(callDetails.CompanyName));

		let uniqueChars = callprev.filter((c, index) => {
			return callprev.indexOf(c) === index;
		});

		update(ref(db, "/calldata"),{
			calllist:uniqueChars
		})

        const phoneref = ref(db, '/completed' + `/${props.id}` + '/phone');
        const calldetref = push(phoneref);
		const current = new Date();
		const date = `${current.getDate()}/${
			current.getMonth() + 1
		}/${current.getFullYear()}`;
		
		// let compname = callDetails.CompanyName.join(" ")



        set(calldetref,{
            name: formatestring(callDetails.CompanyName),
            website: callDetails.CompanyWebsite,
            contactperson: callDetails.ContactPerson,
            contdesg: callDetails.ContactPersonDesignation,
            whatsappgrp: callDetails.WhatsAppGrp,
			date:date
        })


        // onValue(phoneref, (snapshot) => {
            // snapshot.forEach((childSnapshot) => {
            //   const childKey = childSnapshot.key;
            //   const childData = childSnapshot.val();
            //   console.log(childKey);
            //   console.log(childData)
            // });
        //     console.log(Object.keys(snapshot.val()).length);
        //   }, {
        //     onlyOnce: true
        //   });
		

		setCallDetails({
			CompanyName: "",
			CompanyWebsite: "",
			ContactPerson: "",
			ContactPersonDesignation: "",
            WhatsAppGrp: ""
		});


        toast.success("Call Details Added Sucessfully");
        // console.log(props.phone);
        setOpen(false);
		
	};

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.2 } }}
					exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.2 } }}
					// onClick = { ()=> {setOpen(false)} }
					// style = {{ backgroundColor: "pink" }}
					className="modalbackdrop"
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { duration: 0.2, delay: 0.3 } }}
						exit={{ scale: 0, transition: { duration: 0.2 } }}
						className="phonemodalcontainer"
					>
						<i
							onClick={() => {
								setOpen(false);
							}}
							class="fa-solid fa-rectangle-xmark closeicon"
						></i>
						<div className="modelhead">
							<h3>Add Call Details</h3>
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{
									scaleX: 1,
									transition: { delay: 0.6, duration: 0.4 },
								}}
								className="modalline"
							></motion.div>
						</div>
						<div className="phonemodalinner">
							<div className="plandi calladd">
								<span>Company Name:</span>
								<input
									type="text"
									name="CompanyName"
									id=""
									onChange={onChangehandler}
                                    value = {callDetails.CompanyName}
								/>
							</div>
							<div className="plandi calladd">
								<span>Company Website:</span>
								<input
									type="text"
									name="CompanyWebsite"
									id=""
									onChange={onChangehandler}
                                    value = {callDetails.CompanyWebsite}
								/>
							</div>
							<div className="plandi calladd">
								<span>Contact Person:</span>
								<input
									type="text"
									name="ContactPerson"
									id=""
									onChange={onChangehandler}
                                    value = {callDetails.ContactPerson}
								/>
							</div>
							<div className="plandi calladd">
								<span>Contact Person Designation:</span>
								<input
									type="text"
									name="ContactPersonDesignation"
									id="ContactPersonDesignation"
									onChange={onChangehandler}
                                    value = {callDetails.ContactPersonDesignation}
								/>
							</div>
                            <div className="plandi calladd">
                            <span>WhatsAppGrp</span>
								{/* <select
                                    name = "WhatsAppGrp"
									onChange={ onChangehandler}
								>
                                    <option value="" disabled selected>Choose a Grp</option>
									<option value="Nasscom">Nasscom</option>
									<option value="Industrial AI">Industrial AI</option>
									<option value="US StartUps">US StartUps</option>
								</select> */}
                                <input type="text" name = "WhatsAppGrp" value = {callDetails.WhatsAppGrp} onChange= {onChangehandler}  />
							</div>
							<button
								onClick={() => {
									addCallDetails();
								}}
								className="pcardbtn"
							>
								Add Call Data
							</button>
						</div>
					</motion.div>
					<ToastContainer />
				</motion.div>
			)}
		</AnimatePresence>
	);
});
