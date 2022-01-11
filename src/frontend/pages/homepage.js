import { Button, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
// import Header from "../components/header/Header";
import { NavLink, Link } from "react-router-dom";
import HeroVideoSection from "../components/heroVideoPlayerhome";
import section2Video from "../../assets/videos/IsThisYou.mp4";
import section4CoachImage from "../../assets/images/yourCoachImage.webp";
import section4CoachImageJPG from "../../assets/images/yourCoachImage.jpg";
import Slider from "../components/slider";
import { TESTIMONIALS } from "../../assets/testimonials/testimonials";
import ContactForm from "../../backend/contactForm/contactForm";
import CLOCKVIDEO from "../../assets/videos/ClockMoving.mp4";
import Accordion from "../components/isThisYouSection/accordion";
import { isMobile } from "react-device-detect";
import "../../Responsive.css";
// import Footer from "../components/footer/NewFooter";
// import Feedback from "feeder-react-feedback"; // import Feedback component
// import "feeder-react-feedback/dist/feeder-react-feedback.css";

import Header from '../components/header/Navbar'
import Footer from '../components/footer'

const PRIMARY_BUTTON = {
  borderRadius: "60px",
};

const SECTION3_BUTTON = {
  marginTop: "16px",
  borderRadius: "60px",
  border: "2px solid white",
};

const ISTHISYOU_ACCORDION = [
  {
    summary: "Making decent money, still feeling poor.",
    details:
      "Salary vanishes soon after it hits the account. Where does it go?!",
  },
  {
    summary: "Talking to friends & family about finances is tough.",
    details:
      "Never had any formal or informal financial education. Also, parents are clueless about managing money!",
  },
  {
    summary: "Feeling stuck in a cycle of loans & no savings.",
    details:
      "Don’t know how loans work, the principles of banking, interest rates etc. Don’t know how to secure my future!",
  },
  {
    summary: "Investing randomly with no structured plan.",
    details:
      "Overwhelmingly different opinions out there, don’t know if I’m on the right track. It’s an emotional roller coaster led by FOMO!",
  },
];

const SECTION4_ACCORDION = [
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

export default function Landing(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

const renderSection2Left = () => {
    return (
      <div className="section2Left">
        <div className="innerSection2Left">
          <div className="primaryFont700 heading">IS THIS YOU?</div>
          <div className="isThisYouQuestions">
            <Accordion
              questions={ISTHISYOU_ACCORDION}
              summaryClasses="section2AccordionSummary"
            />
          </div>
          <div className="primaryFont700 mgt32 primaryColor heading">
            WE FEEL YOU.
          </div>
          <div className="mgt32 secondaryFont subheading">
            Start by checking where you stand.
          </div>
          <Button
            component={NavLink}
            to="/financial-literacy"
            tag={Link}
            color="primary"
            variant="contained"
            style={PRIMARY_BUTTON}
            className="mgt16"
          >
            <div className="primaryFont700 white primaryButtonText">
              Test your financial literacy
            </div>
          </Button>
        </div>
      </div>
    );
  };

  const renderSection2Right = () => {
    if (isMobile) {
      return;
    }
    return (
      <div className="section2Right">
        <video className="isThisYouVideo" autoPlay loop muted>
          <source src={section2Video} type="video/mp4" />
        </video>
      </div>
    );
  };

  const renderSection3Left = () => {
    return (
      <div className="section3Left">
        <div className="innerSection3Left">
          <div className="primaryFont700 white heading">
            REACH YOUR FINANCIAL GOALS FASTER WITH YOUR DEDICATED COACH.
          </div>
          <Typography variant="h5" className="secondaryFont mgt64 fwt700">
            Your coach wants to know, how fast you can go.
          </Typography>
          <Button
            component={NavLink}
            to="/risk-profile"
            variant="contained"
            style={SECTION3_BUTTON}
            color="primary"
          >
            <div className="primaryFont700 white primaryButtonText">
              Check your risk profile
            </div>
          </Button>
        </div>
      </div>
    );
  };

  const renderSection3Right = () => {
    return (
      <div className="section3Right">
        <div className="section3RightText secondaryFont white">
          You and your dedicated personal coach will create a plan that's
          tailored to your financial goals and risk profile—and together, you'll
          work to unlock the results you want. At every step of the way, you'll
          be guided by an experienced coach who tracks the latest developments
          in the financial world to keep you ahead of the curve.
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="section3">
        <div className="innerSection3Left">
          <div className="primaryFont700 white heading">
            REACH YOUR FINANCIAL GOALS FASTER WITH YOUR DEDICATED COACH.
          </div>
          <div className="section3RightText secondaryFont white">
            You and your dedicated personal coach will create a plan that's
            tailored to your financial goals and risk profile—and together,
            you'll work to unlock the results you want. At every step of the
            way, you'll be guided by an experienced coach who tracks the latest
            developments in the financial world to keep you ahead of the curve.
          </div>
          <div>
            <Typography variant="h5" className="secondaryFont mgt64 fwt700">
              Your coach wants to know, how fast you can go.
            </Typography>
            <NavLink to="/risk-profile" tag={Link}>
              <Button
                variant="contained"
                style={SECTION3_BUTTON}
                color="primary"
              >
                <div className="primaryFont700 white primaryButtonText">
                  Check your risk profile
                </div>
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

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

  const renderSection5Left = () => {
    return (
      <div className="section5Left">
        <div className="innerSection5Left">
          <div className="primaryFont700 heading">
            STILL THINKING,
            <br /> "DO I REALLY NEED THIS?"
          </div>
          <Slider items={TESTIMONIALS} />
        </div>
      </div>
    );
  };

  const renderSection5Right = () => {
    return (
      <div className="section5Right">
        <div className="innerSection5Right ">
          <div className="secondaryFont greyText section5RightText">
            In the world of finance, <br /> the most expensive asset is time.
          </div>
          <div className="primaryFont700 roiFormulaContainer">
            RETURN ON INVESTMENT = <br />
            (1 + ANNUAL RETURN) ^ TIME
          </div>
          <div className="secondaryFont mgt64 subheading">
            Stop thinking, start doing!
          </div>
          <a
            href="https://wa.me/917704047770?text=Hi%20BeFinSavvy,%20Can%20you%20please%20call%20me%20back?%20"
            target="_blank"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              variant="contained"
              style={PRIMARY_BUTTON}
              color="primary"
              className="mgt16"
            >
              <div className="primaryFont700 white primaryButtonText">
                Talk to us now!
                <img src="/WAicon.png" className="footerSocialIcon1" />
              </div>
            </Button>
          </a>
        </div>
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

  const renderSection6Left = () => {
    return (
      <div className="section6Left">
        <video style={{ width: "100%" }} autoPlay loop muted>
          <source src={CLOCKVIDEO} type="video/mp4" />
        </video>
      </div>
    );
  };

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
  const [showcnt, setshowcnt] = useState(false);
  const talk = () => {
    if (showcnt) {
      setshowcnt(false);
    } else {
      setshowcnt(true);
    }
  };

  // const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Header />

      <HeroVideoSection />
      {/* <div>
        <button
          className="feedback-button"
          onClick={() => setModalIsOpen(true)}
        >
          Feedback
        </button>
        {modalIsOpen && <Feedback setModalIsOpen={setModalIsOpen} />}
      </div> */}
      {/* {feedbackPopup()} */}
      <div className="section2">
        {renderSection2Left()}
        {renderSection2Right()}
      </div>
      {isMobile ? (
        renderSection3()
      ) : (
        <div className="section3">
          {renderSection3Left()}
          {renderSection3Right()}
        </div>
      )}
      <div className="section4">
        {renderSection4Left()}
        {renderSection4Right()}
      </div>
      <div className="section5">
        {renderSection5Left()}
        {renderSection5Right()}
      </div>
      <div className="section6">
        {renderSection6Left()}
        {renderSection6Right()}
      </div>

      <Footer />
    </>
  );
}
