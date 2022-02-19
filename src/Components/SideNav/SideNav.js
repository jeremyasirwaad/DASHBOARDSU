import React, { useState, useRef } from "react";
import { motion } from 'framer-motion';
import { Addmodal } from "../Addmodal/Addmodal";
 import "./SideNav.css";
export const SideNav = ({sidenavstatus, toastmanager}) => {

	const modelref = useRef();

	const [click, setClick] = useState(false);
	const [filter, setFilter] = useState(false);

	const clicktrigger = () => {
		if (click === true) {
			setFilter(false);
		}
		setClick(!click);
	};

	const filtertrigger = () => {
		setFilter(!filter);
	};

	const onclickfilter = () => {
		setClick(true);
		setFilter(true);

		if (click && filter) {
			setClick(false);
			setFilter(false);
		}
	};

	return (
		<div className={sidenavstatus ? "sidenav sideonshow" : "sidenav"}>
			<div
				className={
					click ? "sidenavonclick sidenavcontainer" : "sidenavcontainer"
				}
			>
				<div className="sidenavinnercontainer">
					<div onClick={() => { modelref.current.open(); }} className="navdiv navmargin">
					<i class="fa-solid fa-user-plus sidenavcontainericons"></i>
						<span className={click ? "" : "none"}>Add</span>
					</div>
					<div className="navdiv mbt ">
						<i
							onClick={clicktrigger}
							class="fa-solid fa-house sidenavcontainericons"
						></i>
						<span className={click ? "" : "none"}>Home</span>
					</div>
					<i class="fa-solid fa-minus sidenavcontainericons"></i>
					<div className="navdiv navmargin">
						<i
							onClick={onclickfilter}
							class="fa-solid fa-filter sidenavcontainericons"
						></i>
						<span className={click ? "" : "none"}>Filter</span>
						<i
							onClick={filtertrigger}
							className={click ? "fa-solid fa-angle-down" : "none"}
						></i>
					</div>
					<div className={filter ? "filters" : "opacity"}>
						<motion.div initial = {{ y:500, opacity: 0 }} animate = {{ y:0, opacity: 1 }} className="filtercontainer">
							<div className="fil">
								<input type="checkbox" name="FullStack" />
								<span>FullStacks</span>
							</div>
							<div className="fil">
								<input type="checkbox" name="DataScience" />
								<span>Data Sci</span>
							</div>
							<div className="fil">
								<input type="checkbox" name="Dataviz" />
								<span>Data Viz</span>
							</div>
						</motion.div>
					</div>
					<div className="navdiv">
						<i class="fa-solid fa-clock-rotate-left sidenavcontainericons"></i>
						<span className={click ? "" : "none"}>History</span>
					</div>
					{/* <i class="fa-solid fa-horizontal-rule"></i> */}
				</div>
			</div>
			<Addmodal ref = {modelref} toastmanager = {toastmanager} />
		</div>
	);
};
