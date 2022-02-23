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
	const [fornowdata, setFornowdata] = useState(props.data);
	const [phonefornow, setPhonefornow] = useState({});

	useImperativeHandle(refm, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	const addplacementdetails = () => {

		if(pcompany === "" || pcontact === "" || pcontactdesig === "" || pcompanysite === "" || Stipend === "" || Whatsapp === "")
		{
			toast.error("Fill All The Details",{
				theme:"colored"
			})

			return 0;
		}

		update(ref(db,"/completed" + `/${props.id}`),{
			placementCompany: pcompany,
			contactPerson:pcontact,
			contactPersonDesignation:pcontactdesig,
			CompanyWebsite:pcompanysite,
			Stipend:Stipend,
			WhatsappGrp:Whatsapp,
		})

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
				batch:	fornowdata.batch,
				name: fornowdata.name,
				comments: fornowdata.comments,
				completed:true,
				contactno: fornowdata.contactno,
				date: fornowdata.date,
				departmant:fornowdata.department,
				interest:fornowdata.interest,
				resume:fornowdata.resume,
				typeofjob:fornowdata.typeofjob,
				uuid: props.id+1,
				phone:props.phone === undefined ? (null) : (props.phone) ,
				CompanyWebsite: pcompanysite,
				Stipend: Stipend,
				WhatsappGrp:Whatsapp,
				contactPerson: pcontact,
				contactPersonDesignation: pcontactdesig,
				placementCompany: pcompany
			})

			
		
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
                            <span>Stipend</span>
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
