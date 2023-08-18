import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import { withStyles } from "@material-ui/core/styles";
//todo: to see how to define prop-types for this component

const JumboTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default withStyles({
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
})(JumboTextField);
