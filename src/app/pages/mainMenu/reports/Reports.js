import React, { useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  Search,
  SearchIconWrapper,
  StyledPageInputBase,
} from "app/shared/SearchGlobal/style";
import Masonry from "@mui/lab/Masonry";
import ClearIcon from "@mui/icons-material/Clear";

import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import { Add, Delete, Edit, FileDownload, Mail } from "@mui/icons-material";

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

import {
  constantStyles,
  SurveyStyledTableCell,
  StyledTableRow,
  CustomTextField,
} from "../../../../@jumbo/components/Styles/styles";
import { Pagination, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { IconButton, Radio, RadioGroup } from "@material-ui/core";
import { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { AppContext } from "app/AppProvider";
import BasicModal from "@jumbo/components/Modal/modal";
import StylledFeild from "@jumbo/components/StyledButtonField";
import CreateReport from "./CreateReport.js";
import { supabase } from "supabaseClient";


const Reports = ({ sx }) => {
  const { themeType } = useContext(AppContext);
  const useStyles = makeStyles(constantStyles(themeType));
  const classes = useStyles();

  const [page, setPage] = React.useState(1);
  const [value, setValue] = React.useState(dayjs("2022-04-07"));
  const [open, setOpen] = React.useState(false);
  const [reports, setReports] = React.useState([]);
  const [report, setReport] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
	const getReports = async () => {
		try {
			const { data, error } = await supabase
				.from("reports")
				.select("*")
			if (error) {
				throw error;
			}
      console.log(data);
			setReports(data);
		} catch (error) {
			console.log(error);
		}
	};

  useEffect(()=>{
    getReports();
    
  },[])
  return (
    <>
      {/* Reports Page */}

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} columns={12}>
          {/* Top section */}
          <Grid item xs={6} style={{ paddingTop: 0, marginTop: "20px" }}>
            <div>
              <h1 className={classes.heading1}>Reports</h1>
            </div>
          </Grid>
          <Grid item xs={6} justifyContent='flex-end' className={classes.searchBarGrid}>
            <IconButton className={classes.button} onClick={()=>{
              setReport(null);
              handleOpen();
            }}>
              <Add className={classes.buttonIcon} />
              Create New Report
            </IconButton>{" "}
          </Grid>
        </Grid>

        {/* List  */}

        <Grid item xs={12} className={classes.listGrid}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <SurveyStyledTableCell
                    style={{ borderTopLeftRadius: "14px", width: "14px" }}
                  >
                    <Checkbox className={classes.checkBox} />
                  </SurveyStyledTableCell>

                  <SurveyStyledTableCell align="left">
                    {" "}
                    Title
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell align="left">
                    {" "}
                    Genrated Date
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell align="left">
                    {" "}
                    Status
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell align="center">
                    {" "}
                    Share
                  </SurveyStyledTableCell>

                  <SurveyStyledTableCell
                    align="center"
                    style={{ borderTopRightRadius: "14px" }}
                  >
                    Actions
                  </SurveyStyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {reports.map((item,i)=>{
                   return (
                    <StyledTableRow key={`row-${i}`}>
                    <SurveyStyledTableCell>
                      <Checkbox className={classes.checkBox} />
                    </SurveyStyledTableCell>
                    <SurveyStyledTableCell component="th" scope="row">
                      <div className={classes.tableCell}>
                        <p>{item?.title}</p>
                      </div>
                    </SurveyStyledTableCell>
                    <SurveyStyledTableCell component="th" scope="row">
                      <p>{item?.created_at}</p>
                    </SurveyStyledTableCell>
                    <SurveyStyledTableCell component="th" scope="row">
                      <div className={classes.tableCell}>
                        <p>Published</p>
                      </div>
                    </SurveyStyledTableCell>
                    <SurveyStyledTableCell align="center">
                      {/* <Link to={`/user/edit/${item._id}`}> */}
                      {/* <Tooltip title="Edit"> */}
                      <IconButton>
                        <Mail style={{ color: Color.GREY400 }} />
                      </IconButton>
                      {/* </Tooltip> */}
                      {/* </Link> */}
                      {/* <Tooltip title="Delete"> */}
                      <IconButton
                      // onClick={() => deleteUser(item._id)}
                      >
                        <FileDownload style={{ color: Color.GREY400 }} />
                      </IconButton>
                      {/* </Tooltip> */}
                    </SurveyStyledTableCell>
  
                    <SurveyStyledTableCell align="center">
                      {/* <Link to={`/user/edit/${item._id}`}> */}
                      {/* <Tooltip title="Edit"> */}
                      <IconButton onClick={()=>{
                          setReport({...item,isNew:false});
                          handleOpen();
                      }}>
                        <Edit style={{ color: Color.GREY400 }} />
                      </IconButton>
                      {/* </Tooltip> */}
                      {/* </Link> */}
                      {/* <Tooltip title="Delete"> */}
                      <IconButton
                      // onClick={() => deleteUser(item._id)}
                      >
                        <Delete style={{ color: Color.GREY400 }} />
                      </IconButton>
                      {/* </Tooltip> */}
                    </SurveyStyledTableCell>
                  </StyledTableRow>
                   )
                  })}
               
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Grid item xs={12} className={classes.paginationGrid}>
            <p>
              Showing <b>{page}-5 </b>from <b>{reports.length}</b> Reports
            </p>

            <Pagination
              count={5}
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
        <CreateReport handleClose={handleClose} updateReport={report} />
      </BasicModal>
    </>
  );
};

export default Reports;
