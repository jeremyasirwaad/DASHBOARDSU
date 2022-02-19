import { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { SideNav } from "./Components/SideNav/SideNav";

import { LandingDash } from "./Components/LandingDash/LandingDash";
import { ToastContainer, toast } from "react-toastify";
import { onValue, ref } from "firebase/database";
import { db } from "./Components/Config/fireBaseFile";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [students, setStudents] = useState([]);

	const [sidenavopen, setSidenavopen] = useState(false);

	useEffect(() => {
		onValue(ref(db), (snapshot) => {
      setStudents([]);
			const data = snapshot.val();
			if (data !== null) {
				Object.values(data).map((student) => {
					setStudents((oldArray) => [...oldArray, student]);
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

  if(students === undefined)
  {
    console.log(undefined);
  }
	return (
		<div className="App">
			<ToastContainer />
			<Navbar sidenavopenfun={sidenavmanager} sidenavstatus={sidenavopen} />
			<SideNav sidenavstatus={sidenavopen} toastmanager={toastsucess} />
			<LandingDash
        data = {students}
				sidenavopenfun={sidenavmanager}
				sidenavstatus={sidenavopen}
			/>
		</div>
	);
}

export default App;
