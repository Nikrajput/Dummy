import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const PRIMARY_BUTTON = {
  padding: "14px 56px",
  borderRadius: "60px",
  textTransform: "none",
};

import { CustomButton } from "../../frontend/components/CustomButton";

// ** Firebase
import { db } from "../../firebase";
import { db1, storage } from "../../firebase/firebase";
import { ref, onValue } from "firebase/database";
import { sendEmail } from "../../utils/sendEmail";

export default function ContactForm() {
  const user = firebase.auth().currentUser;
  const [hasSubmitted, setSubmitted] = React.useState(false);
  const [state, setState] = useState("");
  const [submit, setSubmit] = useState(false);
  const handlechangep = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    setSubmit(true);
    e.preventDefault();
    const timeout = setTimeout(() => {
      setSubmit(false);
    }, 3000);
    db.docreatemessage(
      state,
      state.Email.replace(/[.]/g, ",").replace(/[#]/g, ",")
    );

    const htmlTemplate = `<p>Firstname: ${state.Firstname}</p>
			<p>Lastname: ${state.Lastname}</p>
      <p>Email: ${state.Email}</p>
      <p>Number: ${state.Phone}</p>
			<p>Message: ${state.Message}</p>`;

    await sendEmail("Call Back Request", htmlTemplate);
    setState({});
  };
  useEffect(() => {
    if (user && user.uid) {
      const personalRef = ref(db1, `users/${user.uid}/personal`);
      onValue(personalRef, (snapshot) => {
        if (snapshot.val() != null) {
          const a1 = "Firstname";
          const a2 = "Lastname";
          const a3 = "Email";
          const a4 = "Phone";
          var v4;
          const v1 = snapshot.val().Firstname;
          const v2 = snapshot.val().Lastname;
          const v3 = snapshot.val().Email;
          if (snapshot.val().Number) {
            v4 = snapshot.val().Number;
          }
          setState((prevState) => ({
            ...prevState,
            [a1]: v1,
            [a2]: v2,
            [a3]: v3,
            [a4]: v4,
          }));
        }
      });
    }
  }, [user]);

  return (
    <div id="contactForm">
      <form onSubmit={handleSubmit}>
        <div className="nameContainer">
          <TextField
            type="text"
            placeholder="First Name *"
            required={true}
            value={state.Firstname}
            name="Firstname"
            onChange={handlechangep}
            className="mgt32 firstNameField"
          />
          <TextField
            type="text"
            placeholder="Last Name"
            // required={true}
            value={state.Lastname}
            name="Lastname"
            onChange={handlechangep}
            className="mgt32 lastNameField"
          />
        </div>
        <div className="contactFormFields">
          <TextField
            type="email"
            placeholder="Email *"
            required={true}
            name="Email"
            value={state.Email}
            onChange={handlechangep}
            className="mgt32"
          />
          <TextField
            type="number"
            placeholder="Phone"
            value={state.Phone}
            name="Phone"
            onChange={handlechangep}
            className="mgt32"
          />
          <TextField
            type="text"
            placeholder="Your Message"
            value={state.Message}
            name="Message"
            onChange={handlechangep}
            className="mgt32"
            // required={true}
          />
          <div className="submitContainer">
            <CustomButton type="submit">Submit</CustomButton>
            {submit ? (
              <Typography
                variant="h6"
                color="secondary"
                className="secondaryFont     submitResponseText"
              >
                Thanks, talk to you soon!
              </Typography>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
