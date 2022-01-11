import React from "react";

import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem auto",
  },

  heading: {
    fontWeight: "bold",

    [theme.breakpoints.down("md")]: {
      fontSize: "1.3rem"
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem"
    }
  },

  text: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem"
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: ".7rem"
    }
  }
}));

export const Disclaimer = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.heading} gutterBottom color="secondary">
        *Disclaimer:
      </Typography>
      <Typography variant="h5" className={classes.text}>
        BeFinSavvy is not a registered investment advisor or
        broker/ dealer. All financial/ investment opinions expressed are based
        on personal research and experience. All investments are subject to
        market risk. Please understand the associated risks properly before
        making any investment. Also note, we are not
        partnered/associated/affiliated with any platform/company for
        financial/investment products and hence offer completely unbiased
        advice. The recommended products names are inldued only for the purpose
        of reference and investors should feel free to explore similar products
        from any financial institutions that meet the investment objective.
      </Typography>
    </div>
  );
};
