import axios from "../axios";
import React from "react";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
import "../CSS/formbuilderpreviewresult.css";
import "../CSS/app.css";

import ModalFormBuilder from "./ModalFormBuilder";

import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import PageLoader from "@jumbo/components/PageComponents/PageLoader";
import styles from "../Styles/foo.module.scss";

const FormBuilderDemoBarSubmitPreview = (props) => {
	const [finalData, setFinalData] = useState([]);
	const [answerData, setAnswerData] = useState([]);
	const [previewVisible, setPreviewVisible] = useState(true);
	const [signature, setSignature] = useState("");
	const [loading, setLoading] = useState("");
	const [formName, setFormName] = useState("");
	const [signatureBase64, setSignatureBase64] = useState("");
	const { user } = useSelector((state) => ({ ...state }));
	const _onUpdate = _onChange;
	let { id, formId } = useParams();
	useEffect(() => {
		getFormData();
		getFormAnswerData();
		ElementStore.subscribe((state) => _onUpdate(state.data));
	}, []);
	document.addEventListener("message", handleEvent);
	function handleEvent(message) {
		setSignatureBase64(message.data.message);
	}
	const getFormData = async () => {
		try {
			setLoading("loading");
			const { data } = await axios.get(`/formbuilder/${formId}`);
			if (data) {
				setFormName(data.formName);
				setFinalData(data.formData);
			}
		} catch (e) {
			setLoading("error");
			console.log(e);
		}
	};
	const getFormAnswerData = async () => {
		try {
			setLoading("loading");
			const { data } = await axios.get(`/getSingleForm/${id}`);
			if (data) {
				setAnswerData(data.form && data.form.formData);
				setSignature(data.form && data.form.signature);
				setLoading("loaded");
			}
		} catch (e) {
			setLoading("error");
			console.log(e);
		}
	};

	function _onChange(data) {
		console.log("onChange", data);
	}

	let modalClass = "modal";
	if (previewVisible) {
		modalClass += " show d-block";
	}

	return (
		<div className={styles.bootstrap}>
			<div className='clearfix' style={{ margin: "10px", width: "70%" }}>
				{loading === "loading" && (
					<div
						style={{
							backgroundColor: "rgba(0,0,0,0.6)",
							position: "absolute",
							top: 0,
							left: 0,
							zIndex: 100,
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							transition: "0.2s ease",
						}}
					>
						<PageLoader />
					</div>
				)}
				{loading === "loaded" && (
					<ModalFormBuilder open={previewVisible} setOpen={setPreviewVisible}>
						<div className={modalClass}>
							<div className='modal-dialog'>
								<div
									className='modal-content'
									style={{
										position: "fixed",
										overflow: "auto",
										height: "100%",
										width: "30%",
										marginLeft: "-2%",
									}}
								>
									<p style={{ margin: 10, fontSize: 26, fontWeight: 900 }}>
										{formName}
									</p>
									<ReactFormGenerator
										data={finalData}
										read_only
										answer_data={answerData}
										onSubmit={() => {}}
										submitButton={<></>}
									/>
								</div>
							</div>
						</div>
					</ModalFormBuilder>
				)}
			</div>
		</div>
	);
};

export default FormBuilderDemoBarSubmitPreview;
