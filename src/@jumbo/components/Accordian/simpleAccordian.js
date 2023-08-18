import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "app/AppProvider";
import { constantStyles } from "../Styles/styles";

const SimpleAccordions = ({ title, description, onDelete }) => {
  const { themeType } = useContext(AppContext);
  const useStyles = makeStyles(constantStyles(themeType));
  const classes = useStyles();
  const defaultTitle = "Accordion 1";
  const defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.";
  return (
    <Box>
      <Accordion className={classes.accordian}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className={classes.ruleAccordionTitle} >
            <Typography>{title ? title : defaultTitle}</Typography>
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {description ? description : defaultDescription}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SimpleAccordions;
