import React from 'react'

import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.secondary.main,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "0.3rem 0",
    marginBottom: "1rem"
  },

  heading: {
    color: "#fff",
    fontWeight: 800,

    [theme.breakpoints.down("md")]: {
      fontSize: "18px"
    }
  }
}))

export const Heading = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.heading}>{children}</Typography>
    </div>
  )
}
