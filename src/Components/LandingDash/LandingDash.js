import React, { useEffect } from "react";
import "./LandingDash.css";

export const LandingDash = ({ sidenavopenfun, sidenavstatus }) => {
	return (
		<div
			onClick={() => {
				if (sidenavstatus) {
					sidenavopenfun();
				}
			}}
		>
			<div className="container">
				<div className="landinner">
					<h3>Waiting For Suitable Offer</h3>
				</div>
			</div>
		</div>
	);
};
