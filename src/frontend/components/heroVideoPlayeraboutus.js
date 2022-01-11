import { Typography, Button } from '@material-ui/core'
import React from 'react'
import video from  '../../assets/videos/race.mp4'
import about from "../../assets/images/About1.png"
import about1 from "../../assets/images/About1mobile.png"
import ReactTextTransition, { presets } from "react-text-transition";
import { useHistory } from 'react-router-dom';
import { isMobile, isMobileOnly } from 'react-device-detect';
import { NavLink, Link } from "react-router-dom";
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
        <>
          <picture className="bgVideomobile">
            <img src={about1} width="100%" height="600px"/>
          </picture>
          <div>
			      <div className="overlaySection1">
		        	<div className="heroHeadlinesmobile primaryFont700" style={{fontSize:"24px"}}>
                WE'RE MILLENNIALS,<br/>
                <div style={{fontSize:"20px",backgroundColor:"#CC2844",width:"fit-content",fontWeight:"normal",marginTop:"10px"}}>
                  determined to
                </div>
                <div style={{fontSize:"20px",backgroundColor:"#CC2844",width:"fit-content",fontWeight:"normal"}}>
                  help you retire early!
                </div>
                <div className="secondaryFont" style={{fontSize:"20px", paddingTop:"23vh",color:"black"}}>
                  That’s our mission,<br/> want to know more?
                </div>
                <Button color="secondary" style={HEROBUTTONSTYLE}  variant="contained"     size="large" onClick={routeToServices}onClick=  {routeToServices} >  	
                  <div className="primaryButtonText">Meet the team</div>
                </Button>
			      	</div>
			      </div>
          </div>
        </>
      )
    }
	else return (
    <>
      <picture className="bgVideo">
        <img src={about} width="100%"/>
      </picture>
      <div className="overlayText" style={{paddingLeft:"10vh"}}>
        <div className="overlaySection1">
          <div className="heroHeadline primaryFont700" style={{fontSize:"7vh"}}>
            WE'RE MILLENNIALS<br/>   
            <div style={{fontSize:"4vh",backgroundColor:"#CC2844",width:"fit-content",fontWeight:"normal",marginTop:"10px"}}>
              determined to
            </div>
            <div style={{fontSize:"4vh",backgroundColor:"#CC2844",width:"fit-content", fontWeight:"normal"}}>
              help you retire early!
            </div>
          </div>
        </div>
        <div className="overlaySection2">
          <div className="propositionSection secondaryFont" style={{fontSize:"4vh"}}>
            That’s our mission, want to know more?
          </div>
          <Button color="secondary" style={HEROBUTTONSTYLE} variant="contained" size="large" onClick={routeToServices} >
            <div className="heroPrimaryButtonText">Meet the team</div>
          </Button>
          <div className="heroBottomSection primaryFont600"></div>
        </div>
      </div></>
    )
  }

  return (
    <> 
      <div className="videoPlayer secondaryFont">
        {renderOverlayText()}
      </div>
    </>
  )
}
