import React from "react";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// ** Material Imports
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  accHeading: {
    [theme.breakpoints.up("md")]: {
      fontSize: "22px"
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "18px"
    },
  },

  accHeadingLarge: {
    fontSize: "30px",
    fontWeight: 800,
    fontFamily: "Nunito",

    [theme.breakpoints.down("md")]: {
      fontSize: "24px"
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "18px"
    }
  },

  accDetail: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px"
    }
  },

  accDetailLarge: {
    fontSize: "20px",

    [theme.breakpoints.down("md")]: {
      fontSize: "18px"
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "16px"
    }
  },

  paper: {
    background: "#fafafa"
  }


}))

export default function BFSAccordion(props) {
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    setExpanded(0);
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles()

  return (
    props.questions &&
    props.questions.map((question, key) => {
      const isActive = expanded === key;
      return (
        <Accordion
          classes={{ paper: classes.paper}}
          className="questionItem"
          style={{ paddingTop: 0,  background: "#fafafa" }}
          expanded={isActive}
          onChange={handleChange(key)}
          key={key}
        >
          <AccordionSummary
          style={{ background: "#fafafa" }}
            expandIcon={<ExpandMoreIcon color="primary" fontSize="medium" />}
          >
            <Typography variant="h5" component="h3"
              className={`${props.summaryClasses} ${
                isActive && "primaryColor"
              } ${props.fontSize === "large" ? classes.accHeadingLarge :  classes.accHeading}`}
            >
              {question.summary}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ background: "#fafafa" }}>
            <Typography variant="body1" component="p" className={`accordionText secondaryFont greyText ${props.fontSize === "large" ? classes.accDetailLarge : classes.accDetail}`}>
              {question.details}
            </Typography>
          </AccordionDetails>
        </Accordion>
      );
    })
  );
}
