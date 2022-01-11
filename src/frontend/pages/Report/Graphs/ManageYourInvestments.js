import React, { useEffect, useState } from "react";

import { Doughnut } from "react-chartjs-2";

import { makeStyles, Typography, Box } from "@material-ui/core";
import { Heading } from "../components/heading";

import { db, auth } from "../../../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70rem",
  },

  graphContainer: {
    height: "400px",
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

export const ManageYourInvestments = ({ graph1, graph2, graph3 }) => {
  const classes = useStyles();
  const [graph1Data, setGraph1Data] = useState({});
  const [graph2Data, setGraph2Data] = useState({});
  const [graph3Data, setGraph3Data] = useState({});

  const userId = auth.currentUser.uid;

  const getGraph1Data = async () => {
    const firebaseRes = await db
      .ref(`/users/${userId}/investment`)
      .once(`value`);
    const response = firebaseRes.val();
    console.log("Functional Response: ", response);
    const data = Object.values(response);
    const labels = Object.keys(response);

    const gd = {
      labels,
      datasets: [
        {
          backgroundColor: [
            "#238EE7",
            "#4ED0CE",
            "#7AE7F5",
            "#FFBC42",
            "#CC2844",
          ],
          data,
          borderColor: "white",
          borderWidth: 1,
        },
      ],
    };

    setGraph1Data(gd);

    console.log("Graph 1 Data: ", gd);
  };

  const getGraph2Data = async () => {
    const gd = {
      labels: ["Defensive Assets"],
      datasets: [
        {
          label: "Defensive Assets",
          backgroundColor: ["#238EE7"],
          borderColor: "white",
          borderWidth: 1,
          data: [20],
        },
      ],
    };

    setGraph2Data(gd);
  };

  const getGraph3Data = async () => {
    const gd = {
      labels: ["Defensive Assets", "Growth Assets"],
      datasets: [
        {
          label: ["Defensive Assets", "Growth Assets"],
          backgroundColor: ["#238EE7", "#4ED0CE"],
          borderColor: "white",
          borderWidth: 1,
          data: [65, 35], // TODO: Needs to be changed depending upon some conditions...
        },
      ],
    };

    setGraph3Data(gd)
  };

  useEffect(async () => {
    await getGraph1Data();
    await getGraph2Data();
    await getGraph3Data();
  }, []);

  console.log("graph data: ", graph1);
  return (
    <div className={classes.root}>
      <div className={classes.graphContainer}>
        <Heading>Managing Your Investments</Heading>
          <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>Current Asset Allocation</Typography>
          {graph1Data ? <Doughnut data={graph1Data} options={options} /> : <p>Loading...</p>}
        <Typography variant="h4" style={{ marginTop: "2rem", fontWeight: "bold" }}>Recommended Asset Allocation</Typography>
        <Box display="flex" justifyContent="space-between" width="50%" height="100%" style={{ marginTop: "2rem" }}>
          {(graph2Data && graph3Data) ? (
            <>
            <Box display="flex" flexDirection="column" sx={{ gap: 10, height: "100px"}}> 
              <Typography variant="h4">For Shor-term Goals</Typography>
              <Doughnut data={graph2Data} options={options} />
            </Box>
            <Box display="flex" flexDirection="column" sx={{ gap: 10 }}>
              <Typography variant="h4">For Shor-term Goals</Typography>
              <Doughnut data={graph3Data} options={options} />
            </Box>
            </>
          ) : <p>Loading...</p>}
        </Box>
        <Typography variant="h5" color="secondary" style={{ fontWeight: "bold", textAlign: "center", margin: "2rem 0"}}>
          In order to have a robust investment portfolio, you should have a well
          diversified portfolio aligned with your financial goals and risk
          appetite.
        </Typography>
      </div>
    </div>
  );
};
