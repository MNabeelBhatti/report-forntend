import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ReactFormBuilder, ElementStore } from "react-form-builder2";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "../CSS/formbuilder.css";

import "../CSS/app.css";
import styles from "../Styles/foo.module.scss";

const FormBuilderEdit = ({ activeDemographic }) => {
	const [formData, setFormData] = useState();
	const [loadingState, setLoadingState] = useState("not_loaded");

	useEffect(() => {
		getFormData();
	}, []);
	const getFormData = async () => {
		console.log(activeDemographic, "activeDemographic");
		setFormData(activeDemographic?.form_data?.finalData);
		setLoadingState("loaded");
	};
	const onPost = (data) => {
		console.log("onPost", data.task_data);
	};

	return (
		<div className={styles.bootstrap}>
			<div className='App'>
				{loadingState === "not_loaded" && "whatever you want to be here"}
				{loadingState === "loading" && "loading"}
				{loadingState === "error" && "something went wrong"}
				{loadingState === "loaded" && (
					<ReactFormBuilder data={formData} onPost={onPost} />
				)}
			</div>
		</div>
	);
};

export default FormBuilderEdit;
