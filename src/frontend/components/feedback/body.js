import React from "react";

import { db } from "../../../firebase/firebase";

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
} from "reactstrap";

import { CustomButton } from "../CustomButton";
import { sendEmail } from "../../../utils/sendEmail";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "right",
    marginRight: "3rem",
    alignItems: "center",

    [theme.breakpoints.down("md")]: {
      marginRight: 0,
    },
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
    width: "30%",
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

export const FeedbackBody = ({ open, handleClose }) => {
  const classes = useStyles();

  // Need to implement the categories....

  const [email, setEmail] = React.useState("");
  const [feedback, setFeedback] = React.useState("");
  const [category, setCategory] = React.useState("bug");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [error, setError] = React.useState(false);

  const handleSetFeedbackValue = (e) => {
    setError(false);
    setFeedback(e.target.value);
  };

  const handleSaveFeedback = async () => {
    if (!feedback || feedback.length === 0) {
      setError(true);
      return;
    }
    const id = Date.parse(new Date());
    db.ref("feedbacks/" + id).set({
      email,
      feedback,
      category,
      phone,
      name,
      created_at: Date.parse(new Date()) / 1000,
    });

    const htmlTemplate = `<p>Email: ${email}</p>
			<p>Category: ${category}</p>
      <p>Feedback Message: ${feedback}</p>`;

    await sendEmail("Call Back Request", htmlTemplate);
    setName("");
    setFeedback("");
    setPhone("");
    setEmail("");
    setError(false);
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <Card className={classes.card}>
        <CardBody>
          <Typography variant="h3" component="h1" className={classes.heading}>
            Feedback
          </Typography>
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
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>Phone</Label>
                  <Input
                    type="number"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>Message</Label>
                  <Input
                    style={{ resize: "none" }}
                    type="textarea"
                    placeholder="Feedback Message"
                    value={feedback}
                    required={true}
                    invalid={error}
                    onChange={handleSetFeedbackValue}
                  />
                  {error && (
                    <FormFeedback>Feedback Message is Required</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col
                md="12"
                style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}
              >
                <CustomButton secondary onClick={handleClose}>
                  Cancel
                </CustomButton>
                <CustomButton onClick={handleSaveFeedback}>Submit</CustomButton>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </Modal>
  );
};
