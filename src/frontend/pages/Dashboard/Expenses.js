import React from "react";

import {
  makeStyles,
  Grid,
  Typography,
  Box,
  Container,
  Link,
  Divider,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Add as AddIcon,
} from "@material-ui/icons";

import { db, auth } from "../../../firebase/firebase";
import {
  ref,
  onValue,
  get,
  query,
  equalTo,
  orderByChild,
  limitToLast,
} from "firebase/database";

import { Doughnut, Bar } from "react-chartjs-2";
import {
  expensesDoughnutData,
  expensesDoughnutOptions,
  expensesBarOptions,
  expensesBarData,
} from "./data";
import { CustomButton } from "../../components/CustomButton";
import { AddExpenseModal } from "./components/AddExpenseModal";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "2rem",
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
  title: {
    color: "white",
    background: theme.palette.primary.main,
    padding: ".3rem .7rem",
    borderRadius: ".5rem",

    "& h5": {
      fontWeight: 800,
    },
  },

  tabs: {
    display: "flex",
    background: "gray",
    borderRadius: ".5rem",

    "& .active": {
      background: theme.palette.primary.main,
    },

    "& .monthly": {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
    },

    "& .current": {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
    },
  },

  tab: {
    background: "gray",
    display: "flex",
    alignItems: "center",
    padding: ".3rem 2rem",
    borderRadius: "inherit",
    cursor: "pointer",

    "& span": {
      color: "white",
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
  },

  expensesbtn: {
    padding: ".25rem 1rem",

    "& > span": {
      display: "flex",
      gap: 5,
    },
  },

  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
}));

// const counter = {
//   id: "counter",
//   beforeDraw(chart, args, options) {
//     const {
//       ctx,
//       chartArea: { top, right, left, bottom, height, width },
//       config: { data }
//     } = chart;
//     ctx.save();

//     // const dataset = data.datasets[0]

//     // console.log(dataset);

//     // ctx.fillStyle = "blue";
//     // ctx.fillRect((width / 2) - 5, top + (height / 2), 10, 10);

//     ctx.font = 'bold 24px sans serif'
//     ctx.fillText("Hola", (width / 2) - top, top + (height / 2))
//   },
// };

export const Expenses = ({ user }) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [userId, setUserId] = React.useState("");

  const setCurrentTab = (tab) => {
    const tabs = ["monthly", "current"];
    const activeTab = document.querySelector(".active");

    for (const tab of tabs) {
      document.querySelector(`.${tab}`).classList.remove("active");
    }
    const newTab = document.querySelector(`.${tab}`);
    newTab.classList.add("active");
  };

  const handleShow = () => {
    setShow(!show);
  };

  // ** Data Handling
  const [expensesData, setExpensesData] = React.useState({});
  const [budgetData, setBudgetData] = React.useState({});
  const [graphData, setGraphData] = React.useState();
  const [currentData, setCurrentData] = React.useState(expensesBarData);
  const [doughnutGraphData, setDoughnutGraphData] =
    React.useState(expensesDoughnutData);
  const [updated, setUpdated] = React.useState(false);
  const [doughnutData, setDoughnutData] = React.useState({});
  const [balance, setBalance] = React.useState(0);
  const [totalBudget, setTotalBudget] = React.useState(0);
  const [tabLabel, setTabLabel] = React.useState("");
  const [grabDataFromPreviousYear, setGrabDataFromPreviousYear] =
    React.useState(false);
  const [grabMonths, setGrabMonths] = React.useState("");

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      const userId = user.uid;
      setUserId(userId);
    }
  }, [user]);

  // ** Get the current Data
  const handleCurrentData = () => {
    // ** Get current year
    const currentYear = new Date().getFullYear();

    // ** Get current month
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });

    const expensesPromise = new Promise((resolve, reject) => {
      // ** Grab the current month expenses
      const expensesRef = ref(
        db,
        `users/${userId}/monthlyexpenses/${currentYear}/${currentMonth}`
      );
      onValue(expensesRef, (snapshot) => {
        if (snapshot.exists) {
          const monthlyResponse = snapshot.val();
          console.log("Expenses: ", monthlyResponse);
          resolve(monthlyResponse);
        }
      });
    });

    const budgetPromise = new Promise((resolve, reject) => {
      const budgetRef = ref(
        db,
        `users/${userId}/recommendedmonthlyexpenditure`
      );
      onValue(budgetRef, (snapshot) => {
        if (snapshot.exists) {
          const response = snapshot.val();
          // console.log("Budget Response: ", response)
          resolve(response);
        }
      });
    });

    try {
      /**
       * Grab only savings
       * From the needs grab (Rent, Bills, Groceries)
       * From the wants grab (Shopping, Entertainment, Subscription)
       */
      Promise.all([expensesPromise, budgetPromise]).then(
        ([expenses, budget]) => {
          if (expenses) {
            const expensesData = {
              Savings: expenses.Savings,
              Rent: expenses.Rent,
              Bills: expenses.Bills,
              Groceries: expenses.Groceries,
              Shopping: expenses.Shopping,
              Entertainment: expenses.Entertainment,
              Subscription: expenses.Subscription,
            };

            setExpensesData(expensesData);
          }

          if (budget) {
            const budgetData = {
              Savings: budget.Savings,
              Rent: budget.Rent,
              Bills: budget.Bills,
              Groceries: budget.Groceries,
              Shopping: budget.Shopping,
              Entertainment: budget.Entertainment,
              Subscription: budget.Subscription,
            };

            setBudgetData(budgetData);
          }

          if (expenses && budget) {
            const doughnutData = {
              savings: expenses.Savings,
              needs: expenses.Subtotal1,
              wants: expenses.Subtotal2,
            };

            // ** Handle balance
            const budgetTotal = budget.Subtotal1 + budget.Subtotal2;
            const expensesTotal = expenses.Subtotal1 + expenses.Subtotal2;
            const expensesBalance = budgetTotal - expensesTotal;
            setTotalBudget(budgetTotal);

            setBalance(expensesBalance);
            setDoughnutData(doughnutData);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    if (userId !== null) {
      handleCurrentData();

      // Need to change the tab label
      const currentYear = new Date().getFullYear();

      const totalExpensesData = ref(
        db,
        `users/${userId}/monthlyexpenses/${currentYear}`
      );
      onValue(totalExpensesData, (snapshot) => {
        if (snapshot.exists && snapshot.val() !== null) {
          const totalExpenses = snapshot.val();
          if (Object.keys(totalExpenses).length === 2) {
            setTabLabel("Previous Month");
            setGrabDataFromPreviousYear(false);
          } else if (
            Object.keys(totalExpenses).length > 2 &&
            Object.keys(totalExpenses).length < 6
          ) {
            setTabLabel("Monthly");
            setGrabDataFromPreviousYear(true);
            setGrabMonths(6 - Object.keys(totalExpenses).length);
          }
        }
        setLoading(false);
      });
    }

    setUpdated(false);
  }, [updated === true, userId]);

  // ** Handling the bar graph data
  const handleGraphData = () => {
    const labels = [
      "Savings",
      "Rent",
      "Bills",
      "Groceries",
      "Shopping",
      "Entertainment",
      "Subscription",
    ];

    if (expensesData && budgetData) {
      const expensesBarData = {
        labels,
        datasets: [
          {
            label: "Budget",
            data: Object.values(budgetData),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Expenses",
            data: Object.values(expensesData),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };

      setCurrentData(expensesBarData);
    }

    if (doughnutData && doughnutData !== null) {
      const expensesDoughnutGraph = {
        labels: ["Savings", "Needs", "Wants"],
        datasets: [
          {
            data: [
              doughnutData.savings,
              doughnutData.needs,
              doughnutData.wants,
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };
      // expensesDoughnutGraph.datasets.data = Object.values(doughnutData);
      setDoughnutGraphData(expensesDoughnutGraph);
      console.log("dougnut data: ", expensesDoughnutGraph);
    }
  };

  React.useEffect(() => {
    handleGraphData();
  }, [expensesData, budgetData, doughnutData]);

  // ** Handle the previous expenses data
  const handlePreviousExpenses = () => {
    if (!grabDataFromPreviousYear) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().toLocaleString("default", {
        month: "long",
      });

      const previousMonth = new Date(
        new Date().setMonth(new Date().getMonth() - 1)
      );
      const previousMonthName = previousMonth.toLocaleString("default", {
        month: "long",
      });

      const totalExpensesData = ref(
        db,
        `users/${userId}/monthlyexpenses/${currentYear}`
      );

      onValue(totalExpensesData, (snapshot) => {
        if (snapshot.exists) {
          const response = snapshot.val();
          if (Object.keys(response).length === 2) {
            const previousExpenses = response[previousMonthName];
            if (previousExpenses) {
              const expensesData = {
                Savings: previousExpenses.Savings,
                Bills: previousExpenses.Bills,
                Groceries: previousExpenses.Groceries,
                Rent: previousExpenses.Rent,
                Shopping: previousExpenses.Shopping,
                Entertainment: previousExpenses.Entertainment,
                Subscription: previousExpenses.Subscription,
              };

              setExpensesData(expensesData);
              const totalExpenses =
                previousExpenses.Subtotal1 + previousExpenses.Subtotal2;
              const balance = totalBudget - totalExpenses;
              setBalance(balance);
            }
          } else if (Object.keys(response).length > 2) {
            const monthlyData = [];
            const months = [];
            // ** Get the monthly data
            for (const [key, value] of Object.entries(response)) {
              const monthExpenses =
                response[key].Subtotal1 + response[key].Subtotal2;
              const month = key;
              monthlyData.push(monthExpenses);
              months.push(month);
            }

            // ** Create the different graph data for the previous months
            const expensesBarData = {
              labels: months,
              datasets: [
                {
                  label: "Budget",
                  data: months.map((month) => totalBudget),
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                  label: "Expenses",
                  data: monthlyData,
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
              ],
            };

            setCurrentData(expensesBarData);
          }
        }
      });
    } else {
      // =====================================================
      // ** Grab the previous 6 months expenses
      console.log("hola12345");
      console.log("grabMonths: ", grabMonths);

      // ** Current year
      const currentYear = new Date().getFullYear();

      // ** Previous year
      const previousYear = new Date().getFullYear() - 1;

      const Totalmonths = [];
      const TotalmonthlyData = [];

      const currentMonthsDataPromise = new Promise((resolve, reject) => {
        const months = [];
        const monthlyData = [];

        const currentYearMonthsRef = ref(
          db,
          `users/${userId}/monthlyexpenses/${currentYear}`
        );
        onValue(currentYearMonthsRef, (snapshot) => {
          if (snapshot.exists) {
            const currentYearMonths = snapshot.val();
            for (const [key, value] of Object.entries(currentYearMonths)) {
              const monthExpenses =
                currentYearMonths[key].Subtotal1 +
                currentYearMonths[key].Subtotal2;
              const month = key;
              monthlyData.push(monthExpenses);
              months.push(month + " " + currentYear);
              TotalmonthlyData.push(monthExpenses);
              Totalmonths.push(month + " " + currentYear);
            }
          }
        });

        resolve({ months, monthlyData });
      });

      // const previousMonthsDataPromise = new Promise((resolve, reject) => {
      //   const previousMonths = [];
      //   const previousMonthlyData = [];

      //   const previousYearMonthsRef = query(
      //     ref(db, `users/${userId}/monthlyexpenses/${previousYear}`),
      //     limitToLast(grabMonths)
      //   );
      //   get(previousYearMonthsRef).then((snapshot) => {
      //     if (snapshot.exists || snapshot.val() !== null) {
      //       const previousYearMonths = snapshot.val();
      //       for (const [key, value] of Object.entries(previousYearMonths)) {
      //         const monthExpenses =
      //           previousYearMonths[key].Subtotal1 +
      //           previousYearMonths[key].Subtotal2;
      //         const month = key;
      //         previousMonthlyData.push(monthExpenses);
      //         previousMonths.push(month + " " + previousYear);
      //         TotalmonthlyData.push(monthExpenses);
      //         Totalmonths.push(month + " " + previousYear);
      //       }
      //     }
      //   });
      //   console.log("DATA: ", { previousMonths, previousMonthlyData });
      //   resolve({ previousMonths, previousMonthlyData });
      // });

      const previousMonthsDataPromise = new Promise((resolve, reject) => {
        const previousMonths = [];
        const previousMonthlyData = [];

        const previousYearMonthsRef = ref(db, `users/${userId}/monthlyexpenses/${previousYear}`);
        onValue(previousYearMonthsRef, (snapshot) => {
          if (snapshot.exists) {
            const previousYearMonths = snapshot.val();
            for (const [key, value] of Object.entries(previousYearMonths)) {
              const monthExpenses =
                previousYearMonths[key].Subtotal1 +
                previousYearMonths[key].Subtotal2;
              const month = key;
              previousMonthlyData.push(monthExpenses);
              previousMonths.push(month + " " + previousYear);
              TotalmonthlyData.push(monthExpenses);
              Totalmonths.push(month + " " + previousYear);
            }
          }
        });
      
        resolve({ previousMonths, previousMonthlyData });
      });

      // ** Need to handle this things...
      // ** This thing is not working...

      let totalMonths;
      let totalMonthlyData;

      try {
        Promise.all([currentMonthsDataPromise, previousMonthsDataPromise]).then(
          ([currentYearData, previousYearData]) => {
            console.log("Total data: ", { Totalmonths, TotalmonthlyData });
            // ** Create the different graph data for the previous months
            const expensesBarData = {
              labels: Totalmonths.slice(0, 6),
              datasets: [
                {
                  label: "Budget",
                  data: Totalmonths.map((month) => totalBudget),
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                  label: "Expenses",
                  data: TotalmonthlyData.slice(0, 6),
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
              ],
            };
            setCurrentData(expensesBarData);
          }
        );
      } catch (err) {
        console.log(err);
      }

      // ** Create the different graph data for the previous months
      // const expensesBarData = {
      //   labels: months,
      //   datasets: [
      //     {
      //       label: "Budget",
      //       data: totalMonths.map((month) => totalBudget),
      //       backgroundColor: "rgba(255, 99, 132, 0.5)",
      //     },
      //     {
      //       label: "Expenses",
      //       data: totalMonthlyData,
      //       backgroundColor: "rgba(53, 162, 235, 0.5)",
      //     },
      //   ],
      // };
      // setCurrentData(expensesBarData);

      // ===================================================
    }
  };

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h4"
          style={{ fontWeight: "bold" }}
          className={classes.heading}
          onClick={handleShow}
        >
          Expenses{" "}
          {show ? (
            <KeyboardArrowDown fontSize="large" />
          ) : (
            <KeyboardArrowUp fontSize="large" />
          )}
        </Typography>
        <CustomButton
          className={classes.expensesbtn}
          onClick={() => setShowModal(true)}
        >
          <AddIcon fontSize="large" />
          Add Expense
        </CustomButton>
      </Box>
      <AddExpenseModal
        user={user}
        showModal={showModal}
        setShowModal={setShowModal}
        setUpdated={setUpdated}
      />
      {show && (
        <>
          {loading ? (
            <div className={classes.loader}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ marginTop: "1rem" }}
              >
                <span className={classes.title}>
                  <Typography variant="h5">Recommended Budget*</Typography>
                </span>
                <div className={classes.tabs}>
                  <div
                    className={`${classes.tab} monthly`}
                    onClick={() => {
                      setCurrentTab("monthly");
                      handlePreviousExpenses();
                    }}
                  >
                    <span>{tabLabel}</span>
                  </div>
                  <div
                    className={`${classes.tab} active current`}
                    onClick={() => {
                      setCurrentTab("current");
                      handleCurrentData();
                    }}
                  >
                    <span>Current</span>
                  </div>
                </div>
                <Link href="#" color="inherit">
                  Detailed view
                </Link>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                style={{ margin: "2rem 0" }}
              >
                <Typography
                  variant="body1"
                  style={{ fontWeight: "bold" }}
                  color="inherit"
                >
                  Balance: Rs. {balance.toLocaleString("en-IN")}
                </Typography>
              </Box>
              <Grid container spacing={3} style={{ marginTop: "1rem" }}>
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    alignItems="flex"
                    justifyContent="center"
                    height="300px"
                  >
                    <Doughnut
                      data={doughnutGraphData}
                      options={expensesDoughnutOptions}
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    sx={{ marginLeft: "15rem", marginTop: ".5rem" }}
                  >
                    <Link href="#" color="inherit">
                      Detailed view
                    </Link>
                  </Box>
                  <Typography
                    variant="body1"
                    color="inherit"
                    style={{ fontWeight: "bold" }}
                  >
                    Disclaimer *
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Bar data={currentData} options={expensesBarOptions} />
                  {/* <Box display="flex" justifyContent="center">
                <Typography
                  variant="body1"
                  style={{ fontWeight: "bold" }}
                  color="inherit"
                >
                  Balance: Rs. x,xx,xxx
                </Typography>
              </Box> */}
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
};
