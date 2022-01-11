import React, { useState, useEffect } from "react";
import "../../../Responsive.css";

// ** Sections
import { IsItYouSection } from "./isItYouSection";
import { HeroSection } from "./HeroSection";
import { Section3 } from "./Section3";
import { Section4 } from "./Section4";
import { Section5 } from "./Section5";
import { Section6 } from "./Section6";

// ** Header and footer
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer";

// ** Feedback thing
import { FeedbackButton } from "../../components/feedback/button";
import { FeedbackBody } from "../../components/feedback/body";

// ** SE0
import SEO from '../../components/seo'

export default function Landing(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO title="Home" />
      <Navbar />
      <HeroSection />
      <IsItYouSection />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Footer />
    </>
  );
}
