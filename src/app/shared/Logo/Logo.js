import React from "react";
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import logo from "assets/WSP-logo.png";

const Logo = ({ mini, mode, sx }) => {
  return (
    <Div sx={{ display: "inline-flex", ...sx }}>
      <Link href={"/mainMenu/dashboard"}>
        {!mini ? (
          <img
            style={{ width: "148px", height: " 81px", paddingTop: "33px" }}
            src={logo}
          />
        ) : (
          <img
            style={{ width: "148px", height: " 81px", paddingTop: "33px" }}
            src={logo}
          />
        )}
      </Link>
    </Div>
  );
};

Logo.defaultProps = {
  mode: "light",
};

export default Logo;
