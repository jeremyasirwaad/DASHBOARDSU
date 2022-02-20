import React, { useEffect, useState } from "react";
import "./Awaitoffer.css";
import { AwaitCard } from "../AwaitCard/AwaitCard";
export const Awaitoffer = ({ data }) => {

	// console.log(data[1].phone);
	return (
		<div>
			<div className="awaitgrid">
                {
                    data.map((student)=> {
                        return <AwaitCard name = {student.name} interest = {student.interest} typeofjob = {student.typeofjob} department = { student.department }  comments = { student.comments } id = {student.uuid} batch = {student.batch} phone = {student.phone} data = {student}/>
                    })
                }
			</div>
		</div>
	);
};
