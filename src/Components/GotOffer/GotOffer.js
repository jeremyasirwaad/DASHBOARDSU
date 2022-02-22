import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import "../Addmodal/Addmodal.css";
import { motion, AnimatePresence, animations } from "framer-motion";
import { set, ref, update, child, onValue, push, get } from "firebase/database";
import { db } from "../Config/fireBaseFile";
import { uid } from "uid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GotOffer = forwardRef((props, refm) => {
	const [open, setOpen] = useState(false);


	useImperativeHandle(refm, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});



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
									
								/>
							</div>
							<div className="plandi calladd">
								<span>Company Website:</span>
								<input
									type="text"
									name="CompanyWebsite"
									id=""
									
								/>
							</div>
							<div className="plandi calladd">
								<span>Contact Person:</span>
								<input
									type="text"
									name="ContactPerson"
									id=""
								/>
							</div>
							<div className="plandi calladd">
								<span>Contact Person Designation:</span>
								<input
									type="text"
									name="ContactPersonDesignation"
									id="ContactPersonDesignation"
								/>
							</div>
                            <div className="plandi calladd">
                            <span>WhatsAppGrp</span>
                                <input type="text" name = "WhatsAppGrp" />
							</div>
							<button
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
