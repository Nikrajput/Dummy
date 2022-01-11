import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";

import { Heading } from "./components/heading";

import { CustomButton } from "../../components/CustomButton";
import BlurImg from "../../../assets/images/2.JPG";

// ** Firebase
import { db, auth } from "../../../firebase/firebase";
import { ref, onValue } from "firebase/database";
import { sendEmail } from "../../../utils/sendEmail";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "2rem",
  },

  container: {
    position: "relative",
  },

  stickyButton: {
    position: "-webkit-sticky" /* Safari */,
    position: "sticky",
    top: 0,
    display: "flex",
    justifyContent: "center",
  },
}));

export const TaxSaving = ({ requested }) => {
  const classes = useStyles();
  const [personal, setPersonal] = useState({});

  const userId = auth.currentUser.uid;

  const getPersonalData = () => {
    const personalRef = ref(db, `users/${userId}/personal`);
    onValue(personalRef, (snapshot) => {
      if (snapshot.val() !== null) {
        setPersonal(snapshot.val());
      }
    });
  };

  useEffect(() => {
    getPersonalData();
  }, []);

  const requestConsultation = async () => {
    db.requested(userId);

    const htmlTemplate = `<p>Firstname: ${personal.Firstname}</p>
        <p>Lastname: ${personal.Lastname}</p>
        <p>Email: ${personal.Email}</p>
        <p>Number: ${personal.Number}</p>
      `;

    await sendEmail("Consultation Request", htmlTemplate);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Heading>You Tax-Saving Strategy</Heading>
        <div className={classes.stickyButton}>
          {requested ? (
            <CustomButton disabled>
              You have already requested a consultation
            </CustomButton>
          ) : (
            <CustomButton onClick={requestConsultation}>
              To know more request a consultation
            </CustomButton>
          )}
        </div>
        <img src={BlurImg} style={{ width: "100%" }} />
      </div>
    </div>
  );
};
