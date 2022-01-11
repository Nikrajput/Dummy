import { Button } from "@material-ui/core";
import "./NewFooter.css";
import React, { useState } from "react";
import ContactForm from "../../../backend/contactForm/contactForm";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
const NewFooter = (props) => {

  //when someone click on the link it will redirect clicked page and scroll on top
  const scrollToRef = (ref) => window.scrollTo(0, ref?.current?.offsetTop);
  // General scroll to element function

  const executeScroll = () => scrollToRef(console.log(props.a));
  const [showcnt, setshowcnt] = useState(false);
  const talk = () => {
    if (showcnt) {
      setshowcnt(false);
    } else {
      setshowcnt(true);
    }
  };
  return (
    <footer className="footer">
      {isMobile && <hr className="footerDivider" />}
      <div className="">
        <div className="row">
          <div className="col-md-4">
            <ul>
              {" "}
              <li>
                <img className="footer_logo" src="/horizontalLightWText.png" />
              </li>
              <br />
            </ul>
          </div>
          <div className="col-md-2">
            <ul>
              <li style={{ fontWeight: "800", fontSize: "15px" }}>COMPANY</li>
              <li>
                <Link
                  to="/about"
                  className="footerNavLink"
                  onClick={executeScroll}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="footerNavLink"
                  onClick={executeScroll}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link to="/careers" className="footerNavLink"   onClick={executeScroll}>
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-2 d-flex justify-content-end">
            <ul>
              <li style={{ fontWeight: "800", fontSize: "15px" }}>RESOURCES</li>
              <li>
                <Link to="/risk-profile" className="footerNavLink"   onClick={executeScroll}>
                  Risk Profile
                </Link>
              </li>
              <li>
                <Link to="/financial-literacy" className="footerNavLink"   onClick={executeScroll}>
                  Financial Literacy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footerNavLink"   onClick={executeScroll}>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul className="footerSectionEndContact">
              <li > <h6>+91 770 404 7770</h6> </li>
              <li > <h6>hello@befinsavvy.com</h6> </li>
              <li>
                <div className="">
                  <a
                    href="https://www.facebook.com/Befinsavvynow"
                    target="_blank"
                  >
                    <img src="/facebookIcon.svg" className="footerSocialIcon" />
                  </a>
                  <a
                    href="https://www.instagram.com/befinsavvynow/"
                    target="_blank"
                  >
                    <img
                      src="/instagramIcon.svg"
                      className="footerSocialIcon"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/befinsavvy/"
                    target="_blank"
                  >
                    <img src="/linkedinIcon.svg" className="footerSocialIcon" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p
        style={{ textAlign: "center", padding: "0", margin: "0" }}
        className="secondaryText"
      >
        All rights reserved &copy;BeFinSavvy 2021
      </p>
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
    </footer>
  );
};

export default NewFooter;
