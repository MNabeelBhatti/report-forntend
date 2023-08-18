import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
	Search,
	SearchIconWrapper,
	StyledPageInputBase,
} from "app/shared/SearchGlobal/style";

import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import { Add, Delete, Edit } from "@mui/icons-material";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Color } from "@jumbo/constants/index";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
import CreateQuestion from "./CreateQuestion";
import { supabase } from "supabaseClient";
import EditQuestion from "./EditQuestion";
import DeleteAlert from "app/pages/management/DeleteAlert";

const QuestionPools = ({ sx }) => {
	const { themeType } = useContext(AppContext);
	const useStyles = makeStyles(constantStyles(themeType));
	const classes = useStyles();
	const [page, setPage] = React.useState(1);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [questions, setQuestions] = React.useState([]);
	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [activeQuestion, setActiveQuestion] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const [count, setCount] = React.useState(0);

	const handleOpenAlert = (id) => {
		const activeQuestion = questions.find((question) => question.id === id);
		setActiveQuestion(activeQuestion);
		setOpenAlert(true);
	};

	const handleCloseAlert = () => {
		setOpenAlert(false);
	};

	const handleAlertOnSuccess = async () => {
		await deleteQuestion(activeQuestion.id);
	};

	const getQuestionPools = async () => {
		try {
			// get all question pools and also category
			setLoading(true);
			const { data, count, error } = await supabase
				.from("question")
				.select(`*, category(name)`, { count: "exact" })
				.eq("is_active", true)
				.order("created_at", { ascending: false })
				.range((page - 1) * 5, page * 5 - 1);
			if (data) {
				setQuestions(data);
				setCount(count);
			}
			setLoading(false);
			handleCloseAlert();
			if (error) throw error;
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	React.useEffect(() => {
		getQuestionPools();
	}, [page]);

	const editQuestionOpen = (id) => {
		const activeQuestion = questions.find((question) => question.id === id);
		console.log(activeQuestion);
		setActiveQuestion(activeQuestion);
		setOpenEdit(true);
	};

	const deleteQuestion = async (id) => {
		try {
			setLoading(true);
			const { error } = await supabase
				.from("question")
				.update({ is_active: false })
				.match({ id: id });
			setLoading(false);
			getQuestionPools();
			handleClose();
			if (error) throw error;
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<>
			<DeleteAlert
				open={openAlert}
				setOpen={setOpenAlert}
				onSuccess={handleAlertOnSuccess}
			/>
			{/* Question Pool Page */}
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={1} columns={12}>
					{/* Top Section */}
					<Grid item xs={10} style={{ paddingTop: 0, marginTop: "20px" }}>
						<div>
							<h1 className={classes.heading1}>Question Pool </h1>
						</div>
					</Grid>

					<Grid item xs={2} className={classes.topBarGrid}>
						<IconButton
							className={classes.button}
							style={{ width: "168px" }}
							onClick={handleOpen}
						>
							<Add className={classes.buttonIcon} />
							Add New Question
						</IconButton>{" "}
					</Grid>
				</Grid>

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
									<SurveyStyledTableCell
										style={{ borderTopLeftRadius: "14px", width: "14px" }}
									>
										<Checkbox className={classes.checkBox} />
									</SurveyStyledTableCell>

									<SurveyStyledTableCell align='left'>
										{" "}
										Questions
									</SurveyStyledTableCell>
									<SurveyStyledTableCell align='left'>
										{" "}
										Category
									</SurveyStyledTableCell>
									<SurveyStyledTableCell align='left'>
										{" "}
										Status
									</SurveyStyledTableCell>

									<SurveyStyledTableCell
										align='center'
										style={{ borderTopRightRadius: "14px" }}
									>
										Actions
									</SurveyStyledTableCell>
								</TableRow>
							</TableHead>
							{questions.map((question) => (
								<TableBody>
									<StyledTableRow>
										<SurveyStyledTableCell>
											<Checkbox className={classes.checkBox} />
										</SurveyStyledTableCell>
										<SurveyStyledTableCell component='th' scope='row'>
											<div
												className={classes.tableCell}
												style={{ width: "35rem" }}
											>
												<p>{question.question}</p>
											</div>
										</SurveyStyledTableCell>
										<SurveyStyledTableCell component='th' scope='row'>
											<p>{question.category?.name}</p>
										</SurveyStyledTableCell>
										<SurveyStyledTableCell component='th' scope='row'>
											<div className={classes.tableCell}>
												<AirbnbSwitchStyle
													value={question.status}
													disable={true}
												/>
											</div>
										</SurveyStyledTableCell>
										<SurveyStyledTableCell align='center'>
											<IconButton onClick={() => editQuestionOpen(question.id)}>
												<Edit style={{ color: Color.GREY400 }} />
											</IconButton>
											<IconButton onClick={() => handleOpenAlert(question.id)}>
												<Delete style={{ color: Color.GREY400 }} />
											</IconButton>
										</SurveyStyledTableCell>
									</StyledTableRow>
									<StyledTableRow></StyledTableRow>
								</TableBody>
							))}
						</Table>
					</TableContainer>
					{/* Pagination */}
					<Grid item xs={12} className={classes.paginationGrid}>
						<p>
							Showing{" "}
							<b>
								{page}-{Math.ceil(count / 5)}{" "}
							</b>
							from <b> {count}</b> Question Pools
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
				<CreateQuestion
					handleClose={handleClose}
					getQuestionPools={getQuestionPools}
				/>
			</BasicModal>
			<BasicModal open={openEdit}>
				<EditQuestion
					handleClose={handleCloseEdit}
					activeQuestion={activeQuestion}
					getQuestionPools={getQuestionPools}
				/>
			</BasicModal>
		</>
	);
};

export default QuestionPools;
