import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Header from "../components/header/Header"
import Accordion from "../components/isThisYouSection/accordion";
import "./Faq.css";
import { faqs } from "../constfunctions/constfunc";
// import Footer from "../components/footer/NewFooter"

import Header from "../components/header/Navbar";
import Footer from "../components/footer";

function Faq(props) {
  return (
    <>
      <Header />
      <div style={{
        height: "100%",
        marginTop: "60px"
      }}>
        <h1 className="primaryFont700 center_align padt10">
          Frequently Asked Questions
        </h1>
        <div className="question">
          <div className="isThisYouQuestions">
            <Accordion
              questions={faqs}
              summaryClasses="section2AccordionSummary"
            />
          </div>
        </div>
        <div className="padt50">
      </div>
        <Footer />
      </div>
    </>
  );
}
export default Faq;
