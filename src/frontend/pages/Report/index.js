import React, { useState, useEffect } from "react";

// Firebase
import { db, auth } from "../../../firebase/firebase";
import { ref, onValue } from "firebase/database";

import "../report.css";
import blur from "../../../assets/images/blur.JPG";

import { Doughnut } from "react-chartjs-2";

import {
  makeStyles,
  Typography,
  Box,
  useMediaQuery,
  CircularProgress,
} from "@material-ui/core";
import { Heading } from "./components/heading";

import { ReportHeader } from "./Header";
import { Message } from "./Message";
import { TaxLiability } from "./Graphs/TaxLiability";
import { MonthlyBudget } from "./Graphs/MonthlyBudget";
import { ManageYourInvestments } from "./Graphs/ManageYourInvestments";
import { TaxSaving } from "./TaxSaving";
import { MontlyBudgetPlan } from "./MontlyBudgetPlan";
import { ImmediateActionPlans } from "./ImmediateActionPlans";
import { InvestmentPlans } from "./InvestmentPlans";
import { Disclaimer } from "./Disclaimer";

// ** SEO
import SEO from "../../components/seo";
import { useReportData } from "../../../firebase/useReportData";

const useStyles = makeStyles((theme) => ({
  reportRoot: {
    width: "70%",
    margin: "0 auto",

    [theme.breakpoints.down("md")]: {
      width: "90%",
      margin: "0 5%",
      overflow: "hidden",
    },
  },

  root: {
    width: "100%",
    height: "60rem",

    [theme.breakpoints.down("md")]: {
      height: "44rem",
    },

    [theme.breakpoints.down("xs")]: {
      height: "34rem",
    },
  },

  headerImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },

  graphContainer: {
    height: "300px",

    [theme.breakpoints.down("md")]: {
      height: "200px",
    },

    [theme.breakpoints.down("xs")]: {
      height: "100px",
    },
  },

  heading: {
    // fontWeight: "bold",

    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
  },

  bottomText: {
    fontWeight: "bold",
    textAlign: "center",
    margin: "4rem 0",

    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
  },

  loader: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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

export const Report = (props) => {
  let data, loading;
  // Check user and get the uid
  const userId = props.userId ? props.userId : auth.currentUser.uid;

  if (userId) {
    const reportData = useReportData(userId);
    data = reportData.data;
    loading = reportData.loading;
  }

  const mediumScreen = useMediaQuery("(min-width: 768px)");

  const classes = useStyles();

  return (
    <>
      {loading && (
        <div className={classes.loader}>
          <CircularProgress color="primary" size="large" />
        </div>
      )}
      {data && data.Showreport && (
        <>
          <SEO title={`${data?.personal?.Firstname}'s Report`} />
          <div className={classes.reportRoot}>
            <div style={{ position: "relative" }}>
              <img
                className={classes.headerImage}
                src={require("../../../assets/images/reportCover.png").default}
              />
            </div>
            <ReportHeader
              firstname={data?.personal?.Firstname}
              lastname={data?.personal?.Lastname}
            />
            <Message
              firstName={data?.personal?.Firstname}
              age={data?.personal?.Age}
              mStatus={data?.personal?.Status}
              riskProfile={data?.personal?.Riskprofile}
            />
            <TaxLiability
              data={data?.bardata}
              savings={(
                Number(
                  (data.income.Incometax * 12 - data.recommended) / 1000
                ).toFixed(0) * 1000
              ).toLocaleString("en-IN")}
            />
            <MonthlyBudget
              data={data?.datas}
              savings={(
                (
                  (-data.income.Netincome +
                    data.monthlyexpenditure.Subtotal1 +
                    data.monthlyexpenditure.Subtotal2 +
                    data.Savingsrecommendation) /
                  100
                ).toFixed(0) * 100
              ).toLocaleString("en-IN")}
            />
            {/* <ManageYourInvestments
            graph1={data?.datadoughnut1}
            graph2={data?.datadoughnut2}
            graph3={data?.datadoughnut3}
          /> */}
            {/* Start section Manage Your Investments  */}
            <div className={classes.root}>
              <div className={classes.graphContainer}>
                <Heading>Managing Your Investments</Heading>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                  className={classes.heading}
                >
                  Current Asset Allocation
                </Typography>
                {data.datadoughnut1 ? (
                  <Doughnut data={data?.datadoughnut1} options={options} />
                ) : (
                  <p>Loading...</p>
                )}
                <Typography
                  variant="h5"
                  style={{ marginTop: "2rem", fontWeight: "bold" }}
                  className={classes.heading}
                >
                  Recommended Asset Allocation
                </Typography>
                <>
                  {data.datadoughnut2 && data.datadoughnut3 ? (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                      height="100%"
                      style={{ margin: "2.5rem 0" }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        width="50%"
                        sx={{ gap: 10 }}
                      >
                        <Typography variant="h5" className={classes.heading}>
                          For Short-term Goals
                        </Typography>
                        <Doughnut
                          data={data?.datadoughnut2}
                          options={options}
                        />
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        width="50%"
                        sx={{ gap: 10 }}
                      >
                        <Typography variant="h5" className={classes.heading}>
                          For Long-term Goals
                        </Typography>
                        <Doughnut
                          data={data?.datadoughnut3}
                          options={options}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <p>Loading...</p>
                  )}
                </>
                <Typography
                  variant="h5"
                  color="secondary"
                  className={classes.bottomText}
                >
                  In order to have a robust investment portfolio, you should
                  have a well diversified portfolio aligned with your financial
                  goals and risk appetite.
                </Typography>
              </div>
            </div>
            {/* End section Manage Your Investments */}
            <TaxSaving requested={data?.requested} />
            <MontlyBudgetPlan
              graphData1={data?.datadoughnut4}
              graphData2={data?.datadoughnut5}
              expenseRec={
                ((data.monthlyexpenditure.Subtotal1 +
                data.monthlyexpenditure.Subtotal2) -
                data?.Expensesrecommendation).toLocaleString('en-IN')
              }
              data={data?.monthlyexpenditure}
              uid={userId}
            >
              <div style={{ fontSize: mediumScreen ? "24px" : "16px" }}>
                <div className="flex" style={{ fontWeight: "bold" }}>
                  <div
                    className="flexl"
                    style={{ color: "#238EE7", borderRight: "0px" }}
                  >
                    Needs
                  </div>
                  <div
                    className="flexi"
                    style={{ color: "#238EE7", borderRight: "0px" }}
                  >
                    Current
                  </div>
                  <div
                    className="flexb"
                    style={{ color: "#4ED0CE", textAlign: "right" }}
                  >
                    Recommended
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Rent / Maintenance </div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Rent.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Rent) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Rent.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Bills / Utility</div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Bills.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                      {
                        typeof(data.recommendedmonthlyexpenditure?.Bills) === "number" ? 
                        <>₹ {data.recommendedmonthlyexpenditure.Bills.toLocaleString("en-IN")}</>
                        : <img src={`${blur}`} width="100%" height="100%" />
                      }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Groceries</div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Groceries.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Groceries) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Groceries.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Transport</div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Transport.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Transport) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Transport.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Medical and Insurance</div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Medical.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Medical) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Medical.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Domestic Help</div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Domestic.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Domestic) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Domestic.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">EMI</div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Emi.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Emi) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Emi.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Other Expenses</div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Otherexpenses.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Otherexpenses) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Otherexpenses.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div
                    className="flexl"
                    style={{ color: "white", backgroundColor: "#238EE7" }}
                  >
                    Sub-total
                  </div>
                  <div
                    className="flexi"
                    style={{ color: "white", backgroundColor: "#238EE7" }}
                  >
                    ₹ {data.monthlyexpenditure.Subtotal1.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb" style={{ backgroundColor: "#4ED0CE", color: "white" }}>
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Subtotal1) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Subtotal1.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <br></br>
                <div className="flex" style={{ fontWeight: "bold" }}>
                  <div
                    className="flexl"
                    style={{ color: "#238EE7", borderRight: "0px" }}
                  >
                    Wants
                  </div>
                  <div
                    className="flexi"
                    style={{ color: "#238EE7", borderRight: "0px" }}
                  >
                    Current
                  </div>
                  <div
                    className="flexb"
                    style={{ color: "#4ED0CE", textAlign: "right" }}
                  >
                    Recommended
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Shopping</div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Shopping.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Shopping) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Shopping.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Gym / Spa / Salon</div>
                  <div className="flexi">
                    {data.monthlyexpenditure?.Gym ? (
                      <>
                        ₹ {data.monthlyexpenditure.Gym.toLocaleString("en-IN")}
                      </>
                    ) : (
                      <>₹ 0</>
                    )}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Gym) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Gym.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Entertainment / Dining Out</div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Entertainment.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Entertainment) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Entertainment.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Subscription</div>
                  <div className="flexi">
                    {data.monthlyexpenditure?.Subscription ? (
                      <>
                        ₹{" "}
                        {data.monthlyexpenditure.Subscription.toLocaleString(
                          "en-IN"
                        )}
                      </>
                    ) : (
                      <>₹ 0</>
                    )}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Subscription) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Subscription.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="flexl">Other</div>
                  <div className="flexi">
                    ₹ {data.monthlyexpenditure.Others.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb">
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Others) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Others.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <div className="flex">
                  <div
                    className="flexl"
                    style={{ color: "white", backgroundColor: "#238EE7" }}
                  >
                    Sub-total
                  </div>
                  <div
                    className="flexi"
                    style={{ color: "white", backgroundColor: "#238EE7" }}
                  >
                    ₹ {data.monthlyexpenditure.Subtotal2.toLocaleString("en-IN")}
                  </div>
                  <div className="flexb" style={{ backgroundColor: "#4ED0CE", color: "white" }}>
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Subtotal2) === "number" ? 
                      <>₹ {data.recommendedmonthlyexpenditure.Subtotal2.toLocaleString("en-IN")}</>
                      : <img src={`${blur}`} width="100%" height="100%" />
                    }
                  </div>
                </div>
                <br></br>
                <div className="flex">
                  <div
                    className="flexl"
                    style={{ color: "white", backgroundColor: "#238EE7" }}
                  >
                    Total Expenses
                  </div>
                  <div
                    className="flexi"
                    style={{ color: "white", backgroundColor: "#238EE7" }}
                  >
                    ₹{" "}
                    {(
                      data.monthlyexpenditure.Subtotal1 +
                      data.monthlyexpenditure.Subtotal2
                    ).toLocaleString("en-IN")}
                  </div>
                  <div
                    className="flexb"
                    style={{ color: "white", backgroundColor: "#4ED0CE" }}
                  >
                    {
                      typeof(data.recommendedmonthlyexpenditure?.Subtotal1) === "number" && typeof(data.recommendedmonthlyexpenditure?.Subtotal2) === "number" ? 
                        <>₹ {(data.recommendedmonthlyexpenditure.Subtotal1 + data.recommendedmonthlyexpenditure.Subtotal2).toLocaleString("en-IN")}</>
                        : <>₹ {((data.Expensesrecommendation / 1000).toFixed(0) * 1000).toLocaleString("en-IN")}</>
                    }
                  </div>
                </div>
                <div className="flex" style={{ fontWeight: "bold" }}>
                  <div
                    className="flexl"
                    style={{ backgroundColor: "#238EE7", color: "white" }}
                  >
                    Savings / Investments
                  </div>
                  <div
                    className="flexi"
                    style={{ backgroundColor: "#238EE7", color: "white" }}
                  >
                    ₹ {data.monthlyexpenditure.Savings.toLocaleString("en-IN")}
                  </div>
                  <div
                    className="flexb"
                    style={{ backgroundColor: "#4ED0CE", color: "white" }}
                  >
                    ₹{" "}
                    {(
                      (data.Savingsrecommendation / 1000).toFixed(0) * 1000
                    ).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </MontlyBudgetPlan>

            <ImmediateActionPlans
              username={`${data?.personal?.Firstname}`}
              savingRecommendation={`${data?.Savingsrecommendation}`}
              expensesRecommended={data?.Expensesrecommendation}
            />
            <InvestmentPlans username={`${data?.personal?.Firstname}'s`} />
            <Disclaimer />
          </div>
        </>
      )}
    </>
  );
};
