import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./Addmodal.css";
import { motion, AnimatePresence, animations } from "framer-motion";
import { set, ref } from "firebase/database";
import { db } from "../Config/fireBaseFile";
import { uid } from "uid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import fire from "../../Config/fireBaseFile";

export const Addmodal = forwardRef((props, refm) => {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [batch, setBatch] = useState(2023);
	const [department, setDepartment] = useState("");
	const [contactno, setContactno] = useState("+91");
	const [interest, setInterest] = useState("FullStack");
	const [typeofjob, setTypeofjob] = useState("Internship");
	const [whatsappgrp, setWhatsappgrp] = useState("Nasscom");
	const [comments, setComments] = useState(["lsadlasd", "askdasd"]);
	const [comment, setComment] = useState([]);
	const [completed, setCompleted] = useState(false);
	const [phone, setPhone] = useState(0);


	useImperativeHandle(refm, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	const onChangehandler = (e) => {
		setName(e.target.value);
	};

	const createData = () => {
		if(name === "" || department === "" || contactno === "+91" )
		{
			toast.error("Fill All the details");
			return 0;
		}
		comments.push(comment);
		const phone = 0;
		const current = new Date();
		const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
		const uuid = uid();
		set(ref(db, `/${uuid}`), {
			uuid,
			name,
			batch,
			department,
			contactno,
			interest,
			typeofjob,
			whatsappgrp,
			comments,
			date,
			completed,
			phone
		});

		setName("");
		setOpen(false);
		props.toastmanager();
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
					<ToastContainer />
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { duration: 0.2, delay: 0.3 } }}
						exit={{ scale: 0, transition: { duration: 0.2 } }}
						className="modalcontainer"
					>
						<i
							onClick={() => {
								setOpen(false);
							}}
							class="fa-solid fa-rectangle-xmark closeicon"
						></i>
						<div className="modelhead">
							<h3>Create Data</h3>
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{
									scaleX: 1,
									transition: { delay: 0.6, duration: 0.4 },
								}}
								className="modalline"
							></motion.div>
						</div>
						<div className="modaldiv1">
							<div className="landi">
								<span>Name:</span>
								<input
									onChange={(e) => onChangehandler(e)}
									type="text"
									value={name}
								/>
							</div>
						</div>
						<div className="modaldiv1 div2modal">
							<div className="landi land2 batchmodal">
								<span>Batch:</span>
								<input
									type="number"
									value={batch}
									onChange={(e) => {
										setBatch(e.target.value);
									}}
								/>
							</div>
							{/* <div className="landi">
								<span>Field Of Interest:</span>
								<select name="cars" id="cars">
                                <option value="volvo">FullStack</option>
                                <option value="saab">Data Science</option>
                                <option value="mercedes">Data Engineering</option>
                                <option value="audi">Data Visualization</option>
                                </select>
							</div>  */}
							<div className="landi land2">
								<span>Department:</span>
								<input
									type="text"
									value={department}
									onChange={(e) => {
										setDepartment(e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="modaldiv1">
							<div className="landi">
								<span>Contact Number:</span>
								<input
									value={contactno}
									type="text"
									onChange={(e) => {
										setContactno(e.target.value);
									}}
								/>
							</div>
							<div className="landi">
								<span>Field Of Interest:</span>
								<select
									value={interest}
									onChange={(e) => {
										setInterest(e.target.value);
									}}
								>
									<option value="FullStack">FullStack</option>
									<option value="DataScience">Data Science</option>
									<option value="DataEngineering">Data Engineering</option>
									<option value="DataVisualization">Data Visualization</option>
								</select>
							</div>
						</div>
						<div className="modaldiv1">
							<div className="landi">
								<span>Type Of Job:</span>
								<select
									value={typeofjob}
									onChange={(e) => {
										setTypeofjob(e.target.value);
									}}
								>
									<option value="Internship">Internship</option>
									<option value="PartTime">PartTime</option>
									<option value="Fulltime">Fulltime</option>
								</select>
							</div>
							<div className="landi">
								<span>WhatsApp Grp:</span>
								<select
									value={whatsappgrp}
									onChange={(e) => {
										setWhatsappgrp(e.target.value);
									}}
								>
									<option value="Nasscom">Nasscom</option>
									<option value="Industrial Ai">Industrial Ai</option>
									<option value="US StartUps">US StartUps</option>
								</select>
							</div>
						</div>
						<div className="modaldiv1">
							<div className="landi">
								<span>Comments</span>
								<textarea
									value={comment}
									onChange={(e) => {
										setComment(e.target.value);
									}}
									className="modalcomment"
									type="text"
								/>
							</div>
						</div>
						<button
							onClick={() => {
								createData();
							}}
							className="modalsubbtn"
						>
							Submit
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
});
