import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Addmodal } from "../Addmodal/Addmodal";
import { Link } from "react-router-dom";
import "./SideNav.css";
export const SideNav = ({ sidenavstatus, toastmanager }) => {
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
					<div
						onClick={() => {
							modelref.current.open();
						}}
						className="navdiv navmargin"
					>
						<i class="fa-solid fa-user-plus sidenavcontainericons"></i>
						<span className={click ? "" : "none"}>Add</span>
					</div>
					<div className="navdiv mbt ">
						<Link to="/">
							<i
								onClick={clicktrigger}
								class="fa-solid fa-house sidenavcontainericons"
							></i>
						</Link>
						<span className={click ? "" : "none"}>Home</span>
					</div>
					{/* <i class="fa-solid fa-minus sidenavcontainericons"></i> */}
					<div className="navdiv" style={{ marginBottom: "40px"  }}>
						<Link to = "/search">
							{" "}
							<i class="fa-solid fa-magnifying-glass sidenavcontainericons"></i>
						</Link>
						<span className={click ? "" : "none"}>Search</span>
					</div>
					<div className="navdiv">
						<Link to = "/tables"><i class="fa-solid fa-table sidenavcontainericons"></i></Link>
						<span className={click ? "" : "none"}>History</span>
					</div>
					{/* <i class="fa-solid fa-horizontal-rule"></i> */}
				</div>
			</div>
			<Addmodal ref={modelref} toastmanager={toastmanager} />
		</div>
	);
};
