import React, { useState, useEffect } from "react";

// ** Material ui imports
import { Box, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// ** Thridparty imports
import ReactTextTransition, { presets } from "react-text-transition";

// ** Assests
import heroVideo from "../../../assets/videos/HeroVideo.mp4";
import { Button } from "@material-ui/core";

// ** Material ui styles
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  overlayContainer: {
    position: "absolute",
    top: "0",
    width: "45%",
    height: "100%",
    marginTop: "40px",
    color: "#fff",
    padding: "10vh 0 10vh 10vh",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-around",

    "@media (min-widht: 962px) and (max-widht: 1210px)": {},

    [theme.breakpoints.down("lg")]: {
      width: "60%",
    },

    [theme.breakpoints.down("md")]: {
      padding: "0 5%",
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  videoSection: {
    width: "100%",
    height: "100vh",
    objectFit: "cover",
  },

  mediumVideo: {
    widht: "100%",
    overflow: "hidden",
  },

  heading: {
    textTransform: "uppercase",
    fontSize: "56px",
    fontWeight: "bold",

    [theme.breakpoints.down("lg")]: {
      fontSize: "40px",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "32px",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
    },
  },
  textRevel: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },

  heading2: {
    fontSize: "32px",
    fontWeight: 600,

    [theme.breakpoints.down("lg")]: {
      fontSize: "24px",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
  },

  customButton: {
    borderRadius: 50,
    background: theme.palette.primary.main,
    fontWeight: 800,
    textTransform: "inherit",
    padding: "6px 40px",
    fontSize: "20px",
    color: "#fff",

    "&:hover": {
      background: theme.palette.primary.light,
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
      padding: "6px 20px",
    },
  },
  subHeading: {
    fontSize: "24px",
    lineHeight: 1.5,
    fontFamily: "Manrope",
    fontWeight: 600,

    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },

  link: {
    "&:hover": {
      color: "#fff",
      textDecoration: "none"
    }
  }
}));

const TEXTS = [
  "optimizing expenses",
  "managing investments",
  "financial freedom",
  "saving taxes",
  "repaying loans",
  "planning insurance",
];

const TextRevel = () => {
  const [textIndex, setTextIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTextIndex((textIndex) => textIndex + 1);
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [textIndex]);

  return (
    <ReactTextTransition
      text={TEXTS[textIndex % TEXTS.length]}
      springConfig={presets.gentle}
      className={classes.textRevel}
      inline
    />
  );
};

export const HeroSection = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <video className={classes.videoSection} preload="auto" autoPlay loop muted>
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className={classes.overlayContainer}>
        <Box display="flex" flexDirection="column" sx={{ gap: 20 }}>
          <Typography variant="h1" className={classes.heading}>
            Your personal coach <br />
            for financial fitness
          </Typography>
          <Typography variant="h4" className={classes.heading2}>
            To help you with <TextRevel />
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" sx={{ gap: 20 }}>
          <Typography variant="h4" className={classes.heading2}>
            Ready to explore?
          </Typography>
          <Box display="flex" justifyContent="flex-start">
            <Link href="/services" className={classes.link}>
              <Button
                variant="contained"
                disableElevation
                className={classes.customButton}
              >
                Check out our services!
              </Button>
            </Link>
          </Box>
          <Typography variant="h4" className={classes.subHeading}>
            Life's not meant to be spent worrying about the storm,
            <br />
            it's meant to be prepared for dancing in the rain!
          </Typography>
        </Box>
      </div>
    </div>
  );
};
