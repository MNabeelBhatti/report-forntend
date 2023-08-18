import React from "react";

import { Autocomplete, Button, Grid, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";

import { Add, Delete, Edit } from "@mui/icons-material";

import TextField from "@mui/material/TextField";

import SimpleAccordions from "@jumbo/components/Accordian/simpleAccordian";

import {
	constantStyles,
	SurveyStyledTableCell,
	StyledTableRow,
	CustomTextField,
	ModalStyle,
} from "../../../../@jumbo/components/Styles/styles";
import { Pagination, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { IconButton } from "@material-ui/core";
import { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { AppContext } from "app/AppProvider";
import AirbnbSwitchStyle from "../../../../@jumbo/components/Switch/switch";
import BasicModal from "@jumbo/components/Modal/modal";
import ClearIcon from "@mui/icons-material/Clear";
import StylledFeild from "@jumbo/components/StyledButtonField";
import {
	clientYupSchema,
	ruleYupSchema,
	validateQuestionPostData,
} from "@jumbo/utils/constants/database";
import { supabase } from "supabaseClient";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const CreateQuestion = ({ handleClose, getQuestionPools }) => {
	const { themeType } = useContext(AppContext);
	const useStyles = makeStyles(constantStyles(themeType));
	const classes = useStyles();
	const [question, setQuestion] = React.useState("");
	const [category, setCategory] = React.useState("");
	const [status, setStatus] = React.useState(false);
	const [rules, setRules] = React.useState([]);
	const [categories, setCategories] = React.useState([]);
	const onRuleCreate = (values, formikBag) => {
		setRules((currentRules) => [...currentRules, values]);
	};
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const getCategories = async () => {
		try {
			const { data, error } = await supabase
				.from("category")
				.select("*")
				.filter("is_active", "eq", true);
			if (error) {
				throw error;
			}
			setCategories(data);
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		getCategories();
	}, []);

	const onRuleDelete = (index) => {
		setRules(rules.filter((rule, i) => i !== index));
	};

	const onQuestionCreate = async () => {
		try {
			const postObject = {
				question,
				category,
				status,
				is_active: true,
				rule_array: { rules },
			};

			await createQuestion(postObject);
		} catch (error) {
			console.log(error);
		}
	};

	const createQuestion = async (postData) => {
		if (question === "") {
			setError("Question is required");
			return;
		}

		try {
			setLoading(true);
			const { error } = await supabase.from("question").insert(postData);
			setLoading(false);
			if (error) {
				setLoading(false);
				throw error;
			}
			getQuestionPools();
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	const theme = createTheme({
		components: {
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						borderRadius: 14,
						"&:active .MuiOutlinedInput-notchedOutline": {
							borderColor: "#7451c5",
						},
					},
				},
			},
		},
	});
	const AutocompleteStyles = makeStyles((theme) => ({
		endAdornment: {
			//   display: "none",
			top: "5px",
		},
	}));
	const autocompleteStyles = AutocompleteStyles();

	return (
		<Box sx={ModalStyle}>
			<Grid container spacing={2}>
				<Grid item xs={10}>
					<h1>Add New Question</h1>
				</Grid>
				<Grid
					item
					xs={2}
					style={{ display: "flex", flexDirection: "row-reverse" }}
				>
					{" "}
					<IconButton style={{ height: "48px" }} onClick={handleClose}>
						<ClearIcon />
					</IconButton>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<p>Question </p>
				</Grid>
				<Grid item xs={8}>
					<p>Category</p>
				</Grid>
				<Grid item xs={4}>
					<CustomTextField
						onChange={(e) => {
							setQuestion(e.target.value);
							setError(null);
						}}
						value={question}
					/>
					{error && <p style={{ color: "red" }}>{error}</p>}
				</Grid>
				<ThemeProvider theme={theme}>
					<Grid item xs={4}>
						<Autocomplete
							classes={autocompleteStyles}
							id='combo-box-demo'
							options={categories}
							getOptionLabel={(option) => option.name}
							style={{ width: "100%" }}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Select Category'
									variant='outlined'
								/>
							)}
							onChange={(event, newValue) => {
								setCategory(newValue.id);
							}}
						/>
					</Grid>
				</ThemeProvider>
				<Grid item xs={3} style={{ display: "flex" }}>
					<p style={{ paddingRight: "4%" }}>Status</p>
					<AirbnbSwitchStyle
						onClick={() => setStatus(!status)}
						value={status}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={11.5}>
					{rules.map((rule, index) => {
						const title = `Rule #${index + 1} - ${rule.name} - ${rule.min}% - ${rule.max
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
								<Button className={classes.button2} onClick={onQuestionCreate}>
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

export default CreateQuestion;
