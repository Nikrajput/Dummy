import React from "react";

import {
  Typography,
  makeStyles,
  Grid,
  Box,
  Divider,
  Link,
} from "@material-ui/core";

import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

import { Bar } from "react-chartjs-2";
import { taxesBarData, taxesBarOptions } from "./data";

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
  },
}));

export const Taxes = ({ user }) => {
  const classes = useStyles();

  const [show, setShow] = React.useState(true);
  const [anualTaxGraph, setAnualTaxGraph] = React.useState(taxesBarData);

  const handleShow = () => {
    setShow(!show);
  };

  // ** Handling the userId
  const [userId, setUserId] = React.useState("");
  React.useEffect(() => {
    if (user) {
      const userId = user.uid;
      setUserId(userId);
    }
  }, [user]);

  // ** Grab the data from the database
  const [incomeData, setIncomeData] = React.useState({});
  React.useEffect(() => {
    if (userId) {
      const incomeRef = ref(db, `users/${userId}/income`);
      onValue(incomeRef, (snapshot) => {
        if (snapshot.exists) {
          setIncomeData(snapshot.val());
          // ** Set the graph data
          const taxesGraphData = handleGraphData(snapshot.val());
          setAnualTaxGraph(taxesGraphData);
        }
      });
    }
  }, [userId]);

  function handleGraphData(data){
    const current = data.Incometax * 12;
    const recommended = data.Incometax * 12;

    const incomeData = {
      labels: ["Current", "Recommended"],
      datasets: [
        {
          barThickness: "20",
          backgroundColor: ["#238EE7", "#4ED0CE"],
          data: [current, recommended], 
        },
      ],
    };
    
    // setAnualTaxGraph(incomeData);
    return incomeData;
  }

  // React.useEffect(() => {
  //   if (incomeData) {
  //     handleGraphData();
  //   }
  // }, [incomeData])

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.heading} onClick={handleShow}>
        Taxes{" "}
        {show ? (
          <KeyboardArrowDown fontSize="large" />
        ) : (
          <KeyboardArrowUp fontSize="large" />
        )}
      </Typography>
      {show && (
        <Grid container spacing={3} style={{ marginTop: "1rem" }}>
          <Grid item xs={12} md={5} className={classes.col}>
            <Typography variant="h5">Monthly</Typography>
            <Box
              display="flex"
              flexDirection="column"
              style={{ marginTop: "1.5rem", gap: 10 }}
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">Gross</Typography>
                <Typography variant="h5">
                  Rs. {incomeData?.Total.toLocaleString("en-IN")}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ padding: "0 1rem" }}
              >
                <Typography variant="h5">
                  - TDS (Tax deducted at source)
                </Typography>
                <Typography variant="h5">Rs. {incomeData?.Incometax.toLocaleString("en-IN")}</Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ padding: "0 1rem" }}
              >
                <Typography variant="h5">- Other deductions</Typography>
                <Typography variant="h5">Rs. {(incomeData?.Fund + incomeData?.Professionaltax).toLocaleString("en-IN")}</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">Net Pay</Typography>
                <Typography variant="h5">Rs. {incomeData?.Netincome.toLocaleString("en-IN")}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={2} />
          <Grid item xs={12} md={5} className={classes.col}>
            <Typography variant="h5">Annual Tax</Typography>
            <Box style={{ marginTop: "1.5rem" }} height="200px">
              <Bar data={anualTaxGraph} options={taxesBarOptions} />
              <Box
                display="flex"
                justifyContent="center"
                sx={{ marginTop: "2rem" }}
              >
                <Link href="#" color="inherit">
                  Learn how to save Rs. xx,xxx in taxes
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
