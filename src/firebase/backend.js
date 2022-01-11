// import React,{useState,useEffect} from 'react';
// import {db1,storage} from "../firebase/firebase"
// import {db} from "../firebase"
// import firebase from "firebase/app";
// import "firebase/auth";

import { ref, onValue } from 'firebase/database'
import { db } from './firebase'

export default async function getalldata(user){
  if (user.uid) {
    let data;
    const usersRef = ref(db, `users`)
    onValue(usersRef, (snapshot) => {
      data = snapshot.val()    
    })
    console.log("Data: ", data)
    return data
  }
  return {}
}