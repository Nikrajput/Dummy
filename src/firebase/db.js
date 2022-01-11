//this is going to store Firebase realtime database API code
import { db } from "./firebase";
import { ref, onValue, update } from "firebase/database";

//##########3 user API

//create an user and store it at users/id path (it's an asynchronous func)
export const doCreateUser = (id, username, email) =>
  update(ref(db, `users/${id}`), { username, email });

export const userCreatedBy = (id, createdBy) =>
  update(ref(db, `users/${id}`), { createdBy });

export const doCreateStatus = (id, status) =>
  update(ref(db, `users/${id}`), { status });

export const doCreateFutureUser = (id, user) =>
  update(ref(db, `futureUsers/${id}`), { user });

export const doCreatRisk = (
  Firstname,
  Lastname,
  Email,
  Email1,
  level,
  Number
) =>
  update(ref(db, "risk/" + Email1), {
    Firstname,
    Lastname,
    Email,
    level,
    Number,
  });

export const doCreatFinance = (
  Firstname,
  Lastname,
  Email,
  Email1,
  level,
  Number
) =>
  update(ref(db, "finance/" + Email1), {
    Firstname,
    Lastname,
    Email,
    level,
    Number,
  });

export const docreatepersonal = (id, personal) =>
  update(ref(db, `users/${id}`), { personal });
export const requested = (id) =>
  update(ref(db, `users/${id}/personal`), { Requested: "Notdone" });
export const docreatepersonalwithrisk = (
  id,
  Email,
  Riskprofile,
  Number,
  Firstname,
  Lastname
) =>
  update(ref(db, `users/${id}/personal`), {
    Email,
    Riskprofile,
    Number,
    Firstname,
    Lastname,
  });

export const docreatepersonalwithfinance = (
  id,
  Email,
  Financialliteracy,
  Number,
  Firstname,
  Lastname
) =>
  update(ref(db, `users/${id}/personal`), {
    Email,
    Financialliteracy,
    Number,
    Firstname,
    Lastname,
  });

export const docreateincome = (id, income) =>
  update(ref(db, `users/${id}`), { income });

// ** Get the current year **
const currentYear = new Date().getFullYear();

// ** Get the previous month **
const previousMonth = new Date(
  new Date().getTime() - 30 * 24 * 60 * 60 * 1000
).toLocaleString("default", { month: "long" });

export const docreateexpenditure = (id, monthlyexpenditure) =>
  update(
    ref(db, `users/${id}/monthlyexpenses/${currentYear}/${previousMonth}`),
    { ...monthlyexpenditure }
  );

export const docreateinvestments = (id, investment) =>
  update(ref(db, `users/${id}`), { investment });
export const docreatefinancialGoal = (id, financialGoal) =>
  update(ref(db, `users/${id}`), { financialGoal });
export const docreaterecommendedexpenditure = (
  id,
  recommendedmonthlyexpenditure
) => update(ref(db, `users/${id}`), { recommendedmonthlyexpenditure });

export const docreaterecommendedinvestments = (id, recommendedinvestment) =>
  update(ref(db, `users/${id}`), { recommendedinvestment });
export const docreatemessage = (message, Email) =>
  update(ref(db, `Message/${Email}`), { message });
//returns all users from firebase realtime db
// export const onceGetUsers = () => onValue(ref(db, "users"));

// export const doGetAnUnser = (uid) => onValue(ref(db, `users/${uid}`));

// other APIs could come below
