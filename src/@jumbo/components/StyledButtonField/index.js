import { Button, FormGroup, TextField, withStyles } from "@material-ui/core";

const StyledTextField = withStyles({
  root: {
    "&.MuiFormControl-root": {
      "&.MuiTextField-root": {
        width: "75%",
      },
    },
    "& fieldset": {
      borderTopLeftRadius: "14px",
      borderBottomLeftRadius: "14px",
      border: "solid 1px #E3E3E0",
      width: "100%",
    },
  },
})(TextField);

const StyledButton = withStyles({
  root: {
    borderTopRightRadius: "14px",
    borderBottomRightRadius: "14px",
    backgroundColor: "#537898",
    color: "#fff",
    width: "15%",
  },
})(Button);

const StyledField = () => {
  return (
    <FormGroup row>
      <StyledTextField variant="outlined" />
      <StyledButton variant="contained" disableElevation>
        Browse{" "}
      </StyledButton>
    </FormGroup>
  );
};
export default StyledField;
