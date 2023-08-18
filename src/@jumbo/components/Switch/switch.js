import React from "react";
import Switch from "@material-ui/core/Switch";
import airbnbStyle from "./airbnb.style";
import { makeStyles } from "@material-ui/core/styles";

const AirbnbSwitchStyle = ({ onClick, disable, value }) => {
  const useStyles = makeStyles(airbnbStyle);
  const classes = useStyles();
  return (
    <div>
      <Switch
        classes={classes}
        // classes={switchStyles}
        onClick={onClick}
        disabled={disable}
        value={value}
        checked={value ? true : false}
      />
    </div>
  );
};

export default AirbnbSwitchStyle;
