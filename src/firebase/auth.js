import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

//sign up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
//sign in
export const doSignInWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

//sign out
export const doSignOut = () => signOut(auth);

//## below are two more functions, for resetting or changing passwords ##

//password reset
export const doPasswordReset = (email) => sendPasswordResetEmail(auth, email);

//password change
export const doPasswordChange = (password) => updatePassword(auth.currentUser, password);

//#### for
//     facebook #####
export const doFacebookSignIn = () => signInWithPopup(auth, facebookProvider);

export const dogoogleSignIn = () => signInWithPopup(auth, googleProvider);
