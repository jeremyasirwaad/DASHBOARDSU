import React, { useEffect, useState } from "react";
import "./Awaitoffer.css";
import { AwaitCard } from "../AwaitCard/AwaitCard";
import { Link, useNavigate } from "react-router-dom";
export const Awaitoffer = ({ data }) => {

	const navgiate = useNavigate();

	// console.log(data[1].phone);
	return (
		<div>
			<div className="awaitgrid">
                {
                    data.map((student)=> {
                        return<AwaitCard name = {student.name} interest = {student.interest} typeofjob = {student.typeofjob} department = { student.department }  comments = { student.comments } id = {student.uuid} batch = {student.batch} phone = {student.phone} data = {student} />
                    })
                }
			</div>
		</div>
	);
};
