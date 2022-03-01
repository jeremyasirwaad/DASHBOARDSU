import React, { useState, useEffect } from "react";
import "./Tablefilter.css";
import { ToastContainer, toast } from "react-toastify";
import { SideNav } from "../SideNav/SideNav";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { onValue, ref } from "firebase/database";
import { db } from "../Config/fireBaseFile";

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

	const data = [
		{
			name: "Tanner Linsley",
			age: 26,
			friend: {
				name: "Jason Maurer",
				age: 23,
			},
		},
	];

	const columns = [
		{
			Header: "Name",
			accessor: "name",
		},
		{
			Header: "Department",
			accessor: "department",
		},
		{
			Header: "Batch",
			accessor: "batch",
		},
		{
			Header: "Type Of Job",
			accessor: "typeofjob",
		},
		{
			Header: "Placement Company",
			accessor: "placementCompany",
      
		},
    {
      id: "calls",
      Header:"Calls",
      accessor: d => {
        const phone = Object.values(d.phone);
        const spans = phone.map((e) => {
          return e.name + "\t" // console.log(e.name)
        })
        // return phone.name;
        return spans
        // console.log(spans);
      }

    }
	];

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
				<ReactTable filterable = {true}  data={tabledata} columns={columns} />
			</div>
		</div>
	);
};
