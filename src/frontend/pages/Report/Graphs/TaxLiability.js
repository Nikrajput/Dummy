import React from "react";

import { Bar } from "react-chartjs-2";

import { makeStyles, Typography } from "@material-ui/core";
import { Heading } from "../components/heading";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "24rem"
  },

  graphContainer: {
    height: "200px",
    width: "100%"
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
    marginTop: "1.5rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "16px"
    }
  }
}));

const options = {
  indexAxis: "y",
  scales: {
    x: {
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
    y: {
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

export const TaxLiability = ({ data, savings }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.graphContainer}>
        <Heading>Saving Your Tax</Heading>
        <Typography variant="h5" className={classes.heading} gutterBottom>Tax Liability:</Typography>
        {data ? <Bar data={data} options={options} /> : <p>Loading...</p>}
        <Typography variant="h5" color="secondary" className={classes.bottomText}>You will save upto ₹ {savings} in taxes for the current financial year</Typography>
      </div>
    </div>
  );
};
