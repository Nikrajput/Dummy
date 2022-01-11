import React, { useState, useEffect } from "react";

import {
  makeStyles,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import {
  FormGroup,
  Label,
  Input,
  Form,
  Row,
  Col,
  CustomInput,
  Alert,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";

import { auth } from "../../../firebase";
import { auth as firebaseAuth } from "../../../firebase/firebase";

import { handleAuthError } from "./handleAuthError";
import SEO from "../../components/seo";

import { CustomButton } from "../../components/CustomButton";

const useStyles = makeStyles((theme) => ({
  main: {
    position: "relative",
  },

  logoContainer: {
    position: "absolute",
    top: 10,
    left: 20,

    "& > img": {
      height: "60px",
    },

    [theme.breakpoints.down("sm")]: {
      "& > img": {
        height: "40px",
      },
    },
  },

  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
  },

  heading: {
    fontSize: "2rem",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },

  formSection: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    positon: "relative",

    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: "0 5%",
    },
  },

  loader: {
    zIndex: 3,
    position: "absolute",
    background: theme.palette.primary.light,
    width: "50%",
    opacity: 0.3,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },

  formContainer: {
    width: "50%",

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },

  form: {
    margin: "2rem 0",
  },

  checkboxSection: {
    marginLeft: "1.3rem",
    // display: "flex",
    // alignItems: "center"
  },

  loginButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "1rem",
  },

  signupText: {
    color: "gray",
    textAlign: "center",

    "& > span": {
      color: "black",
      fontWeight: "bold",
      marginLeft: "0.5rem",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },

  // ** Image Section **
  imageSection: {
    width: "50%",
  },

  imageContainer: {
    position: "relative",
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  imageOverlayTextContainer: {
    zIndex: 2,
    position: "absolute",
    top: "80%",
    display: "flex",
    justifyContent: "center",
  },

  overlayInnerContainer: {
    width: "80%",
    padding: "1rem 2rem",
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur(4px)",
    "-webkit-backdrop-filter": "blur(4px)",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    color: "white",
  },

  loginUsing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const mediumDevice = useMediaQuery(theme.breakpoints.down("md"));

  // ** State
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (firebaseAuth.currentUser && firebaseAuth.currentUser.uid) {
      history.push("/my-profile");
    }
  }, []);

  useEffect(() => {
    const timer = () => {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    };

    return timer;
  }, [errorMessage]);

  // ** Login Functions
  const handleSignup = () => {
    setIsLoading(true);
    auth
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
        setReset(true);
        setIsLoading(false);
      })
      .catch((err) => {
        const error = handleAuthError(err);
        setErrorMessage(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <SEO title="Reset Password" />
      <div className={classes.main}>
        <Link to="/">
          <div className={classes.logoContainer}>
            <img src="/headerlogo.svg" alt="BeFinSavvy Beta Logo" />
          </div>
        </Link>
      </div>
      <div className={classes.root}>
        <section className={classes.formSection}>
          {isLoading && (
            <div className={classes.loader}>
              <CircularProgress color="inherit" size={60} />
            </div>
          )}
          {!reset ? (
            <div className={classes.formContainer}>
              <Typography variant="h4" className={classes.heading}>
                Reset your password
              </Typography>
              <Typography variant="h6">Please enter your details.</Typography>
              <Form className={classes.form}>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                <Row>
                  <Col sm={12}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        style={{ height: "42px" }}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className={classes.loginButtons}>
                  <Col sm={12}>
                    <CustomButton
                      disableElevation
                      variant="contained"
                      fullWidth
                      onClick={handleSignup}
                    >
                      Send Reset Link
                    </CustomButton>
                  </Col>
                </Row>
              </Form>
              <Typography variant="h6" className={classes.signupText}>
                Don't have an account?
                <span>
                  <Link to="/signup" style={{ color: "black" }}>
                    Sign up
                  </Link>
                </span>
              </Typography>
            </div>
          ) : (
            <div className={classes.formContainer}>
              <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "1rem" }} color="secondary">
                We have successfully send you a reset email. Please check your
                email and reset the password
              </Typography>
              <Typography variant="h6" className={classes.signupText}>
                Changed the password!
                <span>
                  <Link to="/signin" style={{ color: "black" }}>
                    Sign in
                  </Link>
                </span>
              </Typography>
            </div>
          )}
        </section>
        {!mediumDevice && (
          <section className={classes.imageSection}>
            <div className={classes.imageContainer}>
              <img
                className={classes.image}
                src={require("../../../assets/images/loginpageimg.jpg").default}
                alt=""
              />
              {/* <div className={classes.imageOverlayTextContainer}>
                <div className={classes.overlayInnerContainer}>
                  <Typography variant="h4" style={{ fontWeight: "bold" }}>
                    "We've always been using Untitled to kick start every new
                    project and can't imagine working without it"
                  </Typography>
                </div>
              </div> */}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
