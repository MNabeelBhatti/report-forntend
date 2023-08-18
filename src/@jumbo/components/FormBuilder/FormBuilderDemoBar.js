// import "../CSS/formbuilderpreview.css";

// import axios from "../axios";
import React from "react";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
import "../CSS/formbuilderpreview.css";
import ModalFormBuilder from "./ModalFormBuilder";

import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import "../CSS/app.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../Styles/foo.module.scss";
import AirbnbSwitchStyle from "../Switch/switch";
import { supabase } from "supabaseClient";

//Switches
// const IOSSwitch = styled((SwitchProps) => (
//   <Switch
//     focusVisibleClassName=".Mui-focusVisible"
//     disableRipple
//     {...SwitchProps}
//   />
// ))(({ theme }) => ({
//   width: 42,
//   height: 26,
//   padding: 0,
//   marginLeft: 25,
//   marginRight: 35,
//   marginTop: 10,
//   float: "right",
//   "& .MuiSwitch-switchBase": {
//     padding: 0,
//     margin: 2,
//     transitionDuration: "300ms",
//     "&.Mui-checked": {
//       transform: "translateX(16px)",
//       color: "#fff",
//       "& + .MuiSwitch-track": {
//         backgroundColor: theme.palette.mode === "dark" ? "#000" : "#efbe3c",
//         opacity: 1,
//         border: 0,
//       },
//       "&.Mui-disabled + .MuiSwitch-track": {
//         opacity: 0.5,
//       },
//     },
//     "&.Mui-focusVisible .MuiSwitch-thumb": {
//       color: "#33cf4d",
//       border: "6px solid #fff",
//     },
//     "&.Mui-disabled .MuiSwitch-thumb": {
//       color:
//         theme.palette.mode === "light"
//           ? theme.palette.grey[100]
//           : theme.palette.grey[600],
//     },
//     "&.Mui-disabled + .MuiSwitch-track": {
//       opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
//     },
//   },
//   "& .MuiSwitch-thumb": {
//     boxSizing: "border-box",
//     width: 22,
//     height: 22,
//   },
//   "& .MuiSwitch-track": {
//     borderRadius: 26 / 2,
//     backgroundColor: theme.palette.mode === "light" ? "grey" : "grey",
//     opacity: 1,
//     transition: theme.transitions.create(["background-color"], {
//       duration: 500,
//     }),
//   },
// }));
const FormBuilderDemoBar = ({
	setLoading,
	loading,
	handleClose,
	handleCloseEdit,
	getDemographicData,
	activeDemographic,
}) => {
	const [finalData, setFinalData] = useState([]);
	const [previewVisible, setPreviewVisible] = useState(false);

	const [formName, setFormName] = useState("");
	const [update, setUpdate] = useState(false);
	const [error, setError] = useState(null);

	const _onUpdate = _onChange;

	useEffect(() => {
		if (activeDemographic) {
			setFormName(activeDemographic.form_name);
			setFinalData(activeDemographic.form_data.finalData);
			setUpdate(true);
		}

		ElementStore.subscribe((state) => _onUpdate(state.data));
	}, []);

	function showPreview() {
		setPreviewVisible(true);
	}

	function closePreview() {
		setPreviewVisible(false);
	}

	function _onChange(data) {
		setFinalData(data);
	}
	const saveForm = async () => {
		if (formName === "") {
			setError("Please enter form name");
			return;
		}

		setLoading(true);
		// write code to post json data to supabase
		const { data, error } = await supabase.from("demographics").insert({
			form_name: formName,
			form_data: { finalData },
			is_active: true,
		});
		setLoading(false);
		if (error) {
			console.error(error);
			setLoading(false);
		} else {
			setLoading(false);
		}
		handleClose();
		getDemographicData();
	};

	const updateForm = async () => {
		if (formName === "") {
			setError("Please enter form name");
			return;
		}
		setLoading(true);
		// write code to update json data to supabase
		const { data, error } = await supabase
			.from("demographics")

			.update({
				form_name: formName,
				form_data: { finalData },
			})
			.match({ id: activeDemographic.id });
		setLoading(false);
		if (error) {
			console.error(error);
			setLoading(false);
		}
		setLoading(false);
		handleCloseEdit();
		getDemographicData();
	};

	let modalClass = "modal";
	if (previewVisible) {
		modalClass += " show d-block";
	}

	return (
		<div className={styles.bootstrap}>
			<div
				className='clearfix'
				style={{ margin: "10px", width: "100%", marginBottom: "20px" }}
			>
				{error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}
				<div style={{ display: "flex" }}>
					<div style={{ width: "100%" }}>
						<TextField
							id='outlined-basic'
							label='Form Name'
							style={{
								// Make sure the border is always a nice consistent width
								borderWidth: 1,
								// Border color is determined by the value of the input
								borderColor: formName ? "green" : "red",
								// Make sure the border is rounded
								borderRadius: 4,
							}}
							value={formName}
							onChange={(e) => {
								setFormName(e.target.value);
								setError(null);
							}}
						/>

						<button
							className='btn btn-primary'
							style={{ marginLeft: "10px", height: 55 }}
							onClick={() => showPreview()}
						>
							Preview Form
						</button>
						<button
							disabled={loading}
							className='btn btn-primary'
							style={{ marginLeft: "10px", height: 55 }}
							onClick={() => (update ? updateForm() : saveForm())}
						>
							{!update ? "Save Form" : "Update Form"}
						</button>
					</div>
				</div>
				{previewVisible && (
					<ModalFormBuilder open={previewVisible} setOpen={setPreviewVisible}>
						<div className={modalClass}>
							<div className='modal-dialog'>
								<div className='modal-content'>
									<p style={{ margin: 10, fontSize: 16, fontWeight: 800 }}>
										{formName}
									</p>
									<ReactFormGenerator
										data={finalData}
										onSubmit={() => {}}
										submitButton={<></>}
									/>
									<div className='modal-footer'>
										<button
											type='button'
											className='btn btn-default'
											data-dismiss='modal'
											onClick={() => closePreview()}
										>
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
					</ModalFormBuilder>
				)}
			</div>
		</div>
	);
};

export default FormBuilderDemoBar;
