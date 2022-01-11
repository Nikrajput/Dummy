import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";

import SEO from "../../components/seo";
import withAuth from '../../authentication/withAuth'

import { Expenses } from "./Expenses";
import { Investments } from "./Investments";
import { Taxes } from "./Taxes";
import { TheJourney } from "./TheJourney";

import logo from "../../../assets/images/white_logo.png";

import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import { NavLink, useHistory } from "react-router-dom";
import "../personalprofile.css";
import SignOutButton from "../../authentication/SignOut";

import { makeStyles, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },

  link: {
    color: "black",
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "22px",
    padding: theme.spacing(2, 4),

    "&:hover": {
      background: theme.palette.primary.dark,
      opacity: 0.5,
      color: "white",
    },
  },

  sidebar: {
    width: "230px",
    position: "fixed",
    height: "100%",
  },

  main: {
    zIndex: 3,
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [color1, setcolor1] = useState("black");
  const [color2, setcolor2] = useState("black");
  const [color3, setcolor3] = useState("black");
  const [color4, setcolor4] = useState("black");
  const [color5, setcolor5] = useState("black");
  const [color6, setcolor6] = useState("black");
  const [a, setA] = useState(0);
  const [preva, setpreva] = useState(0);
  const [dashboard, setDashboard] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/dashboard") {
      setDashboard(true);
    }
  }, []);

  const colorwhite = "white";

  const items = [
    <NavLink to="/" tag={Link}>
      <img src={`${logo}`} width="80%" style={{ marginLeft: "22px" }} />
    </NavLink>,
    <Link
      to="/dashboard"
      className={classes.link}
      style={{ color: dashboard ? "white" : "black" }}
    >
      Dashboard
    </Link>,
    <SidebarItem color={color1} textAlign="left">
      <div
        onClick={() => back(1)}
        className="primaryFont700 fontSize22"
        style={{ paddingBottom: "10px" }}
      >
        Personal Profile
      </div>
    </SidebarItem>,
    <b
      className="black primaryFont700 fontSize22 padl20"
      style={{ paddingLeft: "30px" }}
    >
      Financial Profile
    </b>,
    <SidebarItem color={color2} textAlign="left">
      <div onClick={() => back(2)} className="secondaryFont fontSize18">
        {" "}
        - Monthly Income
      </div>
    </SidebarItem>,
    <SidebarItem color={color3} textAlign="left">
      <div onClick={() => back(3)} className="secondaryFont fontSize18">
        {" "}
        - Monthly Expenses
      </div>
    </SidebarItem>,
    <SidebarItem color={color4} textAlign="left">
      <div onClick={() => back(4)} className="secondaryFont fontSize18">
        {" "}
        - Investments
      </div>
    </SidebarItem>,
    <SidebarItem color={color6} textAlign="left">
      <div onClick={() => back(6)} className="secondaryFont fontSize18">
        {" "}
        - Financial Goals
      </div>
    </SidebarItem>,
    <SidebarItem color={color5} textAlign="left">
      <div onClick={() => back(5)} className="primaryFont700 fontSize22 center">
        Report
      </div>
    </SidebarItem>,
    <p></p>,
    <div className="padl20">
      <SignOutButton />
    </div>,
  ];
  const back = (x) => {
    history.push("/my-profile?page=" + x);
    setpreva(a);
    setA(x);
    if (x == 1) {
      setcolor1(colorwhite);
      setcolor2("black");
      setcolor3("black");
      setcolor4("black");
      setcolor5("black");
      setcolor6("black");
    } else if (x == 2) {
      setcolor1("black");
      setcolor2(colorwhite);
      setcolor3("black");
      setcolor4("black");
      setcolor5("black");
      setcolor6("black");
    } else if (x == 3) {
      setcolor1("black");
      setcolor2("black");
      setcolor3(colorwhite);
      setcolor4("black");
      setcolor5("black");
      setcolor6("black");
    } else if (x == 4) {
      setcolor1("black");
      setcolor2("black");
      setcolor3("black");
      setcolor4(colorwhite);
      setcolor5("black");
      setcolor6("black");
    } else if (x == 6) {
      setcolor1("black");
      setcolor2("black");
      setcolor3("black");
      setcolor4("black");
      setcolor5("black");
      setcolor6(colorwhite);
    } else {
      setcolor1("black");
      setcolor2("black");
      setcolor3("black");
      setcolor4("black");
      setcolor5(colorwhite);
      setcolor6("black");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <Sidebar width={230} background="#7AE7F5" content={items}></Sidebar>
      </div>
      <Container maxWidth="lg" component="main" className={classes.main}>
        <SEO title="Dashboard" />
        <Expenses user={props.user}/>
        <Investments user={props.user} />
        <Taxes user={props.user} />
        <TheJourney />
      </Container>
    </div>
  );
};

export default withAuth(Dashboard);
