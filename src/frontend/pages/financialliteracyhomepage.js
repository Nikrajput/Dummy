import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./riskprofile.css";
// import Header from "../components/header/Header"
import { SECONDARYBUTTONSTYLE } from "../components/header/Header";
import { AppBar, Typography, Button } from "@material-ui/core";
// import Footer from "../components/footer/NewFooter"

import Header from "../components/header/Navbar";
import Footer from "../components/footer";

export default function Landingpagefinancialliteracy(props) {
  return (
    <>
      <Header />
      <div style={{
        height: "100%",
        marginTop: "60px"
      }}>
        <div className="secondaryFont fontSize18">
          <h2 className="center_align primaryFont700 padt10">
            Check Your Financial Literacy
          </h2>

          <div className="head1">
            <p>Hey there,</p>
            Whether you’re managing your own finances or consulting a financial
            expert, you must understand your level of financial knowledge.
            Assessing yourself will help you protect yourself from fraud and take
            the necessary steps to learn and be successful in your financial
            journey!
          </div>
          <div>
            <div className="head2home">
              Financial decisions have a huge impact on your financial health and
              future. The world of finance is complex. You are often sold products
              that you don’t understand and many times you may not be aware of
              which products suit your specific needs. Taking this test will also
              help you understand if you are equipped to make your own decisions
              or need a helping hand to guide you while making your financial
              decisions.
            </div>
          </div>
          <div className="head3">
            Answer some questions about common financial decisions and see where
            you stand. Please answer all questions as honestly as you can.
          </div>
        </div>
        <div className="middle padb50">
          <Button
            component={NavLink}
            to="/financial-literacy-test"
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
