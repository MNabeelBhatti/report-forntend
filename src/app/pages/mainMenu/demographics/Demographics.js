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
import CreateDemographic from "./CreateDemographics";
import EditDemographic from "./EditDemographics";
import { supabase } from "supabaseClient";
import DeleteAlert from "app/pages/management/DeleteAlert";

const Demographics = ({ sx }) => {
	const [btnState, setBtnState] = useState("");
	const [btnStateSub, setBtnStateSub] = useState("");
	const [groupName, setGroupName] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	// const { setThemeType, themeType } = useContext(AppContext);
	const { themeType } = useContext(AppContext);
	const useStyles = makeStyles(constantStyles(themeType));
	const classes = useStyles();
	const [count, setCount] = useState(0);
	const [page, setPage] = React.useState(1);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);

	const [demographicData, setDemographicData] = useState([]);

	const [activeDemographic, setActiveDemographic] = useState({});

	const [openAlert, setOpenAlert] = React.useState(false);

	const handleOpenAlert = (id) => {
		const activeDemo = demographicData.filter((demo) => demo.id === id);
		setActiveDemographic(activeDemo[0]);
		setOpenAlert(true);
	};
	const handleCloseAlert = () => setOpenAlert(false);
	const handleAlertOnSuccess = async () => {
		await deleteDemographic(activeDemographic.id);
		setOpenAlert(false);
	};

	// get demographic data using supabase
	const getDemographicData = async () => {
		const { data, count, error } = await supabase
			.from("demographics")
			.select("*", { count: "exact" })
			.filter("is_active", "eq", true)
			.order("created_at", { ascending: false })
			.range((page - 1) * 5, page * 5 - 1);

		if (error) {
			console.log("error", error);
		} else {
			console.log("data", data);
			setDemographicData(data);
			setCount(count);
		}
	};

	useEffect(() => {
		getDemographicData();
	}, [page]);

	// using demograhic data
	const getActiveDemographic = async (id) => {
		const activeDemographic = demographicData.filter(
			(demographic) => demographic.id === id
		);
		setActiveDemographic(activeDemographic[0]);
		handleOpenEdit();
	};

	const deleteDemographic = async (id) => {
		const { error } = await supabase
			.from("demographics")
			.update({ is_active: false })
			.eq("id", id);
		if (error) {
			console.log("error", error);
		} else {
			getDemographicData();
		}
	};

	return (
		<>
			<DeleteAlert
				open={openAlert}
				setOpen={setOpenAlert}
				onSuccess={handleAlertOnSuccess}
			/>
			{/* Demographics Page */}
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={1} columns={12}>
					{/* Top section */}
					<Grid item xs={10} style={{ paddingTop: 0, marginTop: "20px" }}>
						<div>
							<h1 className={classes.heading1}>Demographics </h1>
						</div>
					</Grid>

					<Grid item xs={2} className={classes.topBarGrid}>
						<IconButton
							className={classes.button}
							style={{ width: "198px" }}
							onClick={handleOpen}
						>
							<Add className={classes.buttonIcon} />
							Add New Demographics
						</IconButton>{" "}
					</Grid>
				</Grid>

				{/* top Section End */}

				{/* List  */}

				<Grid item xs={12} className={classes.listGrid}>
					<TableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							size='small'
							aria-label='a dense table'
						>
							<TableHead>
								<TableRow>
									<StyledTableCell
										style={{ borderTopLeftRadius: "14px", width: "14px" }}
									></StyledTableCell>

									<StyledTableCell align='left'> Demographics</StyledTableCell>

									<StyledTableCell
										align='center'
										style={{ borderTopRightRadius: "14px" }}
									>
										Actions
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{demographicData.map((row) => (
									<StyledTableRow>
										<StyledTableCell>
											<Checkbox className={classes.checkBox} />
										</StyledTableCell>
										<StyledTableCell component='th' scope='row'>
											<div className={classes.tableCell}>
												<p>{row.form_name}</p>
											</div>
										</StyledTableCell>

										<StyledTableCell align='center'>
											<IconButton onClick={() => getActiveDemographic(row.id)}>
												<Edit style={{ color: Color.GREY400 }} />
											</IconButton>

											<IconButton onClick={() => handleOpenAlert(row.id)}>
												<Delete style={{ color: Color.GREY400 }} />
											</IconButton>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					{/* Pagination */}
					<Grid item xs={12} className={classes.paginationGrid}>
						<p>
							Showing{" "}
							<b>
								{page}-{Math.ceil(count / 5)}{" "}
							</b>
							from <b> {count}</b> Demographics
						</p>

						<Pagination
							count={Math.ceil(count / 5)}
							page={page}
							onChange={(event, value) => setPage(value)}
							style={{
								alignSelf: "flex-end",
							}}
							className={classes.pagination}
						/>
					</Grid>
				</Grid>
			</Box>
			<BasicModal open={open}>
				<CreateDemographic
					handleClose={handleClose}
					getDemographicData={getDemographicData}
				/>
			</BasicModal>
			<BasicModal open={openEdit}>
				<EditDemographic
					handleCloseEdit={handleCloseEdit}
					activeDemographic={activeDemographic}
				/>
			</BasicModal>
		</>
	);
};

export default Demographics;
