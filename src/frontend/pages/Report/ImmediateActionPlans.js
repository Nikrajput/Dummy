import React from "react";

import { makeStyles, Typography, Box } from "@material-ui/core";

import { Heading } from "./components/heading";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },

  container: {},

  bottomText: {
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
  },
}));

export const ImmediateActionPlans = ({ username = "user", savingRecommendation, expensesRecommended }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Heading>Immediate Action Plan for {username}</Heading>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold" }}
          className={classes.bottomText}
        >
          Maintain two bank accounts.
        </Typography>
        <ol>
          <li>
            <Typography
              variant="h5"
              gutterBottom
              className={classes.bottomText}
            >
              Income-cum-expense account - where you get your salary and from
              where you make all your expenses.
            </Typography>
          </li>
          <li>
            <Typography variant="h5" className={classes.bottomText}>
              Savings-cum-investment account - which has all your savings and
              from where you make all your investment. Set up an automatic
              transfer of ₹ {((savingRecommendation / 100).toFixed(0) * 100).toLocaleString("en-IN")} per month from expense account to the
              investment account soon after receiving your salary.
            </Typography>
          </li>
        </ol>

        <Typography
          variant="h5"
          style={{ fontWeight: "bold", margin: "2rem 0" }}
          gutterBottom
          className={classes.bottomText}
        >
          Keep approximately ₹ {(((expensesRecommended * 3) / 10000).toFixed(0) * 10000).toLocaleString("en-IN")} in cash for expenses in your expense
          account.
        </Typography>

        <Typography
          variant="h4"
          style={{ fontWeight: "bold" }}
          gutterBottom
          className={classes.bottomText}
        >
          Create an emergency fund in your investment account.
        </Typography>

        <Typography variant="h5" gutterBottom className={classes.bottomText}>
          Create 2 fixed deposits of ₹ {(expensesRecommended * 3).toLocaleString("en-IN")} each with the first FD maturing
          in 6 months (that will be rolled forward for 1 year at maturity) and
          second FD maturing in 1 year (that will also be rolled forward for 1
          year at maturity). At the time of renewal, revisit your expenses and
          FD. If your expenses have increased, FD amount needs to be increased
          accordingly.
        </Typography>

        <Typography
          variant="h4"
          style={{ fontWeight: "bold", marginTop: "2rem" }}
          gutterBottom
          className={classes.bottomText}
        >
          Get adequate insurance coverage
        </Typography>

        <img
          src={require("../../../assets/images/4.JPG").default}
          style={{
            width: "100%",
            height: "240px",
          }}
        />

        <Typography
          variant="h4"
          style={{ fontWeight: "bold", marginTop: "2rem" }}
          gutterBottom
          className={classes.bottomText}
        >
          Our recommended policies for you
        </Typography>

        <Box
          display="flex"
          justifyContent="space-evenly"
          width="100%"
          height="100%"
          sx={{ marginBottom: "2rem", marginTop: "1rem" }}
        >
          <div
            style={{
              display: "flex",
              marginLeft: "0px",
              height: "150px",
              width: "50%",
            }}
          >
            <div style={{ width: "20%" }}>
              <img
                src={require("../../../assets/images/li.JPG").default}
                style={{
                  height: "95%",
                  width: "100%",
                }}
              />
            </div>
            <div style={{ width: "80%" }}>
              <img
                src={require("../../../assets/images/li1.JPG").default}
                style={{
                  height: "95%",
                  width: "100%",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "0px",
              height: "150px",
              width: "50%",
            }}
          >
            <div style={{ width: "20%" }}>
              <img
                src={require("../../../assets/images/hi.JPG").default}
                style={{
                  height: "95%",
                  width: "100%"
                }}
              />
            </div>
            <div style={{ width: "80%" }}>
              <img
                src={require("../../../assets/images/hi1.JPG").default}
                style={{
                  height: "95%",
                  width: "100%"
                }}
              />
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
