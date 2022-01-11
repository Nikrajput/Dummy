import { Typography, Button } from '@material-ui/core'
import React from 'react'
import video from  '../../assets/videos/race.mp4'
import ReactTextTransition, { presets } from "react-text-transition";
import { useHistory } from 'react-router-dom';
import { isMobile, isMobileOnly } from 'react-device-detect';
import { NavLink, Link } from "react-router-dom";
import { useRef } from 'react'
const HEROBUTTONSTYLE={
  marginTop: "16px", 
  borderRadius: "60px"
}

const TEXTS = [
  "optimizing expenses",
  "managing investments",
  "financial freedom",
  "saving taxes",
  "repaying loans",
  "planning insurance"
]
const LOGO_COLOR = "#4ED0CE";

const SERVICES_ROUTE = "/services"

export default function HeroVideoplayer(props) {
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
  // General scroll to element function
  
  const executeScroll = () => scrollToRef(props.a)  
  const [textIndex, setIndex] = React.useState(0);
  const history = useHistory()

  React.useEffect(() => {
  const timeout = setTimeout(() => {
      setIndex(textIndex => textIndex + 1)
    }, 3000)
    return () => {clearTimeout(timeout)}
  }, [textIndex])

  const routeToServices = () => {
    history.push(SERVICES_ROUTE)
  }

  const renderOverlayText = () => {
    if(isMobileOnly){
      return (
      <div className="overlayText">
			  <div className="overlaySection1">
		  		<div className="heroHeadlineservices2 primaryFont700" >
            	Avoid costly mistakes <br/>and reach your financial<br/> goals faster
				  </div>
			  </div>
        <div className="heroHeadlineservices1 primaryFont700" style={{paddingTop:"140px",  color:"black",textTransform:"none",fontSize:"25px"}}>
          Wondering how?
        </div>
			  <div className="buttoncenteralign" style={{paddingBottom:"60px"}}>	
          <Button color="primary" style={HEROBUTTONSTYLE} variant="contained" size="large" onClick={routeToServices} >
            <div className="primaryButtonText">
              Learn More
            </div>
          </Button>
			  </div>
      </div>
      )
    }
	else return (
    <div className="overlayText">
		  <div className="overlaySection1">
		  	<div className="heroHeadlineservices1 primaryFont700">
            	Avoid costly mistakes and reach <br />your financial goals faster
				</div>
			</div>
      <div className="heroHeadlineservices1 primaryFont700" style={{paddingTop:"100px",color:"black",textTransform:"none",fontSize:"25px"}}>
        Wondering how?
      </div>
			<div className="buttoncenteralign" style={{paddingBottom:"60px"}}>
        <Button color="primary" style={HEROBUTTONSTYLE} variant="contained" size="large" onClick={executeScroll} >
          <div className="heroPrimaryButtonText">STEP-UP!</div>
        </Button>
			</div>
    </div>
    )
  }

  return (
    <> 
      <div className="videoPlayer secondaryFont">
        <video className="bgVideo" autoPlay loop muted aria-label="Hero background video">
        <source src={video} type="video/mp4"/>
        </video>
        {renderOverlayText()}
      </div>
    </>
  )
}
