import React from 'react'

// Material ui imports 
import { Typography, Box, makeStyles } from '@material-ui/core'

// ** Assests
import CLOCKVIDEO from "../../../assets/videos/ClockMoving.mp4"
import ContactForm from '../../../backend/contactForm/contactForm'
import { Hidden } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "120px",
    display: 'flex',
    [theme.breakpoints.down("md")]: {
      paddingTop: "60px"
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },

  leftSection: {
    width: "50%",
    display: "flex",
    justifyContent: "center"
  },

  rightSection: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    padding: "0 5%",
    justifyContent: "center",
    gap: "30px",

    [theme.breakpoints.down("md")]: {
      gap: "20px",
      margin: "60px 0"
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "40px 0"
    }
  },

  heading: {
    color: theme.palette.primary.main,
    fontSize: "32px",
    fontWeight: 800,
    textTransform: "uppercase",

    [theme.breakpoints.down("md")]: {
      fontSize: "24px",
    }
  },

  subheading: {
    fontSize: "24px",
     [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    }
  }
}))

export const Section6 = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Hidden smDown>
        <div className={classes.leftSection}>
          <video style={{ width: "80%" }} preload="auto" autoPlay loop muted>
            <source src={CLOCKVIDEO} type="video/mp4" />
          </video>
        </div>
      </Hidden>
      <div className={classes.rightSection}>
        <Typography variant="h3" className={classes.heading}>Talk to us to find out<br/>how we can help you.</Typography>
        <Typography variant="h4" className={classes.subheading}>We promise we won't spam your inbox :)</Typography>
        <ContactForm />
      </div>
    </div>
  )
}
