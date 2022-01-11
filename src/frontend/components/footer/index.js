import {
  makeStyles,
  Grid,
  Typography,
  Link,
  Divider,
  Button,
} from "@material-ui/core";
import React from "react";
import { WhatsApp } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import Social from "./Social";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: "2rem 0 1rem 0",
    background: theme.palette.primary.main,
  },

  head: {
    fontWeight: "600",
  },

  container: {
    width: "95%",
    margin: "auto",
  },

  branding: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& > div": {
      [theme.breakpoints.down("sm")]: {
        width: "fit-content",
        margin: "auto",
      },
    },
    [theme.breakpoints.down("sm")]: {
      height: "9rem",
    },
  },

  logo: {
    width: "40%",

    [theme.breakpoints.down("md")]: {
      width: "80%",
    },

    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
  },

  active: {
    color: theme.palette.secondary.main,
  },

  heading: {
    fontSize: "22px",
    fontWeight: 800,
    color: "white",
  },

  link: {
    color: "white",
    fontSize: "18px",

    "&:hover": {
      color: "white",
    },
  },

  talkBtn: {
    borderRadius: 50,
    background: theme.palette.secondary.main,
    padding: "6px 20px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    textTransform: "inherit",

    "& > span": {
      display: "flex",
      gap: 10,
    },

    "&:hover": {
      background: theme.palette.secondary.dark,
    },

    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1, 2),
      fontSize: "12px",
    },
  },

  rightContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      textAlign: "left",
      justifyContent: "flex-start",
    },
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div>
        <Grid container spacing={4} className={classes.container}>
          <Grid item xs={12} md={6} className={classes.branding}>
            {/* <Logo /> */}
            <Link href="/">
              <img
                className={classes.logo}
                src="/footerlogo.svg"
                alt="BeFinSavvy Logo"
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4} className={classes.rightContainer}>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h3"
                  component="h1"
                  className={classes.heading}
                  gutterBottom
                >
                  Company
                </Typography>
                <Link
                  component={NavLink}
                  to="/about"
                  className={classes.link}
                  // activeClassName={classes.active}
                >
                  <Typography gutterBottom>About Us</Typography>
                </Link>
                <Link
                  component={NavLink}
                  to="/services"
                  className={classes.link}
                  // activeClassName={classes.active}
                >
                  <Typography gutterBottom>Services</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h3"
                  component="h1"
                  className={classes.heading}
                  gutterBottom
                >
                  Resources
                </Typography>
                <Link
                  component={NavLink}
                  to="/risk-profile"
                  className={classes.link}
                  // activeClassName={classes.active}
                >
                  <Typography gutterBottom>Risk Profile</Typography>
                </Link>
                <Link
                  component={NavLink}
                  to="/financial-literacy"
                  className={classes.link}
                  // activeClassName={classes.active}
                >
                  <Typography gutterBottom>Financial Literacy</Typography>
                </Link>
                <Link
                  component={NavLink}
                  to="/faq"
                  className={classes.link}
                  // activeClassName={classes.active}
                >
                  <Typography gutterBottom>FAQs</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={4} className={classes.rightContainer}>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  className={classes.heading}
                >
                  Follow Us On
                </Typography>
                <Social />
                <Link
                  target="_blank"
                  className={classes.link}
                  href="tel:7704047770"
                >
                  <Typography>+91 7704047770</Typography>
                </Link>
                <Link
                  target="_blank"
                  className={classes.link}
                  href="mailto:hello@befinsavvy.com?body=Hi BeFinSavvy,  I am interested to learn more about you. Please send me information regarding... Thank you!&subject=New Message for BeFinSavvy!"
                >
                  <Typography gutterBottom>hello@befinsavvy.com</Typography>
                </Link>
                {/* <Link target="_blank"  href="https://api.whatsapp.com/send?phone=+917704047770&text=Hi BeFinSavvy, Can you please call me back?" className={classes.btnLink}>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.talkBtn}
                  >
                    Talk to us <WhatsApp />
                  </Button>
                </Link> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Typography align="center" style={{ marginTop: "1rem", color: "white" }}>
          Copyright Ⓒ {new Date().getFullYear()} BeFinSavvy
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
