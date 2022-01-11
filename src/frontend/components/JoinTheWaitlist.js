import React from "react";

import { db } from "../../firebase/firebase";
import {
  ref,
  set,
  orderByChild,
  equalTo,
  query,
  get,
  push
} from "firebase/database";

import {
  TextField,
  Button,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import {
  Card,
  CardBody,
  Input,
  Label,
  FormGroup,
  Row,
  Col,
  FormFeedback,
  Alert,
} from "reactstrap";

import { CustomButton } from "./CustomButton";

import { sendEmail } from "../../utils/sendEmail";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: theme.palette.secondary.main,
    fontWeight: 800,
    fontSize: "2rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "1.6rem",
    },
  },

  card: {
    width: "40%",
    height: "auto",

    [theme.breakpoints.down("md")]: {
      width: "80%",
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  body: {
    marginTop: "1rem",
  },

  btn: {
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "Manrope",
    letterSpacing: 1,
  },
}));

export const JoinTheWaitlist = ({ open, handleClose }) => {
  const classes = useStyles();

  // Need to implement the categories....

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const [error, setError] = React.useState(false);
  const [alreadyInWaitlist, setAlreadyInWaitlist] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = setTimeout(() => {
      setAlreadyInWaitlist(false);
    }, 3000);

    return unsubscribe;
  }, [alreadyInWaitlist === true]);

  const handleJoinWaitlist = async () => {
    if (!email || email.length === 0) {
      setError(true);
      return;
    }

    const waitlistsRef = ref(db, `waitlists/`);

    const user = await get(
      query(waitlistsRef, orderByChild("email"), equalTo(email))
    );

    if (user.val() !== null) {
      setAlreadyInWaitlist(true);
      return;
    }

    const newWaitlistUser = push(waitlistsRef)

    set(newWaitlistUser, {
      email,
      name,
      has_consultation: false,
      waitlist_joined: Date.parse(new Date()) / 1000,
      created_at: Date.parse(new Date()) / 1000,
      updated_at: Date.parse(new Date()) / 1000,
    });

    setName("");
    setEmail("");
    handleClose();
    
    // ** Send the email to the cofounders
    const userName = name ? name : "New User";
    const htmlTemplate = `
    <h3>New User has joined the Wait List</h3>
    <p>Name: ${userName} </p>
    <p><b>Email: </b> <i>${email}</i> </p>
    `;
    await sendEmail(`${userName} has joined the Wait List.`, htmlTemplate)
    
    return;
  };

  const handleCloseThing = () => {
    setError(false);
    setEmail("");
    setName("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleCloseThing} className={classes.modal}>
      <Card className={classes.card}>
        <CardBody>
          <Typography variant="h3" component="h1" className={classes.heading}>
            Join The Waitlist
          </Typography>
          {/* <Typography variant="h6">Currently the Registration for opening an account has been suspended. If you still want to get an account you have to join the waitlist and the rest of the details will be shared to you through the mail.</Typography> */}

          {alreadyInWaitlist && (
            <Alert color="danger">You have already joined the Waitlist</Alert>
          )}
          <div className={classes.body}>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>
                    Email<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    invalid={error}
                    onChange={(e) => {
                      setError(false);
                      setEmail(e.target.value);
                    }}
                  />
                  {error && <FormFeedback>Email Required</FormFeedback>}
                </FormGroup>
              </Col>
              <Col
                md="12"
                style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}
              >
                <CustomButton secondary onClick={handleCloseThing}>
                  Cancel
                </CustomButton>
                <CustomButton onClick={handleJoinWaitlist}>
                  Join the waitlist
                </CustomButton>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </Modal>
  );
};
