import React from 'react'

// ** Material ui imports
import { Typography, Box, makeStyles, Link } from '@material-ui/core'

// ** Assests
import image from "../../../assets/images/yourCoachImage.jpg";

// ** Components
import Accordion from '../../components/isThisYouSection/accordion';
import { CustomButton } from '../../components/CustomButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    // gap: "90px",
    margin: "120px 0",

    [theme.breakpoints.down("lg")]: {
      gap: "40px"
    },

    [theme.breakpoints.down("md")]: {
      gap: "20px",
    },

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column" ,
      margin: "60px 0"  
    }
  },

  imgContainer: {
    width: "50%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    }
  },
  
  image: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "50%"
    }
  },

  otherSection: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: 60,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      // padding: "0 5%",
      gap: 30
    }
  },

  innerContainer: {
    padding: "0 10%",

    [theme.breakpoints.down("md")]: {
      padding: "0 5%"
    }
  },

  heading: {
    fontSize: "24px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "18px"
    }
  },

   link: {
    "&:hover": {
      color: "#fff",
      textDecoration: "none"
    }
  }
}))

const accData = [
  {
    summary: "YOUR COACH.",
    details:
      "It all starts with you and your coach. Your expert coach will design a plan according to your unique goals, lifestyle, and preferences. We believe results are not a nice-to-have - they’re everything.",
  },
  {
    summary: "THEIR EXPERTISE.",
    details:
      "Your coach is an insider of the financial world. They will educate you on how to protect yourself from the traps set by the financial ecosystem.",
  },
  {
    summary: "YOUR DISCIPLINE.",
    details:
      "What gets measured, gets achieved. Your coach will help you stay on track and thoughtfully challenge you to ensure you are always making progress.",
  },
];


 const renderSection4Left = () => {
    return (
      <div className="section4Left">
        <picture>
          <img
            src={section4CoachImageJPG}
            alt="Your Coach"
            width="100%"
            className="section4Image"
          />
        </picture>
      </div>
    );
  };

  const renderSection4Right = () => {
    return (
      <div className="section4Right">
        <div className="innerSection4Right">
          <Accordion
            questions={SECTION4_ACCORDION}
            summaryClasses="section4Summary"
          />
          <div className="mgt64 secondaryFont subheading">
            Ready to meet your coach?
          </div>
          <Button
            variant="contained"
            style={PRIMARY_BUTTON}
            color="primary"
            className="mgt16"
            component={NavLink}
            to="/signin"
            tag={Link}
          >
            <div className="primaryFont700 white primaryButtonText">
              Get started now!
            </div>
          </Button>
        </div>
      </div>
    );
  };

export const Section4 = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        <img src={image} alt="Your coach" className={classes.image}/>
      </div>
      <div className={classes.otherSection}>
        <div className={classes.innerContainer}>
          <div>
            <Accordion questions={accData} fontSize="large" />
          </div>
          <Box display="flex" flexDirection="column" sx={{ gap: 20, marginTop: "2rem" }} >
            <Typography variant="h4" className={classes.heading}>Ready to meet your coach?</Typography>
            <Box display="flex" justifyContent="flex-start">
              <Link href="signin" className={classes.link}>
                <CustomButton>Get started now!</CustomButton>
              </Link>
            </Box>
          </Box>
        </div>
        </div>
    </div>
  )
}
