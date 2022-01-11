import {
  AppBar,
  Typography,
  Button,
  Drawer,
  makeStyles,
  List,
  Collapse,
  ListItem,
  Popper,
  Paper,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import ContactForm from "../../../backend/contactForm/contactForm";
import { useRef } from "react";
const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  RESOURCES: "/resources",
  RESOURCES1: "/risk-profile",
  RESOURCES2: "/financial-literacy",
  RESOURCES3: "/faq",
  LOGIN: "/signin",
  Mainpage: "/my-profile",
};
export const SECONDARYBUTTONSTYLE = {
  padding: "6px 24px 6px 24px",
  borderRadius: "60px",
};
const SECONDARYBUTTONRESPONSIVE = {
  padding: "6px 12px",
  borderRadius: "20px",
  whiteSpace: "nowrap",
};

const LOGO_COLOR = "#4ED0CE";

const useStyles = makeStyles({
  drawerPaper: {
    width: "100%",
    backgroundColor: "rgb(254,249,243, 0.2)",
    backdropFilter: "blur(6px)",
  },
});

const SCREEN_WIDTH = window.innerWidth;

const renderSection6Right = () => {
  return (
    <div className="section6Right">
      <div className="innerSection6Right">
        <div className="primaryFont700 primaryColor heading">
          TALK TO US TO FIND OUT
          <br />
          HOW WE CAN HELP YOU.
        </div>
        <div className="mgt32 secondaryFont subheading">
          We promise we won't spam your inbox :)
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default function Header(props) {
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  // General scroll to element function

  const executeScroll = () => scrollToRef(props.a);

  const [userr, setuserr] = useState(false);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setuserr(true);
    }
    console.log("userr");
    console.log(userr);
  });
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openRoutes, setOpenNestedRoute] = React.useState(false);
  const [showcnt, setshowcnt] = useState(false);
  const talk = () => {
    if (showcnt) {
      setshowcnt(false);
    } else {
      setshowcnt(true);
    }
  };
  let route = null;
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const routeToHome = () => {
    if (history?.location?.pathname === ROUTES.HOME) {
      history.go();
    } else {
      history.push(ROUTES.HOME);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleResourcesRoute = (event) => {
    switch (event.target.id) {
      case "0":
        history.push(ROUTES.RESOURCES1);
        break;
      case "1":
        history.push(ROUTES.RESOURCES2);
        break;
      case "2":
        history.push(ROUTES.RESOURCES3);
        break;
    }
    handleMenuClose();
  };

  const renderPopover = () => {
    return (
      <div>
        <Popper
          className="resourcesMenu"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
        >
          <Paper
            classes={{ root: classes.drawerPaper }}
            onMouseLeave={handleMenuClose}
          >
            <div
              className="subLinkContainer primaryFont700"
              onClick={handleResourcesRoute}
              id={0}
            >
              Risk Profile
            </div>
            <div
              className="subLinkContainer primaryFont700"
              onClick={handleResourcesRoute}
              id={1}
            >
              Financial Literacy
            </div>
            <div
              className="subLinkContainer primaryFont700"
              onClick={handleResourcesRoute}
              id={2}
            >
              FAQs
            </div>
          </Paper>
        </Popper>
        {showcnt ? (
          <div className="contactform1">
            <div className="primaryFont700 primaryColor heading">
              TALK TO US TO FIND OUT
              <span
                style={{
                  textAlign: "right",
                  paddingLeft: "60px",
                  color: "#238EE7",
                  cursor: "pointer",
                }}
                onClick={talk}
              >
                X
              </span>
              <br />
              HOW WE CAN HELP YOU.
            </div>
            <div className="secondaryFont subheading">
              We promise we won't spam your inbox :)
              <ContactForm />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  const handleExpandRoutes = () => {
    setOpenNestedRoute(!openRoutes);
  };

  const renderNestedRoutes = () => {
    return (
      <>
        <ListItem
          component={NavLink}
          className="headerNav mgt8"
          to={ROUTES.RESOURCES1}
          activeStyle={{ color: LOGO_COLOR }}
        >
          <div className="primaryFont700 fontSize18">Risk Profile</div>
        </ListItem>
        <ListItem
          component={NavLink}
          className="headerNav"
          to={ROUTES.RESOURCES2}
          activeStyle={{ color: LOGO_COLOR }}
        >
          <div className="primaryFont700 fontSize18">Financial Literacy</div>
        </ListItem>
        <ListItem
          component={NavLink}
          className="headerNav"
          to={ROUTES.RESOURCES3}
          activeStyle={{ color: LOGO_COLOR }}
        >
          <div className="primaryFont700 fontSize18">FAQs</div>
        </ListItem>
      </>
    );
  };

  const renderAppBarForMobile = () => {
    return (
      <>
        <CssBaseline />
        <AppBar position="sticky" className="navBar">
          <Toolbar>
            <div className="headerLogo pointer" onClick={routeToHome}>
              <img
                src="/logoFull.png"
                height="32px"
                aria-label="BeFinnSavvy logo"
              />
            </div>
            <div className="drawerActionContainer">
              <Button
                color="secondary"
                style={SECONDARYBUTTONRESPONSIVE}
                variant="contained"
                onClick={talk}
              >
                <Typography
                  className="primaryFont700"
                  style={{ textTransform: "none" }}
                  variant="caption"
                >
                  Talk To Us
                  <a
                    href="https://wa.me/917704047770?text=Hi%20BeFinSavvy,%20Can%20you%20please%20call%20me%20back?%20"
                    target="_blank"
                  >
                    <img src="/WAicon.png" className="footerSocialIconmobile" />
                  </a>
                </Typography>
              </Button>
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={handleOpen}
                className="mgl16"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          open={open}
          onClose={onClose}
          anchor="right"
          id="drawer"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className="navLinks">
            <IconButton onClick={onClose} className="closeDrawerIcon">
              <CloseIcon fontSize="large" />
            </IconButton>
            <div
              className="headerLogo pointer mgt16"
              onClick={() => {
                onClose();
                routeToHome();
              }}
            >
              <img
                src="/logoFull.png"
                height="32px"
                aria-label="BeFinnSavvy logo"
              />
            </div>
            <List>
              {props.a ? (
                <>
                  <ListItem
                    component={NavLink}
                    className="headerNav"
                    to={ROUTES.ABOUT}
                    activeStyle={{ color: LOGO_COLOR }}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <div
                      className="primaryFont700 fontSize22 mgt16"
                      onClick={executeScroll}
                    >
                      About
                    </div>
                  </ListItem>
                  <ListItem
                    component={NavLink}
                    className="headerNav"
                    onClick={executeScroll}
                    exact={true}
                    to={ROUTES.SERVICES}
                    activeStyle={{ color: LOGO_COLOR }}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <div className="primaryFont700 fontSize22 mgt16">
                      Services
                    </div>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem
                    component={NavLink}
                    className="headerNav"
                    to={ROUTES.ABOUT}
                    activeStyle={{ color: LOGO_COLOR }}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <div className="primaryFont700 fontSize22 mgt16">About</div>
                  </ListItem>
                  <ListItem
                    component={NavLink}
                    className="headerNav"
                    exact={true}
                    to={ROUTES.SERVICES}
                    activeStyle={{ color: LOGO_COLOR }}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <div className="primaryFont700 fontSize22 mgt16">
                      Services
                    </div>
                  </ListItem>
                </>
              )}
              <ListItem className="mgt16" onClick={handleExpandRoutes}>
                <div className="primaryFont700 fontSize22">Resources</div>
                {openRoutes ? (
                  <ExpandLess color="primary" />
                ) : (
                  <ExpandMore color="primary" />
                )}
              </ListItem>
              <Collapse in={openRoutes}>{renderNestedRoutes()}</Collapse>
              {userr ? (
                <ListItem
                  component={NavLink}
                  className="headerNav"
                  to={ROUTES.Mainpage}
                  activeStyle={{ color: LOGO_COLOR }}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <div className="primaryFont700 fontSize22 mgt16">
                    My Account
                  </div>
                </ListItem>
              ) : (
                <ListItem
                  component={NavLink}
                  className="headerNav"
                  to={ROUTES.LOGIN}
                  activeStyle={{ color: LOGO_COLOR }}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <div className="primaryFont700 fontSize22 mgt16">Login</div>
                </ListItem>
              )}
              <Button
                color="secondary"
                className="mgt32"
                style={SECONDARYBUTTONSTYLE}
                variant="contained"
                onClick={talk}
              >
                <Typography
                  className="primaryFont700 "
                  style={{ textTransform: "none" }}
                  variant="h6"
                >
                  Talk To Us
                  <a
                    href="https://wa.me/917704047770?text=Hi%20BeFinSavvy,%20Can%20you%20please%20call%20me%20back?%20"
                    target="_blank"
                  >
                    <img src="/WAicon.png" className="footerSocialIconmobile" />
                  </a>
                </Typography>
              </Button>
            </List>
          </div>
        </Drawer>
      </>
    );
  };

  const renderAppBar = () => {
    return (
      <>
        <CssBaseline />
        <AppBar position="sticky" className="navBar">
          <Toolbar className="spaceBetween">
            <div className="headerLogo mgl64 pointer" onClick={routeToHome}>
              <img
                src="/logoFull.png"
                height="40px"
                aria-label="BeFinnSavvy logo"
              />
            </div>
            <div className="navLinks">
              {props.a ? (
                <>
                  <NavLink
                    className="headerNav"
                    to={ROUTES.ABOUT}
                    onClick={executeScroll}
                    activeStyle={{ color: LOGO_COLOR }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      className="primaryFont700"
                    >
                      About
                    </motion.div>
                  </NavLink>
                  <NavLink
                    className="headerNav"
                    exact={true}
                    to={ROUTES.SERVICES}
                    onClick={executeScroll}
                    activeStyle={{ color: LOGO_COLOR }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      className="primaryFont700"
                    >
                      Services
                    </motion.div>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className="headerNav"
                    to={ROUTES.ABOUT}
                    activeStyle={{ color: LOGO_COLOR }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      className="primaryFont700"
                    >
                      About
                    </motion.div>
                  </NavLink>
                  <NavLink
                    className="headerNav"
                    exact={true}
                    to={ROUTES.SERVICES}
                    activeStyle={{ color: LOGO_COLOR }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      className="primaryFont700"
                    >
                      Services
                    </motion.div>
                  </NavLink>
                </>
              )}
              <motion.div
                whileHover={{ scale: 1.04 }}
                className={`primaryFont700 headerNav resourcesTab ${
                  Boolean(anchorEl) ? "activeResourcesTab" : ""
                }`}
                // onClick={handleMenuOpen}
                onMouseEnter={handleMenuOpen}
              >
                Resources
              </motion.div>
              {renderPopover()}
              {userr ? (
                <NavLink
                  className="headerNav"
                  to={ROUTES.Mainpage}
                  activeStyle={{ color: LOGO_COLOR }}
                >
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="primaryFont700"
                  >
                    My Account
                  </motion.div>
                </NavLink>
              ) : (
                <NavLink
                  className="headerNav"
                  to={ROUTES.LOGIN}
                  activeStyle={{ color: LOGO_COLOR }}
                >
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="primaryFont700"
                  >
                    Login
                  </motion.div>
                </NavLink>
              )}
              <a
                href="https://wa.me/917704047770?text=Hi%20BeFinSavvy,%20Can%20you%20please%20call%20me%20back?%20"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button
                  color="secondary"
                  className="navButton"
                  variant="contained"
                >
                  <Typography
                    className="primaryFont700"
                    style={{ textTransform: "none" }}
                  >
                    Talk To Us
                    <img src="/WAicon.png" className="footerSocialIcon1" />
                  </Typography>
                </Button>
              </a>
            </div>
          </Toolbar>
        </AppBar>
      </>
    );
  };

  return (
    <>
      {isMobile || SCREEN_WIDTH < 1024
        ? renderAppBarForMobile()
        : renderAppBar()}
    </>
  );
}
