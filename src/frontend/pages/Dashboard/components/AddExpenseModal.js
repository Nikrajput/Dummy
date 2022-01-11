import React from "react";

import { db, auth } from "../../../../firebase/firebase";
import {
  ref,
  push,
  set,
  query,
  equalTo,
  get,
  orderByKey,
  update,
  onValue,
  orderByChild,
} from "firebase/database";

import {
  Drawer,
  makeStyles,
  Typography,
  Box,
  TextField,
} from "@material-ui/core";
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Input,
  FormFeedback,
  FormGroup,
} from "reactstrap";

import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Description as DescriptionIcon,
  AttachMoney as AttachMoneyIcon,
  Note as NoteIcon,
  Today as TodayIcon,
  Home as HomeIcon,
} from "@material-ui/icons";
import { CustomButton } from "../../../components/CustomButton";

import { toast, Slide } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    width: "480px",
  },

  icon: {
    border: "1px solid #495057",
    padding: ".45rem",
    borderRadius: ".25rem",
  },

  savebtn: {
    padding: "0.125rem 2rem",
  },

  datepickr: {
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    height: "2.25rem",
    cursor: "pointer",
    padding: "0.375rem 0.75rem",
    color: "#111",
  },
}));

const options = [
  { value: "Rent", label: "Rent" },
  { value: "Bills", label: "Bill" },
  { value: "Groceries", label: "Groceries" },
  { value: "Transport", label: "Transport" },
  { value: "Medical", label: "Medical and Insurance" },
  { value: "Domestic", label: "Domestic Help" },
  { value: "Emi", label: "EMI" },
  { value: "Shopping", label: "Shopping" },
  { value: "Gym", label: "Gym / Spa / Salon" },
  { value: "Entertainment", label: "Entertainment / Dining in / Out" },
  { value: "Subscription", label: "Subscription" },
  { value: "Others", label: "Others" },
];

const newMonthData = {
  Savings: 0,
  Bills: 0,
  Domestic: 0,
  Emi: 0,
  Entertainment: 0,
  Groceries: 0,
  Gym: 0,
  Medical: 0,
  Others: 0,
  Rent: 0,
  Shopping: 0,
  Subscription: 0,
  Transport: 0,
  Subtotal1: 0,
  Subtotal2: 0
};

const needs = ["Bills", "Groceries", "Rent", "Transport", "Medical", "Domestic", "Emi"];
const wants = ["Shopping", "Gym", "Entertainment", "Subscription"];

const ToastContent = ({ msg }) => {
  const classes = useStyles();
  return (
    <>
      <div className="toastify-body">
        <span>{msg}</span>
      </div>
    </>
  );
};

export const AddExpenseModal = ({
  showModal,
  setShowModal,
  setUpdated,
  user,
}) => {
  const classes = useStyles();
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [note, setNote] = React.useState("");
  const [error, setError] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [category, setCategory] = React.useState("");

  React.useEffect(() => {
    if (user) {
      const id = user.uid;
      setUserId(id);
    }
  }, [user]);

  const handleClose = () => {
    const confirm = window.confirm("Are you sure you want to close.");
    if (confirm) {
      setShowModal(false);
      setError(false);
    }
  };

  const handleSaveExpense = async () => {
    if (date === "" || amount === "" || category === "") {
      setError(true);
      toast.error(<ToastContent msg="Please fill all the required fields" />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }
    const today = new Date();
    const data = {
      category,
      date: Date.parse(date) / 1000,
      amount,
      note,
      created_at: Date.parse(today) / 1000,
      current_month: today.toLocaleString("default", { month: "long" }),
    };

    console.log(data);

    try {
      // ** Added the expense to the user's expenses list
      const expensesRef = ref(db, `users/${userId}/expenses`);
      const newExpense = push(expensesRef);
      set(newExpense, data);

      // ** Get the current year
      const expensesYear = new Date(date).getFullYear();

      // ** Get the current month
      const expensesMonth = new Date(date).toLocaleString("default", { month: "long" });

      // ** Get the current month of the year expenses data
      const currentMonthExpensesRef = ref(
        db,
        `users/${userId}/monthlyexpenses/${expensesYear}/${expensesMonth}`
      );

      // ** Check if the thing data exists or not
      const currentMonthExpensesData = await get(currentMonthExpensesRef);

      if (currentMonthExpensesData.val() !== null) {
        const data = currentMonthExpensesData.val();
        let newData;

        // ** update the total amounts
        if (needs.includes(category)) {
          const Subtotal1 = data.Subtotal1 + parseInt(amount);
          newData = {
            ...data,
            [category]: data[category] + parseInt(amount),
            Subtotal1
          };
        } else if (wants.includes(category)) {
          const Subtotal2 = data.Subtotal2 +  parseInt(amount);
          newData = {
            ...data,
            [category]: data[category] + parseInt(amount),
            Subtotal2
          };
        }

        update(currentMonthExpensesRef, newData);
      } else {
        const monthlyData = newMonthData;
        monthlyData[category] = parseInt(amount);

        if (needs.includes(category)) {
          monthlyData.Subtotal1 = monthlyData.Subtotal1 + parseInt(amount);
        } else if (wants.includes(category)) {
          monthlyData.Subtotal2 = monthlyData.Subtotal2 + parseInt(amount);
        }

        console.log("Data: ", monthlyData);
        set(currentMonthExpensesRef, monthlyData);
      }

      toast.success(<ToastContent msg={"Expense added successfully"} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });

      setUpdated(true);

      setError(false);

      setDescription("");
      setAmount("");
      setNote("");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      toast.error(<ToastContent msg={"Something wrong happened"} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  };

  return (
    <Drawer
      anchor="right"
      open={showModal}
      onClose={handleClose}
      classes={{ paper: classes.drawerPaper }}
    >
      <Card style={{ boxShadow: "none", border: "none", height: "100%" }}>
        <CardBody style={{ boxShadow: "none" }}>
          <Box display="flex" alignItems="center" sx={{ marginBottom: "2rem" }}>
            <Button color="none">
              <KeyboardBackspaceIcon fontSize="large" onClick={handleClose} />
            </Button>
            <Typography variant="h4">Add Expense</Typography>
          </Box>

          <Row>
            <Col md={12} style={{ marginBottom: "1rem" }}>
              <Box display="flex" alignItems="flex-start" sx={{ gap: 10 }}>
                <div className={classes.icon}>
                  {description.toLowerCase().includes("home") ? (
                    <HomeIcon />
                  ) : (
                    <DescriptionIcon />
                  )}
                </div>
                <FormGroup style={{ width: "100%" }}>
                  <Select
                    options={options}
                    placeholder="Select Category *"
                    onChange={(newValue) => setCategory(newValue.value)}
                  />
                  {error && <FormFeedback>Category Required</FormFeedback>}
                </FormGroup>
              </Box>
            </Col>
            <Col md={12} style={{ marginBottom: "2rem" }}>
              <Box display="flex" alignItems="flex-start" sx={{ gap: 10 }}>
                <div className={classes.icon}>
                  <NoteIcon />
                </div>
                <Input
                  placeholder="Enter a note"
                  type="textarea"
                  style={{ resize: "none" }}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Box>
            </Col>
            <Col md={12} style={{ marginBottom: "1rem" }}>
              <Box display="flex" alignItems="flex-start" sx={{ gap: 10 }}>
                <div className={classes.icon}>
                  <TodayIcon />
                </div>
                <FormGroup style={{ width: "100%" }}>
                  <Flatpickr
                    className={classes.datepickr}
                    options={{ dateFormat: "d-M-Y" }}
                    id="default-picker"
                    value={date}
                    placeholder="Select date *"
                    onChange={(date) => setDate(date)}
                  />
                  {error && <FormFeedback>Date Required</FormFeedback>}
                </FormGroup>
              </Box>
            </Col>
            <Col md={12} style={{ marginBottom: "1rem" }}>
              <Box display="flex" alignItems="flex-start" sx={{ gap: 10 }}>
                <div className={classes.icon}>
                  <AttachMoneyIcon />
                </div>
                <FormGroup style={{ width: "100%" }}>
                  <Input
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    invalid={error && amount.length === 0}
                  />
                  {error && <FormFeedback>Amount Required</FormFeedback>}
                </FormGroup>
              </Box>
            </Col>
          </Row>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ marginTop: "2rem", gap: 10 }}
          >
            <CustomButton
              className={classes.savebtn}
              onClick={handleClose}
              varaint="outlined"
              style={{ color: "#4ED0CE" }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              className={classes.savebtn}
              onClick={handleSaveExpense}
            >
              Save
            </CustomButton>
          </Box>
        </CardBody>
      </Card>
    </Drawer>
  );
};
