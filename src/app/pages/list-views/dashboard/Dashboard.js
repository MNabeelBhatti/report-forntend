import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "app/AppProvider";

import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import clients from "assets/Clients.png";
import surveys from "assets/Surveys.png";
import questions from "assets/Questions.png";
import categories from "assets/Categories.png";
import LineChartSales from "app/shared/metrics/SalesStatistics/LineChartSales";
import { makeStyles } from "@material-ui/core/styles";
import { constantStyles } from "@jumbo/components/Styles/styles";
const Dashboard = () => {
  const { themeType } = useContext(AppContext);
  const useStyles = makeStyles(constantStyles(themeType));
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} className={classes.dashboardHeader}>
          <div>
            <h1 className={classes.heading1}>Dashboard</h1>
            <p style={{ marginTop: 0 }}>Lorem ipsum dolor sit amet</p>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Grid item xs={2.5} className={classes.dashboardGrid}>
          <p className={classes.innerPara}>Total Client in System</p>
          <Grid item xs={10} className={classes.dashboardInnerGrid}>
            <h1 className={classes.innerHeading}>120</h1>
            <img src={clients} />
          </Grid>
        </Grid>

        <Grid item xs={2.5} className={classes.dashboardGrid}>
          <p className={classes.innerPara}>Active Surveys</p>
          <Grid item xs={10} className={classes.dashboardInnerGrid}>
            <h1 className={classes.innerHeading}>300</h1>
            <img src={surveys} />
          </Grid>
        </Grid>
        <Grid item xs={2.5} className={classes.dashboardGrid}>
          <p className={classes.innerPara}>Active Questions</p>
          <Grid item xs={10} className={classes.dashboardInnerGrid}>
            <h1 className={classes.innerHeading}>40</h1>
            <img src={questions} />
          </Grid>
        </Grid>
        <Grid item xs={2.5} className={classes.dashboardGrid}>
          <p className={classes.innerPara}>Active Categories </p>
          <Grid item xs={10} className={classes.dashboardInnerGrid}>
            <h1 className={classes.innerHeading}>10</h1>
            <img src={categories} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={11} className={classes.dashboardGraph}>
          <LineChartSales />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
