import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./riskprofile.css";
// import Header from "../components/header/Header"
import { SECONDARYBUTTONSTYLE } from "../components/header/Header";
import { AppBar, Typography, Button } from "@material-ui/core";
// import Footer from "../components/footer/NewFooter"

import Header from "../components/header/Navbar";
import Footer from "../components/footer";

function Home(props) {
  return (
    <>
      <Header />
      <div style={{
        height: "100%",
        marginTop: "60px"
      }}>
        <div className="secondaryFont fontSize18">
          <h2 className="center_align primaryFont700 padt20">
            Check Your Risk Profile
          </h2>

          <div className="head1">
            <p>Hey there,</p>
            Before you start investing, you must know how much risk you can take.
            A risk profile identifies the level of risk an individual is prepared
            or willing and able to accept.
          </div>
          <div>
            <div className="head2home">
              Since different investments have different risks associated with
              them, understanding your risk profile helps you understand what kind
              of investments you can make. It will also help you decide in what
              proportion to allocate your funds across these investments.
            </div>
          </div>
          <div className="head3">
            In this questionnaire we ask you a few questions about you and your
            preferences. Please answer all the questions as honestly as you can,
            since this can form a basis for your investment strategy.{" "}
          </div>
        </div>
        <div className="middle padb50">
          <Button
            component={NavLink}
            to="/risk-profile-test"
            tag={Link}
            color="secondary"
            variant="contained"
            style={SECONDARYBUTTONSTYLE}
          >
            <Typography
              className="primaryFont700 white"
              variant="h6"
              style={{ textTransform: "none" }}
            >
              Start Now
            </Typography>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
