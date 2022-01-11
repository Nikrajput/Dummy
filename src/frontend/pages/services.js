import { Button, Typography } from '@material-ui/core'
import {react,useState,useEffect} from "react"
// import Header from "../components/header/Header"
import { NavLink, Link } from "react-router-dom";
import HeroVideoSection from '../components/heroVideoPlayerservices'
import Slider from '../components/slider';
import { TESTIMONIALS } from '../../assets/testimonials/testimonials1';
import ContactForm from '../../backend/contactForm/contactForm';
import Accordion from '../components/isThisYouSection/accordion';
import { isMobile } from 'react-device-detect';
import "../../Responsive.css"
// import Footer from '../components/footer/NewFooter'
import img1 from "../../assets/images/servicespageimage1.png"
import { useRef } from 'react'
import iimage from "../../assets/images/iimage.png"
import { useLocation } from "react-router-dom";

import Header from '../components/header/Navbar'
import Footer from '../components/footer'

const PRIMARY_BUTTON = {
    borderRadius: "60px"
}
const Iimage=()=>{
  return(
    <div style={{float:"right"}}>
    <img src={iimage} width="30px"/>
  </div>
  )
}
const HEROBUTTONSTYLE={
  marginTop: "16px", 
  borderRadius: "60px"
}
const SECTION3_BUTTON = {
	marginTop: "16px", 
    borderRadius: "60px",
	border: "2px solid white"
}
const Taxdetails=()=>{
  return(
    <span>Live paycheck to paycheck - on purpose<br/>
    Enhance the quality of your life by creating your budget and tracking your expenses. Reduce the month-end panic by balancing your lifestyle with long-term financial fitness.</span>
  )
}
const Expdetails=()=>{
  return(
    <span>
      Live paycheck to paycheck - on purpose<br/>
      Enhance the quality of your life by creating your budget and tracking your expenses. Reduce the month-end panic by balancing your lifestyle with long-term financial fitness.
    </span>
  )
}
const Portdetails=()=>{
  return(
    <span>
      Become the master of your money<br/>
      Demystify the world of finance and build a balanced investment portfolio that works for you. Start growing your passive income that will lead to your financial freedom.
    </span>
  )
}
const ISTHISYOU_ACCORDION = [
  {summary: "T - Taxes", details:<Taxdetails />},
  {summary: "E - Expenses.", details: <Expdetails />},
  {summary: "P - Portfolio", details: <Portdetails />}
];
const Ultsummary=()=>{
  return(
    <span>
      U - Ultimate<br />
      P - Purpose
    </span>
  )
}
const Ultdetails=()=>{
  return(
    <span>
    Achieve perfect alignment<br/>
 Money is not the end, it’s only the means to achieve an end i.e. your ultimate 
purpose. Explore your deeply seated desires to discover this ultimate purpose. Begin 
to look at your relationship with money from a whole new perspective.
    </span>
  )
}
const ISTHISYOU_ACCORDION1 = [
  {summary:<Ultsummary />, details:<Ultdetails />},
]
export default function Services(props) {
  const [x,setx]=useState(0)
const changex=(y)=>{
  if(x===y){
    setx(0)
  }else{
  setx(y)
}
}
const { pathname } = useLocation();
const [m,setm]=useState(false);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [m])
  const [a,seta]=useState(2);
  const [clickedset,setclickedset]=useState('#4ED0CE')
  const [clickedtax,setclickedtax]=useState('#4ED0CE')
  const [clickedexp,setclickedexp]=useState('black')
  const [clickedport,setclickedport]=useState('black')
  const [clickedult,setclickedult]=useState('black')
  const setta=(x)=>{
    if(x==1){
      setclickedset('#4ED0CE');setclickedexp('black');setclickedtax('black');setclickedport('black');setclickedult('black')
    }else if(x==2){
      setclickedtax('#4ED0CE');setclickedexp('black');setclickedset('black');setclickedport('black');setclickedult('black')
    }else if(x==3){
      setclickedexp('#4ED0CE');setclickedset('black');setclickedtax('black');setclickedport('black');setclickedult('black')
    }else if(x==4){
      setclickedport('#4ED0CE');setclickedexp('black');setclickedtax('black');setclickedset('black');setclickedult('black')
    }else{
      setclickedult('#4ED0CE');setclickedexp('black');setclickedtax('black');setclickedset('black');setclickedport('black')
    }
    seta(x)
  }
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
// General scroll to element function

   const myRef = useRef(null)
   const myRef1=useRef(null)
   const executeScroll = () => scrollToRef(myRef)

  const renderSection2Left = () => {
    if(isMobile){
    return (
        <div className="section2Left">
        <div className="innerSection2Left">
          <div className="primaryFont700 heading1">
          <span style={{color:"#238EE7"}}>STEP-UP</span> <span style={{color:"#4ED0CE"}}>IS OUR PHILOSOPHY FOR MANAGING MONEY.</span>
          </div>
          <div style={{fontSize:"20px",paddingTop:"20px",paddingLeft:"15px"}}>
          <p>S - Set</p></div>
          <div className="isThisYouQuestions">
            <Accordion questions={ISTHISYOU_ACCORDION} summaryClasses="section2AccordionSummary"/>
          </div>
          <p></p>
          <div style={{fontSize:"20px",paddingLeft:"10px",paddingTop:"20px"}}>
          <p >In alignment with your</p>
        </div>
        <div className="isThisYouQuestions">
          <Accordion questions={ISTHISYOU_ACCORDION1} summaryClasses="section2AccordionSummary"/>
        </div>
          </div>	
        </div>
    )
  }
  
  return(
    <div className="section2Left">
    <div className="innerSection2Left">
      <div className="primaryFont700 heading1">
      <span style={{color:"#238EE7"}}>STEP-UP</span> <span style={{color:"#4ED0CE"}}
  >IS OUR PHILOSOPHY<br/>
 FOR MANAGING MONEY.</span>
      </div>
      <div className="section2content" style={{paddingBottom:"0px"}}><br/>
      <div className="padt10">S - Set </div>
      <div className="padt10 cursur" style={{color:clickedtax}} onClick={()=>setta(2)}> T - Taxes > </div> 
      <div className="padt10 cursur" style={{color:clickedexp}} onClick={()=>setta(3)}> E - Expenses > </div>
      <div className="padt10 cursur" style={{color:clickedport}} onClick={()=>setta(4)}> P - Portfolio ></div>
      <div className="padt10" style={{color:"#939393"}}>In alignment with your </div>
      <div className="padt10 cursur" style={{color:clickedult}} onClick={()=>setta(5)}> U - Ultimate ></div>
      <div className="padt10 cursur" style={{color:clickedult}} onClick={()=>setta(5)}>P - Purpose </div><br/>
      <div className="padt10" style={{fontWeight:"initial"}}>Ready to STEP-UP?</div>
      <Button color="primary" style={HEROBUTTONSTYLE} variant="contained" size="large" component={NavLink} to="/signin" tag={Link} onClick={executeScroll}>
  	<div className="heroPrimaryButtonText">Take the first step</div>
</Button>
      </div>
      </div>	
</div>
  )
}
const set=()=>{
  return(
    <div className="servicescard">
      <div className="cardheadr">set</div>
      <div style={{fontSize:"20px",paddingBottom:"10px",borderBottom:"solid 2px",borderColor:"white"}}>Live paycheck to paycheck - on purpose</div>
      <div style={{fontSize:"20px",paddingTop:"10px"}}>Enhance the quality of your life by creating your budget and tracking your expenses. Reduce the month-end panic by balancing your lifestyle with long-term financial fitness.</div>
    </div>
  )
}
const tax=()=>{
  return(
    <div className="servicescard">
      <div className="cardheadr primaryFont700">Save Taxes</div>
      <div style={{fontSize:"20px",paddingBottom:"10px",borderBottom:"solid 2px",
    borderColor:"white"}}>Unlock the black box of individual taxes</div>
      <div style={{fontSize:"20px",paddingTop:"10px"}}>Explore all avenues of tax savings. 
    Discuss specific strategies to learn about personalised options. Leave feeling more 
    confident about your taxes.</div>
    </div>
  )
}
const exp=()=>{
  return(
    <div className="servicescard">
      <div className="cardheadr primaryFont700">Optimise Expenses</div>
      <div style={{fontSize:"20px",paddingBottom:"10px",borderBottom:"solid 2px",
borderColor:"white"}}>Live paycheck to paycheck - on purpose</div>
      <div style={{fontSize:"20px",paddingTop:"10px"}}>Enhance the quality of your life by 
creating your budget and tracking your expenses. Reduce the month-end panic by 
balancing your lifestyle with long-term financial fitness.</div>
    </div>
  )
}
const port=()=>{
  return(
    <div className="servicescard">
      <div className="cardheadr primaryFont700">Manage Portfolio</div>
      <div style={{fontSize:"20px",paddingBottom:"10px",borderBottom:"solid 2px",
borderColor:"white"}}>Become the master of your money</div>
      <div style={{fontSize:"20px",paddingTop:"10px"}}>
      Demystify the world of finance and build a balanced investment portfolio that works for you. Start growing your passive income that will lead to your financial freedom.
      </div>
    </div>
  )
}
const ult=()=>{
  return(
    <div className="servicescard">
      <div className="cardheadr primaryFont700">Ultimate Purpose</div>
      <div style={{fontSize:"20px",paddingBottom:"10px",borderBottom:"solid 2px",
borderColor:"white"}}>Achieve perfect alignment</div>
      <div style={{fontSize:"20px",paddingTop:"10px"}}>
      Money is not the end, it’s only the means to achieve an end i.e. your ultimate purpose. Explore your deeply seated desires to discover this ultimate purpose. Begin to look at your relationship with money from a whole new perspective.
</div>
    </div>
  )  
}
  const renderSection2Right = () => {
  if(isMobile){
    return;
  }
  if (a===1) {
    return (
      <div className="section2Rightservices">
      {set()}
      <div style={{paddingLeft:"10%"}}>
      <img src={`${img1}`} width="100%" height="580px"/>
    </div>
    </div>
    )
  }else if(a===2){
    return(
      <div className="section2Rightservices">
      {tax()}
      <div style={{paddingLeft:"10%"}}>
  <img src={`${img1}`} width="100%" height="580px"/>
</div>
</div>
    )
    }else if(a===3){
      return(
        <div className="section2Rightservices">
        {exp()}
        <div style={{paddingLeft:"10%"}}>
  <img src={`${img1}`} width="100%" height="580px"/>
</div>
</div>
      )
    }else if(a===4){
      return(
      <div className="section2Rightservices">
      {port()}
      <div style={{paddingLeft:"10%"}}>
  <img src={`${img1}`} width="100%" height="580px"/>
</div>
</div>)
    }else if(a==5){
      return(
        <div className="section2Rightservices">
        {ult()}
        <div style={{paddingLeft:"10%"}}>
    <img src={`${img1}`} width="100%" height="580px"/>
  </div>
  </div>)
    }
  }
  const section3services=()=>{
    return(
    <div width="100%">
      <div className="section3head primaryFont700">OUR SERVICES</div>
      <div className="flex3change" style={{marginLeft:"2.5%",marginRight:"2.5%"}}>
        <div className="sec3card" style={{marginBottom:"30px"}}>
          <div className="cardhead"><span className="primaryFont700">FOR SINGLES</span> 
          <span className="cursor" onClick={()=>{changex(1)}}><Iimage/></span>
            {x===1?(
            <span>
            <p className="itext1"><p>We understand the importance of making your own financial decisions.</p><p> It’s an empowering feeling to have a strong relationship with your money.</p><p> Have a 1-on-1 chat with your coach who will guide you on how to achieve your goals without losing your financial personality.</p>
            <p style={{textAlign:"right",cursor:"pointer",paddingRight:"5px"}} onClick={()=>{changex(1)}}>OK</p></p>
            </span>):(<></>)}
           </div>
          <div className="subhead">1-on-1 sessions</div>
          <div className="buttoncenteralign">
          <span>{x===1?(<div style={{paddingTop:"75px"}}></div>):(    
 	<Button color="primary" style={HEROBUTTONSTYLE} variant="contained" size="large" 
component={NavLink} to="/signin" tag={Link}>
 	  	<div className="heroPrimaryButtonText">Get Started</div>
 	</Button>)}</span>
       </div>
       <div className="cardbody">
       <p>1 hour of total consultation</p>
       <p>Detailed financial report with milestone and action plan </p>
       <p>1-month subscription to:</p>
        <p>• Unlimited alerts </p>
        <p>• Unlimited reminders </p>
        <p>• Unlimited WhatsApp support</p>
        <p>Access to all online events </p>
       </div>
        </div>
        <div className="sec3card" style={{marginBottom:"30px"}}>
             <div className="cardhead"><span className="primaryFont700">FOR COUPLES</span> 
             <span className="cursor" onClick={()=>{changex(2)}}><Iimage/></span>
  <span>{x===2?(
  <span >
  <span className="itext1"><p>Talking about money with your partner can be uncomfortable. </p><p>
It’s important to have clearly defined expectations to share this load evenly. </p>
Have a 2-on-1 date with your coach and strengthen your relationship with money and with each other.
  <p style={{textAlign:"right",cursor:"pointer",paddingRight:"5px"}} onClick={()=>{changex(2)}}>OK</p></span>
  </span>):(<></>)}</span>
  </div>
             <div className="subhead">2-on-1 sessions</div>
             <div className="buttoncenteralign">
             <span>{x===2?(<div style={{paddingTop:"75px"}}></div>):(    
         	<Button color="primary" style={HEROBUTTONSTYLE} variant="contained" size="large" component={NavLink} to="/signin" tag={Link}>
         	  	<div className="heroPrimaryButtonText">Get Started</div>
         	</Button>)}</span>
          </div>
          <div className="cardbody">
          <p>2 hours of total consultation</p>
          <p>Detailed financial report with milestone and action plan </p>
          <p>1-month subscription to:</p>
           <p>• Unlimited alerts </p>
           <p>• Unlimited reminders </p>
           <p>• Unlimited WhatsApp support</p>
           <p>Access to all online events </p>
        </div>
        </div>
           <div className="sec3card" style={{marginBottom:"30px"}}>
             <div className="cardhead"><span className="primaryFont700">SUBSCRIPTION</span> 
             <span className="cursor" onClick={()=>{changex(3)}}><Iimage/></span>
  <span>{x===3?(
  <span >
  <span className="itext1"><p>Sign up for this service if you need a little more hand-holding.
</p><p>
Your coach will develop a plan for you and walk you through the execution.
</p>
Subscribe for the bottomless pint to become financially disciplined by developing healthy financial habits.


  <p style={{textAlign:"right",cursor:"pointer",paddingRight:"5px"}} onClick={()=>{changex(3)}}>OK</p></span>
  </span>):(<></>)}</span></div>
             <div className="subhead">For those who want more</div>
             <div className="buttoncenteralign">
             <span>{x===3?(<div style={{paddingTop:"75px"}}></div>):(    
 	<Button color="primary" style={HEROBUTTONSTYLE} variant="contained" size="large" 
component={NavLink} to="/signin" tag={Link}>
 	  	<div className="heroPrimaryButtonText">Get Started</div>
 	</Button>)}</span>
          </div>
          <div className="cardbody">
          <p>3 hours of total consultation</p>
          <p> Detailed financial report with milestone and action plan </p>
          <p>3-month subscription to:</p>
           <p>  • Unlimited alerts </p>
           <p>• Unlimited reminders </p>
           <p>• Unlimited WhatsApp support</p>
           <p> Access to all online events </p>
           <p>Bi-Monthly follow-up calls</p>
   </div>
    </div>
      </div>
      {isMobile?(
        <div style={{paddingLeft:"20px"}}>
      <div className="section3head1 primaryFont700">SIGN-UP FOR A <br/>FREE CONSULATION CALL TODAY</div>
      <p className="section3text">Go on… it’s FREE... <br/>you have nothing to lose!</p>
      <div className="buttoncenteralign">
      <a href="https://wa.me/917704047770?text=Hi%20BeFinSavvy,%20Can%20you%20please%20call%20me%20back?%20" target="_blank" style={{ 
textDecoration: 'none' }}>
<Button color="primary" style={HEROBUTTONSTYLE} variant="contained" size="small">
  	<div className="heroPrimaryButtonText1">Schedule a FREE call <img src="/WAicon.png" className="footerSocialIcon1" /></div>
</Button></a>
</div>
      </div>):(
        <div style={{textAlign:"center"}}>
        <div className="section3head1">SIGN-UP FOR A FREE CONSULATION CALL TODAY</div>
        <span className="section3text">Go on… it’s FREE... you have nothing to lose!</span>
        <div className="buttoncenteralign">
        <a href="https://wa.me/917704047770?text=Hi%20BeFinSavvy,%20Can%20you%20please%20call%20me%20back?%20" target="_blank" style={{ 
textDecoration: 'none' }}>
        <Button color="primary" style={HEROBUTTONSTYLE} variant="contained">
          	<div className="heroPrimaryButtonText">Schedule a FREE call <img src="/WAicon.png" className="footerSocialIcon1"/></div>
        </Button></a>
        </div>
        {showcnt?(
	<div className="contactform1">
	<div className="primaryFont700 primaryColor heading">
	  TALK TO US TO FIND OUT<span style={{textAlign:"right",paddingLeft:"60px",
color:"#238EE7",cursor:"pointer"}} onClick={talk}>X</span><br/>
	  HOW WE CAN HELP YOU.
	</div>
  		<div className="secondaryFont subheading">
   We promise we won't spam your inbox :)
<ContactForm />
</div>
</div>):(
	<></>
)}
        </div>)}
    </div>
    )
  }

  const renderSection5Left = () => {
    return (
        <div className="section5Left">
      <div className="innerSection5Left">
        <div className="primaryFont700 heading">
        INSPIRING STORIES FROM PEOPLE WHO STEPPED UP
        </div>
        <Slider items={TESTIMONIALS}/>
      </div>
        </div>
    )
  }
  const renderSection5Right = () => {
    return (
      <div className="section5Right">
        <div className="innerSection5Right ">
          <div className="secondaryFont greyText section5RightText1">
            Our team comprises of millenials who understand that unlike previous
            generations, we don't want to save money at the cost of enjoying our
            lives
          </div>
          <div
            className="primaryFont700 roiFormulaContainer1"
            style={{ paddingBottom: "180px" }}
          >
            We want to help you secure your future while also striking items off
            your bucket list!
          </div>
          <Button
            variant="contained"
            style={PRIMARY_BUTTON}
            color="primary"
            className="mgt16"
            component={NavLink}
            to="/about"
            tag={Link}
          >
            <div className="primaryFont700 white primaryButtonText">
              Learn more about us
            </div>
          </Button>
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

  return (
    <div className="secondaryFont">
      <Header a={myRef1} />
      <div ref={myRef1}>
        <HeroVideoSection a={myRef} />
      </div>
      {/* {feedbackPopup()} */}
      <div className="section2" ref={myRef}>
        {renderSection2Left()}
        {renderSection2Right()}
      </div>
      <div className="section" style={{ paddingBottom: "100px" }}>
        {section3services()}
      </div>
      <div className="section5" style={{ paddingBottom: "100px" }}>
        {renderSection5Right()}
        {renderSection5Left()}
      </div>
      <Footer a={myRef1} />
    </div>
  );
}
