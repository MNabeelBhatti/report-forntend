import React from "react";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "app/AppProvider";
import BasicModal from "@jumbo/components/Modal/modal";
import { Masonry } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AirbnbSwitchStyle from "@jumbo/components/Switch/switch";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import QR from "assets/QR.png";
import ChildCheckbox from "@jumbo/components/ChildCheckbox/childCheckbox";
import { Color } from "@jumbo/constants/index";

import { Add, Delete, Edit } from "@mui/icons-material";
import {
  FormGroup,
  Grid,
  Box,
  Paper,
  Checkbox,
  TextField,
  FormControlLabel,
  InputLabel,
  FormControl,
  Select,
  Pagination,
  Stack,
  Typography,
  MenuItem,
} from "@mui/material";

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
} from "@material-ui/core";

import {
  constantStyles,
  SurveyStyledTableCell,
  StyledTableRow,
  CustomTextField,
  ModalStyle,
} from "../../../../@jumbo/components/Styles/styles";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";

const Surveys = ({ sx }) => {
  const { themeType } = useContext(AppContext);
  const useStyles = makeStyles(constantStyles(themeType));
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [value, setValue] = React.useState(dayjs("2022-04-07"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const CreateSurvey = () => {
    return (
      <Box sx={ModalStyle}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <h1>Create New Survey</h1>
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
        <Masonry columns={2} spacing={2}>
          <Grid style={{ height: 83 }}>
            <p>Survey Name</p>
            <CustomTextField />
          </Grid>
          <Grid>
            <p>Added Questions</p>
            <TextField
              sx={{
                ".MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
              multiline
              rows={7}
              style={{
                color: "#383838",
                height: "137px",
                width: "92%",
              }}
            />
          </Grid>
          <Grid>
            <p>Company</p>
            <TextField
              sx={{
                ".MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
              multiline
              rows={2}
              style={{
                color: "#383838",
                height: "40px",
                width: "90%",
              }}
            />{" "}
          </Grid>
        </Masonry>
        <Grid container spacing={2} style={{ marginTop: "2em" }}>
          <Grid item xs={6}>
            <p>Start Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                // label="mm/dd/yy"
                openTo="year"
                views={["year", "month", "day"]}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <CustomTextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <p>Additional Question</p>

            <CustomTextField />
            <IconButton style={{ height: "48px" }}>
              <Add />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <p>End Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                // label="mm/dd/yy"
                openTo="year"
                views={["year", "month", "day"]}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <CustomTextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              paddingTop: "58px",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              className={classes.button5}
              style={{ backgroundColor: "#537898" }}
            >
              Save Draft{" "}
            </IconButton>
            <IconButton
              className={classes.button5}
              style={{ backgroundColor: "#1E242B" }}
            >
              Save{" "}
            </IconButton>
            <IconButton
              className={classes.button5}
              style={{ backgroundColor: "#FF372F" }}
            >
              Generate Url{" "}
            </IconButton>
            <IconButton
              className={classes.button5}
              style={{ backgroundColor: "#aaaaaa", color: "#1E242B" }}
            >
              Generate QR Code{" "}
            </IconButton>
          </Grid>
          <Grid item xs={3} style={{ display: "flex" }}>
            <p style={{ paddingRight: "10%" }}>Randomize ? </p>
            <AirbnbSwitchStyle />
          </Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={6}>
            <CustomTextField />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <p>Responses</p>
          </Grid>
          <Grid item xs={6}>
            <CustomTextField type="number" />
          </Grid>
          <Grid item xs={6}>
            <IconButton>
              <EmailIcon style={{ fontSize: "45px", color: "#000" }} />
            </IconButton>
            <IconButton>
              <TwitterIcon style={{ fontSize: "45px", color: "#000" }} />
            </IconButton>
            <IconButton>
              <WhatsAppIcon style={{ fontSize: "45px", color: "#000" }} />
            </IconButton>
          </Grid>
        </Grid>
        {/* Mansory */}

        <Masonry columns={2} spacing={2}>
          <Grid style={{ height: 83 }}>
            <p>Status</p>
            <FormControl
              style={{ width: "91%" }}
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                style={{ borderRadius: "14px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Company"
              >
                <MenuItem>Active</MenuItem>

                <MenuItem>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid style={{ display: "flex", alignItems: "flex-start" }}>
            <img src={QR} />
            <IconButton>
              <DownloadIcon style={{ fontSize: "45px", color: "#000" }} />
            </IconButton>
          </Grid>
          <Grid>
            <p>Demographics</p>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                justifyContent: " space-between",
                paddingRight: "7%",
                paddingLeft: "1%",
              }}
            >
              <FormControl
                // sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    style={{ paddingBottom: "12px" }}
                    control={<Checkbox name="gilad" />}
                    label="Gender"
                  />
                  <FormControlLabel
                    style={{ paddingBottom: "12px" }}
                    control={<Checkbox name="jason" />}
                    label="Name"
                  />

                  <ChildCheckbox style={{ paddingBottom: "12px" }} />
                </FormGroup>
              </FormControl>
              <FormControl
                // sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    style={{ paddingBottom: "12px" }}
                    control={<Checkbox name="gilad" />}
                    label="Designations"
                  />
                  <FormControlLabel
                    style={{ paddingBottom: "12px" }}
                    control={<Checkbox name="jason" />}
                    label="Age"
                  />
                </FormGroup>
              </FormControl>
              <FormControl
                // required sx={{ m: 3 }}
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    style={{ paddingBottom: "12px" }}
                    control={<Checkbox name="gilad" />}
                    label="Department"
                  />
                  <FormControlLabel
                    style={{ paddingBottom: "12px" }}
                    control={<Checkbox />}
                    label="Date Of Birth"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Masonry>
      </Box>
    );
  };

  return (
    <>
      {/* Survey Page */}

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} columns={12}>
          {/* top Section */}
          <Grid item xs={10} style={{ paddingTop: 0, marginTop: "20px" }}>
            <div>
              <h1 className={classes.heading1}>Surveys </h1>
            </div>
          </Grid>

          <Grid item xs={2} className={classes.topBarGrid}>
            <IconButton className={classes.button} onClick={handleOpen}>
              <Add className={classes.buttonIcon} />
              Add New Survey
            </IconButton>{" "}
          </Grid>
        </Grid>

        {/* Selector Start */}
        <Grid container spacing={1} columns={12}>
          <Grid item xs={2}>
            <p style={{}}>Start Date </p>
          </Grid>
          <Grid item xs={6}>
            <p style={{}}>End Date </p>
          </Grid>
          <Grid item xs={2}>
            <p style={{}}>Select Company </p>
          </Grid>
        </Grid>

        <Grid container spacing={1} columns={12}>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                // label="mm/dd/yy"
                openTo="year"
                views={["year", "month", "day"]}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <CustomTextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                // label="mm/dd/yy"
                openTo="year"
                views={["year", "month", "day"]}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <CustomTextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} style={{ alignSelf: "center" }}>
            <FormControlLabel
              className={classes.checkBoxForm}
              control={<Checkbox className={classes.checkBox} />}
              label="Completed "
            />
            <FormControlLabel
              className={classes.checkBoxForm}
              control={<Checkbox className={classes.checkBox} />}
              label="Pending"
            />
            <FormControlLabel
              className={classes.checkBoxForm}
              control={<Checkbox className={classes.checkBox} />}
              label="Started"
            />
            <FormControlLabel
              className={classes.checkBoxForm}
              control={<Checkbox className={classes.checkBox} />}
              label="On Hold"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Company</InputLabel>
              <Select
                style={{ borderRadius: "14px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Company"
              ></Select>
            </FormControl>{" "}
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <IconButton
              className={classes.button3}
              style={{ backgroundColor: Color.GREY500 }}
              // onClick={handleChange}
            >
              Search{" "}
            </IconButton>{" "}
            <IconButton
              className={classes.button3}
              style={{ backgroundColor: Color.BLUE }}

              // onClick={handleChange}
            >
              Export{" "}
            </IconButton>{" "}
          </Grid>
        </Grid>

        {/* Selector  End */}

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
                    Surveys
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell align="left">
                    {" "}
                    Client
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell align="left">
                    {" "}
                    Start
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell align="left">
                    {" "}
                    End
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell align="left">
                    {" "}
                    Responses
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell align="left">
                    {" "}
                    Status
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
                <StyledTableRow>
                  <SurveyStyledTableCell>
                    <Checkbox className={classes.checkBox} />
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>Survey 1</p>
                    </div>
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <p>ABC Pvt Ltd</p>
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>DEC 20 2022</p>
                    </div>
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>DEC 20 2023</p>
                    </div>
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>30 / 90</p>
                    </div>
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>Running</p>
                    </div>
                  </SurveyStyledTableCell>

                  <SurveyStyledTableCell align="center">
                    {/* <Link to={`/user/edit/${item._id}`}> */}
                    {/* <Tooltip title="Edit"> */}
                    <IconButton>
                      <Edit style={{ color: "#1E242B" }} />
                    </IconButton>
                    {/* </Tooltip> */}
                    {/* </Link> */}
                    {/* <Tooltip title="Delete"> */}
                    <IconButton
                    // onClick={() => deleteUser(item._id)}
                    >
                      <Delete style={{ color: "#1E242B" }} />
                    </IconButton>
                    {/* </Tooltip> */}
                  </SurveyStyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <SurveyStyledTableCell>
                    <Checkbox className={classes.checkBox} />
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>Survey 1</p>
                    </div>
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <p>ABC Pvt Ltd</p>
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>DEC 20 2022</p>
                    </div>
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>DEC 20 2023</p>
                    </div>
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>30 / 90</p>
                    </div>
                  </SurveyStyledTableCell>
                  <SurveyStyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>Running</p>
                    </div>
                  </SurveyStyledTableCell>

                  <SurveyStyledTableCell align="center">
                    {/* <Link to={`/user/edit/${item._id}`}> */}
                    {/* <Tooltip title="Edit"> */}
                    <IconButton>
                      <Edit style={{ color: "#1E242B" }} />
                    </IconButton>
                    {/* </Tooltip> */}
                    {/* </Link> */}
                    {/* <Tooltip title="Delete"> */}
                    <IconButton
                    // onClick={() => deleteUser(item._id)}
                    >
                      <Delete style={{ color: "#1E242B" }} />
                    </IconButton>
                    {/* </Tooltip> */}
                  </SurveyStyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
          <Grid item xs={12} className={classes.paginationGrid}>
            <p>
              Showing <b>{page}-5 </b>from <b> 46</b> Surveys
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
        <CreateSurvey />
      </BasicModal>
    </>
  );
};

export default Surveys;
