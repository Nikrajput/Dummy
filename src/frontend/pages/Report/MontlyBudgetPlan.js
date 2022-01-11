import React, { useState, useEffect } from "react";

import { makeStyles, Box, Typography } from "@material-ui/core";

import { Heading } from "./components/heading";
import { Doughnut } from "react-chartjs-2";
import { auth, db } from "../../../firebase/firebase";
import { ref, onValue } from 'firebase/database'
import { Children } from "react";

const monthlyBudgetData = {
  Rent: "Rent / Maintenance / Home Loan",
  Bills: "Bills / Utility",
  Groceries: "Groceries",
  Transport: "Transport",
  Medical: "Medical and Insurance",
  Domestic: "Domestic Help",
  Entertainment: "Entertainment / Dining In / Out",
  Shopping: "Shopping",
  Gym: "Gym / Spa / Salon"
}

const budgetDataOrder = {
  Rent: null,
  Bills: null,
  Groceries: null,
  Transport: null,
  Medical: null,
  Domestic: null,
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },

  container: {},

  tableHeading: {
    fontSize: "1.7rem",
    color: "rgb(35, 142, 231)",

    [theme.breakpoints.down("md")]: {
      fontSize: "1.2rem",
    },
  },

  tableText: {
    fontSize: "1.7rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "1.2rem",
    },
  },

  borderBottom: {
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.primary.main,
  },

  borderRight: {
    borderRightWidth: "2px",
    borderRightStyle: "solid",
    borderRightColor: theme.palette.primary.main,
  },

  graphContainer: {
    margin: "2rem 0",
    display: "flex",
    justifyContent: "space-between",
  },

  graph: {
    [theme.breakpoints.down("md")]: {
      height: "200px"
    },

    [theme.breakpoints.down("xs")]: {
      height: "100px"
    }
  },

  subtotal: {
    background: "rgb(35, 142, 231)",
    color: "white",
    fontWeight: "bold",
  },

  heading: {
    fontWeight: "bold",

    [theme.breakpoints.down("md")]: {
      fontSize: "16px"
    }
  },

  bottomText: {
    fontWeight: "bold", 
    textAlign: "center", 
    margin: "1.5rem 0",

    [theme.breakpoints.down("md")]: {
      fontSize: "16px"
    }
  }
}));

const options = {
  plugins: {
    datalabels: {
      clamp: true,
      formatter: function (value) {
        return "₹ " + value.toLocaleString("en-IN");
      },
    },
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};

export const MontlyBudgetPlan = ({ graphData1, graphData2, expenseRec, uid, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Heading>Monthly Budget Plan</Heading>

        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          style={{ fontWeight: "bold" }}
        >
          Expenses:
        </Typography>
       

        {children}


        <div className={classes.graphContainer}>
          <Box width="50%" height="20rem" className={classes.graph}>
            <Typography variant="h5" color="primary" style={{ fontWeight: "bold" }}>Current</Typography>
            <Doughnut data={graphData1} options={options} />
          </Box>
          <Box width="50%" height="20rem" className={classes.graph}>
            <Typography variant="h5" color="primary" style={{ fontWeight: "bold" }}>Recommended</Typography>
            <Doughnut data={graphData2} options={options} />
          </Box>
        </div>
        <Typography
          variant="h5"
          color="secondary"
          className={classes.bottomText}
        >
          Following the recommended budget, you can have an additional savings of ₹ {expenseRec} per month.
        </Typography>
      </div>
    </div>
  );
};
