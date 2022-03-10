import { onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Config/fireBaseFile";
import { SideNav } from "../SideNav/SideNav";
import { motion } from "framer-motion";
import { Document, Page } from "react-pdf";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { CallCard } from "../CallCard/CallCard";
import { storage } from "../Config/fireBaseFile";
import {
	getDownloadURL,
	uploadBytes,
	uploadBytesResumable,
} from "firebase/storage";
import { ref as sref } from "firebase/storage";

import "./Edit_show.css";
import { toast, ToastContainer } from "react-toastify";
export const Edit_Showmodal = () => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [profilephone, setProfilephone] = useState([]);
	const [profile, setProfile] = useState([]);
	const { id, type } = useParams();
	const [edit, setEdit] = useState(true);
	const [phonekeys, setPhonekeys] = useState([]);
	const [name, setName] = useState("");
	const [batch, setBatch] = useState(2023);
	const [department, setDepartment] = useState("");
	const [contactno, setContactno] = useState("");
	const [interest, setInterest] = useState("");
	const [typeofjob, setTypeofjob] = useState("");
	const [whatsappgrp, setWhatsappgrp] = useState("");
	const [comments, setComments] = useState("");
	const [sidenavstatus, setSidenavstatus] = useState(false);
	const [sidenavopen, setSidenavopen] = useState(false);
	const [placename, setPlacename] = useState("");
	const [placesite, setPlacesite] = useState("");
	const [placestipend, setPlacestipend] = useState("");
	const [placecontactperson, setPlacecontactperson] = useState("");
	const [placecontactperdesig, setPlacecontactperdesig] = useState("");
	const [placewhatsapp, setPlacewhatsapp] = useState("");
	const [resume, setResume] = useState("");
	const [progress, setProgress] = useState(0);
	const [url, setUrl] = useState("");

	useEffect(() => {
		if (type === "false") {
			setEdit(true);
		}
		if (type === "true") {
			setEdit(false);
		}

		onValue(ref(db, "/completed" + `/${id}`), (snapshot) => {
			setProfile([]);
			Object.values(snapshot.val()).map((childsnaps) => {
				setProfile(snapshot.val());
				setName(snapshot.val().name);
				setBatch(snapshot.val().batch);
				setDepartment(snapshot.val().department);
				setContactno(snapshot.val().contactno);
				setInterest(snapshot.val().interest);
				setTypeofjob(snapshot.val().typeofjob);
				// setWhatsappgrp(snapshot.val().whatsappgrp);
				setComments(snapshot.val().comments);
				setPlacename(snapshot.val().placementCompany);
				setPlacesite(snapshot.val().CompanyWebsite);
				setPlacecontactperson(snapshot.val().contactPerson);
				setPlacecontactperdesig(snapshot.val().contactPersonDesignation);
				setPlacestipend(snapshot.val().Stipend);
				setPlacewhatsapp(snapshot.val().WhatsappGrp);
			});
		});

		onValue(ref(db, "/completed" + `/${id}` + "/phone"), (snapshot) => {
			setProfilephone([]);
			if (snapshot.val() === null) {
				setProfilephone(null);
			} else {
				Object.values(snapshot.val()).map((childsnaps) => {
					setProfilephone((oldprof) => [...oldprof, childsnaps]);
				});
				setPhonekeys(Object.keys(snapshot.val()));
			}
		});
	}, []);

	const sidenavmanager = () => {
		setSidenavopen(!sidenavopen);
	};

	const toastsucess = () => {
		toast.success("Data Created Sucessfully");
	};

	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset) {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	}
	// console.log(profile.resume);
	const updateHander = () => {
		update(ref(db, "/completed" + `/${id}`), {
			name,
			batch,
			department,
			contactno,
			interest,
			typeofjob,
			comments,
		});

		toast.success("Updated Successfully!", {
			theme: "colored",
		});

		setEdit(true);
	};

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

	const subresume = () => {
		update(ref(db, "/completed" + `/${id}`), {
			resume: url,
		});

		setResume("");
		setProgress(0);
	};

	return (
		<div>
			<div className="navbarforedit">
				<div className="editnavcontainer">
					<div className="titledivfornav">
						{/* <img className="logo" src={logo} alt="Logo" /> */}
						<h2 style={{ marginBottom: "0px" }}>StartTalent</h2>
					</div>
					<i
						class={
							sidenavopen
								? " fa-solid fa-arrow-left nope"
								: "fa-solid fa-bars nope"
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
			<div className="detailspage">
				<div className="detailscontainer">
					<div className="detailsheading">
						<h1>{profile.name}</h1>
						<motion.div
							className="modalline"
							initial={{ scaleX: 0 }}
							animate={{
								scaleX: 1,
								transition: { delay: 0.6, duration: 0.4 },
							}}
						></motion.div>
					</div>
					<div className="detailspdf">
						{profile.resume === undefined ||
						profile.resume === null ||
						profile.resume === "" ? (
							<div className="pdfview">
								{resume === "" ? (
									<div className="noresumeconfig">
										<span>No Resume Found!</span>
										<input
											type="file"
											name="file"
											id="file"
											class="inputfile"
											onChange={(e) => {
												getResume(e);
											}}
										/>
										<label for="file">Choose a file</label>
									</div>
								) : progress === 100 ? (
									<lable
										style={{
											backgroundColor: "blueviolet",
											padding: "5px",
											color: "white",
											cursor: "pointer",
										}}
										onClick={() => {
											subresume();
										}}
									>
										Done
									</lable>
								) : (
									<label
										for="file"
										style={{
											backgroundColor: "blueviolet",
											padding: "5px",
											color: "white",
											cursor: "pointer",
										}}
										onClick={() => {
											uploadResume();
										}}
									>
										Upload Choosen Resume - {progress}%
									</label>
								)}
							</div>
						) : (
							<div className="pdfview">
								<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
									<Viewer
										fileUrl={`${profile.resume}?#zoom=40`}
										plugins={[defaultLayoutPluginInstance]}
										// defaultScale = {0.5}
									/>
								</Worker>
								{resume === "" ? (
									<div className="noresumeconfig" style={{ marginTop: "10px" }}>
										<input
											type="file"
											name="file"
											id="file"
											class="inputfile"
											onChange={(e) => {
												getResume(e);
											}}
										/>
										<label for="file">Update Resume</label>
									</div>
								) : progress === 100 ? (
									<lable
										style={{
											backgroundColor: "blueviolet",
											padding: "5px",
											color: "white",
											cursor: "pointer",
										}}
										onClick={() => {
											subresume();
										}}
									>
										Done
									</lable>
								) : (
									<label
										for="file"
										style={{
											backgroundColor: "blueviolet",
											padding: "5px",
											color: "white",
											cursor: "pointer",
										}}
										onClick={() => {
											uploadResume();
										}}
									>
										Upload Choosen Resume - {progress}%
									</label>
								)}
							</div>
						)}
						<div className="detailsofprofile" style={{ marginTop: "30px" }}>
							<div className="headingdetails">
								<h3>
									Details of the{" "}
									<span style={{ color: "blueviolet" }}>Student</span>
								</h3>
								{edit ? (
									<i
										onClick={() => {
											setEdit(false);
											toast.success("Edit Option Enabled");
										}}
										class="fa-solid fa-pen-to-square"
									></i>
								) : (
									<i
										class="fa-solid fa-floppy-disk"
										onClick={() => {
											updateHander();
										}}
									></i>
								)}
							</div>
							<div className="detaildiv">
								<span>Name: </span>
								<input
									type="text"
									value={name}
									disabled={edit}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</div>
							<div className="detaildiv">
								<span>Batch: </span>
								<input
									type="number"
									value={batch}
									disabled={edit}
									onChange={(e) => {
										setBatch(e.target.value);
									}}
								/>
							</div>
							<div className="detaildiv">
								<span>Department: </span>
								<input
									type="text"
									value={department}
									disabled={edit}
									onChange={(e) => {
										setDepartment(e.target.value);
									}}
								/>
							</div>
							<div className="detaildiv">
								<span>ContactNo: </span>
								<input
									type="text"
									value={contactno}
									disabled={edit}
									onChange={(e) => {
										setContactno(e.target.value);
									}}
								/>
							</div>
							<div className="detaildiv">
								<span>Field Of Interest:</span>
								<select
									value={interest}
									disabled={edit}
									onChange={(e) => {
										setInterest(e.target.value);
									}}
								>
									<option value="Fullstack">FullStack</option>
									<option value="Datascience&Analytics">
										Data Science & Analytics
									</option>
									<option value="Dataengineering">Data Engineering</option>
									<option value="DigitalMarketing">Data Marketing</option>
								</select>
							</div>
							<div className="detaildiv">
								<span>Type Of Job:</span>
								<select
									value={typeofjob}
									disabled={edit}
									onChange={(e) => {
										setTypeofjob(e.target.value);
									}}
								>
									<option value="Internship">Internship</option>
									<option value="PartTime">PartTime</option>
									<option value="Fulltime">Fulltime</option>
								</select>
							</div>
							<div className="detaildiv">
								<span>Comments</span>
								<textarea
									disabled={edit}
									value={comments}
									className="modalcomment"
									type="text"
									onChange={(e) => {
										setComments(e.target.value);
									}}
								/>
							</div>
							<div className="detaildiv">
								<span>Posting Date</span>
								<input value={profile.date} disabled={"true"} type="text" />
							</div>
						</div>
						<div className="calldetailslist">
							<h3>
								<span style={{ color: "blueviolet" }}>Call</span> Details
							</h3>
							<div className="calllist">
								{profilephone === null ? (
									<h5 style={{ marginTop: "30px" }}>No Calls So Far !</h5>
								) : (
									profilephone.map((e, index) => {
										return (
											<div>
												<CallCard
													name={e.name}
													index={index}
													cperson={e.contactperson}
													cpersondesig={e.contdesg}
													site={e.website}
													whatsapp={e.whatsappgrp}
													id={phonekeys[index]}
													stid={id}
													status="completed"
												/>
											</div>
										);
									})
								)}
							</div>
						</div>
						<div className="placementdetails">
							<h3>
								<span style={{ color: "blueviolet" }}>Placement</span> Details
							</h3>
							{placename === undefined ||
							placename === null ||
							placename === "" ? (
								<div
									style={{
										width: "100%",
										display: "flex",
										justifyContent: "center",
									}}
								>
									<h5 style={{ marginTop: "30px" }}>
										No placement data found!
									</h5>
								</div>
							) : (
								<div className="placecont">
									<div className="placeinnercont">
										<span>CompanyName: </span>
										<input type="text" value={placename} disabled />
									</div>
									<div className="placeinnercont">
										<span>Company Website: </span>
										<input type="text" value={placesite} disabled />
									</div>
									<div className="placeinnercont">
										<span>Contact Person: </span>
										<input type="text" disabled value={placecontactperson} />
									</div>
									<div className="placeinnercont">
										<span>Contact Person Designation: </span>
										<input type="text" disabled value={placecontactperdesig} />
									</div>
									<div className="placeinnercont">
										<span>Stipend: </span>
										<input type="text" disabled value={placestipend} />
									</div>
									<div className="placeinnercont">
										<span>Whatsapp Grp: </span>
										<input type="text" disabled value={placewhatsapp} />
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
