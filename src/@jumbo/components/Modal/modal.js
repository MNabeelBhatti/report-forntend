import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Masonry from "@mui/lab/Masonry";
import ClearIcon from "@mui/icons-material/Clear";

import { CustomTextField, constantStyles } from "../Styles/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import StylledFeild from "../StyledButtonField";
import { Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "app/AppProvider";
import { IconButton } from "@material-ui/core";

const style = {
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
};

const BasicModal = ({ open, children }) => {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </Modal>
    </div>
  );
};

export default BasicModal;
