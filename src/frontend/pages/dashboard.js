import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { CircularProgress } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import { db } from "../../firebase";
import { SECONDARYBUTTONSTYLE } from "../components/header/Header";
import { Typography, Button } from "@material-ui/core";
import "../components/App.css";
import defaul from "../../assets/images/default.png";
import { getpersonal } from "../../firebase/getdata";

// ** Firebase
import { auth, storage, db1 } from "../../firebase/firebase";
// import { ref, getDownloadURL } from "firebase/storage";
import { ref, onValue } from 'firebase/database'

function Dashboard(props) {
  const [loaded, setloaded] = useState(false);
  let user = auth.currentUser;
  const uid = props.userId ? props.userId :user.uid;

  const [state, setState] = useState("");
  const [ri, setRi] = useState(false);
  const [fi, setFi] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [discclick, setdiscclick] = useState(false);
  /*const handleChangeimg = e => {
    if (e.target.files[0]) {
      const uploadTask = storage.ref(`images/${uid}`).put(e.target.files[0]);
      uploadTask.on("state_changed",
      snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage.ref("images").child(uid).getDownloadURL().then(url => {setUrl(url)});
      }
      );
    }
  };*/

  const handleSubmit = (e) => {
    setSubmit(true);
    e.preventDefault();
    const timeout = setTimeout(() => {
      setSubmit(false);
    }, 3000);
    db.docreatepersonal(uid, state);
  };
  //useEffect(()=>{
  //props.setstate(state)
  //},[state])
  useEffect(() => {
    const personalInfoRef = ref(db1, `users/${uid}/personal`);
    onValue(personalInfoRef, (snapshot) => {
      if(snapshot.val()){
        setState(snapshot.val())
      }
      setloaded(true);
    });

    // getDownloadURL(ref(storage, `images/${uid}`)).then((url) => {
    //   setUrl(url);
    // });

    let risklevel = "";
    try {
      risklevel = user.email.replace(/[.]/g, ",").replace(/[#]/g, ",");
    } catch (error) {
      console.log(error);
    }

    const riskRef = ref(db1, "risk/" + risklevel);
    onValue(riskRef, (snapshot) => { 
      if (snapshot.val() != null) {
        props.setstate(snapshot.val());
        const name = "Riskprofile";
        const value = snapshot.val().level;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setRi(true);
      }
    })

    const financialRef = ref(db1, "finance/" + risklevel);
    onValue(financialRef, (snapshot) => {
      if (snapshot.val() != null) {
        props.setstate(snapshot.val());
        const name = "Financialprofile";
        const value = snapshot.val().level;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setFi(true);
      }
    })
  }, []);

  const funcdisclaimer = () => {
    if (discclick == true) {
      setdiscclick(false);
    } else {
      setdiscclick(true);
    }
  };

  const next = () => {
    db.docreatepersonal(uid, state);
    props.setA(2);
    props.setcolor1("black");
    props.setcolor2("white");
  };
  const handlechangep = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    props.setstate(state);
  };
  const handlechangepn = (e) => {
    const { name, value } = e.target;
    if (Number(value) <= 9999999999 && Number(value) >= 0) {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      props.setstate(state);
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    const namea = "Age";
    var valuea = 0;
    if (Number(current.split("-")[1]) >= Number(e.target.value.split("-")[1])) {
      if (
        Number(current.split("-")[1]) ===
          Number(e.target.value.split("-")[1]) &&
        Number(current.split("-")[2]) < Number(e.target.value.split("-")[2])
      ) {
        valuea =
          Number(current.split("-")[0]) -
          Number(e.target.value.split("-")[0]) -
          1;
      } else {
        valuea =
          Number(current.split("-")[0]) - Number(e.target.value.split("-")[0]);
      }
    } else {
      valuea =
        Number(current.split("-")[0]) -
        Number(e.target.value.split("-")[0]) -
        1;
    }
    setState((prevState) => ({
      ...prevState,
      [namea]: valuea,
    }));
    props.setstate(state);
  };
  const current = new Date().toISOString().split("T")[0];

  return (
    <div>
      {loaded ? (
        <div className="marginsidebar secondaryFont">
          <div>
            <img
              src={url || `${defaul}`}
              alt="firebase-image"
              width="85%"
              height="150px"
              style={{ border: "solid", marginLeft: "5%", marginTop: "10px" }}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="flex1 primaryFont700 fontSize22">
                <p className="leftposdpp">Personal Profile</p>
              </div>
              <div className="rightpos scaledown topbutton">
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  style={SECONDARYBUTTONSTYLE}
                >
                  <Typography
                    className="primaryFont700 white"
                    variant="h6"
                    style={{ textTransform: "none" }}
                  >
                    Update info
                  </Typography>
                </Button>
              </div>
            </div>
            <div className="flexd fontSize18 padt20">
              <div className="flexdash">
                First Name*
                <br></br>
                <input
                  type="text"
                  required
                  value={state.Firstname}
                  name="Firstname"
                  onChange={handlechangep}
                  style={{ width: "80%" }}
                />
              </div>
              <div className="flexdash">
                Last Name*
                <br></br>
                <input
                  type="text"
                  required
                  value={state.Lastname}
                  name="Lastname"
                  onChange={handlechangep}
                  style={{ width: "80%" }}
                />
              </div>
            </div>
            <div className="flexd fontSize18 ">
              <div className="flexdash">
                Email*
                <br></br>
                <input
                  type="text"
                  required
                  value={state.Email}
                  name="Email"
                  onChange={handlechangep}
                  style={{ width: "80%" }}
                />
              </div>
              <div className="flexdash">
                Phone Number
                <br></br>
                <input
                  type="number"
                  value={state.Number}
                  name="Number"
                  onChange={handlechangepn}
                  style={{ width: "80%" }}
                />
              </div>
            </div>
            <div className="flexd fontSize18 ">
              <div className="flexdash">
                Relationship Status
                <br></br>
                <select
                  value={state.Status}
                  onChange={handlechangep}
                  name="Status"
                  style={{ width: "80%" }}
                >
                  {" "}
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
              <div className="flexdash">
                City*
                <br></br>
                <input
                  type="text"
                  required
                  value={state.City}
                  name="City"
                  onChange={handlechangep}
                  style={{ width: "80%" }}
                />
              </div>
            </div>
            <div className="flexd fontSize18">
              <div className="flexdash">
                <div className="flexfix">
                  <div className="flex40">Date of Birth</div>
                  <div className="flex50">
                    <input
                      type="date"
                      value={state.Dateofbirth}
                      onChange={handlechange}
                      name="Dateofbirth"
                      style={{ width: "74%" }}
                      max={current}
                    />{" "}
                  </div>
                </div>
              </div>
              <div className="flexdash">
                <div className="flexfix">
                  <div className="flex40">Age</div>
                  <div className="flex50">{state.Age} Years</div>
                </div>
              </div>
            </div>
            <div className="flexd fontSize18 ">
              <div className="flexdash">
                <div className="flexfix">
                  <div className="flex40">Risk Profile</div>
                  {ri ? (
                    <div className="flex10">
                      <div className="flex50">{state.Riskprofile}</div>
                    </div>
                  ) : (
                    <NavLink to="/risk-profile" tag={Link}>
                      <span className="primaryFont700" variant="h7">
                        Check your profile
                      </span>
                    </NavLink>
                  )}
                </div>
              </div>
              <div className="flexdash">
                <div className="flexfix">
                  <div className="flex40">Financial Literacy</div>
                  {fi ? (
                    <div className="flex10">
                      <div className="flex50">{state.Financialliteracy}</div>
                    </div>
                  ) : (
                    <NavLink to="/financial-literacy" tag={Link}>
                      <span className="primaryFont700" variant="h7">
                        Check your profile
                      </span>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            <div className="flex padt20">
              <div className="leftpos scaledown">
                {/*<Button color="primary" variant="contained" style={SECONDARYBUTTONSTYLE}>
                <Typography className="primaryFont700 white" variant="h6">
                <s>Previous</s>
                </Typography>
      </Button>*/}
              </div>
              <div className="centerbutton1 scaledown">
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  style={SECONDARYBUTTONSTYLE}
                >
                  <Typography
                    className="primaryFont700 white"
                    variant="h6"
                    style={{ textTransform: "none" }}
                  >
                    Update info
                  </Typography>
                </Button>
              </div>
              <div className="rightpos scaledown">
                <Button
                  color="primary"
                  variant="contained"
                  style={SECONDARYBUTTONSTYLE}
                  onClick={next}
                >
                  <Typography
                    className="primaryFont700 white"
                    variant="h6"
                    style={{ textTransform: "none" }}
                  >
                    Next
                  </Typography>
                </Button>
              </div>
            </div>
            {submit ? (
              <div className="center_align position1">
                Successfully submitted!
              </div>
            ) : (
              <div className="center_align position1"></div>
            )}
          </form>
          {discclick ? (
            <div style={{ paddingLeft: "3.5%", paddingRight: "3.5%" }}>
              <div
                className="pad10 cursor bold"
                style={{ fontSize: "14px" }}
                onClick={funcdisclaimer}
              >
                Disclaimer <span style={{ fontSize: "14px" }}> -</span>
              </div>
              <div>
                BeFinSavvy is not a registered investment advisor or broker/
                dealer. All financial/ investment opinions expressed are based
                on personal research and experience. All investments are subject
                to market risk. Please understand the associated risks properly
                before making any investment. Also note, we are not
                partnered/associated/affiliated with any platform/company for
                financial/investment products and hence offer completely
                unbiased advice. The recommended products names are inldued only
                for the purpose of reference and investors should feel free to
                explore similar products from any financial institutions that
                meet the investment objective.
              </div>
            </div>
          ) : (
            <div
              className="padb50 cursor bold"
              style={{
                fontSize: "14px",
                paddingLeft: "3.5%",
                paddingRight: "3.5%",
              }}
              onClick={funcdisclaimer}
            >
              Disclaimer <span> +</span>
            </div>
          )}
        </div>
      ) : (
        <div style={{ position: "absolute", left: "40%", top: "30%" }}>
          <CircularProgress size={100} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
