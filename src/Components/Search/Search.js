import React, { useState, useEffect } from "react";
import { SideNav } from "../SideNav/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "./Search.css";
import { onValue, ref, set } from "firebase/database";
import { db } from "../Config/fireBaseFile";
import { FinishedCard } from "../Finishedcard/FinishedCard";
import { motion } from "framer-motion";
export const Search = () => {
	const [finished, setFinished] = useState([]);
	const [search, setSearch] = useState("");
	const [searrchResults, setSearrchResults] = useState([]);
	useEffect(() => {
		onValue(ref(db, "/finished"), (snapshot) => {
			setFinished([]);
			Object.values(snapshot.val()).map((childs) => {
				setFinished((oldfins) => [...oldfins, childs]);
			});
		});
	}, []);

	const [sidenavopen, setSidenavopen] = useState(false);

	const sidenavmanager = () => {
		setSidenavopen(!sidenavopen);
	};

	const toastsucess = () => {
		toast.success("Data Created Sucessfully", {});
	};

	const searchhandlers = (e) => {
		const searchword = e.target.value;
		const newfilter = finished.filter((value) => {
			return (
				value.name.toLowerCase().includes(searchword.toLowerCase()) ||
				value.date.includes(searchword.toLowerCase()) ||
				value.placementCompany.toLowerCase().includes(searchword.toLowerCase()) ||
				value.departmant.toLowerCase().includes(searchword.toLowerCase())

			);
			// console.log(JSON.stringify(value))
			// return JSON.stringify(value).toLowerCase().includes(searchword.toLowerCase());
			// const name = value.name;
			// return ( value.name.toLowerCase().includes(searchword.toLowerCase()) === true || value.data.toLowerCase().includes(searchword.toLowerCase()) === true )
			// console.log(value.name.toLowercase())
			// return value.Join(" ").toLowercase().includes(searchword.toLowercase());
		});
		setSearrchResults(newfilter);
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
			<div className="searchandfilterpage">
				<div className="searchandfilcont">
					<div>
						<div className="searcheading">
							<h2>Search</h2>
							<motion.div
								className="modalline"
								initial={{ scaleX: 0 }}
								animate={{
									scaleX: 1,
									transition: { delay: 0.6, duration: 0.4 },
								}}
							></motion.div>
							<div className="searchbar">
								<input
									type="text"
									// value={search}
									placeholder="Seach By Name, Date of Post, "
									onChange={(e) => {
										searchhandlers(e);
									}}
								/>
								<button>Search</button>
							</div>
						</div>
						{searrchResults.length === 0 ? (
							<div className="awaitgrid" style={{ marginBottom: "40px" }}>
								{finished.map((e) => {
									return (
										<FinishedCard
											name={e.name}
											interest={e.interest}
											typeofjob={e.typeofjob}
											department={e.department}
											comments={e.comments}
											id={e.uuid}
											batch={e.batch}
											phone={e.phone}
											placementdate={e.placementdate}
											placementCompany={e.placementCompany}
											Stipend={e.Stipend}
										/>
									);
								})}
							</div>
						) : (
							<div className="awaitgrid" style={{ marginBottom: "40px" }}>
								{searrchResults.map((e) => {
									return (
										<FinishedCard
											name={e.name}
											interest={e.interest}
											typeofjob={e.typeofjob}
											department={e.department}
											comments={e.comments}
											id={e.uuid}
											batch={e.batch}
											phone={e.phone}
											placementdate={e.placementdate}
											placementCompany={e.placementCompany}
											Stipend={e.Stipend}
										/>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
