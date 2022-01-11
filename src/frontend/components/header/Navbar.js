import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Popover,
  makeStyles,
  useTheme,
  Button,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Link as MLink,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";

import WhatsAppIcon from "@material-ui/icons/WhatsApp";

import { auth } from "../../../firebase/firebase";
import { CustomButton } from "../CustomButton";
import { JoinTheWaitlist } from "../JoinTheWaitlist";

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: "none",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(8px)",
  },
  navbar: {
    margin: "0 60px",
    boxShadow: "none",
    [theme.breakpoints.down("md")]: {
      margin: "0 5px",
    },
  },
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(2),
    },
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  logoImg: {
    height: "65px",

    [theme.breakpoints.down("sm")]: {
      height: "40px",
    },
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "18px",
    fontWeight: "bold",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
  popoverLink: {
    textDecoration: "none",
    color: "black",
    fontSize: "18px",
    fontWeight: 800,
    "&:hover": {
      color: theme.palette.primary.dark,
      textDecoration: "none",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
  talkBtn: {
    borderRadius: 50,
    background: theme.palette.secondary.main,
    padding: "6px 20px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    textTransform: "inherit",
    gap: 10,

    "& > span": {
      display: "flex",
      gap: 10,
    },

    "&:hover": {
      background: theme.palette.secondary.dark,
    },

    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1, 2),
      fontSize: "12px",
    },
  },
  btnLink: {
    marginLeft: theme.spacing(5),
    "&:hover": {
      textDecoration: "none",
    },
  },
  resourcesPopover: {
    padding: "10px",
  },
  popoverStyle: {
    background: "rgba(255, 255, 255, 0.6)",
  },

  popoverLi: {
    transition: "0.3s ease-in-out",
    "&:hover": {
      background: "white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isUser, setIsUser] = React.useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsUser(true);
    }
  });

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // ** Waitlist form
  const [showWaitlist, setShowWaitlist] = React.useState(false)

  const handleWaitlistForm = () => {
    setShowWaitlist(!showWaitlist)
  }

  const handleCloseWaitlist = () => {
    setShowWaitlist(false)
  }

  return (
    <AppBar position="fixed" className={classes.header}>
      <Toolbar className={classes.navbar}>
        <div className={classes.logo}>
          <Link to="/">
            <img
              className={classes.logoImg}
              src="/headerlogo.svg"
              alt="BeFinnSavvy Logo"
            />
          </Link>
        </div>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/about" className={classes.link}>
              About
            </Link>
            <Link to="/services" className={classes.link}>
              Services
            </Link>
            <Link
              aria-describedby="resources"
              to="#"
              className={classes.link}
              onMouseOver={handlePopoverOpen}
            >
              Resources
            </Link>
            <Popover
              id="resources"
              sx={{ PointerEvent: "none" }}
              classes={{ paper: classes.popoverStyle }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <List className={classes.resourcesPopover}>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to="/risk-profile" className={classes.popoverLink}>
                      Risk Profile
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link
                      to="/financial-literacy"
                      className={classes.popoverLink}
                    >
                      Financial Literacy
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to="/faq" className={classes.popoverLink}>
                      FAQs
                    </Link>
                  </ListItemText>
                </ListItem>
              </List>
            </Popover>
            {isUser ? (
              <Link to="/dashboard" className={classes.link}>
                Dashboard
              </Link>
            ) : (
              <Link to="/signin" className={classes.link}>
                Login / Register
              </Link>
            )}
            <CustomButton style={{ marginLeft: "1rem" }} onClick={handleWaitlistForm}>Join the waitlist</CustomButton>
            <JoinTheWaitlist open={showWaitlist} handleClose={handleCloseWaitlist} />
            <MLink
              target="_blank"
              href="https://api.whatsapp.com/send?phone=+917704047770&text=Hi BeFinSavvy, Can you please call me back?"
              className={classes.btnLink}
            >
              <Button
                variant="contained"
                disableElevation
                className={classes.talkBtn}
              >
                Talk to us <WhatsAppIcon />
              </Button>
            </MLink>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
