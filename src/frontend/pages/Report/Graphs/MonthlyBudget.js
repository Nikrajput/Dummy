import React from "react";

import { Bar } from "react-chartjs-2";

import { makeStyles, Typography } from "@material-ui/core";
import { Heading } from "../components/heading";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "35rem"
  },

  graphContainer: {
    height: "400px",
  },

  graph: {
    width: "100%",
    height: "400px"
  },

  bottomText: {
    fontWeight: "bold", 
    textAlign: "center", 
    marginTop: "1.5rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "16px"
    }
  }
}));

const options = {
  indexAxis: "x",
  scales: {
    y: {
      ticks: {
        beginAtZero: true,
        callback: function (value, index, values) {
          return "₹ " + value.toLocaleString("en-IN");
        },
      },
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
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

export const MonthlyBudget = ({ data, savings }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.graphContainer}>
        <Heading gutterBottom>Optimise Your Expenses</Heading>
        <div className={classes.graph}>
          {data ? <Bar data={data} options={options} style={{ margin: "1rem 0"}} /> : <p>Loading...</p>}
        </div>
        <Typography variant="h5" color="secondary" className={classes.bottomText}>
        Following the recommended budget, you can have an additional savings of ₹ {savings} per month.</Typography>
      </div>
    </div>
  );
};
