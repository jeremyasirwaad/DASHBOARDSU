import React, { useState, useEffect } from "react";
import { SideNav } from "../SideNav/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "./Search.css";
import { onValue, ref, set } from "firebase/database";
import { db } from "../Config/fireBaseFile";
import { FinishedCard } from "../Finishedcard/FinishedCard";
import { motion } from "framer-motion";
import Slider from "@mui/material/Slider";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";
import FilterResults from "react-filter-search";

export const Search = () => {
	const [sidefilteropen, setSidefilteropen] = useState(false);
	const [finished, setFinished] = useState([]);
	const [search, setSearch] = useState("");
	const [searrchResults, setSearrchResults] = useState([]);
	const [stirange, setStirange] = useState([0, 20000]);
	const [isit, setIsit] = useState(false);
	const [iscse, setIscse] = useState(false);
	const [isibt, setIsibt] = useState(false);
	const [iseee, setIseee] = useState(false);
	const [isece, setIsece] = useState(false);
	const [ismech, setIsmech] = useState(false);
	const [iscivil, setIscivil] = useState(false);
	const [isprod, setIsprod] = useState(false);
	const [isfullstack, setIsfullstack] = useState(false);
	const [isdatascience, setIsdatascience] = useState(false);
	const [isdataengineer, setIsdataengineer] = useState(false);
	const [isDataVisualization, setIsDataVisualization] = useState(false);
	const [isintern, setIsintern] = useState(false);
	const [isparttime, setIsparttime] = useState(false);
	const [isfulltime, setIsfulltime] = useState(false);
	const [searchWord, setSearchWord] = useState("");

	useEffect(() => {
		onValue(ref(db, "/finished"), (snapshot) => {
			setFinished([]);
			Object.values(snapshot.val()).map((childs) => {
				setFinished((oldfins) => [...oldfins, childs]);
			});
		});
	}, []);

	const applyfilter = () => {
		let updatedlist = [];

		if (isit) {
			const updatedlistit = finished.filter((e) =>
				e.department.toLowerCase().includes("it")
			);

			updatedlist.push(...updatedlistit);
			// console.log(...updatedlistit)
		}

		if (iscse) {
			const updatedlistcse = finished.filter((e) =>
				e.department.toLowerCase().includes("cse")
			);

			updatedlist.push(...updatedlistcse);
		}

		if (iseee) {
			const updatedlisteee = finished.filter((e) => {
				return e.department.toLowerCase().includes("eee");
			});

			updatedlist.push(...updatedlisteee);
		}

		if (isece) {
			const updatedlistece = finished.filter((e) => {
				return e.department.toLowerCase().includes("ece");
			});

			updatedlist.push(...updatedlistece);
		}

		if (iscivil) {
			const updatedlistcivil = finished.filter((e) => {
				return e.department.toLowerCase().includes("civil");
			});

			updatedlist.push(...updatedlistcivil);
		}

		if (ismech) {
			const updatedlistmech = finished.filter((e) => {
				return e.department.toLowerCase().includes("mech");
			});

			updatedlist.push(...updatedlistmech);
		}

		if (isibt) {
			const updatedlistibt = finished.filter((e) => {
				return e.department.toLowerCase().includes("ibt");
			});

			updatedlist.push(...updatedlistibt);
		}

		if (isprod) {
			const updatedlistprod = finished.filter((e) => {
				return e.department.toLowerCase().includes("prod");
			});

			updatedlist.push(...updatedlistprod);
		}

		if (isfullstack) {
			if (updatedlist.length === 0) {
				updatedlist = finished;
				updatedlist = updatedlist.filter((e) => {
					return e.interest.toLowerCase().includes("fullstack");
					// console.log(e.interest)
				});
				// updatedlist.push(...updatedlistfs)
				// updatedlist = updatedlistfs
			} else {
				updatedlist = updatedlist.filter((e) => {
					return e.interest.toLowerCase().includes("fullstack");
					// console.log(e.interest)
				});
			}
		}

		if (isdatascience) {
			if (updatedlist.length === 0) {
				updatedlist = finished;
				updatedlist = updatedlist.filter((e) => {
					return e.interest.toLowerCase().includes("datascience");
				});
			} else {
				updatedlist = updatedlist.filter((e) => {
					return e.interest.toLowerCase().includes("datascience");
					// console.log(e.interest)
				});
			}
		}

		if (isdataengineer) {
			if (updatedlist.length === 0) {
				updatedlist = finished;
				updatedlist = updatedlist.filter((e) => {
					return e.interest.toLowerCase().includes("dataengineering");
				});
			} else {
				updatedlist = updatedlist.filter((e) => {
					return e.interest.toLowerCase().includes("dataengineering");
					// console.log(e.interest)
				});
			}
		}

		if (isDataVisualization) {
			if (updatedlist.length === 0) {
				updatedlist = finished;
				updatedlist = updatedlist.filter((e) => {
					return e.interest.toLowerCase().includes("datavisualization");
				});
			} else {
				updatedlist = updatedlist.filter((e) => {
					return e.interest.toLowerCase().includes("datavisualization");
					// console.log(e.interest)
				});
			}
		}

		if (isfulltime) {
			if (updatedlist.length === 0) {
				updatedlist = finished;
				updatedlist = updatedlist.filter((e) => {
					return e.typeofjob.toLowerCase().includes("fulltime");
				});
			} else {
				updatedlist = updatedlist.filter((e) => {
					return e.typeofjob.toLowerCase().includes("fulltime");
					// console.log(e.interest)
				});
			}
		}

		if (isparttime) {
			if (updatedlist.length === 0) {
				updatedlist = finished;
				updatedlist = updatedlist.filter((e) => {
					return e.typeofjob.toLowerCase().includes("parttime");
				});
			} else {
				updatedlist = updatedlist.filter((e) => {
					return e.typeofjob.toLowerCase().includes("parttime");
					// console.log(e.interest)
				});
			}
		}

		if (isintern) {
			if (updatedlist.length === 0) {
				updatedlist = finished;
				updatedlist = updatedlist.filter((e) => {
					return e.typeofjob.toLowerCase().includes("internship");
				});
			} else {
				updatedlist = updatedlist.filter((e) => {
					return e.typeofjob.toLowerCase().includes("internship");
					// console.log(e.interest)
				});
			}
		}

		if (searchWord !== "") {
			if (updatedlist.length === 0) {
				updatedlist = finished;
				updatedlist = updatedlist.filter((value) => {
					return (
						value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
						value.date.includes(searchWord.toLowerCase()) ||
						value.placementCompany
							.toLowerCase()
							.includes(searchWord.toLowerCase())
					);
				});
			} else {
				updatedlist = updatedlist.filter((value) => {
					return (
						value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
						value.date.includes(searchWord.toLowerCase()) ||
						value.placementCompany
							.toLowerCase()
							.includes(searchWord.toLowerCase())
					);
					// console.log(e.interest)
				});
			}
		}

		setSearrchResults(updatedlist);
	};

	useEffect(() => {
		applyfilter();
	}, [
		isit,
		iscse,
		isece,
		iseee,
		iscivil,
		ismech,
		isibt,
		isprod,
		isfullstack,
		isdataengineer,
		isdatascience,
		isDataVisualization,
		isintern,
		isparttime,
		isfulltime,
		stirange,
		searchWord,
	]);

	const [sidenavopen, setSidenavopen] = useState(false);

	const sidenavmanager = () => {
		setSidenavopen(!sidenavopen);
	};

	const toastsucess = () => {
		toast.success("Data Created Sucessfully", {});
	};

	const searchhandlers = (e) => {};
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
			<div
				className={sidefilteropen ? "sidefilter" : "sidefilter sidefilteropen"}
			>
				<div className="sidefiltercont">
					<div className="sidefilterhead">
						<h3>Filter</h3>
						<motion.div
							className="modalline"
							initial={{ scaleX: 0 }}
							animate={{
								scaleX: 1,
								transition: { delay: 0.6, duration: 0.4 },
							}}
						></motion.div>
					</div>
					<div className="filterobjects">
						<div className="departmentobj">
							<span>Department</span>
							<div className="fildepartchoice">
								<div className="departch1">
									<input
										type="checkbox"
										name="CSE"
										onChange={(e) => {
											setIscse(e.target.checked);
										}}
									/>
									<label htmlFor="CSE">CSE</label>
									<input
										type="checkbox"
										name="CSE"
										onChange={(e) => {
											setIsit(e.target.checked);
										}}
									/>
									<label htmlFor="CSE">IT</label>
									<input
										type="checkbox"
										name="CSE"
										onChange={(e) => {
											setIsece(e.target.checked);
										}}
									/>
									<label htmlFor="CSE">ECE</label>
									<input
										type="checkbox"
										name="CSE"
										onChange={(e) => {
											setIseee(e.target.checked);
										}}
									/>
									<label htmlFor="CSE">EEE</label>
								</div>
								<div className="departch2">
									<input
										type="checkbox"
										name="CSE"
										onChange={(e) => {
											setIsibt(e.target.checked);
										}}
									/>
									<label htmlFor="CSE">IBT</label>
									<input
										type="checkbox"
										name="CSE"
										onChange={(e) => {
											setIsmech(e.target.checked);
										}}
									/>
									<label htmlFor="CSE">Mech</label>
									<input
										type="checkbox"
										name="CSE"
										onChange={(e) => {
											setIscivil(e.target.checked);
										}}
									/>
									<label htmlFor="CSE">Civil</label>
									<input
										type="checkbox"
										name="CSE"
										onChange={(e) => {
											setIsprod(e.target.checked);
										}}
									/>
									<label htmlFor="CSE">Prod</label>
								</div>
							</div>
						</div>
						<div className="stipendobj">
							<span>Stipend</span>
							<div
								className="slimf"
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<div className="sliderdiv">
									<Slider
										size="large"
										// step={5000}
										min={0}
										disableSwap
										// marks ={marks}
										max={50000}
										valueLabelDisplay="auto"
										value={stirange}
										color="secondary"
										onChange={(e, data) => {
											setStirange(data);
										}}
									/>
								</div>
							</div>
						</div>
						<div className="typeofjobobj">
							<span>Interest</span>
							<div className="typeofchoicecontainer">
								<div style={{ marginBottom: "4px" }}>
									<input
										type="checkbox"
										name="FullStack"
										checked={isfullstack}
										onChange={(e) => {
											setIsdataengineer(false);
											setIsdatascience(false);
											setIsDataVisualization(false);
											setIsfullstack(e.target.checked);
										}}
									/>
									<label htmlFor="FullStack">FullStack</label>
								</div>
								<div style={{ marginBottom: "4px" }}>
									<input
										type="checkbox"
										name="DataScience"
										checked={isdatascience}
										onChange={(e) => {
											setIsdataengineer(false);
											setIsfullstack(false);
											setIsDataVisualization(false);
											setIsdatascience(e.target.checked);
										}}
									/>
									<label htmlFor="DataScience">Data Science</label>
								</div>
								<div style={{ marginBottom: "4px" }}>
									<input
										type="checkbox"
										name="DataEngineering"
										checked={isdataengineer}
										onChange={(e) => {
											setIsdatascience(false);
											setIsfullstack(false);
											setIsDataVisualization(false);
											setIsdataengineer(e.target.checked);
										}}
									/>
									<label htmlFor="DataEngineering">Data Engineering</label>
								</div>
								<div style={{ marginBottom: "4px" }}>
									<input
										type="checkbox"
										name="DataVisualization"
										checked={isDataVisualization}
										onChange={(e) => {
											setIsdataengineer(false);
											setIsfullstack(false);
											setIsdatascience(false);
											setIsDataVisualization(e.target.checked);
										}}
									/>
									<label htmlFor="DataVisualization">Data Visualization</label>
								</div>
							</div>
						</div>
						<div className="jobtobj">
							<span>Job Type</span>
							<div className="jobtcont">
								<div style={{ marginBottom: "4px" }}>
									<input
										type="checkbox"
										checked={isintern}
										name="FullStack"
										onChange={(e) => {
											setIsparttime(false);
											setIsfulltime(false);
											setIsintern(e.target.checked);
										}}
									/>
									<label htmlFor="FullStack">Internship</label>
								</div>
								<div style={{ marginBottom: "4px" }}>
									<input
										type="checkbox"
										name="DataScience"
										checked={isparttime}
										onChange={(e) => {
											setIsintern(false);
											setIsfulltime(false);
											setIsparttime(e.target.checked);
										}}
									/>
									<label htmlFor="DataScience">Part-Time</label>
								</div>
								<div style={{ marginBottom: "4px" }}>
									<input
										type="checkbox"
										name="DataEngineering"
										checked={isfulltime}
										onChange={(e) => {
											setIsintern(false);
											setIsparttime(false);
											setIsfulltime(e.target.checked);
										}}
									/>
									<label htmlFor="DataEngineering">Full-Time</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={sidefilteropen ? "filterbtn filterbtnonclick" : "filterbtn"}
				onClick={() => {
					setSidefilteropen(!sidefilteropen);
				}}
			></div>
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
									placeholder="Seach By Name, Date of Post, Company Placed and etc"
									onChange={(e) => {
										setSearchWord(e.target.value);
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
