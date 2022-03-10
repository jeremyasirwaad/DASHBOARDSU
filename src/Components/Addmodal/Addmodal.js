import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useEffect,
} from "react";
import "./Addmodal.css";
import { motion, AnimatePresence, animations } from "framer-motion";
import { set, ref, onValue, update } from "firebase/database";
import { db } from "../Config/fireBaseFile";
import { uid } from "uid";
import { ToastContainer, toast } from "react-toastify";
import { storage } from "../Config/fireBaseFile";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
	getDownloadURL,
	uploadBytes,
	uploadBytesResumable,
} from "firebase/storage";
import { ref as sref } from "firebase/storage";

export const Addmodal = forwardRef((props, refm) => {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [batch, setBatch] = useState("2023");
	const [department, setDepartment] = useState("IT");
	const [contactno, setContactno] = useState("+91");
	const [interest, setInterest] = useState("Fullstack");
	const [typeofjob, setTypeofjob] = useState("Internship");
	const [whatsappgrp, setWhatsappgrp] = useState("Nasscom");
	const [comments, setComments] = useState("");
	const [completed, setCompleted] = useState(false);
	const [resume, setResume] = useState("");
	const [progress, setProgress] = useState(0);
	const [url, setUrl] = useState("");
	const [phone, setPhone] = useState(0);
	const [prevyear, setPrevyear] = useState([]);
	useImperativeHandle(refm, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	const getResume = (e) => {
		// setResume(e.target.files[0])
		if (e.target.files[0]) {
			setResume(e.target.files[0]);
			// console.log(e.target.files[0])
		}
	};

	const uploadResume = () => {
		if (!resume) {
			toast.error("Choose A File", {
				theme: "colored",
			});
			return;
		}
		const storageRef = sref(storage, `/resumes/${resume.name}`);
		const uploadTask = uploadBytesResumable(storageRef, resume);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(prog);
			},
			(err) => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrl(url));
				// setUrl(url)
			}
		);
	};

	const onChangehandler = (e) => {
		setName(e.target.value);
	};

	// console.log(url)

	const createData = () => {
		// uploadResume();

		if (name === ""  || contactno === "+91") {
			toast.error("Fill All the details");
			return 0;
		}

		const current = new Date();
		const date = `${current.getDate()}/${
			current.getMonth() + 1
		}/${current.getFullYear()}`;
		const uuid = uid();

		// const completedref = ref(db, 'completed/' + uu)
		set(ref(db, "/completed/" + `/${uuid}`), {
			uuid,
			name,
			batch,
			department,
			contactno,
			interest,
			typeofjob,
			comments,
			date,
			completed,
			resume: url,
			// phone,
		});

		setName("");
		setBatch(2023);
		setComments("");
		setContactno("+91");
		setDepartment("IT");
		setInterest("Fullstack");
		setTypeofjob("Internship");
		setWhatsappgrp("Nasscom");
		setOpen(false);
		props.toastmanager();
		// navigate.go(0);
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
							<h3>Create Profile</h3>
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
								<select
									type="text"
									value={department}
									onChange={(e) => {
										setDepartment(e.target.value);
										console.log(department)
									}}
								>
									<option value="IT">IT</option>
									<option value="CSE">CSE</option>
									<option value="EEE">EEE</option>
									<option value="ECE">ECE</option>
									<option value="MECH">Mech</option>
									<option value="CIVIL">Civil</option>
									<option value="PROD">Prod</option>
									<option value="IBT">IBT</option>
								</select>
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
									<option value="Fullstack">FullStack</option>
									<option value="Datascience&Analytics">Data Science & Analytics</option>
									<option value="Dataengineering">Data Engineering</option>
									<option value="DigitalMarketing">Data Marketing</option>
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
						</div>
						<div className="modaldiv1">
							<div className="landi">
								<span>Comments</span>
								<textarea
									value={comments}
									onChange={(e) => {
										setComments(e.target.value);
									}}
									className="modalcomment"
									type="text"
								/>
							</div>
						</div>
						<div className="fileupload">
							<input
								type="file"
								onChange={getResume}
								accept="application/pdf"
							/>
							<i
								class="fa-solid fa-cloud-arrow-up"
								style={{ fontSize: "18px", color: "blueviolet" }}
								onClick={() => {
									uploadResume();
								}}
							></i>
							<span>{progress}%</span>
						</div>
						<button
							onClick={() => {
								// uploadResume();
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
