import React, { useEffect, useState } from "react";

import {
	Search,
	SearchIconWrapper,
	StyledPageInputBase,
} from "app/shared/SearchGlobal/style";

import {
	TextField,
	FormControlLabel,
	Pagination,
	Paper,
	Box,
	Button,
	Grid,
	Checkbox,
	Autocomplete,
	Chip,
	Input,
	Avatar,
	CircularProgress,
} from "@mui/material";

import { Add, Delete, Edit } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import {
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";

import { Color } from "@jumbo/constants/index";

import {
	constantStyles,
	StyledTableCell,
	StyledTableRow,
	CustomTextField,
	ModalStyle,
} from "../../../@jumbo/components/Styles/styles";

import { IconButton, Radio, RadioGroup } from "@material-ui/core";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "app/AppProvider";
import BasicModal from "@jumbo/components/Modal/modal";
import { LoadingButton, Masonry } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StyledField from "@jumbo/components/StyledButtonField";
import dayjs from "dayjs";
import {
	clientColumnsString,
	clientYupSchema,
} from "@jumbo/utils/constants/database";
import { Formik, Form, Field } from "formik";
import JumboTextFieldWithStyles from "@jumbo/components/JumboFormik/JumboTextFieldWithStyles";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { useSelector } from "react-redux";
import { supabase } from "../../../supabaseClient";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteAlert from "./DeleteAlert";
import { v4 as uuidv4 } from "uuid";
const CreateClient = (props) => {
	const { themeType } = useContext(AppContext);
	const useStyles = makeStyles(constantStyles(themeType));
	const classes = useStyles();
	const session = useSelector((state) => state.auth.session);
	const [loading, setLoading] = useState(false);
	const [logo, setLogo] = useState(null);
	const [logoUrl, setLogoUrl] = useState(null);

	const handleLogoChange = (e) => {
		if (e.target.files[0]) {
			setLogo(e.target.files[0]);
		}
	};

	const onClientCreate = async (postData) => {
		setLoading(true);
		postData["is_active"] = true;
		postData["logo_url"] = logoUrl;
		const { data, error } = await supabase
			.from("client")
			.insert(postData)
			.select();
		setLoading(false);
		props.handleClose();
		props.getClients();

		if (error) {
			console.log(error);
			setLoading(false);
			return;
		}
	};

	const uploadLogo = async () => {
		const { data, error } = await supabase.storage
			.from("wsp")
			.upload(`client/${uuidv4()}`, logo, {
				cacheControl: "3600",
				upsert: false,
			});
		setLogoUrl(
			`${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/wsp/${data.path}`
		);

		if (error) {

			console.error(error);

			return;
		}
	};

	return (
		<Box sx={ModalStyle}>
			<Grid container spacing={2}>
				<Grid item xs={10}>
					<h1>Create New Client</h1>
				</Grid>
				<Grid
					item
					xs={2}
					style={{ display: "flex", flexDirection: "row-reverse" }}
				>
					{" "}
					<IconButton style={{ height: "48px" }} onClick={props.handleClose}>
						<ClearIcon />
					</IconButton>
				</Grid>
			</Grid>
			<Formik
				validateOnChange={true}
				initialValues={{
					name: "",
					address: "",
					description: "",
					contact_person: "",
					total_workforce: "",
					phone: "",
					sites: [],
					departments: [],
					designations: [],
				}}
				validationSchema={clientYupSchema}
				onSubmit={(data, { setSubmitting }) => {
					console.log("first");
					setSubmitting(true);
					onClientCreate(data);
					setSubmitting(false);
				}}
			>
				{({ isSubmitting, setFieldValue, errors, values }) => (
					<Form noValidate autoComplete='off'>
						{console.log(errors)}
						{console.log(values)}
						<Masonry columns={2} spacing={2}>
							<Grid style={{ height: 83 }}>
								<p>Company Name</p>
								<JumboTextFieldWithStyles name='name' />
							</Grid>
							<Grid>
								<p>Description</p>
								<JumboTextFieldWithStyles
									name='description'
									multiline
									rows={7}
								/>
							</Grid>
							<Grid>
								<p style={{ paddingTop: "12px" }}>Address</p>
								<JumboTextField
									name='address'
									multiline
									rows={2}
									style={{
										color: "#383838",
										height: "40px",
										width: "90%",
									}}
									sx={{
										".MuiOutlinedInput-root": {
											borderRadius: "14px",
										},
									}}
								/>
							</Grid>
						</Masonry>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<p>Contact Person</p>
								<JumboTextFieldWithStyles name='contact_person' />
							</Grid>
							<Grid item xs={6}>
								<p>Total Workforce</p>
								<JumboTextFieldWithStyles
									name='total_workforce'
									type='number'
								/>
							</Grid>
							<Grid item xs={6}>
								<p>Phone</p>

								<JumboTextFieldWithStyles name='phone' type='number' />

							</Grid>
							<Grid item xs={6}>
								<p>Sites (Press Enter to add a new value)</p>
								{/* <CustomTextField /> */}
								<Autocomplete
									freeSolo
									multiple
									options={[]}
									clearIcon={false}
									onChange={(event, newValue) => {
										setFieldValue("sites", newValue);
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => (
											<Chip
												variant='outlined'
												label={option}
												{...getTagProps({ index })}
											/>
										))
									}
									renderInput={(params) => (
										<CustomTextField
											{...params}
											label=''
											InputProps={{
												...params.InputProps,
												type: "search",
											}}
										/>
									)}
								/>
							</Grid>

							<Grid item xs={6}>
								<p>Department (Press Enter to add a new value)</p>
								<Autocomplete
									freeSolo
									multiple
									options={[]}
									clearIcon={false}
									onChange={(event, newValue) => {
										setFieldValue("departments", newValue);
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => (
											<Chip
												variant='outlined'
												label={option}
												{...getTagProps({ index })}
											/>
										))
									}
									renderInput={(params) => (
										<CustomTextField
											{...params}
											label=''
											InputProps={{
												...params.InputProps,
												type: "search",
											}}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<p>Designation (Press Enter to add a new value)</p>
								<Autocomplete
									freeSolo
									multiple
									options={[]}
									clearIcon={false}
									onChange={(event, newValue) => {
										setFieldValue("designations", newValue);
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => (
											<Chip
												variant='outlined'
												label={option}
												{...getTagProps({ index })}
											/>
										))
									}
									renderInput={(params) => (
										<CustomTextField
											{...params}
											label=''
											InputProps={{
												...params.InputProps,
												type: "search",
											}}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<p>Logo Update</p>
								{/* <StyledField
									value={logo}
									onChange={handleLogoChange}
									onClick={() => uploadLogo(logo)}
								/> */}
								<div className={"fileUpload"}>
									<Input
										className={classes.uploadField}
										type='file'
										onChange={handleLogoChange}
									/>
									<Button
										className={classes.uploadButton}
										variant='contained'
										onClick={() => uploadLogo()}
									>
										Upload
									</Button>
								</div>
								{logoUrl && (
									<Avatar
										alt='Company logo'
										src={logoUrl}
										sx={{ width: 200, height: 200 }}
									/>
								)}
							</Grid>
							<Grid
								item
								xs={12}
								style={{ display: "flex", flexDirection: "row-reverse" }}
							>
								<LoadingButton
									fullWidth
									type='submit'
									loading={isSubmitting}
									className={classes.button2}
									// style={{
									//   backgroundColor: "#FF372F",
									// }}
									disabled={loading}
								>
									CREATE
								</LoadingButton>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</Box>
	);
};
const EditClient = (props) => {
	const { themeType } = useContext(AppContext);
	const useStyles = makeStyles(constantStyles(themeType));
	const classes = useStyles();
	const session = useSelector((state) => state.auth.session);
	const [loading, setLoading] = useState(false);
	const [logo, setLogo] = useState(null);
	const [logoUrl, setLogoUrl] = useState(props.activeClient.logo_url);

	const handleLogoChange = (e) => {
		setLogo(e.target.files[0]);
	};

	const uploadLogo = async () => {
		setLoading(true);
		const { data, error } = await supabase.storage
			.from("wsp")
			.upload(`client/${uuidv4()}`, logo, {
				cacheControl: "3600",
			});
		setLogoUrl(
			`${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/wsp/${data.path}`
		);
		setLoading(false);
		if (error) {
			setLoading(false);
			console.log(error);
			return;
		}
		console.log(data);
	};

	const onClientEdit = async (postData) => {
		setLoading(true);
		postData.logo_url = logoUrl;
		const { error } = await supabase
			.from("client")
			.update(postData)
			.eq("id", props.activeClient.id);
		setLoading(false);
		props.handleClose();
		props.getClients();
		if (error) {
			console.log(error);
			setLoading(false);
			return;
		}
	};
	return (
		<Box sx={ModalStyle}>
			<Grid container spacing={2}>
				<Grid item xs={10}>
					<h1>Edit Client</h1>
				</Grid>
				<Grid
					item
					xs={2}
					style={{ display: "flex", flexDirection: "row-reverse" }}
				>
					<IconButton style={{ height: "48px" }} onClick={props.handleClose}>
						<ClearIcon />
					</IconButton>
				</Grid>
			</Grid>
			<Formik
				validateOnChange={true}
				initialValues={props.activeClient}
				validationSchema={clientYupSchema}
				onSubmit={(data, { setSubmitting }) => {
					console.log("first");
					setSubmitting(true);
					onClientEdit(data);
					setSubmitting(false);
				}}
			>
				{({ isSubmitting, setFieldValue, errors, values }) => (
					<Form noValidate autoComplete='off'>
						{console.log(errors)}
						{console.log(values)}
						<Masonry columns={2} spacing={2}>
							<Grid style={{ height: 83 }}>
								<p>Company Name</p>
								<JumboTextFieldWithStyles name='name' />
							</Grid>
							<Grid>
								<p>Description</p>
								<JumboTextFieldWithStyles
									name='description'
									multiline
									rows={7}
								/>
							</Grid>
							<Grid>
								<p>Address</p>
								<JumboTextField
									name='address'
									multiline
									rows={2}
									style={{
										color: "#383838",
										height: "40px",
										width: "90%",
									}}
									sx={{
										".MuiOutlinedInput-root": {
											borderRadius: "14px",
										},
									}}
								/>
							</Grid>
						</Masonry>
						<Grid container spacing={2} style={{ marginTop: "2em" }}>
							<Grid item xs={6}>
								<p>Contact Person</p>
								<JumboTextFieldWithStyles name='contact_person' />
							</Grid>
							<Grid item xs={6}>
								<p>Total Workforce</p>
								<JumboTextFieldWithStyles name='total_workforce' />
							</Grid>
							<Grid item xs={6}>
								<p>Phone</p>
								<JumboTextFieldWithStyles name='phone' />
							</Grid>
							<Grid item xs={6}>
								<p>Sites (Press Enter to add a new value)</p>
								{/* <CustomTextField /> */}
								<Autocomplete
									freeSolo
									multiple
									options={[]}
									defaultValue={props.activeClient.sites}
									clearIcon={false}
									onChange={(event, newValue) => {
										setFieldValue("sites", newValue);
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => (
											<Chip
												variant='outlined'
												label={option}
												{...getTagProps({ index })}
											/>
										))
									}
									renderInput={(params) => (
										<CustomTextField
											{...params}
											label=''
											InputProps={{
												...params.InputProps,
												type: "search",
											}}
										/>
									)}
								/>
							</Grid>

							<Grid item xs={6}>
								<p>Department (Press Enter to add a new value)</p>
								<Autocomplete
									freeSolo
									multiple
									options={[]}
									defaultValue={props.activeClient.departments}
									clearIcon={false}
									onChange={(event, newValue) => {
										setFieldValue("departments", newValue);
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => (
											<Chip
												variant='outlined'
												label={option}
												{...getTagProps({ index })}
											/>
										))
									}
									renderInput={(params) => (
										<CustomTextField
											{...params}
											label=''
											InputProps={{
												...params.InputProps,
												type: "search",
											}}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<p>Designation (Press Enter to add a new value)</p>
								<Autocomplete
									freeSolo
									multiple
									options={[]}
									clearIcon={false}
									defaultValue={props.activeClient.designations}
									onChange={(event, newValue) => {
										setFieldValue("designations", newValue);
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => (
											<Chip
												variant='outlined'
												label={option}
												{...getTagProps({ index })}
											/>
										))
									}
									renderInput={(params) => (
										<CustomTextField
											{...params}
											label=''
											InputProps={{
												...params.InputProps,
												type: "search",
											}}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<p>Logo Upload</p>
								{/* <StyledField /> */}
								<div className={"fileUpload"}>
									<Input
										className={classes.uploadField}
										type='file'
										onChange={handleLogoChange}
										// style={{
										//   color: "#383838",
										//   height: "56px",
										//   width: "70%",
										// }}
									/>
									<Button
										className={classes.uploadButton}
										variant='contained'
										onClick={() => uploadLogo()}
									>
										Upload
									</Button>
								</div>
								{loading ? (
									<CircularProgress
										style={{
											marginTop: "1em",
											marginLeft: "1em",
										}}
									/>
								) : (
									<Avatar
										alt='Company logo'
										src={logoUrl}
										sx={{ width: 200, height: 200 }}
									/>
								)}
							</Grid>
							<Grid
								item
								xs={12}
								style={{ display: "flex", flexDirection: "row-reverse" }}
							>
								<LoadingButton
									fullWidth
									type='submit'
									loading={isSubmitting}
									className={classes.button2}
									// style={{
									//   backgroundColor: "#FF372F",
									// }}
									disabled={loading}
								>
									UPDATE
								</LoadingButton>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

const Management = ({ sx }) => {
	const { themeType } = useContext(AppContext);
	const useStyles = makeStyles(constantStyles(themeType));
	const classes = useStyles();

	const [page, setPage] = React.useState(1);
	const [count, setCount] = useState(0);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);

	const [activeClient, setActiveClient] = useState({});
	const [openAlert, setOpenAlert] = React.useState(false);
	const handleOpenAlert = (id) => {
		const activeClient = client.find((client) => client.id === id);
		setActiveClient(activeClient);
		setOpenAlert(true);
	};
	const handleCloseAlert = () => setOpenAlert(false);
	const handleAlertOnSuccess = async () => {
		console.log("success");
		console.log(activeClient);
		await deleteClient(activeClient.id);
	};
	const [client, setClient] = useState([]);

	const getClients = async () => {
		try {
			let { count, data, error, status } = await supabase
				.from("client")
				.select(clientColumnsString, { count: "exact" })
				.filter("is_active", "eq", true)
				.order("created_at", { ascending: false })
				.range((page - 1) * 5, page * 5 - 1);
			if (error && status !== 406) {
				throw error;
			}

			if (data && Array.isArray(data)) {
				setClient(data);
				setCount(count);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const deleteClient = async (id) => {
		try {
			const { error } = await supabase
				.from("client")
				.update({ is_active: false })
				.match({ id });
			if (error) {
				throw error;
			}

			getClients();
			handleCloseAlert();
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getClients();
	}, [page]);

	const editClientOpen = (id) => {
		const activeClient = client.find((client) => client.id === id);
		setActiveClient(activeClient);
		setOpenEdit(true);
	};

	return (
		<>
			<DeleteAlert
				open={openAlert}
				setOpen={setOpenAlert}
				onSuccess={handleAlertOnSuccess}
			/>
			{/* Client Management Page */}
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={1} columns={12}>
					{/* Top section */}
					<Grid item xs={6} style={{ paddingTop: 0, marginTop: "20px" }}>
						<div>
							<h1 className={classes.heading1}>Client Management</h1>
							<p style={{ marginTop: 0 }}>Lorem ipsum dolor sit amet</p>
						</div>
					</Grid>
					<Grid item xs={6} className={classes.searchBarGrid}>
						<Search style={{ paddingRight: "3%" }}>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>

							<StyledPageInputBase
								placeholder='Search anything'
								inputProps={{ "aria-label": "search" }}
							/>
						</Search>{" "}
						<IconButton className={classes.button} onClick={handleOpen}>
							<Add className={classes.buttonIcon} />
							Add New Client
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

									<StyledTableCell align='left'> Company Name</StyledTableCell>

									<StyledTableCell
										align='center'
										style={{ borderTopRightRadius: "14px" }}
									>
										Actions
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{client.map((row, i) => (
									<StyledTableRow key={row.id}>
										<StyledTableCell>
											<Checkbox className={classes.checkBox} />
										</StyledTableCell>
										<StyledTableCell component='th' scope='row'>
											<div className={classes.tableCell}>
												<p>{row.name}</p>
											</div>
										</StyledTableCell>

										<StyledTableCell align='center'>
											<IconButton onClick={() => editClientOpen(row.id)}>
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
							from <b> {count}</b> Clients
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
				<CreateClient handleClose={handleClose} getClients={getClients} />
			</BasicModal>
			<BasicModal open={openEdit}>
				<EditClient
					handleClose={handleCloseEdit}
					activeClient={activeClient}
					getClients={getClients}
				/>
			</BasicModal>
		</>
	);
};

export default Management;
