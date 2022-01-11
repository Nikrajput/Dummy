import { Button } from '@material-ui/core'
import { NavLink ,Link} from "react-router-dom";
import React,{useState,useEffect} from 'react';
import { isMobile } from 'react-device-detect'
import ContactForm from '../../../backend/contactForm/contactForm';
import { useRef } from 'react'
import ButtonMailto from "../../../backend/contactForm/mailto.js";

const LOGO_COLOR = "#4ED0CE";

export default function Footer(props) {
	const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
// General scroll to element function
  
const executeScroll = () => scrollToRef(props.a) 

	const [showcnt,setshowcnt]=useState(false)
const talk=()=>{
	if(showcnt){
		setshowcnt(false)
	}else{
		setshowcnt(true)
	}
}
  return (
    <div className="footer">
      {isMobile && <hr className="footerDivider"/>}
      <div className="footerContent">
		    <div className="footerLogoSection">
		    	<img src="/horizontalLightWText.png" className="footerLogo" />
		    </div>
			  <div className="footerSectionEnd">
			  	<div className="footerSectionEndLinks">
			  		<div className="footerSectionCompanyLinks">
			  			<span style={{fontWeight:"700"}}>COMPANY</span>
			  			<ul>
								{props.a?(<>
								<li>
                  <NavLink to="/about" onClick={executeScroll} tag={Link}className="footerNavLink">
			  					  About Us
                  </NavLink>  
			  				</li>
			  				<li>
                  <NavLink to="/services" onClick={executeScroll} tag={Link} className="footerNavLink">
			  					Services
                  </NavLink>
								</li></>):(<>
									<li>
										<NavLink to="/about" tag={Link} className="footerNavLink">AboutUs</NavLink>  
									</li>
									<li>
										<NavLink to="/services" tag={Link} className="footerNavLink">Services
										</NavLink>
									</li>
									</>)}
			  				<li>      
			  				</li>
			  			</ul>
			  		</div>
			  		<div className="footerSectionSupport">
			  			<span style={{fontWeight:"700"}}>RESOURCES</span>
			  			<ul>
			  				<li>
                  <NavLink to="/risk-profile" className="footerNavLink">
                    Risk Profile
                  </NavLink>
			  				</li>
			  				<li>
                  <NavLink to="/financial-literacy" className="footerNavLink">
                    Financial Literacy
                  </NavLink>
			  				</li>
                <li>
                  <NavLink to="/faq" className="footerNavLink">
                    FAQs
                  </NavLink>
			  				</li>
			  			</ul>
			  		</div>
			  	</div>
			  	<div className="footerSectionEndContact">
            <div>
						  <a href="https://wa.me/917704047770?  text=Hi%20BeFinSavvy%20Can%20you%20please%20call%20me%20back?%20"   target="_blank" style={{textDecoration: 'none' }}>
						  	<Button color='secondary' className='navButton' variant="contained">
	  				  	  <span className="primaryFont700" style={{textTransform:"none"}}>
										Talk To  Us
						  	    <img src="/WAicon.png" className="footerSocialIcon1" />
						  	  </span>
	  				    </Button></a>
            </div>
			  		{!isMobile?(<div className="footerContactNumber">+91 770 404 7770</div>):(
						<a href="tel:7704047770" className="footerContactNumber">+91 770 404 7770</a>)}
			  		<div className="footerContactEmail"><ButtonMailto label="hello@befinsavvy.com" mailto="mailto:hello@befinsavvy.com?subject=New Message for BeFinSavvy!&body=Hi BeFinSavvy, 

I am interested to learn more about you.

Please send me information regarding...

Thank you!
" /></div>
            <div className="footerSectionEndContactSocial">
			  		  <a href="https://www.facebook.com/Befinsavvynow" target="_blank">
                <img src="/facebookIcon.svg" className="footerSocialIcon" />
              </a>
              <a href="https://www.instagram.com/befinsavvynow/" target="_blank">
                <img src="/instagramIcon.svg" className="footerSocialIcon"/>
              </a>
			  		  <a href="https://www.linkedin.com/company/befinsavvy/" target="_blank">
                <img src="/linkedinIcon.svg" className="footerSocialIcon"/>
              </a>
			  	  </div>
			  	</div>
			  </div>
        <div className="footerCopyrightText secondaryText">
			  	Copyright Ⓒ 2021<br/>
			  	BeFinSavvy
			  </div>
				{showcnt?(
	      <div className="contactform1">
	        <div className="primaryFont700 primaryColor heading">
	          TALK TO US TO FIND OUT<span style={{textAlign:"right",paddingLeft:"60px",   color:"#238EE7",cursor:"pointer"}} onClick={talk}>X</span><br/>
	          HOW WE CAN HELP YOU.
	        </div>
          <div className="secondaryFont subheading">
            We promise we won't spam your inbox :)
            <ContactForm />
          </div>
        </div>):(<></>)}
      </div>
    </div>
  )
}
