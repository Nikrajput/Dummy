import React from 'react'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    right: -50,
    top: "50%",
    zIndex: 10,
  },

  feedbackButton: {
    background: theme.palette.secondary.main,
    padding: "10px 20px",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    textTransform: "uppercase",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    boxShadow: "none",
    border: "none",
    transform: "rotate(-90deg)",
    transition: "0.3s ease-in-out",

    [theme.breakpoints.down("sm")]: {
      fontSize: "16px"
    }
  }
}))

export const FeedbackButton = ({ setOpen }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <button className={classes.feedbackButton} onClick={() => setOpen(true)}>Feedback</button>
    </div>
  )
}
