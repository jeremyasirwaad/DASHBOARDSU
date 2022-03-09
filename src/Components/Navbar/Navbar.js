import React, { useState } from "react";
import logo from './Cracking the Startup Talent Conundrum (1).gif'
import "./Navbar.css";

export const Navbar = ({ sidenavopenfun, sidenavstatus }) => {
	// const [arrow, setArrow] = useState(false);

	return (
		<div className="navbarcontainer">
			<div className="titledivfornav">
				{/* <img className="logo" src={logo} alt="Logo" /> */}
        <h2 style={{marginBottom:"0px", marginLeft:"20px"}}>StartTalent</h2>
			</div>
			<div className="navbarbody">
				<i
					class={
						sidenavstatus ? " fa-solid fa-arrow-left " : "fa-solid fa-bars"
					}
					onClick={() => {
						sidenavopenfun();
					}}
				></i>
			</div>
		</div>
	);
};
