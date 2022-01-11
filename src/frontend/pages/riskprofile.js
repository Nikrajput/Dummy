import React, { useState, useEffect, useLayoutEffect } from "react";
import { SECONDARYBUTTONSTYLE } from "../components/header/Header";
import { Typography, Button } from "@material-ui/core";
import "../components/App.css";
import trees from "../../assets/images/trees.png";
import ele from "../../assets/images/elephant_image.png";
import "./riskprofile.css";
import "../../index.css";
import "react-circular-progressbar/dist/styles.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { db1 } from "../../firebase/firebase";
import { db } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import Header from "../components/header/Header"
import { useHistory } from "react-router-dom";
import { Elephant } from "../constfunctions/constfunc";
import { questions } from "../constfunctions/constfunc";
// import Feedback from "feeder-react-feedback"; // import Feedback component
// import "feeder-react-feedback/dist/feeder-react-feedback.css";

import Header from "../components/header/Navbar";
import { sendEmail } from "../../utils/sendEmail";

const nums = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
//for number of questions answered
const nu = [0];
//score for each question
const sco = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//whether answered or skipped update n
const n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function Risk(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  //questions
  const user = firebase.auth().currentUser;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  // % of elephant movement
  const cu = (100 / 9) * currentQuestion;

  const handleAnswerOptionClick = (a, selectedop) => {
    if (nums[currentQuestion] === -1) {
      nu[0] = nu[0] + 1;
      n[currentQuestion] = 1;
    }
    nums[currentQuestion] = selectedop.num;
    sco[currentQuestion] = selectedop.score;
    const nextQuestion = currentQuestion + a;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      if (nu[0] < 9) {
        alert("Answer all questions");
      } else {
        setShowScore(true);
      }
    }
  };

  const handleAnswerOptionClick1 = (a) => {
    if (currentQuestion !== 0 || a !== -1) {
      const nextQuestion = currentQuestion + a;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        if (nu[0] < 9) {
          alert("Answer all questions");
        } else {
          setShowScore(true);
        }
      }
    }
  };
  //to come back for questions from submit
  const back = () => {
    setShowScore(false);
  };

  //details of user
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (user) {
      const dbpersonal = db1.ref(`users/${user.uid}/personal`);
      dbpersonal.once("value", function (snapshot) {
        if (snapshot.val() != null) {
          console.log(snapshot.val());
          setEmail(snapshot.val().Email);
          setFirstname(snapshot.val().Firstname);
          setLastname(snapshot.val().Lastname);
          setNumber(snapshot.val().Number);
        } else {
          setEmail(user.email);
        }
      });
    }
  }, [user]);

  //update user info when changed and send mail
  const handleSubmit = async (e) => {
    e.preventDefault();
    const score =
      sco[0] +
      sco[1] +
      sco[2] +
      sco[3] +
      sco[4] +
      sco[5] +
      sco[6] +
      sco[7] +
      sco[8];
    var inv = "";
    var inv1 = "";
    var pic = "";
    var desc = "";
    var desc1 = "";
    var levell = "";
    if (score <= 19) {
      levell = "Conservative";
      inv = "A";
      inv1 = "CONSERVATIVE INVESTOR";
      pic = "conser";
      desc =
        "You are an investor who is prepared to accept lower returns with lower levels of risk in order to preserve your capital.";
      desc1 =
        "The negative effects of taxation and inflation will not be a concern to you, provided your initial investment is protected. As a conservative investor, you might expect your portfolio to be allocated up to 15% in growth assets, with the remainder in defensive assets.";
    }
    if (score <= 29 && score > 19) {
      levell = "Moderate";
      inv = "A";
      inv1 = "MODERATE INVESTOR";
      pic = "moder";
      desc =
        "You are an investor who would like to invest in both income and growth assets.";
      desc1 =
        "You will be comfortable with calculated risks to achieve good returns; however, you require an investment strategy that adequately deals with the effects of inflation and tax. As a moderate investor, you might expect your portfolio to be allocated up to 35% in growth assets, with the remainder in defensive assets. ";
    }
    if (score > 29) {
      levell = "Agressive";
      inv = "AN";
      inv1 = "AGRESSIVE INVESTOR";
      pic = "aggres";
      desc =
        "You are an investor who would like to invest in both income and growth assets.";
      desc1 =
        "You will be comfortable with calculated risks to achieve good returns; however, you require an investment strategy that adequately deals with the effects of inflation and tax. As a moderate investor, you might expect your portfolio to be allocated up to 35% in growth assets, with the remainder in defensive assets. ";
    }

    //save to database
    if (user) {
      db.docreatepersonalwithrisk(
        user.uid,
        email,
        levell,
        number,
        firstname,
        lastname
      );
    }

    db.doCreatRisk(
      firstname,
      lastname,
      email,
      email.replace(/[.]/g, ",").replace(/[#]/g, ","),
      levell,
      number
    );

    const htmlTemplate = {
      templateId: 1,
      firstname,
      pic,
      inv,
      inv1,
      desc,
      desc1
    }

    //data to mail
    await sendEmail("Risk Profiling", htmlTemplate);
  };

  const pro = (index) => {
    const nextQuestion = index;
    setCurrentQuestion(nextQuestion);
  };

  // const feedbackPopup = () => {
  //   return (
  //     <>
  //       <Feedback
  //         projectId="617a18ccb90fd40004c1c6be"
  //         email="false"
  //         emailDefaultValue=""
  //         projectName="feedback"
  //         primaryColor="#cc2844"
  //         textColor="#ffffff"
  //         hoverBorderColor="#cc2844"
  //         postSubmitButtonMsg="Thanks!"
  //         submitButtonMsg="Send Feedback"
  //         zIndex="100000000"
  //       />
  //     </>
  //   );
  // };

  //render component
  return (
    <div className="secondaryFont fontSize18">
      <Header />
      <div>
        <Feedback
          projectId="617a18ccb90fd40004c1c6be"
          email="false"
          emailDefaultValue=""
          projectName="feedback"
          primaryColor="#cc2844"
          textColor="#ffffff"
          hoverBorderColor="#cc2844"
          postSubmitButtonMsg="Thanks!"
          submitButtonMsg="Send Feedback"
          zIndex="100000000"
        />
      </div>
      {showScore ? (
        /* for submission */
        <div>
          <div className="flexchange">
            <div className="flexhalfchange">
              <div className="flex padt50 treefix">
                <img src={`${trees}`} width="350px" height="400px" />
                <img
                  className="elepic"
                  src={`${ele}`}
                  width="150px"
                  height="180px"
                />
              </div>
            </div>
            <div className="flexhalfchange padt50 submithead">
              <div className="secondaryFont  align">
                <h1 className=" primaryFont700">Submit</h1>
                <form
                  onSubmit={handleSubmit}
                  action="../../post"
                  method="post"
                  className="fixsize"
                >
                  <label style={{ paddingBottom: "25px" }}>
                    First Name*{" "}
                    <input
                      type="text"
                      required
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </label>
                  <br />
                  <label style={{ paddingBottom: "25px" }}>
                    Last Name*{" "}
                    <input
                      type="text"
                      required
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </label>
                  <br />
                  <label style={{ paddingBottom: "25px" }}>
                    Email*{" "}
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <br />
                  <label style={{ paddingBottom: "25px" }}>
                    Phone{" "}
                    <input
                      type="text"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </label>
                  <div className="flex">
                    <Button
                      className="flex50"
                      color="primary"
                      variant="contained"
                      style={SECONDARYBUTTONSTYLE}
                      onClick={() => back()}
                    >
                      <Typography className="primaryFont700 white" variant="h6">
                        Back
                      </Typography>
                    </Button>
                    <div className="flex50 padl10">
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={SECONDARYBUTTONSTYLE}
                      >
                        <Typography
                          className="primaryFont700 white"
                          variant="h6"
                        >
                          Submit
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /*for questions */
        <div>
          <div></div>
          <div className="riskprofilesection">
            <div className="flex">
              <div>
                <i
                  className="arrow left"
                  onClick={() => handleAnswerOptionClick1(-1)}
                ></i>
              </div>
              <div>
                <h1 className="primaryFont700 center_align padt50">
                  Risk Profile Quiz
                </h1>

                <div className="secondaryFont fontSize18 app">
                  <div>
                    <div className="padb20 questions">
                      {questions[currentQuestion].question}
                    </div>
                  </div>
                  <div>
                    {questions[currentQuestion].options.map((answerOption) => {
                      if (answerOption.num === nums[currentQuestion]) {
                        return (
                          <p>
                            <button
                              className="button1"
                              onClick={() =>
                                handleAnswerOptionClick(1, answerOption)
                              }
                            >
                              {answerOption.op}
                            </button>
                          </p>
                        );
                      } else {
                        return (
                          <p>
                            <button
                              className="button"
                              onClick={() =>
                                handleAnswerOptionClick(1, answerOption)
                              }
                            >
                              {answerOption.op}
                            </button>
                          </p>
                        );
                      }
                    })}
                  </div>
                </div>
                <div>
                  <div className="ele-container">
                    <div
                      className={`${
                        currentQuestion === 1 ? "one object" : null
                      }`}
                    >
                      <div
                        className={`${
                          currentQuestion === 2 ? "two object" : null
                        }`}
                      >
                        <div
                          className={`${
                            currentQuestion === 3 ? "three object" : null
                          }`}
                        >
                          <div
                            className={`${
                              currentQuestion === 4 ? "four object" : null
                            }`}
                          >
                            <div
                              className={`${
                                currentQuestion === 5 ? "five object" : null
                              }`}
                            >
                              <div
                                className={`${
                                  currentQuestion === 6 ? "six object" : null
                                }`}
                              >
                                <div
                                  className={`${
                                    currentQuestion === 7
                                      ? "seven object"
                                      : null
                                  }`}
                                >
                                  <div
                                    className={`${
                                      currentQuestion === 8
                                        ? "eight object"
                                        : null
                                    }`}
                                  >
                                    <div
                                      className={`${
                                        currentQuestion === 9
                                          ? "nine object"
                                          : null
                                      }`}
                                    >
                                      <Elephant />
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
                  <div className="padt70"></div>
                  <div>
                    <ProgressBar percent={cu}>
                      <Step>
                        {({ accomplished, index }) => (
                          <div>
                            <div
                              className={`indexedStep ${
                                accomplished
                                  ? `${n[index] ? "notanswered" : "answered"}`
                                  : null
                              }`}
                              onClick={() => pro(index)}
                            >
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }) => (
                          <div>
                            <div
                              className={`indexedStep ${
                                accomplished
                                  ? `${n[index] ? "notanswered" : "answered"}`
                                  : null
                              }`}
                              onClick={() => pro(index)}
                            >
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }) => (
                          <div>
                            <div
                              className={`indexedStep ${
                                accomplished
                                  ? `${n[index] ? "notanswered" : "answered"}`
                                  : null
                              }`}
                              onClick={() => pro(index)}
                            >
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }) => (
                          <div>
                            <div
                              className={`indexedStep ${
                                accomplished
                                  ? `${n[index] ? "notanswered" : "answered"}`
                                  : null
                              }`}
                              onClick={() => pro(index)}
                            >
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }) => (
                          <div>
                            <div
                              className={`indexedStep ${
                                accomplished
                                  ? `${n[index] ? "notanswered" : "answered"}`
                                  : null
                              }`}
                              onClick={() => pro(index)}
                            >
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }) => (
                          <div>
                            <div
                              className={`indexedStep ${
                                accomplished
                                  ? `${n[index] ? "notanswered" : "answered"}`
                                  : null
                              }`}
                              onClick={() => pro(index)}
                            >
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }) => (
                          <div>
                            <div
                              className={`indexedStep ${
                                accomplished
                                  ? `${n[index] ? "notanswered" : "answered"}`
                                  : null
                              }`}
                              onClick={() => pro(index)}
                            >
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }) => (
                          <div>
                            <div
                              className={`indexedStep ${
                                accomplished
                                  ? `${n[index] ? "notanswered" : "answered"}`
                                  : null
                              }`}
                              onClick={() => pro(index)}
                            >
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }) => (
                          <div>
                            <div
                              className={`indexedStep ${
                                accomplished
                                  ? `${n[index] ? "notanswered" : "answered"}`
                                  : null
                              }`}
                              onClick={() => pro(index)}
                            >
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }) => (
                          <div>
                            <img alt="" src={`${trees}`} className="run" />
                          </div>
                        )}
                      </Step>
                    </ProgressBar>
                  </div>
                </div>
              </div>
              <p>
                <i
                  className="arrow right"
                  onClick={() => handleAnswerOptionClick1(1)}
                ></i>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Risk;
