import { Button, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
// import Header from "../components/header/Header";
import HeroVideoSection from "../components/heroVideoPlayeraboutus";
import "../../Responsive.css";
import { useRef } from "react";
import linkedinicon from "../../assets/images/linkedinicon.png";
// import Footer from "../components/footer/NewFooter";
import { isMobile } from "react-device-detect";
import section2 from "../../assets/images/section2.gif";
import section3 from "../../assets/images/section3.gif";
import section4 from "../../assets/images/section4.gif";
import section5 from "../../assets/images/section5.png";
import section51 from "../../assets/images/section51.jpeg";
import section52 from "../../assets/images/section52.png";
import section53 from "../../assets/images/PHOTO.jpeg";
import Accordion from "../components/isThisYouSection/accordion";

import Header from '../components/header/Navbar'
import Footer from '../components/footer'
const PRIMARY_BUTTON = {
  borderRadius: "60px",
};
const SECTION4_ACCORDION1 = [
  {
    summary: "Affordability",
    details:
      "We charge a small fee only when we add value - no strings attached.",
  },
  {
    summary: "Confidentiality",
    details:
      "Your information is dealt with utmost confidence and not shared with anyone.",
  },
  {
    summary: "Convenience",
    details: "Convenience enabled by technology but powered by humans.",
  },
  {
    summary: "Customer-Centricity",
    details:
      "Awareness of pitfalls and hidden charges, so your money works only for you.",
  },
  {
    summary: "Quality",
    details:
      "Quality support in an accessible, friendly, and judgement-free environment.",
  },
  {
    summary: "Unbiasedness",
    details:
      "Unbiased advice because we are not affiliated with any financial institution.",
  },
];

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

export default function About(props) {
  const myRef1 = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [head, sethead] = useState("Affordability");
  const [text, settext] = useState(
    "We charge a small fee only when we add value - no strings attached."
  );
  const changea = (x) => {
    if (x === 1) {
      sethead("Affordability");
      settext(
        "We charge a small fee only when we add value - no strings attached."
      );
    } else if (x === 2) {
      sethead("Confidentiality");
      settext(
        "Your information is dealt with utmost confidence and not shared with anyone."
      );
    } else if (x === 3) {
      sethead("Convenience");
      settext("Convenience enabled by technology but powered by humans.");
    } else if (x == 4) {
      sethead("Customer-Centricity");
      settext(
        "Awareness of pitfalls and hidden charges, so your money works only for you."
      );
    } else if (x == 5) {
      sethead("Quality");
      settext(
        "Quality support in an accessible, friendly, and judgement-free environment."
      );
    } else {
      sethead("Unbiasedness");
      settext(
        "Unbiased advice because we are not affiliated with any financial institution."
      );
    }
  };


  const renderSection2Left = () => {
    return (
      <div>
        <div className="headingsection2 primaryFont700">How it all started</div>
        <div className="subheadingsectio2">
          Ankit and Medha were totally opposite!
        </div>
        {!isMobile ? (
          <div className="flex">
            <div className="section21">
              Ankit is an engineer-turned investment banker who worked on Wall
              Street for 3+ years with UBS (Swiss Bank).
              <br />
              <br /> He enjoyed traveling too but achieved financial
              independence at the tender age of 29!
            </div>
            <div className="section22">
              <div>
                <img src={section2} width="100%" />
              </div>
            </div>
            <div className="section23">
              Medha is a globetrotter who has travelled to 29 countries! She has
              done it all from jumping out of planes to swimming with dolphins.
              <br />
              <br /> But even after working for over a decade she was still
              living paycheck to paycheck!
            </div>
          </div>
        ) : (
          <>
            <div>
              <img src={section2} width="100%" />
            </div>
            <div
              className="section21"
              style={{ width: "100%", marginLeft: "0px", fontSize: "20px" }}
            >
              Ankit is an engineer-turned investment banker who worked on Wall
              Street for 3+ years with UBS (Swiss Bank).
              <br />
              <br /> He enjoyed traveling too but achieved financial
              independence at the tender age of 29!
            </div>
            <div
              className="section23"
              style={{ width: "100%", fontSize: "20px" }}
            >
              Medha is a globetrotter who has travelled to 29 countries! She has
              done it all from jumping out of planes to swimming with dolphins.
              <br />
              <br /> But even after working for over a decade she was still
              living paycheck to paycheck!
            </div>
          </>
        )}
      </div>
    );
  };
  const renderSection3about = () => {
    return (
      <div>
        <div className="headingsection2 primaryFont700">
          a new money mindset
        </div>
        <div className="subheadingsectio2">
          Ankit helped Medha change her outlook about managing personal
          finances.
        </div>
      </div>
    );
  };
  const renderSection3about1 = () => {
    return (
      <div>
        <div className="headingsection2 primaryFont700">
          How BeFinsavvy was born
        </div>
        <div className="subheadingsectio2">
          One day over a cup of coffee, Ankit and Medha had an idea!
        </div>
      </div>
    );
  };
  const renderSection4Left = () => {
    return (
      <div className="section4Leftabout">
        <picture>
          <img
            src={section3}
            alt="Your Coach"
            width="80%"
            className="section4Image"
          />
        </picture>
      </div>
    );
  };

  const renderSection4Right = () => {
    return (
      <div className="section4Rightabout">
        When Ankit met Medha, she was checking items off her bucket list, but
        had absolutely no financial plan or savings.
        <br />
        <br />
        Ankit helped Medha realise the importance of personal finance
        management, and motivated her to embark on a new journey - a journey
        towards financial freedom.
      </div>
    );
  };
  const renderSection4Left1 = () => {
    return (
      <div className="section4Leftabout1">
        <picture>
          <img
            src={section4}
            alt="Your Coach"
            width="50%"
            className="section4Image"
          />
        </picture>
      </div>
    );
  };

  const renderSection4Right1 = () => {
    return (
      <div className="section4Rightabout1" style={{ marginTop: "30px" }}>
        They decided to use their knowledge and experience to help young
        professionals avoid mistakes, gain confidence and achieve their
        financial goals!
      </div>
    );
  };
  const renderSection4Left2 = () => {
    return (
      <div className="section4Rightimage" style={{ opacity: "0.7" }}>
        <img src={section5} width="100%" />
      </div>
    );
  };

  const renderSection4Right2 = () => {
    return (
      <div className="section4Rightabout2">
        {isMobile ? (
          <div>
            <p style={{ fontSize: "4vh" }} className="primaryFont700">
              WHAT IS BEFINSAVVY?
            </p>
            <p>/biː/fɪn/ˈsavi/</p>
            <br />
            It stands for being financially savvy. <br />
            <br />
            Being financially savvy is having practical knowledge about personal
            finances along with the ability to make good financial judgements.
            <br />
            <br />
          </div>
        ) : (
          <div>
            <p style={{ fontSize: "22px" }} className="primaryFont700">
              WHAT IS BEFINSAVVY?
            </p>
            <p>/biː/fɪn/ˈsavi/</p>
            <br />
            <br />
            It stands for being financially savvy. <br />
            <br />
            Being financially savvy is having practical knowledge about personal
            finances along with the ability to make good financial judgements.
          </div>
        )}
      </div>
    );
  };

  const renderSection5Left = () => {
    return (
      <div>
        <div className="headingsection2 primaryFont700">Our team</div>
        <div className="subheadingsectio2">
          We’re on a mission to help you {isMobile ? <></> : <br />} improve
          your chemistry with money.
        </div>
        {isMobile ? (
          <>
            <div className="aboutcardmobile">
              <div style={{ display: "flex" }}>
                <div>
                  <img
                    src={section51}
                    width="100%"
                    style={{
                      borderRadius: "10px",
                      height: "106px",
                      width: "110px",
                    }}
                  />
                </div>
                <div>
                  <div className="cardtext1">
                    Ankit
                    <span className="linkedin">
                      <a href="https://www.linkedin.com/in/mrankitagrawal/">
                        <img src={linkedinicon} width="9%" />
                      </a>
                    </span>
                    <span className="cardtext3">
                      <br /> Co-Founder
                      <br /> The Finance Guy
                    </span>
                  </div>
                  <div className="cardtext2">Ex-UBS, Ex-PwC</div>
                </div>
              </div>
            </div>
            <div className="aboutcardmobile">
              <div style={{ display: "flex" }}>
                <div>
                  <img
                    src={section52}
                    width="100%"
                    style={{
                      borderRadius: "10px",
                      height: "106px",
                      width: "110px",
                    }}
                  />
                </div>
                <div>
                  <div className="cardtext1">
                    Medha
                    <span className="linkedin">
                      <a href="https://www.linkedin.com/in/medha-agarwal/">
                        <img src={linkedinicon} width="9%" />
                      </a>
                    </span>
                    <span className="cardtext3">
                      <br />
                      Co-Founder
                      <br /> The Marketing Nerd
                    </span>
                  </div>
                  <div className="cardtext2">Ex-EI, Ex-Ashoka University</div>
                </div>
              </div>
            </div>
            <div className="aboutcardmobile">
              <div style={{ display: "flex" }}>
                <div>
                  <img
                    src={section53}
                    width="100%"
                    style={{
                      borderRadius: "10px",
                      height: "106px",
                      width: "110px",
                    }}
                  />
                </div>
                <div>
                  <div className="cardtext1">
                    Ravindra
                    <span className="linkedin">
                      <a href="https://www.linkedin.com/in/siddam-ravindra-reddy-230539190">
                        <img src={linkedinicon} width="9%" />
                      </a>
                    </span>
                    <span className="cardtext3">
                      <br /> Backend Developer
                      <br /> The Techie
                    </span>
                  </div>
                  <div className="cardtext2">NIT Calicut</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex">
            <div className="aboutcard">
              <img
                src={section51}
                width="100%"
                style={{ borderRadius: "10px" }}
              />
              <div className="cardtext1">
                Ankit
                <span className="linkedin">
                  <a href="https://www.linkedin.com/in/mrankitagrawal/">
                    <img src={linkedinicon} width="9%" />
                  </a>
                </span>
                <span className="cardtext3">
                  <br /> Co-Founder
                  <br /> The Finance Guy
                </span>
              </div>
              <div className="cardtext2">Ex-UBS, Ex-PwC</div>
            </div>
            <div className="aboutcard">
              <img
                src={section52}
                width="100%"
                style={{ borderRadius: "10px" }}
              />
              <div className="cardtext1">
                Medha
                <span className="linkedin">
                  <a href="https://www.linkedin.com/in/medha-agarwal/">
                    <img src={linkedinicon} width="9%" />
                  </a>
                </span>
                <span className="cardtext3">
                  <br />
                  Co-Founder
                  <br /> The Marketing Nerd
                </span>
              </div>
              <div className="cardtext2">Ex-EI, Ex-Ashoka University</div>
            </div>
            <div className="aboutcard">
              <img
                src={section53}
                width="100%"
                style={{ borderRadius: "10px" }}
              />
              <div className="cardtext1">
                Ravindra
                <span className="linkedin">
                  <a href="https://www.linkedin.com/in/siddam-ravindra-reddy-230539190">
                    <img src={linkedinicon} width="9%" />
                  </a>
                </span>
                <span className="cardtext3">
                  <br /> Backend Developer
                  <br /> The Techie
                </span>
              </div>
              <div className="cardtext2">NIT Calicut</div>
            </div>
          </div>
        )}
        <div className="subheadingsectio2" style={{ paddingTop: "2vh" }}>
          Do you have what it takes to join us?
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingTop: "0vh",
            paddingBottom: "10vh",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className="talkToUsButton"
          >
            <div className="talkToUsButtonText" style={{ color: "white" }}>
              Apply Now!
            </div>
          </Button>
        </div>
      </div>
    );
  };

  const renderSection6Left = () => {
    return (
      <div>
        <div className="headingsection2">what drives us</div>
        <div className="subheadingsectio2">
          When you know your why
          <br /> it’s easy to find your way.
        </div>
        <div
          style={{
            backgroundColor: "#4ED0CE",
            width: "100%",
            paddingBottom: "10px",
            paddingTop: "10px",
          }}
        >
          <div className="flexchange">
            <div className="section6card">
              <div className="section6cardhead">OUR WHY</div>
              <div className="section6cardtext">
                Empowering young professionals to retire early and enjoy their
                life to the fullest.
              </div>
            </div>
            <div className="section6card">
              <div className="section6cardhead">OUR HOW</div>
              <div className="section6cardtext">
                Providing speed & convenience in a judgement & jargon free
                environment.
              </div>
            </div>
            <div className="section6card">
              <div className="section6cardhead">OUR WHAT</div>
              <div className="section6cardtext">
                Personal finance consultation. Workshops & courses. Free online
                resources.
              </div>
            </div>
          </div>
        </div>
        <div className="subheadingsectio2" style={{ paddingTop: "2vh" }}>
          Believe in our mission?
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingTop: "0vh",
            paddingBottom: "10vh",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className="talkToUsButton"
          >
            <div className="talkToUsButtonText " style={{ color: "white" }}>
              Apply to join us!
            </div>
          </Button>
        </div>
      </div>
    );
  };
  const renderSection8Left = () => {
    return (
      <div>
        <div>
          <div className="flexchange">
            <div className="section8card">
              <div className="section8cardtext">
                Ready to start your journey of financial freedom?
              </div>
              <div className="section8cardhead primaryFont600">
                See how we can help.
              </div>
            </div>
            <div className="section8card">
              <div className="section8cardtext">
                Still have more questions?
                <br />
                <br />
              </div>
              <div className="section8cardhead primaryFont600">
                Visit the FAQ page.
              </div>
            </div>
            <div className="section8card">
              <div className="section8cardtext">
                Want to join us in our mission? Think you have what it takes?
              </div>
              <div className="section8cardhead primaryFont600">
                Apply to join us.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7about = () => {
    return (
      <div>
        <div className="headingsection2 primaryFont700">Our Values</div>
        <div className="subheadingsectio2">
          "Values are like fingerprints. Nobody's are the same,
          <br /> and you leave them all over everything you do."~ Elvis Presley
        </div>
      </div>
    );
  };
  const renderSection7Left = () => {
    return (
      <div style={{ paddingLeft: "30vh" }}>
        <div className="flex">
          <div
            className="section7cardleft cursor"
            tabIndex="1"
            onClick={() => changea(1)}
          >
            Affordability
          </div>
          <div
            className="section7cardleft cursor"
            tabIndex="1"
            onClick={() => changea(2)}
          >
            Confidentiality
          </div>
          <div
            className="section7cardleft cursor"
            tabIndex="1"
            onClick={() => changea(3)}
          >
            Convenience
          </div>
        </div>
        <div className="flex">
          <div
            className="section7cardleft cursor"
            tabIndex="1"
            onClick={() => changea(4)}
          >
            Customer Centricity
          </div>
          <div
            className="section7cardleft cursor"
            tabIndex="1"
            onClick={() => changea(5)}
          >
            Quality
          </div>
          <div
            className="section7cardleft cursor"
            tabIndex="1"
            onClick={() => changea(6)}
          >
            Unbiasedness
          </div>
        </div>
      </div>
    );
  };

  const renderSection7Right = () => {
    return (
      <div className="section7card">
        <span style={{ fontSize: "5vh" }} className="primaryFont600">
          {head}
        </span>
        <br />
        <div className="textsection7">{text}</div>
      </div>
    );
  };

  return (
    <div className="aboutpage secondaryFont" ref={myRef1}>
      <Header />
      <HeroVideoSection />
      {/* {feedbackPopup()} */}
      {isMobile ? (
        <div style={{ paddingTop: "8vh" }}></div>
      ) : (
        <div style={{ paddingTop: "30vh" }}></div>
      )}
      <div className="section2about">{renderSection2Left()}</div>
      <div className="disptop">
        {renderSection3about()}
        <div className="section4about">
          {isMobile ? (
            <>
              {renderSection4Left()}
              {renderSection4Right()}
            </>
          ) : (
            <>
              {renderSection4Right()}
              {renderSection4Left()}
            </>
          )}
        </div>
      </div>
      <div className="disptop">
        {renderSection3about1()}
        <div className="section4about">
          {renderSection4Left1()}
          {renderSection4Right1()}
        </div>
      </div>
      <div className="disptop">
        <div className="section4about">
          {!isMobile ? (
            <>
              {renderSection4Right2()}
              {renderSection4Left2()}
            </>
          ) : (
            <>
              {renderSection4Left2()}
              {renderSection4Right2()}
            </>
          )}
        </div>
      </div>
      <div className="disptop">
        <div className="section2about">{renderSection5Left()}</div>
      </div>
      <div className="disptop">
        <div className="section2about">{renderSection6Left()}</div>
      </div>
      <div className="disptop">
        {renderSection7about()}
        <div className="section4about">
          {isMobile ? (
            <>
              <Accordion
                questions={SECTION4_ACCORDION1}
                summaryClasses="section4Summary"
              />
            </>
          ) : (
            <>
              {renderSection7Left()}
              {renderSection7Right()}
            </>
          )}
        </div>
      </div>
      <div className="disptop">
        <div className="section2about">{renderSection8Left()}</div>
      </div>
      <div className="disptop">
        <Footer />
      </div>
    </div>
  );
}
