import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Div from "@jumbo/shared/Div";

const DeleteAlert = (props) => {

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete this item?
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)}>Cancel</Button>
        <Button onClick={props.onSuccess} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlert;