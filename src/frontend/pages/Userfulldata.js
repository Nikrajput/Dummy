import { NavLink, Link } from "react-router-dom";
import React,{useState,useEffect} from 'react';
import {db1} from "../../firebase/firebase"
import {db} from "../../firebase"
import {getrecommendedexpenditure,getrecommendedinvestments,recommendedvalues,recommendedvaluesinv} from "../../firebase/getdata"
import firebase from "firebase/compat/app";
import { ref, onValue } from "firebase/database";
import "firebase/compat/auth";
import { Typography, Button } from '@material-ui/core'
import {SECONDARYBUTTONSTYLE} from "../components/header/Header"
export default function Userfulldata(props){
  let user = firebase.auth().currentUser;
  //const p=props.location.userdata.personal;
  const i=props.location.userdata.income
  const me=props.location.userdata.monthlyexpenditure
  const inv=props.location.userdata.investments
  const p=props.location.userdata.personal
  let monthlyexpenditure={Rent:"",Bills:"",Groceries:"",Transport:"",Medical:"",Domestic:"",Emi:"",Otherexpenses:"",Subtotal1:0,Shopping:"",Gym:"",Entertainment:"",Subscription:"",Others:"",Subtotal2:0,Savings:""}
  var investments={Other:"",Cash:"",Fixeddeposit:"",Gold:"",Mutualfunds:"",Shares:"",Cryptocurrency:"",Total:0}
  const recvalues=recommendedvalues(i.Netincome,p.Status)
  var total=me.Subtotal1+me.Subtotal2;
  const [stateme,setStateme]=useState(monthlyexpenditure)
  const [stateinv,setStateinv]=useState(investments)
  const [message1,setMessage1]=useState(false);
  const [message2,setMessage2]=useState(false);
  const recvaluesinv=recommendedvaluesinv(total)
  useEffect(()=>{
    const recommmendedRef = ref(db1, `users/${props.location.userdata.uid}/recommendedmonthlyexpenditure`);
    onValue(recommmendedRef, (snapshot) => {
      
      let data=snapshot.val() ? snapshot.val() : stateme;
      let sum1=0,sum2=0;
      for(const key in data){
        if(typeof(data[key])!== "number"){
          const val1=me[key] ? me[key] : 0;
          const val2=recvalues[key] ? recvalues[key] : 0;
          data[key]=Math.min(val1,val2);
        }
        if(key=="Shopping" || key=="Gym" || key=="Entertainment" || key=="Subscription" || key=="Others"){
          sum2+=data[key];
        }
        else{
          if(key!=="Subtotal1" && key!=="Subtotal2" && key!=="Savings")sum1+=data[key];
        }
      }
      data["Subtotal1"]=sum1;
      data["Subtotal2"]=sum2;
      setStateme(prevState => ({
        ...prevState,
        ...data
      }))
      db.docreaterecommendedexpenditure(props.location.userdata.uid,data);
    })
    const recommendedRef1 = ref(db1, `users/${props.location.userdata.uid}/recommendedinvestment`);
    onValue(recommendedRef1, (snapshot) => {
      let data=snapshot.val() ? snapshot.val() : stateinv;
      let total=0;
      for(const key in data){
        if(typeof(data[key])!== "number"){
          const val1=inv[key] ? inv[key] : 0;
          const val2=recvaluesinv[key] ? recvaluesinv[key] : 0;
          data[key]=Math.min(val1,val2);
        }
        if(key!=="Total")total+=data[key];
      }
      data["Total"]=total;
      setStateinv(prevState => ({
        ...prevState,
        ...data
      }))
      db.docreaterecommendedinvestments(props.location.userdata.uid,data);
    })
},[])

  const handleMessage= (setMessage) => {
    setMessage(true);
    const timeId = setTimeout(() => {
      setMessage(false);
    }, 2000)

    return () => {
      clearTimeout(timeId)
    }
  }
  const handlechangep = e => {
    
  };
  const handlechangei = e => {
  };
  const handlechangeme = e => {
    const { name, value } = e.target;
    let subtotal1=stateme["Subtotal1"];
    let subtotal2=stateme["Subtotal2"];
    if(name=="Shopping" || name=="Gym" || name=="Entertainment" || name=="Subscription" || name=="Others"){
      subtotal2+=Number(value)-(stateme[name]?stateme[name]:0);
    }
    else{
      if(name!=="Subtotal1" && name!=="Subtotal2" && name!=="Savings")subtotal1+=Number(value)-(stateme[name]?stateme[name]:0);
    }
    setStateme(prevState => ({
        ...prevState,
        [name]: Number(value),
        "Subtotal1":subtotal1,
        "Subtotal2":subtotal2
    }));
  };
  const handlechangeinv = e => {
    const { name, value } = e.target;
    let total=stateinv["Total"]+Number(value)-(stateinv[name]?stateinv[name]:0);
    setStateinv(prevState => ({
          ...prevState,
          [name]: Number(value),
          "Total":total
    }));
  };
  const handleSubmitp = (e) => {
    db.docreatepersonal(props.location.userdata.uid,p);
  }
  const handleSubmiti = (e) => {
    db.docreateincome(props.location.userdata.uid,i)
  }
  const handleSubmitme = (e) => {
    db.docreaterecommendedexpenditure(props.location.userdata.uid,stateme);
    handleMessage(setMessage1);
  }
  const handleSubmitinv = (e) => {
    db.docreaterecommendedinvestments(props.location.userdata.uid,stateinv)
    handleMessage(setMessage2);
  }
  return(
<>
<div>
<div className="admincard">
  <p className="adminheading">Personal</p>
  <div className="flex">
    <div style={{paddingRight:"10px"}}>
      <tr className="td" ><td className="td" >First name</td><td className="td" >{p.Firstname}</td></tr>
      <tr className="td"><td className="td" >Email</td><td className="td" >{p.Email}</td></tr>
      <tr className="td"><td className="td" >Status</td><td className="td" >{p.Status}</td></tr>
      <tr className="td"><td className="td" >Date of birth</td><td className="td" >{p.Dateofbirth}</td></tr>
      <tr className="td"><td className="td" >Risk profile</td><td className="td" >{p.Riskprofile}</td></tr>
    </div>
    <div>
      <tr className="td"><td className="td" >Last name</td><td className="td" >{p.Lastname}</td></tr>
      <tr className="td"><td className="td" >Phone number</td><td className="td" >{p.Number}</td></tr>
      <tr className="td"><td className="td" >City</td><td className="td" >{p.City}</td></tr>
      <tr className="td"><td className="td" >Age</td><td className="td" >{p.Age}</td></tr>
      <tr className="td"><td className="td" >Financial literacy</td><td className="td" >{p.Financialliteracy}</td></tr>
    </div>
  </div>
</div>
<div className="admincard">
  <p className="adminheading">Monthly Income</p>
  <div className="flex">
  <div style={{paddingRight:"50px"}}>
  <tr className="td"><td className="td" >Basic</td><td className="td" >{i.Basic}</td></tr>
  <tr className="td"><td className="td" >House Rent Allowance (HRA)</td><td className="td" >{i.Hra}</td></tr>
  <tr className="td"><td className="td" >Special/Other Allowance</td><td className="td" >{i.Allow}</td></tr>
  <tr className="td"><td className="td" >Gross Income before Tax</td><td className="td" >{i.Total}</td></tr>
  </div>
  <div>
  <tr className="td"><td className="td" >Provident Fund (PF/EPF)</td><td className="td" >{i.Fund}</td></tr>
  <tr className="td"><td className="td" >Professional Tax</td><td className="td" >{i.Professionaltax}</td></tr>
  <tr className="td"><td className="td" >Income Tax (TDS)</td><td className="td" >{i.Incometax}</td></tr>
  <tr className="td"><td className="td" >Net Income after Tax</td><td className="td" >{i.Netincome}</td></tr>
  </div>
  </div>
</div>
</div>
<div className="admincard1">
  <p className="adminheading">Monthly Expenditure</p>
  <div className="padb10" style={{display:"flex"}}>
    <div>
      <p className="adminsideheading"></p>{
      Object.entries(me).map(([key, value]) => <div style={{width:"250px",height:"32px"}}><tr className="td"><td  className="td" >{key}</td><td style={{width:"50px"}} className="td" >{value}</  td></tr></div>)}
    </div>
    <div>
      <p className="adminsideheading">Recommended values</p>{
      Object.entries(stateme).map(([key, value]) => <div style={{width:"250px",height:"32px",padding:"0px"}}><tr className="td"><td className="td" >  
      <input type="number" name={key} value={value} onChange={handlechangeme} style={{height:"100%",width:"100%",borderWidth:"0px"}}/></td></tr></div>)}
    </div>
    <div >
      <p className="adminsideheading">Ideal values</p>{
      Object.entries(recvalues).map(([key, value]) => <div style={{width:"250px"}}><tr className="td"><td className="td">{value?value:0}</td></tr></div>)}
    </div>
  </div>
  {message1 && <div style={{paddingLeft:"40%"}}>
      <Typography className="primaryFont700 " variant="h6" style={{textTransform:"none",fontSize:"20px",color:'red'}}>
          Saved Successfully
      </Typography>
  </div>}
  <div className="centerbutton1 ">
    <Button color="primary" variant="contained" style={SECONDARYBUTTONSTYLE} onClick={handleSubmitme}>
        <Typography className="primaryFont700 white" variant="h6" style={{textTransform:"none"}}>
          Save
        </Typography>
    </Button>
  </div>
</div>
<br></br>
<div className="admincard1" >
  <p className="adminheading">Monthly Investments</p>
  <div className="padb10" style={{display:"flex"}}>
    <div>
      <p className="adminsideheading"></p>{
      Object.entries(inv).map(([key, value]) => <div style={{width:"250px",height:"32px"}}><tr className="td" ><td className="td" >{key}</td><td style={{width:"50px"}} className="td" >{value}</td></tr></div>)}
    </div>
    <div>
      <p className="adminsideheading">Recommended values</p>{
      Object.entries(stateinv).map(([key, value]) => <div style={{width:"250px",height:"32px"}}><tr className="td" ><td className="td" >  
      <input type="number" name={key} value={value} onChange={handlechangeinv} style={{height:"100%",width:"100%",borderWidth:"0px"}}/></td></tr></div>)}
    </div>
    <div>
      <p className="adminsideheading">Ideal values</p>{
      Object.entries(recvaluesinv).map(([key, value]) => <div style={{width:"250px",height:"32px"}}><tr className="td" ><td className="td">{value?value:0}</td></tr></div>)}
    </div>
    </div>
    {message2 && <div style={{paddingLeft:"40%"}}>
      <Typography className="primaryFont700 " variant="h6" style={{textTransform:"none",fontSize:"20px",color:'red'}}>
          Saved Successfully
      </Typography>
  </div>}
    <div className="centerbutton1">
    <Button color="primary" variant="contained" style={SECONDARYBUTTONSTYLE} onClick={handleSubmitinv}>
        <Typography className="primaryFont700 white" variant="h6" style={{textTransform:"none"}}>
          Save
        </Typography>
    </Button>
    </div>
</div>
</>
  )
}
