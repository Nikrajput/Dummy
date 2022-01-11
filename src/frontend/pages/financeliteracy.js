import React, { useState,useEffect } from 'react';
import {SECONDARYBUTTONSTYLE} from "../components/header/Header"
import { AppBar, Typography, Button } from '@material-ui/core'
import { NavLink, Link } from "react-router-dom";
import "../components/App.css"
import trees from "../../assets/images/trees.png"
import logo from "../../assets/images/tree.png"
import ele from "../../assets/images/elephant_image.png"
import "./riskprofile.css";
import {user,db1} from "../../firebase/firebase"
import {db} from "../../firebase"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "../../index.css"
import Header from "../components/header/Header"
import withAuthorization from "../authentication/withAuthorization";
import "react-circular-progressbar/dist/styles.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar,Step } from "react-step-progress-bar";
import {useHistory} from 'react-router-dom';
import { sendEmail } from '../../utils/sendEmail';
//set the answer number in nums
const nums=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
//for number of questions answered
const nu=[0];
//score for each question
const sco=[0,0,0,0,0,0,0,0,0,0];
//whether answered or skipped update n
const n=[0,0,0,0,0,0,0,0,0,0,0];
function Finance(props) {
  //questions
  const history = useHistory();
  var user = firebase.auth().currentUser;
  const questions=[
  {
    question:"When you purchase a brand-new car...",
    options:[
      {op:"You own an asset that is likely to appreciate in value",num:"0",score:0},
      {op:"Your net worth will probably decrease immediately by at least 5% of the car’s purchase price",num:"1",score:1},
      {op:"Your new car insurance premium is lower than that for older-model used cars",num:"2",score:0},
      {op:"Your new car registration price is lower than that for older-model used cars",num:"3",score:0},
      {op:"Not sure",num:"4",score:0}
           ]
  },
  {
    question:"When you have taken a loan, in order to repay the minimum total amount how long should the loan be taken for? ",
    options:[
      {op:"3-year",num:"1",score:1},
      {op:"5-year",num:"2",score:0},
      {op:"7-year",num:"3",score:0},
      {op:"10-year",num:"4",score:0},
      {op:"Not sure",num:"5",score:0}
            ]
  },
  {
  question:"What are loan payments based on?",
  options:[
    {op:"Amount of borrowing",num:"1",score:0},
    {op:"Interest rate",num:"2",score:0},
    {op:"Length of the loan",num:"3",score:0},
    {op:"First and second options only",num:"4",score:0},
    {op:"All of the above",num:"5",score:1},
          ]
  },
  {
  question:"If the current inflation rate is at 5%...",
  options:[
    {op:"Investments in securities (stock market, mutual funds) adjust to market conditions by 5%",num:"1",score:0},
    {op:"Retirement or pension plans adjust to market conditions by 5%",num:"2",score:0},
    {op:"My net income needs to increase by 5% to maintain my current lifestyle",num:"3",score:0},
    {op:"My savings need to increase by 5% to maintain my current lifestyle",num:"4",score:1},
    {op:"Not sure",num:"5",score:0}
          ]
  },
  {
  question:"If you can’t pay all your credit card bills completely, the best way is to... ",
  options:[                
    {op:"Pay more than the minimum monthly payments on all your credit cards",num:"1",score:0},
    {op:"Pay completely the card with the lowest balance first",num:"2",score:0},
    {op:"Pay the minimum monthly payments on all credit cards and the remaining on the card with the highest interest rate",num:"3",score:1},
    {op:"Pay the maximum payment on the card with the highest balance",num:"4",score:0},
    {op:"Not sure",num:"5",score:0},            
          ]
  },
  {
  question:"What should you be prepared to pay prior to moving into a rental property?",
  options:[
    {op:"Current rent",num:"1",score:0},
    {op:"New rent",num:"2",score:0},
    {op:"Security deposit",num:"3",score:0},
    {op:"Expenses associated with utilities",num:"4",score:0},
    {op:"All of the above",num:"5",score:1},
    {op:"Not sure",num:"6",score:0},
          ]
  },
  {
  question:"If inflation is at 5%, which one is most likely to lose 5% purchasing power?",
  options:[                
    {op:"Stock market",num:"1",score:0},
    {op:"Real estate",num:"2",score:0},
    {op:"Cash",num:"3",score:1},
    {op:"Commodities",num:"4",score:0},
    {op:"Bonds",num:"5",score:0},
    {op:"Not sure",num:"6",score:0},
          ]
  },
  {
  question:"What is most important to decide the interest rate on your loan?",
    options:[
    {op:"Amount and duration of the loan",num:"1",score:0},
    {op:"Type of the loan",num:"2",score:0},
    {op:"Your credit score",num:"3",score:0},
    {op:"Second and Third options only",num:"4",score:1},
    {op:"All the above",num:"5",score:0},
    {op:"Not sure",num:"6",score:0},
          ]
  },
  {
  question:"Which of the following categories influence your credit score?",
  options:[
    {op:"Outstanding debt",num:"1",score:0},
    {op:"Payment history",num:"2",score:0},
    {op:"Types of credit used",num:"3",score:0},
    {op:"First and second options only",num:"4",score:0},
    {op:"All of the above",num:"5",score:1},
    {op:"Not sure",num:"6",score:0},
          ]
  },
  {
    question:"The biggest risk of owning long-term bonds for capital preservation is:",
    options:[
      {op:"Falling interest rates",num:"1",score:0},
      {op:"Rising interest rates",num:"2",score:1},
      {op:"Falling rupee",num:"3",score:0},
      {op:"Rising rupee",num:"4",score:0},
      {op:"Real estate prices",num:"5",score:0},
      {op:"Not sure",num:"6",score:0},
            ]
    }    
    ]
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  // % of elephant movement 
  const cu=(10)*(currentQuestion);

  const handleAnswerOptionClick = (a,selectedop) => {
    if(nums[currentQuestion]=== -1){
      nu[0]=nu[0]+1;
      n[currentQuestion]=1;
    }
    nums[currentQuestion]=selectedop.num;
    sco[currentQuestion]=selectedop.score;
		const nextQuestion = currentQuestion + a;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		}else{
    if(nu[0]<10){
      alert("Answer all questions");
    }
    else{
    setShowScore(true);
    }
    }
	};

  const handleAnswerOptionClick1 = (a) => {
    if(currentQuestion!==0 || a!==-1){
		  const nextQuestion = currentQuestion + a;
		  if (nextQuestion < questions.length) {
			  setCurrentQuestion(nextQuestion);
		  }else{
        if(nu[0]<10){
          alert("Answer all questions");
        }
        else{
        setShowScore(true);
        }
      } 
    }
	};
  //to come back for questions from submit
  const back = () => {
    setShowScore(false)
  };
  
  //details of user
  const [firstname, setFirstname] = useState("");
  const [lastname,setLastname]=useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  useEffect(()=>{
    if(user){
      const dbpersonal = db1.ref(`users/${user.uid}/personal`);
      dbpersonal.once('value', function(snapshot) {
      if(snapshot.val()!=null){
        console.log(snapshot.val())
        setEmail(snapshot.val().Email);
        setFirstname(snapshot.val().Firstname)
        setLastname(snapshot.val().Lastname);
        setNumber(snapshot.val().Number);
      }else{
        setEmail(user.email)
      }
    })
    }
  }, [user])

  //update user info when changed and send mail
  const handleSubmit = async (e) => {
    e.preventDefault();
    const score=sco[0]+sco[1]+sco[2]+sco[3]+sco[4]+sco[5]+sco[6]+sco[7]+sco[8]+sco[9];
    let inv='';
    let pic='';
    let desc='';
    let levell='';
    let desc1='';
    if(score<=4){
      levell="Beginner";
      inv="Beginner";
      pic="conser";
      desc="You have a beginner level of financial knowledge. You may not be able to take financial decisions without proper guidance, which may cost you dearly in the long term. As an individual with a beginner level of understanding, you might want to consult an expert who can help you with most financial decisions while you grow your knowledge. Albert Einstein said it best, “A little knowledge is a dangerous thing”, we would add that"
      desc1="“A little knowledge is dangerous, but staying ignorant is worse.”"
    }
    if(score<=7 && score>4){
      levell="Intermediate";
      inv="Intermediate";
      pic="moder";
      desc="You have an intermediate level of financial knowledge. You can take some financial decisions on your own, but mostly the result may be a mixture of sound decision-making and luck.As an individual with an intermediate level of understanding, you might want to consult an expert who can fill any gap in your understanding and help you avoid costly mistakes, particularly for decisions involving large sums of money" 
      desc1="“A little knowledge is a dangerous thing.” - Albert Einstein "     
    }
    if(score>7){
      levell="Advanced";
      inv="Advanced";
      pic="aggres";
      desc="You have an advanced level of financial knowledge. You can take most financial decisions on your own after careful analysis and research As an individual with an advanced level of understanding, you are already doing a good job. However, you might want to consult an expert for the latest products as well as their suitability for you. After all, overconfidence is an enemy when it comes to knowledge."
      desc1="Albert Einstein said it best, “More the knowledge lesser the ego. Lesser the knowledge more the ego.”"
    }
    if(user!=null){
      db.docreatepersonalwithfinance(
        user.uid,
        email,
        levell,
        number,
        firstname,
        lastname
      )
    }
    db.doCreatFinance(
      //store some info from facebook into the firebase db
      firstname,
      lastname,
      email,
      email.replace(/[.]/g,",").replace(/[#]/g,","),
      levell,
      number
    )
    const Name=firstname;
    const sub=Name+"'s your financial literacy report by BeFinSavvy is here! "

    const htmlTemplate = {
      templateId: 0,
      firstname,
      pic,
      inv,
      levell,
      desc,
      desc1
    }
    
    await sendEmail(sub, htmlTemplate)

    }
  const pro =(index)=>{
    const nextQuestion=index;
    setCurrentQuestion(nextQuestion);
  }

  //render component
  return (
    <div className="secondaryFont fontSize18">
      <Header />
    {showScore ?(


      /* for submission */
      <div>
      <div className="flexchange">
      <div className="flexhalfchange">
        <div className="flex padt50 treefix">
        <img src={`${trees}`} width="300px" height="400px"/>
        <img className="elepic" src={`${ele}`} width="150px" height="180px"/>
        </div>
      </div>
        <div className="flexhalfchange padt50 submithead">
          <div className="secondaryFont  align ">
          <h1 className=" primaryFont700">Submit</h1>
            <form onSubmit={handleSubmit} action="../../post" method="post" className="fixsize">
              <label style={{paddingBottom:"25px"}}>First Name* <input type="text" required value={firstname} onChange={e => setFirstname(e.target.value)}/></label>
              <br />
              <label style={{paddingBottom:"25px",}}>Last Name* <input type="text" required value={lastname} onChange={e => setLastname(e.target.value)}/></label><br />
              <label style={{paddingBottom:"25px"}}>Email* <input type="text" required value={email} onChange={e => setEmail(e.target.value)}/></label><br />
              <label style={{paddingBottom:"25px"}}>Phone <input type="text"  value={number} onChange={e => setNumber(e.target.value)}/></label>
              <div className="flex">
              <Button  className="flex50" color="primary" variant="contained" style={SECONDARYBUTTONSTYLE} onClick={()=>back()}>
                <Typography className="primaryFont700 white" variant="h6">
                  Back
                </Typography>
            </Button>
            <div className="flex50 padl10">
            <Button  type="submit" color="primary" variant="contained" style={SECONDARYBUTTONSTYLE} >
                <Typography className="primaryFont700 white" variant="h6">
                  Submit
                </Typography>
            </Button></div>
              </div>
            </form>
          </div>
        
        </div>
      </div>
      </div>
    ):
    (
      /*for questions */
      <div>
        <div>
      </div>
      <div >
      <div className="flex">
      <div><i className="arrow left" onClick={()=>handleAnswerOptionClick1(-1)}></i>
      </div>
      <div>
        <h1 className="primaryFont700 center_align padt50">Financial Literacy Quiz</h1>
        
        <div className="secondaryFont fontSize18 app">
          <div >
            <div className="padb20 questions">{questions[currentQuestion].question}
            </div>
          </div>
          <div>
            {questions[currentQuestion].options.map((answerOption) => {
            if(answerOption.num===nums[currentQuestion]){
              return(<p><button className="button1" onClick={() => handleAnswerOptionClick(1,answerOption)}>{answerOption.op}</button></p>);
            }else{
              return(<p><button className="button" onClick={() => handleAnswerOptionClick(1,answerOption)}>{answerOption.op}</button></p>);
            }})}
          </div>
        </div>
        <div>
        <div className="ele-container">
    <div className={`${currentQuestion===1?"one object":null}`}>
    <div className={`${currentQuestion===2?"two object":null}`}>
    <div className={`${currentQuestion===3?"three object":null}`}>
    <div className={`${currentQuestion===4?"four object":null}`}>
    <div className={`${currentQuestion===5?"five object":null}`}>
    <div className={`${currentQuestion===6?"six object":null}`}>
    <div className={`${currentQuestion===7?"seven object":null}`}>
    <div className={`${currentQuestion===8?"eight object":null}`}>
    <div className={`${currentQuestion===9?"nine object":null}`}>
  <div className="ele-wrapper">
 <div className="ele-tail"></div>
  <div className="ele-body">
    <div className="ele-head">
      <div className="ele-eyebrows"></div>
        <div className="ele-eyes"></div>
          <div className="ele-mouth"></div>
            <div className="ele-fang-front"></div>
              <div className="ele-fang-back"></div>
                <div className="ele-ear"></div>
                 </div>
              </div>
              <div className="ele-leg-1 ele-leg-back">
              <div className="ele-foot"></div>
             </div>
             <div className="ele-leg-2 ele-leg-front">
             <div className="ele-foot"></div>
          </div>
          <div className="ele-leg-3 ele-leg-back">
            <div className="ele-foot"></div>
           </div>
           <div className="ele-leg-4 ele-leg-front">
           <div className="ele-foot"></div>
        </div>
         </div>
         </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
     </div>
     </div>
     <div className="padt70">
        </div>
        <div>
        <ProgressBar percent={cu}>
           <Step>
           {({ accomplished, index }) => (
              <div>
              
              <div className={`indexedStep ${accomplished ? `${n[index]?"notanswered":"answered"}` : null}`} onClick={()=>pro(index)}>
                {index+ 1}
               </div>
               </div>)}
           </Step>
          <Step>
            {({ accomplished, index }) => (
              <div>
              <div className={`indexedStep ${accomplished ? `${n[index]?"notanswered":"answered"}` : null}`} onClick={()=>pro(index)}>
                {index+ 1}
               </div>
               </div>)}
              </Step>
          <Step>
          {({ accomplished, index }) => (
            <div>
            <div className={`indexedStep ${accomplished ? `${n[index]?"notanswered":"answered"}` : null}`} onClick={()=>pro(index)}>
              {index+ 1}
             </div>
             </div>)}
            </Step>
            <Step>
            {({ accomplished, index }) => (
            <div>
            <div className={`indexedStep ${accomplished ? `${n[index]?"notanswered":"answered"}` : null}`} onClick={()=>pro(index)}>
              {index+ 1}
             </div>
             </div>)}
            </Step>
            <Step>
            {({ accomplished, index }) => (
              <div>
              <div className={`indexedStep ${accomplished ? `${n[index]?"notanswered":"answered"}` : null}`} onClick={()=>pro(index)}>
                {index+ 1}
               </div>
               </div>)}
            </Step>
            <Step>
            {({ accomplished, index }) => (
              <div>
              <div className={`indexedStep ${accomplished ? `${n[index]?"notanswered":"answered"}` : null}`} onClick={()=>pro(index)}>
                {index+ 1}
               </div>
               </div>)}
            </Step>
            <Step>
            {({ accomplished, index }) => (
              <div>
              <div className={`indexedStep ${accomplished ? `${n[index]?"notanswered":"answered"}` : null}`} onClick={()=>pro(index)}>
                {index+ 1}
               </div>
               </div>)}
            </Step>
            <Step>
            {({ accomplished, index }) => (
              <div>
              <div className={`indexedStep ${accomplished ? `${n[index]?"notanswered":"answered"}` : null}`} onClick={()=>pro(index)}>
                {index+ 1}
               </div>
               </div>)}
            </Step>
            <Step>
            {({ accomplished, index }) => (
              <div>
              <div className={`indexedStep ${accomplished ? `${n[index]?"notanswered":"answered"}` : null}`} onClick={()=>pro(index)}>
                {index+ 1}
               </div>
               </div>)}
            </Step>
            <Step>
            {({ accomplished, index }) => (
              <div>
                <img alt="" src={`${trees}`} className="run"/>
            </div>)}
            </Step>
            </ProgressBar>
            </div>
           </div>
      </div>
      <p><i className="arrow right" onClick={()=>handleAnswerOptionClick1(1)}></i></p>
      </div>
      </div>
    </div>)}
  </div>); }
export default Finance;

