import React from "react";

// material ui imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },

  container: {
    height: "auto",
    border: "6px double #eee",
    padding: "1rem",
  },

  info: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },

  infoRight: {
    display: "flex",
    flexDirection: "column",
  },

  text: {
    fontSize: "1.3rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "1rem"
    }
  },

  messageContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginBottom: "1rem"
  },

  message: {
    fontSize: "1.3rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "1rem"
    }
  },

  footerMessage: {
    display: "flex",
    flexDirection: "column"
  },

  footerText: {
    fontSize: "1.3rem",
    lineHeight: 1.2,

    [theme.breakpoints.down("md")]: {
      fontSize: "1rem"
    }
  }
}));

export const Message = ({ firstName, age, mStatus, riskProfile}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.info}>
          <Typography variant="h4" component="h1" className={classes.text}>
            Dear {firstName},
          </Typography>
          <div className={classes.infoRight}>
            <Typography variant="h6" component="p" className={classes.text}>
              <b>Age:</b> {age} years
            </Typography>
            <Typography variant="h6" component="p" className={classes.text}>
              <b>Marital Status:</b> {mStatus}
            </Typography>
            <Typography variant="h6" component="p" className={classes.text}>
              <b>Risk Profile:</b> {riskProfile}
            </Typography>
          </div>
        </div>

        <div className={classes.messageContainer}>
          <Typography variant="h6" component="p" className={classes.message}>
            Thanks for trusting us with your information and choosing us as a
            partner in your journey towards achieving your financial goals.
          </Typography>
          <Typography variant="h6" component="p" className={classes.message}>
            As per our discussion, please find below the key recommendations.
          </Typography>
          <Typography variant="h6" component="p" className={classes.message}>
            Feel free to get in touch with us if you have any questions.
          </Typography>
          <Typography variant="h6" component="p" className={classes.message}>
            We wish you all the best on this journey!
          </Typography>
        </div>
        <div className={classes.footerMessage}>
          <Typography variant="h6" component="p" className={classes.footerText}>
            Best Wishes, <br />
            Ankit Agrawal <br />
            Co-Founder, BeFinSavvy
          </Typography>
        </div>
      </div>
    </div>
  );
};
