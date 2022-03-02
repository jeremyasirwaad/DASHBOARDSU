import React, { useState, useEffect } from "react";
import "./Tablefilter.css";
import { ToastContainer, toast } from "react-toastify";
import { SideNav } from "../SideNav/SideNav";
import { onValue, ref } from "firebase/database";
import { db } from "../Config/fireBaseFile";
import MaterialTable from "material-table";

export const TableFilter = () => {
	const [sidenavopen, setSidenavopen] = useState(false);
	const [tabledata, setTabledata] = useState([]);

	useEffect(() => {
		onValue(ref(db, "/finished"), (snapshot) => {
			setTabledata([]);
			Object.values(snapshot.val()).map((child) => {
				setTabledata((oldval) => [...oldval, child]);
			});
		});
	}, []);

	// console.log(Object.values(tabledata[0].phone))

	const sidenavmanager = () => {
		setSidenavopen(!sidenavopen);
	};

	const toastsucess = () => {
		toast.success("Data Created Sucessfully", {});
	};

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
				<div className="innertabcont">
					<MaterialTable
						columns={[
							{ title: "Name", field: "name",  },
							{ title: "Department", field: "department" },
							{ title: "Batch", field: "batch" },
							{ title: "Type of Job", field: "typeofjob"},
							{ title: "Skill", field: "interest", lookup: {FullStack: "FullStack", DataScience: "DataScience", DataEngineering: "DataEngineering" , DataVisualization: "DataVisualization"}},
							{
								title: "Calls",
								field: "phone",
								render: (phone) => {
									const phonedata = Object.values(phone.phone);
									const list = phonedata.map((e) => {
										return e.name + ", "
									})

									return list
								},
								export: false
							},
							{ title: "CompanyPlaced", field: "placementCompany" },
							{ title: "Stipend", field: "Stipend" },

						]}

						options={{
							exportButton: true,
							filtering: true
						  }}
						data={tabledata}
						title="Placement Data"
					/>
				</div>
			</div>
		</div>
	);
};
