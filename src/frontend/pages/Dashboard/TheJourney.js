import React from "react";

import {
  Typography,
  makeStyles,
  Grid,
  Box,
  Divider,
  Link,
} from "@material-ui/core";

import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'

import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3rem",
    marginBottom: "2rem",
  },

  heading: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: 10,

    "&::before": {
      content: '""',
      display: "block",
      height: "3rem",
      width: ".5rem",
      background: theme.palette.primary.main
    }
  },

  box: {
    marginTop: "1rem",
    borderLeft: "1px solid black",
    borderBottom: "1px solid black",
    height: "400px",
    display: "flex",
    alignItems: "flex-end",
    padding: "2rem",
    justifyContent: "space-between",
  },
}));

export const TheJourney = () => {
  const classes = useStyles();

  const [show, setShow] = React.useState(true);

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        className={classes.heading}
        onClick={handleShow}
      >
        The Journey { show ? <KeyboardArrowDown fontSize="large" /> : <KeyboardArrowUp fontSize="large" />}
      </Typography>
      {show && (
        <>
          <div className={classes.box}>
            <StarIcon color="primary" style={{ fontSize: "4rem" }} />
            <StarIcon color="primary" style={{ fontSize: "4rem" }} />
            <StarIcon color="primary" style={{ fontSize: "4rem" }} />
            <StarIcon color="primary" style={{ fontSize: "4rem" }} />
            <StarIcon
              color="primary"
              style={{ fontSize: "4rem", color: "#ffff45" }}
            />
            <StarIcon
              color="primary"
              style={{ fontSize: "4rem", color: "#ffff45" }}
            />
            <StarIcon
              color="primary"
              style={{ fontSize: "4rem", color: "#ffff45" }}
            />
            <StarIcon
              color="primary"
              style={{ fontSize: "4rem", color: "#ffff45" }}
            />
            <StarIcon
              color="primary"
              style={{ fontSize: "4rem", color: "#ffff45" }}
            />
            <StarIcon
              color="primary"
              style={{ fontSize: "4rem", color: "#ffff45" }}
            />
          </div>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: "1.5rem", padding: "0 2rem" }}
          >
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Savings
            </Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Accounts
            </Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Liquidity
            </Typography>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", width: "10%" }}
            >
              Emergency Funds
            </Typography>
            <Box width="20%" flexDirection="column">
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ padding: "0 1.5rem" }}
              >
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  Life
                </Typography>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  Health
                </Typography>
              </Box>
              <Divider style={{ height: "2px", background: "black" }} />
              <Typography
                variant="h5"
                style={{ fontWeight: "bold", textAlign: "center" }}
              >
                Coverage
              </Typography>
            </Box>

            <Box width="40%" flexDirection="column">
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ padding: "0 1rem" }}
              >
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  ST Goal 1
                </Typography>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  ST Goal 2
                </Typography>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  LT Goal 1
                </Typography>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  LT Goal 2
                </Typography>
              </Box>
              <Divider style={{ height: "2px", background: "black" }} />
              <Typography
                variant="h5"
                style={{ fontWeight: "bold", textAlign: "center" }}
              >
                Investments
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};
