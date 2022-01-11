import React from "react";

import { makeStyles, Typography } from "@material-ui/core";

import { Heading } from "./components/heading";

const useStyles = makeStyles((theme) => ({
  root: {
  },

  container: {
  },

  heading: {
    [theme.breakpoints.down("md")]: {
      fontSize: "16px"
    }
  }
}));

export const InvestmentPlans = ({ username = "User"}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Heading>{username} Investment Plans</Heading>
        <Typography variant="h5" style={{ fontWeight: "bold" }} className={classes.heading}>
          Short-term goals
        </Typography>
        <img src={require("../../../assets/images/5.JPG").default} style={{
          width: "100%",
          margin: "1rem 0"
        }} />
        <Heading>{username} Investment Plans</Heading>
        <Typography variant="h5" style={{ fontWeight: "bold" }} className={classes.heading}>
          Long-term goals
        </Typography>
        <img src={require("../../../assets/images/6.JPG").default} style={{
          width: "100%",
          margin: "1rem 0"
        }} />
      </div>
    </div>
  );
};
