import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/database";
// import "firebase/compat/storage";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyCgAH1CS7zeHQp_UjX6XJO8L6TGYsy7GAM",
  authDomain: "befinsavvy-b5f77.firebaseapp.com",
  databaseURL:
    "https://befinsavvy-b5f77-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "befinsavvy-b5f77",
  storageBucket: "befinsavvy-b5f77.appspot.com",
  messagingSenderId: "1068654211417",
  appId: "1:1068654211417:web:ae4d807219ce4ee9b09c48",
  measurementId: "G-0SD82D3DLG",
};
if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

const firebaseApp = initializeApp(config);

// ** Modulerized Firebase ** //
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const db1 = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

let user = auth.currentUser;

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

//separting database API and authentication
// const db = firebase.database();
// const db1=firebase.database();
// const auth = firebase.auth();
// const storage = firebase.storage();
// let user = firebase.auth().currentUser;
// const facebookProvider = new firebase.auth.FacebookAuthProvider();

// const googleProvider = new firebase.auth.GoogleAuthProvider();

export {
  user,
  db1,
  db,
  auth,
  facebookProvider,
  googleProvider,
  firebaseApp as firebase,
  storage,
};
