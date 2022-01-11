// import React,{useState,useEffect} from 'react';
// import {db1,storage} from "../firebase/firebase"
// import {db} from "../firebase"
// import firebase from "firebase/app";
// import "firebase/auth";

import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

async function getpersonal(user) {
  var personal = {
    Email: user.email,
    Status: "Single",
    Phonenumber: user.phoneNumber,
  };

  const personalInfoRef = ref(db, `users/${user.uid}/personal`);
  onValue(personalInfoRef, (snapshot) => {
    console.log("snapshot: ", snapshot.val())
    Object.assign(personal, snapshot.val());
  });
  return personal;
}

async function getincome(user) {
  const incomeRef = ref(db, `users/${user.uid}/income`);
  onValue(incomeRef, (snapshot) => {
    return snapshot.val()
  })
}

async function getexpenditure(user) {
  const monthlyExpenditureRef = ref(db, `users/${user.uid}/monthlyexpenditure`);
  onValue(monthlyExpenditureRef, (snapshot) => {
    return snapshot.val()
  })
}

async function getinvestments(user) {
  const investmentRef = ref(db, `users/${user.uid}/investment`);
  onValue(investmentRef, (snapshot) => {
    return snapshot.val()
  })
}

async function getrecommendedexpenditure(uid) {
  const recommmendedRef = ref(db, `users/${uid}/recommendedmonthlyexpenditure`);
  onValue(recommmendedRef, (snapshot) => {
    return snapshot.val()
  })
}

async function getrecommendedinvestments(uid) {
  const recommendedRef = ref(db, `users/${uid}/recommendedinvestment`);
  onValue(recommendedRef, (snapshot) => {
    return snapshot.val()
  })
}

const RoundOffNearest100 = (num) => {
  return Math.ceil(num/100)*100
}

function recommendedvalues(netinc, status) {
  const a = netinc;
  let rent, bills, groc, trans, med, dom, oth, shop, gym, ent, subscrip, other, save;
  if (status === "Single") {
    rent = RoundOffNearest100( 0.12 * a );
    bills = RoundOffNearest100( 0.02 * a );
    groc = RoundOffNearest100( 0.07 * a );
    trans = RoundOffNearest100( 0.03 * a );
    med = RoundOffNearest100( a * 0.02 );
    dom = RoundOffNearest100( a * 0.02 );
    oth = RoundOffNearest100( 0.01 * a );
    shop = RoundOffNearest100( 0.05 * a );
    gym = RoundOffNearest100( 0.01 *a );
    ent = RoundOffNearest100( 0.05 * a );
    subscrip = RoundOffNearest100( 0.01 * a );
    other = RoundOffNearest100( 0.03 * a );
    save = RoundOffNearest100( 0.4 * a );
  } else {
    rent = RoundOffNearest100( 0.18 * a );
    bills = RoundOffNearest100( 0.04 * a );
    groc = RoundOffNearest100( 0.1 * a );
    trans = RoundOffNearest100( 0.05 * a );
    med = RoundOffNearest100( a * 0.04 );
    dom = RoundOffNearest100( a * 0.04 );
    oth = RoundOffNearest100( 0.01 * a );
    shop = RoundOffNearest100( 0.07 * a );
    gym = RoundOffNearest100( 0.01 *a );
    ent = RoundOffNearest100( 0.05 * a ); 
    subscrip = RoundOffNearest100( 0.01 * a );
    other = "";
    save = RoundOffNearest100( 0.3 * a );
  }

  let subtotal1=rent+bills+groc+trans+med+dom+oth;
  let subtotal2=shop+gym+ent+subscrip+other;

  let monthlyexpenditure = {
    Rent: rent,
    Bills: bills,
    Groceries: groc,
    Transport: trans,
    Medical: med,
    Domestic: dom,
    Emi: "",
    Otherexpenses: oth,
    Subtotal1: subtotal1,
    Shopping: shop,
    Gym: gym,
    Entertainment: ent,
    Subscription: subscrip,
    Others: other,
    Subtotal2: subtotal2,
    Savings: save,
  };
  return monthlyexpenditure;
}
function recommendedvaluesinv(a) {
  var investments = {
    Other: "",
    Cash: a * 3,
    Fixeddeposit: "",
    Gold: "",
    Mutualfunds: "",
    Shares: "",
    Cryptocurrency: "",
    Total: a * 3,
  };
  return investments;
}
export {
  getpersonal,
  getincome,
  getexpenditure,
  getinvestments,
  getrecommendedexpenditure,
  getrecommendedinvestments,
  recommendedvalues,
  recommendedvaluesinv,
};
