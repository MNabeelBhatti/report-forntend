import React, { useEffect, useState } from "react";

import {
	Search,
	SearchIconWrapper,
	StyledPageInputBase,
} from "app/shared/SearchGlobal/style";

import {
	Paper,
	Box,
	Button,
	Grid,
	Pagination,
	Stack,
	Typography,
	TextField,
	Checkbox,
	InputAdornment,
	Dialog,
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
	ModalStyle,
	CustomTextField,
} from "../../../../@jumbo/components/Styles/styles";

import { IconButton } from "@material-ui/core";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "app/AppProvider";
import BasicModal from "@jumbo/components/Modal/modal";
import SimpleAccordions from "@jumbo/components/Accordian/simpleAccordian";
import { Form, Formik } from "formik";
import {
	ruleYupSchema,
	validateCategoryPostData,
} from "@jumbo/utils/constants/database";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { supabase } from "supabaseClient";
import DeleteAlert from "app/pages/management/DeleteAlert";
import { useSelector } from "react-redux";

const CreateCategory = (props) => {
	const { themeType } = useContext(AppContext);
	const useStyles = makeStyles(constantStyles(themeType));
	const classes = useStyles();
	const [rules, setRules] = useState([]);
	const [categoryName, setCategoryName] = useState("");
	const onRuleCreate = (values, formikBag) => {
		setRules((currentRules) => [...currentRules, values]);
	};
	const onRuleDelete = (index) => {
		setRules((currentRules) => currentRules.filter((rule, i) => i !== index));
	};
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const createCategory = async (postObject) => {
		setLoading(true);
		const { error } = await supabase.from("category").insert(postObject);
		setLoading(false);

		if (error) {
			console.log("error", error);
			throw error;
		}
		props.handleClose();
		props.getCategories();
	};
	const onCategoryCreate = async () => {
		if (categoryName === "") {
			setError("Category name cannot be empty");
		}
		try {
			const postObject = {
				name: categoryName,
				rule_array: { rules },
				is_active: true,
			};
			const errors = await validateCategoryPostData(postObject);
			if (errors.length > 0) {
				throw errors;
			}
			await createCategory(postObject);
		} catch (error) {
			console.error(error);
		}
	};
	const _onCategoryChange = (e) => {
		setCategoryName(e.target.value);
		setError(null);
	};
	return (
		<Box sx={ModalStyle}>
			<Grid container spacing={2}>
				<Grid item xs={10}>
					<h1>Add New Category</h1>
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

			<Grid container spacing={2}>
				<Grid item xs={6}>
					<p>Category Name</p>
					<CustomTextField
						onChange={_onCategoryChange}
						value={categoryName}
						required={true}
					/>
					{error && <p style={{ color: "red" }}>{error}</p>}
				</Grid>

				<Grid
					item
					xs={12}
					style={{ paddingTop: "12px", paddingBottom: "12px" }}
				>
					<h2>Advanced Settings</h2>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={11.5}>
					{rules.map((rule, index) => {
						const title = `Rule #${index + 1} - ${rule.name} - ${rule.min}% - ${
							rule.max
						}%`;
						return (
							<SimpleAccordions
								key={index}
								title={title}
								description={rule.description}
								onDelete={() => onRuleDelete(index)}
							/>
						);
					})}
				</Grid>
			</Grid>
			<Formik
				validateOnChange={true}
				initialValues={{
					name: "",
					min: 0,
					max: 0,
					description: "",
				}}
				validationSchema={ruleYupSchema}
				onSubmit={(data, { setSubmitting, resetForm }) => {
					setSubmitting(true);
					onRuleCreate(data);
					// Reset Formik form
					resetForm({
						values: {
							// reset the form to its initial values
							name: "",
							min: 0,
							max: 0,
							description: "",
						},
						errors: {},
						touched: {},
						isValidating: false,
						isSubmitting: false,
					});
					setSubmitting(false);
				}}
			>
				{({ isSubmitting, errors, values }) => (
					<Form noValidate autoComplete='off'>
						<Grid container spacing={2} className={classes.ruleBox}>
							<Grid item xs={8}>
								<p>Rule Name </p>
							</Grid>
							<Grid item xs={2}>
								<p>Min Rule </p>
							</Grid>
							<Grid item xs={2}>
								<p>Max Rule </p>
								{/* <IconButton
                  style={{
                    height: "48px",
                    position: "absolute",
                    marginLeft: "15%",
                  }}
                >
                  <Add />
                </IconButton> */}
							</Grid>

							<Grid item xs={8}>
								<JumboTextField name='name' />
							</Grid>
							<Grid item xs={2}>
								<JumboTextField
									name='min'
									type={"number"}
									// Add a suffix to the input (%)
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>%</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={2}>
								<JumboTextField
									name='max'
									type={"number"}
									// Add a suffix to the input (%)
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>%</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<p> Description</p>
							</Grid>
							<Grid item xs={12}>
								<JumboTextField
									name='description'
									sx={{
										".MuiOutlinedInput-root": {
											borderRadius: "14px",
										},
									}}
									multiline
									rows={7}
									style={{
										color: "#383838",
										width: "99%",
									}}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								style={{
									paddingRight: "1%",
									paddingBottom: "10px",
									display: "flex",
									flexDirection: "row-reverse",
								}}
							>
								<IconButton
									className={classes.button2}
									style={{ backgroundColor: "#1E242B" }}
									type='reset'
								>
									Cancel
								</IconButton>
								<IconButton
									className={classes.button2}
									style={{ marginRight: "1%", backgroundColor: "#537898" }}
									type='submit'
								>
									Save
								</IconButton>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid
								item
								xs={11.5}
								style={{
									display: "flex",
									flexDirection: "row-reverse",
									paddingTop: "37px",
								}}
							>
								<Button
									className={classes.button2}
									onClick={onCategoryCreate}
									disabled={loading}
								>
									Create
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

const EditCategory = (props) => {
	const { themeType } = useContext(AppContext);
	const useStyles = makeStyles(constantStyles(themeType));
	const classes = useStyles();
	const [rules, setRules] = useState([]);
	const [categoryName, setCategoryName] = useState("");
	const onRuleCreate = (values, formikBag) => {
		setRules((currentRules) => [...currentRules, values]);
	};
	const onRuleDelete = (index) => {
		setRules((currentRules) => currentRules.filter((rule, i) => i !== index));
	};
	const [loading, setLoading] = useState(false);
	const _onCategoryChange = (e) => {
		setCategoryName(e.target.value);
	};

	// const createCategory = async (postObject) => {
	// 	const { error } = await supabase.from("category").insert(postObject);
	// 	if (error) {
	// 		throw error;
	// 	}
	// 	document.location.reload();
	// };

	// create a edit category function
	const editCategory = async (postObject) => {
		setLoading(true);
		const { data, error } = await supabase
			.from("category")
			.update(postObject)
			.eq("id", props.activeCategory.id);
		setLoading(false);
		props.handleClose();
		props.getCategories();
		if (error) {
			setLoading(false);
			console.log("error", error);
			throw error;
		}
	};

	const onCategoryEdit = async () => {
		try {
			const postObject = {
				name: categoryName,
				rule_array: { rules },
			};

			const errors = await validateCategoryPostData(postObject);
			if (errors.length > 0) {
				throw errors;
			}
			await editCategory(postObject);

			props.handleClose();
			props.getCategories();
		} catch (error) {
			console.error(error);
		}
	};

	const getCategory = async () => {
		const { data, error } = await supabase
			.from("category")
			.select("*")
			.eq("id", props.activeCategory.id);
		if (error) {
			throw error;
		}
		setCategoryName(data[0].name);
		setRules(data[0].rule_array.rules);
	};

	useEffect(() => {
		getCategory();
	}, []);

	return (
		<Box sx={ModalStyle}>
			<Grid container spacing={2}>
				<Grid item xs={10}>
					<h1>Edit Category</h1>
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

			<Grid container spacing={2}>
				<Grid item xs={6}>
					<p>Category Name</p>
					<CustomTextField onChange={_onCategoryChange} value={categoryName} />
				</Grid>

				<Grid
					item
					xs={12}
					style={{ paddingTop: "12px", paddingBottom: "12px" }}
				>
					<h2>Advanced Settings</h2>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={11.5}>
					{rules.map((rule, index) => {
						const title = `Rule #${index + 1} - ${rule.name} - ${rule.min}% - ${
							rule.max
						}%`;
						return (
							<SimpleAccordions
								key={index}
								title={title}
								description={rule.description}
								onDelete={() => onRuleDelete(index)}
							/>
						);
					})}
				</Grid>
			</Grid>
			<Formik
				validateOnChange={true}
				initialValues={{
					name: "",
					min: 0,
					max: 0,
					description: "",
				}}
				validationSchema={ruleYupSchema}
				onSubmit={(data, { setSubmitting, resetForm }) => {
					setSubmitting(true);
					onRuleCreate(data);
					// Reset Formik form
					resetForm({
						values: {
							// reset the form to its initial values
							name: "",
							min: 0,
							max: 0,
							description: "",
						},
						errors: {},
						touched: {},
						isValidating: false,
						isSubmitting: false,
					});
					setSubmitting(false);
				}}
			>
				{({ isSubmitting, errors, values }) => (
					<Form noValidate autoComplete='off'>
						<Grid container spacing={2} className={classes.ruleBox}>
							<Grid item xs={8}>
								<p>Rule Name </p>
							</Grid>
							<Grid item xs={2}>
								<p>Min Rule </p>
							</Grid>
							<Grid item xs={2}>
								<p>Max Rule </p>
								{/* <IconButton
                  style={{
                    height: "48px",
                    position: "absolute",
                    marginLeft: "15%",
                  }}
                >
                  <Add />
                </IconButton> */}
							</Grid>

							<Grid item xs={8}>
								<JumboTextField name='name' />
							</Grid>
							<Grid item xs={2}>
								<JumboTextField
									name='min'
									type={"number"}
									// Add a suffix to the input (%)
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>%</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={2}>
								<JumboTextField
									name='max'
									type={"number"}
									// Add a suffix to the input (%)
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>%</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<p> Description</p>
							</Grid>
							<Grid item xs={12}>
								<JumboTextField
									name='description'
									sx={{
										".MuiOutlinedInput-root": {
											borderRadius: "14px",
										},
									}}
									multiline
									rows={7}
									style={{
										color: "#383838",
										width: "99%",
									}}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								style={{
									paddingRight: "1%",
									paddingBottom: "10px",
									display: "flex",
									flexDirection: "row-reverse",
								}}
							>
								<IconButton
									className={classes.button2}
									style={{ backgroundColor: "#1E242B" }}
									type='reset'
								>
									Cancel
								</IconButton>
								<IconButton
									className={classes.button2}
									style={{ marginRight: "1%", backgroundColor: "#537898" }}
									type='submit'
								>
									Save
								</IconButton>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid
								item
								xs={11.5}
								style={{
									display: "flex",
									flexDirection: "row-reverse",
									paddingTop: "37px",
								}}
							>
								<Button className={classes.button2} onClick={onCategoryEdit}>
									Edit
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

const CategoryManagement = (sx) => {
	const { themeType } = useContext(AppContext);
	const useStyles = makeStyles(constantStyles(themeType));
	const classes = useStyles();
	const [page, setPage] = React.useState(1);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [count, setCount] = useState(0);

	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);

	const [categories, setCategories] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);

	const [openAlert, setOpenAlert] = React.useState(false);
	const handleOpenAlert = (id) => {
		const activeCategory = categories.find((cat) => cat.id === id);
		setActiveCategory(activeCategory);
		setOpenAlert(true);
	};
	const handleCloseAlert = () => setOpenAlert(false);
	const handleAlertOnSuccess = async () => {
		console.log("success");

		await deleteCategory(activeCategory.id);
	};

	// write get categories function here with pagination

	const getCategories = async () => {
		try {
			const { data, count, error, status } = await supabase
				.from("category")
				.select("*", { count: "exact" })
				.filter("is_active", "eq", true)
				.order("created_at", { ascending: false })
				.range((page - 1) * 5, page * 5 - 1);

			if (error && status !== 406) {
				throw error;
			}
			setCategories(data);
			setCount(count);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getCategories();
	}, [page]);

	const editCategoryOpen = (id) => {
		const activeCategory = categories.find((category) => category.id === id);
		console.log(activeCategory);
		setActiveCategory(activeCategory);
		setOpenEdit(true);
	};

	const deleteCategory = async (id) => {
		try {
			const { error } = await supabase
				.from("category")
				.update({ is_active: false })
				.match({ id });
			if (error) {
				throw error;
			}
			getCategories();
			handleCloseAlert();
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			{/* Category Management Page */}
			<DeleteAlert
				open={openAlert}
				setOpen={setOpenAlert}
				onSuccess={handleAlertOnSuccess}
			/>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={1} columns={12}>
					{/* Top Section */}
					<Grid item xs={6} style={{ paddingTop: 0, marginTop: "20px" }}>
						<div>
							<h1 className={classes.heading1}>Category Management</h1>
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
							Add New Category
						</IconButton>
					</Grid>
				</Grid>
				{/* Top Section End */}

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
									>
										<Checkbox className={classes.checkBox} />
									</StyledTableCell>

									<StyledTableCell align='left'> Category</StyledTableCell>

									<StyledTableCell
										align='center'
										style={{ borderTopRightRadius: "14px" }}
									>
										Actions
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{categories.map((category) => (
									<StyledTableRow>
										<StyledTableCell>
											<Checkbox className={classes.checkBox} />
										</StyledTableCell>
										<StyledTableCell component='th' scope='row'>
											<div className={classes.tableCell}>
												<p>{category.name}</p>
											</div>
										</StyledTableCell>

										<StyledTableCell align='center'>
											<IconButton onClick={() => editCategoryOpen(category.id)}>
												<Edit style={{ color: Color.GREY400 }} />
											</IconButton>

											<IconButton onClick={() => handleOpenAlert(category.id)}>
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
							from <b> {count}</b> Categories
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
					{/* Pagination End */}
				</Grid>
			</Box>
			<BasicModal open={open}>
				<CreateCategory
					handleClose={handleClose}
					getCategories={getCategories}
				/>
			</BasicModal>

			<BasicModal open={openEdit}>
				<EditCategory
					handleClose={handleCloseEdit}
					activeCategory={activeCategory}
					getCategories={getCategories}
				/>
			</BasicModal>
		</>
	);
};

export default CategoryManagement;
