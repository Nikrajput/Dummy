import React from "react";

// Material ui imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 37px 50px 37px",
    backgroundColor: theme.palette.primary.light,
    color: "white",

    [theme.breakpoints.down("md")]: {
      padding: "5%"
    }
  },

  heading: {
    fontSize: "3rem",
    lineHeight: 1.2,
    marginBottom: "5%",

    "& > span": {
      fontWeight: 800,
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "1.2rem"
    }
  },

  subheading: {
    fontSize: "2rem",
    lineHeight: 1.2,

    [theme.breakpoints.down("md")]: {
      fontSize: "1rem"
    }
  },
}));

export const ReportHeader = ({ firstname, lastname }) => {
  const classes = useStyles();
  const fullName = `${firstname} ${lastname}`
  return (
    <div className={classes.root}>
      <Typography varinat="h1" className={classes.heading}>
        Financial Report for <br /> <span>{fullName}</span>
      </Typography>
      <Typography variant="h3" className={classes.subheading}>
        Created by BeFinSavvy
      </Typography>
    </div>
  );
};
