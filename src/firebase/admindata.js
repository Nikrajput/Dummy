import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

async function Adminpersonaldata(user) {
  const userRef = ref(db, `users`);
  onValue(userRef, (snapshot) => {
    return snapshot.val();
  });
}


export default {Admindata}
