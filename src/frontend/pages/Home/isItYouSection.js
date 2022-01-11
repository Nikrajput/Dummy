import React from "react";

// ** Material ui imports
import { Container, Box, Typography, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// ** Router
import { NavLink } from "react-router-dom";

// ** Assests
import isThisYouVid from "../../../assets/videos/IsThisYou.mp4";

// ** Components
import Accordion from "../../components/isThisYouSection/accordion";

// ** Material ui styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "120px 5%",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      margin: "30px 0 20px 0",
      padding: "30px 5%",
    },
  },
  accordionSection: {
    width: "50%",
    marginRight: "40px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginRight: 0,
    },
  },
  videoSection: {
    textAlign: "flex-end",
    width: "50%",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  customButton: {
    borderRadius: 50,
    background: theme.palette.primary.main,
    fontWeight: "bold",
    padding: "6px 40px",
    fontSize: "22px",
    textTransform: "inherit",
    fontWeight: 800,
    fontFamily: "Manrope",
    color: "white",

    "&:hover": {
      background: theme.palette.primary.light,
    },

    [theme.breakpoints.down("sm")]: {
      padding: "6px 20px",
      fontSize: "14px",
    },
  },
  heading: {
    fontSize: "32px",
    fontWeight: 800,
    marginBottom: "20px",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      fontSize: "32px",
    },
  },
  subheading: {
    fontSize: "24px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },
  video: {
    width: "75%",

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },

  link: {
    "&:hover": {
      color: "#fff",
      textDecoration: "none",
    },
  },
}));

// ** Accordation questions
const accordationQuestions = [
  {
    summary: "Making decent money, still feeling poor.",
    details:
      "Salary vanishes soon after it hits the account. Where does it go?!",
  },
  {
    summary: "Talking to friends & family about finances is tough.",
    details:
      "Never had any formal or informal financial education. Also, parents are clueless about managing money!",
  },
  {
    summary: "Feeling stuck in a cycle of loans & no savings.",
    details:
      "Don’t know how loans work, the principles of banking, interest rates etc. Don’t know how to secure my future!",
  },
  {
    summary: "Investing randomly with no structured plan.",
    details:
      "Overwhelmingly different opinions out there, don’t know if I’m on the right track. It’s an emotional roller coaster led by FOMO!",
  },
];

export const IsItYouSection = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Box className={classes.accordionSection}>
          <Typography variant="h1" className={classes.heading}>
            Is this you?
          </Typography>
          <Box style={{ background: "#fafafa"}}>
            <Accordion questions={accordationQuestions} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ marginTop: "40px", gap: 20 }}
          >
            <Typography
              variant="h3"
              color="primary"
              className={classes.heading}
            >
              We feel you.
            </Typography>
            <Typography variant="h4" className={classes.subheading}>
              Start by checking where you stand
            </Typography>
            <Box display="flex" justifyContent="flex-start">
              <Link href="financial-literacy" className={classes.link}>
                <Button
                  variant="contained"
                  className={classes.customButton}
                  disableElevation
                >
                  Test your financial literacy
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box className={classes.videoSection}>
          <video className={classes.video} preload="auto" autoPlay loop muted>
            <source src={isThisYouVid} type="video/mp4" />
          </video>
        </Box>
      </div>
    </>
  );
};
