import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { supabase } from "supabaseClient";

const Dashboard = () => {
  const { themeType } = useContext(AppContext);
  const useStyles = makeStyles(constantStyles(themeType));
  const classes = useStyles();
  // Import user session from redux store
  const session = useSelector((state) => state.auth.session);
  // Keep Counts in state
  const [clientCount, setClientCount] = useState(0);
  const [surveyCount, setSurveyCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const getCount = async (tableName) => {
    try {
      let { count, error } = await supabase
        .from(tableName)
        .select("*", { count: "exact", head: true })
        .filter("is_active", "eq", true);
      if (error) {
        throw error;
      }

      if (count) {
        return count;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchAllCounts = async () => {
      const clientCount = await getCount("client");

      setClientCount(clientCount);
      const questionCount = await getCount("question");
      setQuestionCount(questionCount);
      const categoryCount = await getCount("category");
      setCategoryCount(categoryCount);
    };
    fetchAllCounts();
    return () => {};
  }, [session]);

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
            <h1 className={classes.innerHeading}>
              {clientCount !== undefined ? clientCount : 0}
            </h1>
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
            <h1 className={classes.innerHeading}>
              {questionCount !== undefined ? questionCount : 0}
            </h1>
            <img src={questions} />
          </Grid>
        </Grid>
        <Grid item xs={2.5} className={classes.dashboardGrid}>
          <p className={classes.innerPara}>Active Categories </p>
          <Grid item xs={10} className={classes.dashboardInnerGrid}>
            <h1 className={classes.innerHeading}>
              {categoryCount !== undefined ? categoryCount : 0}
            </h1>
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
