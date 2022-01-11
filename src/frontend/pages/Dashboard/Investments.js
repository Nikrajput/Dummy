import React, { useState, useEffect } from "react";

import { Typography, makeStyles, Grid, Box } from "@material-ui/core";

import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

import { Doughnut } from "react-chartjs-2";
import { expensesDoughnutOptions, investmentsDoughnutData } from "./data";

// ** Database stuff
import { db } from "../../../firebase/firebase";
import { ref, onValue } from "firebase/database";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3rem",
  },

  heading: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: 10,

    "&::before": {
      content: '""',
      display: "block",
      height: "3rem",
      width: ".5rem",
      background: theme.palette.primary.main,
    },
  },

  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
}));

export const Investments = ({ user }) => {
  const classes = useStyles();

  const [show, setShow] = React.useState(true);
  // ** State for Doughnut chart
  const [investments, setInvestments] = useState({});
  const [assetsGraphData, setAssetsGraphData] = useState(
    investmentsDoughnutData
  );
  const [liabilitiesGraphData, setLiabilitiesGraphData] = useState(
    investmentsDoughnutData
  );

  const [assetsTotal, setAssetsTotal] = useState(0);
  const [liabilitiesTotal, setLiabilitiesTotal] = useState(0);

  // ** Handling the userId
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (user) {
      const userId = user.uid;
      setUserId(userId);
    }
  }, [user]);

  // ** Grab the data on the initail load
  useEffect(() => {
    if (userId) {
      const investmentRef = ref(db, `users/${userId}/investment`);
      onValue(investmentRef, (snapshot) => {
        if (snapshot.exists) {
          const investments = snapshot.val();
          console.log("Investments: ", investments);
          setInvestments(investments);
        }
      });
    }
  }, [userId]);

  // ** Handle the graph data
  const handleGraphData = () => {
    if (investments) {
      const assests = [
        "Fixeddeposit",
        "Shares",
        "Mutualfunds",
        "Gold",
        "Cash",
        "Cryptocurrency",
        "Other",
      ];
      const liabilities = [];

      const assestsData = [];
      const assestsKeys = [];

      const liabilitiesData = [];

      for (let [key, value] of Object.entries(investments["Assets"])) {
        // ** If the data is of the assets type
        if (assests.includes(key)) {
          // ** Store the values and data for the assets graph
          assestsKeys.push(key);
          assestsData.push(value);
        }
      }

      delete investments["Liabilities"].Total;

      for (let [key, value] of Object.entries(investments["Liabilities"])) {
        // ** Push the data and the keys
        liabilitiesData.push(value);
        liabilities.push(key);
      }

      // ** store the graph data
      const assetsGraphData = {
        labels: assestsKeys,
        datasets: [
          {
            label: "Assets",
            data: assestsData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
          },
        ],
      };

      // ** Liabilities data
      const liabilitiesGraphData = {
        labels: liabilities,
        datasets: [
          {
            label: "Liabilities",
            data: liabilitiesData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
          },
        ],
      };

      setLiabilitiesGraphData(liabilitiesGraphData);
      const liabilitiesTotal = liabilitiesData.reduce(
        (acc, curr) => parseInt(acc) + parseInt(curr),
        0
      );
      setLiabilitiesTotal(liabilitiesTotal);

      const assesTotal = assestsData.reduce(
        (a, b) => parseInt(a) + parseInt(b),
        0
      );

      setAssetsGraphData(assetsGraphData);
      setAssetsTotal(assesTotal);
    }
  };

  useEffect(() => {
    if (investments && investments !== null) {
      handleGraphData();
    }
  }, [investments]);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.heading} onClick={handleShow}>
        Investments{" "}
        {show ? (
          <KeyboardArrowDown fontSize="large" />
        ) : (
          <KeyboardArrowUp fontSize="large" />
        )}
      </Typography>
      {show && (
        <Grid container spacing={3} style={{ marginTop: "1rem" }}>
          <Grid item xs={12} md={4} className={classes.col}>
            <Typography variant="h6">Assests</Typography>
            <Typography variant="h6">
              Rs {assetsTotal.toLocaleString("en-IN")}
            </Typography>
            <Box
              display="flex"
              alignItems="flex"
              justifyContent="center"
              height="300px"
            >
              {assetsGraphData ? (
                <Doughnut
                  data={assetsGraphData}
                  options={expensesDoughnutOptions}
                />
              ) : (
                <h4>NA</h4>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className={classes.col}>
            <Typography variant="h6">Liability</Typography>
            <Typography variant="h6">
              Rs {liabilitiesTotal.toLocaleString("en-IN")}
            </Typography>
            <Box
              display="flex"
              alignItems="flex"
              justifyContent="center"
              height="300px"
            >
              {liabilitiesGraphData ? (
                <Doughnut
                  data={liabilitiesGraphData}
                  options={expensesDoughnutOptions}
                />
              ) : (
                <h4>NA</h4>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className={classes.col}>
            <Typography variant="h6">Net Worth</Typography>
            <Typography variant="h6">Rs x,xx,xxx</Typography>
            <h3>NA</h3>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
