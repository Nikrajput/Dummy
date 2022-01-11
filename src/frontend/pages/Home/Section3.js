import React from "react";

// Material ui imports
import {
  makeStyles,
  Typography,
  Box,
  Button,
  Hidden,
  useTheme,
  useMediaQuery,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: theme.palette.primary.main,
    alignItems: "center",
    padding: "120px 5%",
    gap: "90px",

    [theme.breakpoints.down("md")]: {
      padding: "60px 5%",
      gap: "40px",
    },

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: "60px 5%",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "30px",
    },
  },

  firstSection: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    gap: "60px",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  secondSection: {
    width: "50%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  heading: {
    color: "white",
    lineHeight: 1.5,
    fontSize: "32px",
    fontWeight: 800,
    textTransform: "uppercase",

    [theme.breakpoints.down("lg")]: {
      fontSize: "24px",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },

  subheading: {
    fontSize: "24px",
    fontWeight: 600,

    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  customButton: {
    borderRadius: 50,
    background: "transparent",
    border: "1px solid white",
    fontWeight: "bold",
    padding: "6px 50px",
    fontSize: "22px",
    textTransform: "inherit",
    fontWeight: 800,
    fontFamily: "Manrope",
    color: "white",
    transition: "0.3s ease-in-out",

    "&:hover": {
      background: "white",
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.down("sm")]: {
      padding: "10px 20px",
      fontSize: "14px",
    },
  },
  text: {
    fontSize: "24px",
    lineHeight: 1.5,
    color: "white",

    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },

  link: {
    "&:hover": {
      color: "#fff",
      textDecoration: "none",
    },
  },
}));

export const Section3 = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mediumDown = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className={classes.root}>
      <div className={classes.firstSection}>
        <Typography variant="h1" className={classes.heading}>
          Reach your financial goals faster <br /> with your dedicated coach
        </Typography>
        <Hidden smDown>
          <Box display="flex" flexDirection="column" sx={{ gap: 20 }}>
            <Typography
              variant="h4"
              component="p"
              className={classes.subheading}
            >
              Your coach wants to know, how fast you can go.
            </Typography>
            <Box display="flex" justifyContent="flex-start">
              <Link href="risk-profile" className={classes.link}>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.customButton}
                >
                  Check your risk profile
                </Button>
              </Link>
            </Box>
          </Box>
        </Hidden>
      </div>
      <Box className={classes.secondSection}>
        <Typography variant="body1" className={classes.text}>
          You and your dedicated personal coach will create a plan that's
          tailored to your financial goals and risk profile—and together, you'll
          work to unlock the results you want. At every step of the way, you'll
          be guided by an experienced coach who tracks the latest developments
          in the financial world to keep you ahead of the curve.
        </Typography>
      </Box>
      {mediumDown && (
        <>
          <Box display="flex" flexDirection="column" sx={{ gap: 20 }}>
            <Typography
              variant="h4"
              component="p"
              className={classes.subheading}
            >
              Your coach wants to know, how fast you can go.
            </Typography>
            <Box display="flex" justifyContent="flex-start">
              <Link href="risk-profile" className={classes.link}>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.customButton}
                >
                  Check your risk profile
                </Button>
              </Link>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};
