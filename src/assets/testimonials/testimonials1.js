import IshanRoy from '../images/IshanRoy.jpeg'
import PoojaSrivatsav from '../images/PoojaSrivatsav.jpg'
import HemangMehta from '../images/HemangMehta.jpg'
import AashishBeergi from '../images/AashishBeergi.jpg'
import SakethRamachandra from '../images/SakethRamachandra.jpg'
import JishnuSarkar from '../images/JishnuSarkar.jpg'
import SarthakJha from '../images/SarthakJha.jpg'
const Ishan=()=>{
  return(
  <span>I am not working in a regular corporate job so managing finances was a bit 
  difficult for me. Ankit took time to understand my concerns and then gave solutions in 
  the form of a personalised plan. I think you guys are doing a great job, usually other 
  financial related advisors are not really nice when talking about small amounts of 
  money like 80,000 ruppees,they just say they don't want to waste time in such small 
  amounts. <b>But Befinsavvy not only supports people with a big networth, they also help 
  those who are starting out and have a small networth. I felt really nice interacting 
  with them and being treated so well.</b></span>
  )
}
const Pooja=()=>{
  return(
    <span>I had a very fruitful consultation with BeFinSavvy. The conversation started with an understanding of my financial situation, goals, knowledge, and needs. I had no clue where to even start apart from simply saving money, and relying on my family for making investments. This consultation helped me understand personal finances so that I can make my financial decisions myself.<b> The friendly, non-judgmental nature of the discussion was also a huge plus for me.</b></span>
  )
}
const Hemang=()=>{
  return(
  <span>Ankit is a sincere professional with a keen ear for detail. <b>What makes him stand out is that he is a good listener and an empathetic financial planner.</b> He helped me understand the concepts of financial planning and gave me honest suggestions to achieve my short and long-term goals. I highly recommend Ankit as a go-to financial adviser.</span>
  )
}
const Aashish=()=>{
  return(
  <span>BeFinSavvy is a very useful service for millennials like me who have little idea on how they should manage their finances to optimise their savings and investments.<b> My conversation with Ankit gave me a lot of useful insights and clarity about how to manage my finances better.</b> I highly recommend this to many young professionals.</span>
  )
}
const Saketh=()=>{
  return(
    <span><b>I first heard about Befinsavvy from a friend and I have to say that it has changed how I manage my finances now, to an extent I didn’t think possible.</b> Ankit was really patient, very informative and helped me understand all my possible options for investments. This has helped me manage my personal finances better and invest more wisely! I’m very thankful for the entire experience and would definitely recommend all my friends to take this first incredible step.</span>
  )
}
const Jishnu=()=>{
  return(
    <span>
      BeFinSavvy gave me a great direction towards managing my finances and a personalised investment plan. Ankit personally guided me on how to split my capital into different categories like emergency fund, liquid fund and investments.<b> I really liked the detailed guidance and the newly created budgeting and expense tracking excel sheet that they provide. They’re helping me a lot towards my journey of becoming financially free.</b>
    </span>
  )
}
const Sarthak=()=>{
  return(
    <span>I took the consultation because I lacked knowledge and wanted to get a second opinion. It's helpful to get someone else's perspective, especially if their a financial advisor or expert. I was really surprised and pleased with the results and now have better understanding about my future expenses. <b>If I didn't talk to you guys I  would be losing time and making mistakes, which would cost me in long term.</b></span>
  )
}
export const TESTIMONIALS = [
  { 
    img: IshanRoy,
    name:"Ishan Roy",
    designation: "Sailor",
    company: "Ship",
    location: "Somewhere in the sea",
    review:<Ishan />
  },
  {
    img: PoojaSrivatsav,
    name: "Pooja Srivatsav", 
    designation: "Assistant Product Manager",
    company: "Educational Initiatives",
    location: "Bengaluru",
    review:<Pooja />
  },
  {
    img: HemangMehta,
    name: "Hemang Mehta",
    designation: "Senior Graphic Designer",
    company: "A.C.E.R",
    location: "New Delhi",
    review:<Hemang />
  },
  {
    img: AashishBeergi,
    name: "Aashish Beergi",
    designation: "Founder & CEO",
    company: "MASH Project Foundation",
    location: "New Delhi",
    review:<Aashish />
  },
  {
    img: SakethRamachandra,
    name: "Saketh Ramachandra",
    designation: "Talent Manager",
    company: "Kwan Entertainment",
    location: "Hyderabad",
    review:<Saketh />
  },
  {
    img: JishnuSarkar,
    name: "Jishnu Sarkar",
    designation: "Web Developer",
    company: "Commutatus",
    location: "Chennai",
    review:<Jishnu />
  },
  {
    img: SarthakJha,
    name: "Sarthak Jha",
    designation: "Senior Software Engineer",
    company: "Gold Setu",
    location: "New Delhi",
    review:<Sarthak />
  }
]