import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import "../Addmodal/Addmodal.css";
import { motion, AnimatePresence, animations } from "framer-motion";
import { set, ref, update, child, onValue, push, get, remove, onChildAdded } from "firebase/database";
import { db } from "../Config/fireBaseFile";
import { uid } from "uid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const GotOffer = forwardRef((props, refm) => {
	const [open, setOpen] = useState(false);
	const [pcompany, setPcompany] = useState("");
	const [pcontact, setPcontact] = useState("");
	const [pcontactdesig, setPcontactdesig] = useState("");
	const [pcompanysite, setPcompanysite] = useState("");
	const [Stipend, setStipend] = useState("");
	const [Whatsapp, setWhatsapp] = useState("");
	// const [snap, setSnap] = useState({});
	// const [fornowdata, setFornowdata] = useState(props.data);
	const [phonefornow, setPhonefornow] = useState({});
	const [prevyear, setPrevyear] = useState([]);
	const [comnameprev, setComnameprev] = useState([]);
	const [departdatalist, setDepartdatalist] = useState([]);

	useImperativeHandle(refm, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	useEffect(() => {
		
		onValue(ref(db,"/yeardata"),(snapshot)=> {
			if(snapshot.val() !== null && snapshot.val() !== undefined)
			{
				setPrevyear(snapshot.val().year);
				// console.log(snapshot.val().year)
			}
		})

		onValue(ref(db,"/compnamedata"),(snapshot)=> {
			if(snapshot.val() !== null && snapshot.val() !== undefined)
			{
				setComnameprev(snapshot.val().companylist);
				// console.log(snapshot.val().year)
			}
		})

		onValue(ref(db,"/departdata"),(snapshot)=> {
			if(snapshot.val() !== null && snapshot.val() !== undefined)
			{
				setDepartdatalist(snapshot.val().depart);
				// console.log(snapshot.val().year)
			}
		})
		
			
	},[])

	const formatestring = (string) => {
		let string1 = string.replaceAll(' ','');
		let string2 = string1.toLowerCase();
		let string3 = string2.charAt(0).toUpperCase() + string2.slice(1);
		return string3;
		// console.log(string3);
	}

	const addplacementdetails = () => {

		if(pcompany === "" ||  Stipend === "" || Whatsapp === "")
		{
			toast.error("Fill Name , Stipend & Group Name",{
				theme:"colored"
			})

			return 0;
		}

		if(props.phone === null || props.phone === undefined)
		{
			toast.error("No Call data Found !",{
				theme:"colored"
			})

			return 0;
		}

		prevyear.push(`${props.id}` + (props.data.batch));

		let uniqueChars = prevyear.filter((c, index) => {
			return prevyear.indexOf(c) === index;
		});

		update(ref(db, "/yeardata"),{
			year:uniqueChars
		})

		comnameprev.push( `${props.id}`  +  formatestring(pcompany));

		let uniqueCharslist = comnameprev.filter((c, index) => {
			return comnameprev.indexOf(c) === index;
		});

		update(ref(db, "/compnamedata"),{
			companylist: uniqueCharslist
		})

		departdatalist.push( `${props.id}`  +  (props.data.department).toUpperCase());

		let uniquedepartlist = departdatalist.filter((c, index) => {
			return departdatalist.indexOf(c) === index;
		});

		update(ref(db, "/departdata"),{
			depart: uniquedepartlist
		})



		const current = new Date();
		const date = `${current.getDate()}/${
			current.getMonth() + 1
		}/${current.getFullYear()}`;

		// update(ref(db,"/completed" + `/${props.id}`),{
		// 	placementCompany: formatestring(pcompany),
		// 	contactPerson:pcontact,
		// 	contactPersonDesignation:pcontactdesig,
		// 	CompanyWebsite:pcompanysite,
		// 	Stipend:Stipend,
		// 	WhatsappGrp:Whatsapp,
		// 	placementdate: date
		// })

		// get(ref(db,"/completed" + `/${props.id}`)).then((snapshot)=> {
		// 		if(snapshot.exists()){
		// 			console.log(snapshot.val().phone)
		// 			setFornowdata(snapshot.val());

		// 		}
		// 		else{
		// 			toast.error("Error Occured Try Again",{
		// 				theme:'colored'
		// 			})
		// 			return 0;
		// 		}
		// })
		

			set(ref(db,"/finished" + `/${props.id + 1}`),{
				batch:	props.data.batch,
				name: props.data.name,
				comments: props.data.comments,
				completed:true,
				contactno: props.data.contactno,
				date: props.data.date,
				department:props.data.department,
				interest:props.data.interest,
				resume:props.data.resume,
				typeofjob:props.data.typeofjob,
				uuid: props.id+1,
				phone:props.phone === undefined ? (null) : (props.phone) ,
				CompanyWebsite: pcompanysite,
				Stipend: Stipend,
				WhatsappGrp:Whatsapp,
				contactPerson: pcontact,
				contactPersonDesignation: pcontactdesig,
				placementCompany: formatestring(pcompany),
				placementdate: date
			})

			
			// set(ref(db,"/gotoffer" + `/${props.id + 1}`),{
			// 	batch:	props.data.batch,
			// 	name: props.data.name,
			// 	comments: props.data.comments,
			// 	completed:true,
			// 	contactno: props.data.contactno,
			// 	date: props.data.date,
			// 	department:props.data.department,
			// 	interest:props.data.interest,
			// 	resume:props.data.resume,
			// 	typeofjob:props.data.typeofjob,
			// 	uuid: props.id+1,
			// 	phone:props.phone === undefined ? (null) : (props.phone) ,
			// 	CompanyWebsite: pcompanysite,
			// 	Stipend: Stipend,
			// 	WhatsappGrp:Whatsapp,
			// 	contactPerson: pcontact,
			// 	contactPersonDesignation: pcontactdesig,
			// 	placementCompany: pcompany,
			// 	placementdate: date
			// })

			remove(ref(db, "/completed" + `/${props.id}`));
		


		setPcompany("");
		setPcompanysite("");
		setPcontact("");
		setStipend("");
		setWhatsapp("");

		setOpen(false);
		props.toastsucc();
	}

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
							<h3>Add Placement Details</h3>
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
									value={ pcompany }
									onChange={(e) => {setPcompany(e.target.value)}}
								/>
							</div>
							<div className="plandi calladd">
								<span>Company Website:</span>
								<input
									type="text"
									name="CompanyWebsite"
									id=""
									value={pcompanysite}
									onChange={(e) => {setPcompanysite(e.target.value)}}
								/>
							</div>
							<div className="plandi calladd">
								<span>Contact Person:</span>
								<input
									type="text"
									name="ContactPerson"
									id=""
									value={pcontact}
									onChange={(e) => {setPcontact(e.target.value)}}
								/>
							</div>
							<div className="plandi calladd">
								<span>Contact Person Designation</span>
								<input
									type="text"
									name="ContactPersonDesignation"
									id="ContactPersonDesignation"
									value={pcontactdesig}
									onChange={(e) => {setPcontactdesig(e.target.value)}}
								/>
							</div>
                            <div className="plandi calladd">
                            <span>Compensation</span>
                                <input type="text" name = "WhatsAppGrp"  value={Stipend} onChange={(e) => {setStipend(e.target.value)}}/>
							</div>
							<div className="plandi calladd">
                            <span>WhatsappGrp</span>
                                <input type="text"  value={Whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}}/>
							</div>
							<button
								className="pcardbtn"
								onClick={()=> { addplacementdetails(); }}
							>
								Add Placement Data
							</button>
						</div>
					</motion.div>
					<ToastContainer />
				</motion.div>
			)}
		</AnimatePresence>
	);
});
