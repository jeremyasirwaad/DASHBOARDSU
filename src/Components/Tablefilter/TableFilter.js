import React, { useState, useEffect } from "react";
import "./Tablefilter.css";
import { ToastContainer, toast } from "react-toastify";
import { SideNav } from "../SideNav/SideNav";
import { onValue, ref, set, update } from "firebase/database";
import { db } from "../Config/fireBaseFile";
import MaterialTable from "material-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
export const TableFilter = () => {
	const [sidenavopen, setSidenavopen] = useState(false);
	const [tabledata, setTabledata] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	const [fake, setFake] = useState([2001, 2002, 2003, 2001, 2004, 2005, 2006]);
	const [fake1, setFake1] = useState();
	const [dynamicobj, setdynamicobj] = useState([]);
	const [dynamicobjcompname, setDynamicobjcompname] = useState([]);
	const [dynamicobjcall, setDynamicobjcall] = useState([]);

	useEffect(() => {
		onValue(ref(db, "/finished"), (snapshot) => {
			setTabledata([]);
			if (snapshot.val() !== null && snapshot.val() !== undefined) {
				Object.values(snapshot.val()).map((child) => {
					setTabledata((oldval) => [...oldval, child]);
				});
			}
		});

		onValue(ref(db, "/yeardata"), (snapshot) => {
			if (snapshot.val() !== null && snapshot.val() !== undefined) {
				// setFake1(snapshot.val().year);
				var obj = snapshot.val().year.reduce(function (acc, cur, i) {
					acc[cur] = cur;
					return acc;
				}, {});
				setdynamicobj(obj);
			}
		});

		onValue(ref(db, "/compnamedata"), (snapshot) => {
			if (snapshot.val() !== null && snapshot.val() !== undefined) {
				// setFake1(snapshot.val().year);
				var obj = snapshot.val().companylist.reduce(function (acc, cur, i) {
					acc[cur] = cur;
					return acc;
				}, {});
				setDynamicobjcompname(obj);
			}
		});

		onValue(ref(db, "/calldata"), (snapshot) => {
			if (snapshot.val() !== null && snapshot.val() !== undefined) {
				// setFake1(snapshot.val().year);
				var obj = snapshot.val().calllist.reduce(function (acc, cur, i) {
					acc[cur] = cur;
					return acc;
				}, {});
				setDynamicobjcall(obj);
			}
		});

		// console.log(fake1)
	}, []);

	// console.log(Object.values(tabledata[0].phone))

	const sidenavmanager = () => {
		setSidenavopen(!sidenavopen);
	};

	const toastsucess = () => {
		toast.success("Data Created Sucessfully", {});
	};

	const navigate = useNavigate();

	return (
		<div>
			<div className="navbarforedit">
				<div className="editnavcontainer">
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
			<div className="tablepage">
				<div className="datepicker">
					<div style={{ width: "70%" }}>
						{/* {" "}
						<TextField
							id="date"
							label="Birthday"
							type="date"
							defaultValue="2017-05-24"
							sx={{ width: 220 }}
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(e)=> { console.log(e.target.value.replace(" -", "/")) }}
							
						></TextField> */}
					</div>
				</div>
				<div className="innertabcont">
					<MaterialTable
						onRowClick={(event, rowData) => {
							navigate(`/finished/false/${rowData.uuid}`)
						}}
						columns={[
							{ title: "Name", field: "name" },
							{
								title: "Department",
								field: "department",
								lookup: {
									IT: "IT",
									CSE: "CSE",
									ECE: "ECE",
									EEE: "EEE",
									Mech: "Mech",
									Civil: "Civil",
									IBT: "IBT",
									Prod: "Prod",
								},
							},
							{
								title: "Batch",
								field: "batch",
								lookup: dynamicobj,
							},
							{
								title: "Type of Job",
								field: "typeofjob",
								lookup: {
									Internship: "Internship",
									PartTime: "PartTime",
									Fulltime: "Fulltime",
								},
							},
							{
								title: "Skill",
								field: "interest",
								lookup: {
									Fullstack: "Fullstack",
									Datascience: "Datascience",
									Dataengineering: "Dataengineering",
									Datavisualization: "Datavisualization",
								},
							},
							{
								title: "Calls",
								// filtering: false,
								// type: 'numeric',
								field: "phone",
								lookup: dynamicobjcall,
								customFilterAndSearch: (term, rowData) => {
									// console.log(phone)
									const callarray = Object.values(rowData.phone);
									// console.log(callarray);
									let name1 = "";
									let name2;
									callarray.map((e)=>{
										// console.log(e.name.concat(e.name));
										name1 = name1 + e.name;
									})

									// console.log(term.join(""));
									// console.log(name1.toString());
									if(name1.toLowerCase().includes(term.join("").toLowerCase()))
									{
										return true;
									}
									else{
										return false;
									}
								},
								render: (phone) => {
									if (phone.phone === null || phone.phone === undefined) {
										return "No data";
									} else {
										const phonedata = Object.values(phone.phone);
										// console.log(phonedata);

										const list = phonedata.map((e) => {
											return e.name + ", ";
										});
										return list;
									}
								},
								export: false,
							},
							{
								title: "CompanyPlaced",
								field: "placementCompany",
								lookup: dynamicobjcompname,
							},
							{ title: "Stipend", field: "Stipend" },
						]}
						options={{
							exportButton: true,
							filtering: true,
							headerStyle: {
								zIndex: 0,
							},
						}}
						data={tabledata}
						title="Placement Data"
					/>
				</div>
			</div>
		</div>
	);
};
