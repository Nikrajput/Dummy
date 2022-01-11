import { Typography, Button } from "@material-ui/core";
import React from "react";
import video from "../../assets/videos/HeroVideo.mp4";
import ReactTextTransition, { presets } from "react-text-transition";
import { useHistory } from "react-router-dom";
import { isMobile, isMobileOnly } from "react-device-detect";

const HEROBUTTONSTYLE = {
  marginTop: "16px",
  borderRadius: "60px",
};

const TEXTS = [
  "optimizing expenses",
  "managing investments",
  "financial freedom",
  "saving taxes",
  "repaying loans",
  "planning insurance",
];
const LOGO_COLOR = "#4ED0CE";

const SERVICES_ROUTE = "/services";

export default function HeroVideoplayer(props) {
  const [textIndex, setIndex] = React.useState(0);
  const history = useHistory();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((textIndex) => textIndex + 1);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [textIndex]);

  const routeToServices = () => {
    history.push(SERVICES_ROUTE);
  };

  const renderOverlayText = () => {
    if (isMobileOnly) {
      return (
        <div className="overlayText">
          <div className="overlaySection1">
            <div className="heroHeadline primaryFont700">
              Your Personal Coach <br />
              for Financial Fitness
            </div>
            <section className="animatedTextSection secondaryFont">
              To help you with <br />
              <ReactTextTransition
                text={TEXTS[textIndex % TEXTS.length]}
                springConfig={presets.gentle}
                style={{
                  margin: "0 0 0 6px",
                  color: LOGO_COLOR,
                  fontWeight: "600",
                }}
                inline
              />
              <span className="primaryColor">.</span>
              {/* THE DOT is intentional please dont remove. */}
            </section>
          </div>
          <div>
            <div className="propositionSection secondaryFont">
              Ready to explore?
            </div>
            <Button
              color="primary"
              style={HEROBUTTONSTYLE}
              variant="contained"
              size="large"
              onClick={routeToServices}
            >
              <div className="primaryButtonText">Check out our services!</div>
            </Button>
            <div className="heroBottomSection primaryFont600">
              Life's not meant to be spent worrying about the storm,
              <br />
              it's meant to be prepared for dancing in the rain!
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="overlayText">
          <div className="overlaySection1">
            <div className="heroHeadline primaryFont700">
              Your Personal Coach <br />
              for Financial Fitness
            </div>
            <section className="animatedTextSection secondaryFont">
              To help you with
              <ReactTextTransition
                className="textShadow"
                text={TEXTS[textIndex % TEXTS.length]}
                springConfig={presets.gentle}
                style={{
                  margin: "0 0 0 6px",
                  color: LOGO_COLOR,
                  fontWeight: "600",
                }}
                inline
              />
              <span className="primaryColor">.</span>
              {/* THE DOT is intentional please dont remove. */}
            </section>
          </div>
          <div className="overlaySection2">
            <div className="propositionSection secondaryFont">
              Ready to explore?
            </div>
            <Button
              color="primary"
              style={HEROBUTTONSTYLE}
              variant="contained"
              size="large"
              onClick={routeToServices}
            >
              <div className="heroPrimaryButtonText">
                Check out our services!
              </div>
            </Button>
            <div className="heroBottomSection primaryFont600">
              Life's not meant to be spent worrying about the storm,
              <br />
              it's meant to be prepared for dancing in the rain!
            </div>
          </div>
        </div>
      );
  };

  return (
    <>
      <div className="videoPlayer">
        <video
          className="bgVideo"
          autoPlay
          loop
          muted
          aria-label="Hero background video"
        >
          <source src={video} type="video/mp4" />
        </video>
        {renderOverlayText()}
      </div>
    </>
  );
}
