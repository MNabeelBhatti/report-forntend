import React, { useEffect, useState } from "react";
import PageContainer from "@jumbo/components/PageContainer/pageContainer";
import GridContainer from "@jumbo/components/GridContainer/gridContainer";
// import IntlMessages from "../../../@jumbo/utils/IntlMessages";
import Grid from "@material-ui/core/Grid";
import CmtCard from "@jumbo/components/CmtCard/CmtCard";
import CmtCardContent from "@jumbo/components/CmtCard/CmtCardContent";
import { useSelector } from "react-redux";
// import PageLoader from "@jumbo/components/PageComponents/PageLoader";
import { useContext } from "react";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
// import Featurelist from '../../../components/Featurelist';
// import SosPopup from 'components/SosPopup';
// import FormBuilder from 'components/FormBuilder';
// import FormBuilderDemoBar from 'components/FormBuilderDemoBar';

import FormBuilderDemoBar from "@jumbo/components/FormBuilder/FormBuilderDemoBar";
import FormBuilder from "@jumbo/components/FormBuilder/FormBuilder";
import { AppContext } from "app/AppProvider";
import { makeStyles } from "@material-ui/core/styles";

import "../../../../@jumbo/components/CSS/app.css";
import {
	constantStyles,
	ModalStyle,
	StyledTableCell,
	StyledTableRow,
} from "@jumbo/components/Styles/styles";
import { Box, Checkbox, IconButton, Pagination, Paper } from "@mui/material";
import {
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import ClearIcon from "@mui/icons-material/Clear";
import BasicModal from "@jumbo/components/Modal/modal";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Color } from "@jumbo/constants";
import FormBuilderEdit from "@jumbo/components/FormBuilder/FormBuilderEdit";

const EditDemographics = ({
	sx,
	handleCloseEdit,
	getDemographicData,
	activeDemographic,
}) => {
	const [btnState, setBtnState] = useState("");
	const [btnStateSub, setBtnStateSub] = useState("");
	const [groupName, setGroupName] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	// const { setThemeType, themeType } = useContext(AppContext);
	const { themeType } = useContext(AppContext);
	const useStyles = makeStyles(constantStyles(themeType));
	const classes = useStyles();

	const [page, setPage] = React.useState(1);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);

	return (
		<>
			<Box sx={ModalStyle}>
				<Grid container spacing={2}>
					<Grid item xs={10}>
						<h1>Demographics Name</h1>
					</Grid>
					<Grid
						item
						xs={2}
						style={{ display: "flex", flexDirection: "row-reverse" }}
					>
						{" "}
						<IconButton style={{ height: "48px" }} onClick={handleCloseEdit}>
							<ClearIcon />
						</IconButton>
					</Grid>
				</Grid>
				<PageContainer>
					{loading && (
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
							{/* <PageLoader /> */}
						</div>
					)}
					<GridContainer>
						<Grid item xs={12}>
							<CmtCard>
								<CmtCardContent>
									<FormBuilderDemoBar
										setLoading={setLoading}
										loading={loading}
										getDemographicData={getDemographicData}
										handleCloseEdit={handleCloseEdit}
										activeDemographic={activeDemographic}
									/>
									<FormBuilderEdit setLoading={setLoading} activeDemographic={activeDemographic} />
								</CmtCardContent>
							</CmtCard>
						</Grid>
					</GridContainer>
				</PageContainer>
			</Box>
		</>
	);
};

export default EditDemographics;
