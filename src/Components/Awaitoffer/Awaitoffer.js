import React from "react";
import "./Awaitoffer.css";
import { AwaitCard } from "../AwaitCard/AwaitCard";
export const Awaitoffer = ({ data }) => {
	console.log(data);

	return (
		<div>
			<div className="awaitgrid">
                {
                    data.map((student)=> {
                        return <AwaitCard name = {student.name} interest = {student.interest} typeofjob = {student.typeofjob} department = { student.department } phone = { student.phone } comments = { student.comments } id = {student.uuid} batch = {student.batch} />
                    })
                }
			</div>
		</div>
	);
};
