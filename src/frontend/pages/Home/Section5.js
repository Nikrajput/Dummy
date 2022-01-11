import React from "react";

// Material ui imports
import { Typography, Box, makeStyles, Link } from "@material-ui/core";

// Components
import Slider from "../../components/slider";

import {
  TESTIMONIALS,
  TESTMONIALS,
} from "../../../assets/testimonials/testimonials";
import { CustomButton } from "../../components/CustomButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  leftSection: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  leftInnerSection: {
    margin: "0 10%",

    [theme.breakpoints.down("sm")]: {
      margin: "0 5%",
    },
  },

  rightSection: {
    width: "50%",
    background: "#dcf6f5",
    padding: "120px 0",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "60px 0",
    },
  },

  innerContainer: {
    margin: "0 10%",
    display: "flex",
    flexDirection: "column",
    gap: "60px",

    [theme.breakpoints.down("md")]: {
      margin: "0 5%",
    },
  },

  heading: {
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: "32px",

    [theme.breakpoints.down("lg")]: {
      fontSize: "24px",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },

  rightHeading: {
    fontSize: "24px",
    lineHeight: 1.7,

    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },

  secondHeading: {
    fontSize: "24px",
    color: theme.palette.primary.main,
    fontWeight: 800,

    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },

  subheading: {
    fontSize: "24px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },

  link: {
    "&:hover": {
      color: "#fff",
      textDecoration: "none",
    },
  },
}));

export const Section5 = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.leftSection}>
        <div className={classes.leftInnerSection}>
          <Typography variant="h3" className={classes.heading}>
            Still Thinking, <br /> "do i really need this?"
          </Typography>
          <Slider items={TESTIMONIALS} />
        </div>
      </div>
      <div className={classes.rightSection}>
        <div className={classes.innerContainer}>
          <Typography variant="h4" className={classes.rightHeading}>
            In the world of finance, <br />
            the most expensive asset is time.
          </Typography>
          <Typography variant="h3" className={classes.secondHeading}>
            RETURN ON INVESTMENT = <br />
            (1 + ANNUAL RETURN) ^ TIME
          </Typography>
          <Box display="flex" flexDirection="column" sx={{ gap: 20 }}>
            <Typography variant="h4" className={classes.subheading}>
              Stop thinking, start doing!
            </Typography>
            <Box display="flex" justifyContent="flex-start">
              <Link target="_blank" href="https://api.whatsapp.com/send?phone=+917704047770&text=Hi BeFinSavvy, Can you please call me back?" className={classes.link}>
                <CustomButton>Talk to us now!</CustomButton>
              </Link>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};
