import { Color } from "@jumbo/constants/index";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@mui/material/TextField";

export const constantStyles = (themeType) => ({
  heading1: {
    fontSize: "37px",
    marginTop: 0,
    marginBottom: 0,
    color: Color.GREY400,
  },

  searchBarGrid: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
  },

  topBarGrid: {
    marginTop: "22px",
    display: "flex",
    flexDirection: "row-reverse",
  },

  listGrid: {
    marginTop: "45px",
  },

  tableCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  buttonIcon: {
    fontSize: "21px",
    width: "19px",
    marginRight: "6px",
  },

  button: {
    backgroundColor: Color.RED,
    color: Color.WHITE,
    //   backgroundColor: themeType === 'dark' ? Color.YELLOW : Color.GREY200,
    // color: themeType === 'dark' ? Color.GREY200 : Color.YELLOW,
    width: "auto",
    height: "41px",
    borderRadius: "14px",
    fontSize: "0.85rem",
    fontWeight: 500,

    "&:hover ": {
      backgroundColor: themeType === "dark" ? Color.RED100 : Color.RED100,
      color: themeType === "dark" ? Color.WHITE : Color.WHITE,
    },
  },
  button2: {
    backgroundColor: Color.RED,
    color: Color.WHITE,
    //   backgroundColor: themeType === 'dark' ? Color.YELLOW : Color.GREY200,
    // color: themeType === 'dark' ? Color.GREY200 : Color.YELLOW,
    width: "145px",
    height: "61px",
    borderRadius: "14px",
    fontSize: "0.85rem",
    fontWeight: 500,
    "&:hover ": {
      backgroundColor: themeType === "dark" ? Color.RED100 : Color.RED100,
      color: themeType === "dark" ? Color.WHITE : Color.WHITE,
    },
  },

  button3: {
    // backgroundColor: Color.RED,
    color: Color.WHITE,
    //   backgroundColor: themeType === 'dark' ? Color.YELLOW : Color.GREY200,
    // color: themeType === 'dark' ? Color.GREY200 : Color.YELLOW,
    width: "88px",
    height: "46px",
    borderRadius: "14px",
    fontSize: "0.85rem",
    fontWeight: 500,

    "&:hover ": {
      //   backgroundColor: themeType === 'dark' ? Color.YELLOW : Color.GREY200,
      //   color: themeType === 'dark' ? Color.GREY200 : Color.YELLOW,
    },
  },
  button4: {
    backgroundColor: Color.RED,
    color: Color.WHITE,
    //   backgroundColor: themeType === 'dark' ? Color.YELLOW : Color.GREY200,
    // color: themeType === 'dark' ? Color.GREY200 : Color.YELLOW,
    width: "172px",
    height: "61px",
    borderRadius: "14px",
    fontSize: "0.85rem",
    fontWeight: 500,

    "&:hover ": {
      backgroundColor: themeType === "dark" ? Color.RED100 : Color.RED100,
      color: themeType === "dark" ? Color.WHITE : Color.WHITE,
    },
  },

  button5: {
    color: "#FFF",
    width: "143px",
    height: "52px",
    fontSize: "0.85rem",
    fontWeight: "500",
    borderRadius: "14px",
    marginRight: "8%",
  },

  uploadButton: {
    backgroundColor: "#537898",
    color: "white",
    marginTop: 0,
    width: "20%",
    borderTopRightRadius: "14px",
    height: "56px",
    borderBottomRightRadius: " 14px",
  },

  uploadField: {
    width: "70%",
    height: "56px",
    border: "1px solid #E3E3E0",
    borderTopLeftRadius: "14px",
    borderBottomLeftRadius: "14px",
    paddingBottom: "4px",

    "&.MuiInput-root:before": {
      borderBottom: "none",
    },
    "&.MuiInput-root:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& .MuiInputBase-input": {
      marginLeft: "12px",
    },
  },

  dashboardHeader: {
    paddingTop: 0,
    marginTop: "20px",
    marginLeft: "4%",
    marginBottom: "3%",
  },

  dashboardGrid: {
    backgroundColor: "#fff",
    borderRadius: "15px",
  },
  dashboardInnerGrid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "10%",
  },
  innerHeading: {
    fontSize: "32px",
    color: "#000",
  },
  innerPara: {
    fontSize: "18px",
    color: "#676767",
    paddingLeft: "10%",
  },
  dashboardGraph: {
    backgroundColor: "#fff",
    borderRadius: "18px",
    marginTop: "7%",
    marginBottom: "4%",
  },

  categoryModalBox: {
    width: "49%",
    height: "84%",
    left: "8%",
  },

  grid: {
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    backgroundColor: "#fff",
    borderRadius: "14px",

    "&.MuiInputBase-root": {
      "&.MuiOutlinedInput-root": {
        "&.MuiSelect-root": {
          backgroundcolor: "#fff",
          borderRadius: "14px",
        },
      },
    },
  },
  paginationGrid: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        background: Color.BLUE,
        color: Color.WHITE,
        borderRadius: "10px",
        boxShadow: "0px 7px 16px rgba(0, 0, 0, 0.14)",
      },

      "&:hover": {
        background: Color.BLUE,
        color: Color.WHITE,
        borderRadius: "10px",
        boxShadow: "0px 7px 16px rgba(0, 0, 0, 0.14)",
        transition: "0.1ms",
      },
    },

    "& .MuiPagination-ul": {
      //   Apply border on all list items
      "& li": {
        borderTop: `1px solid ${Color.GREY200}`,
        borderBottom: `1px solid ${Color.GREY200}`,
      },
      //   Remove border on first & last list items
      "& li:first-child": {
        border: `1px solid ${Color.GREY200}`,
        borderRadius: "14px",
        margin: "0px 10px",
        color: Color.BLUE,
      },
      "& li:last-child": {
        border: `1px solid ${Color.GREY200}`,
        borderRadius: "14px",
        margin: "0px 10px",
        color: Color.BLUE,
      },
      //
      "& li:nth-child(2)": {
        borderLeft: `1px solid ${Color.GREY200}`,
        borderTop: `1px solid ${Color.GREY200}`,
        borderBottom: `1px solid ${Color.GREY200}`,
        /*TL TR BR BL*/
        borderRadius: "14px 0px 0px 14px",
      },
      "& li:nth-last-child(2)": {
        borderRight: `1px solid ${Color.GREY200}`,
        borderTop: `1px solid ${Color.GREY200}`,
        borderBottom: `1px solid ${Color.GREY200}`,
        /*TL TR BR BL*/
        borderRadius: "0px 14px 14px 0px",
      },
    },
  },

  checkBox: {
    color: Color.GREY100,
    "&.Mui-checked": {
      color: "#7451c5",
    },
  },
  checkBoxForm: {
    paddingRight: "8%",
  },

  accordian: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    paddingLeft: "2%",
    paddingRight: "2%",
    backgroundColor: "#F5F5F5",

    "&.MuiPaper-root": {
      "&.MuiAccordion-root": {
        borderRadius: "14px",
        margin: "25px 0px",
        "&:before": {
          backgroundColor: "#fff",
        },
      },
    },
  },
  ruleAccordionTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: "0px 10px",
    alignItems: "center",
  },
  ruleBox: {
    backgroundColor: "#FBFBFB",
    marginLeft: "0%",
    width: "96%",
    display: "flex",
    borderRadius: "14px",
    border: "solid 1px #D9D9D6",
    marginTop: "13px",
  },
});

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: Color.GREY400,
    color: Color.OFFWHITE,
    fontSize: "20px",
    height: "64px",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const SurveyStyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: Color.GREY400,
    color: Color.OFFWHITE,
    fontSize: "20px",
    height: "64px",
    border: `solid 1px ${Color.WHITE100}`,
  },
  body: {
    fontSize: 14,
    border: `solid 1px ${Color.GREY400}`,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const CustomTextField = withStyles({
  root: {
    "&.MuiFormControl-root": {
      "&.MuiTextField-root": {
        width: "90%",
      },
    },
    "& .MuiOutlinedInput-root": {
      width: "100%",
      "&.MuiInputBase-root": {
        backgroundColor: "#fff",
        borderRadius: "14px",
        zIndex: 2,
        width: "100%",
        height: "100%",
      },

      "& fieldset": {
        borderRadius: "14px",
        width: "100%",
      },
    },
  },
})(TextField);

export const ModalStyle = (themeType) => ({
  position: "absolute",
  flexGrow: 1,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "96%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
});
