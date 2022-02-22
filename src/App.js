import { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { SideNav } from "./Components/SideNav/SideNav";

import { LandingDash } from "./Components/LandingDash/LandingDash";
import { ToastContainer, toast } from "react-toastify";
import { onValue, ref } from "firebase/database";
import { db } from "./Components/Config/fireBaseFile";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Edit_Showmodal } from "./Components/Edit_showmodal/Edit_Showmodal";
import {
	BrowserRouter,
	Routes,
	Route,
	Link
  } from "react-router-dom";
  import Landing from "./Landing";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [students, setStudents] = useState([]);
	const [sidenavopen, setSidenavopen] = useState(false);
	const [studentsawaiting, setStudentsawaiting] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		onValue(ref(db, "/completed"), (snapshot) => {
			setStudentsawaiting([]);
			const data = snapshot.val();
			if (data !== null) {
				Object.values(data).map((student) => {
					setStudentsawaiting((oldArray) => [...oldArray, student]);
				});
			}
		});
	}, []);
	const sidenavmanager = () => {
		setSidenavopen(!sidenavopen);
	};

	const toastsucess = () => {
		toast.success("Data Created Sucessfully");
	};

	return (
		<div className="App">
			{/* <ToastContainer />
			<Navbar sidenavopenfun={sidenavmanager} sidenavstatus={sidenavopen} />
			<SideNav sidenavstatus={sidenavopen} toastmanager={toastsucess} />
			{studentsawaiting.length !== 0 ? (
				<LandingDash
					data={studentsawaiting}
					sidenavopenfun={sidenavmanager}
					sidenavstatus={sidenavopen}
				/>
			) : (
				<div className="loading">
					<ScaleLoader color={"blueviolet"} loading={true} size={70} />
				</div>
			)} */}
			<BrowserRouter>
				<Routes>
					<Route path="/" element = {<Landing />}></Route>
							<Route exact path  = "/student/:type/:id" element = {<Edit_Showmodal />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
