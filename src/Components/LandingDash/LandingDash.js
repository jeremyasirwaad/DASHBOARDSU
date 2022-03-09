import React, { useEffect, useState } from "react";
import { Awaitoffer } from "../Awaitoffer/Awaitoffer";
import { motion } from "framer-motion";
import "./LandingDash.css";

export const LandingDash = ({ sidenavopenfun, sidenavstatus, data }) => {

	return (
		<div
			onClick={() => {
				if (sidenavstatus) {
					sidenavopenfun();
				}
			}}
			className="landingdashpage"
		>
			
				<div className="containerland" style={{ marginTop: "70px" }}>
					<div className="landinner">
						<h3>Waiting For Suitable Offer</h3>
						<motion.div
							className="modalline"
							initial={{ scaleX: 0 }}
							animate={{
								scaleX: 1,
								transition: { delay: 0.6, duration: 0.4 },
							}}
						></motion.div>
						<div style={{ width: "100%" }}>
							<Awaitoffer data={data} />
						</div>
					</div>
				</div>
			
		</div>
	);
};
