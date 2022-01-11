import { react, useState, useEffect } from "react";
import "./personalprofile.css";
import { db1 } from "../../firebase/firebase";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import Dashboard from "./dashboard";
import { CircularProgress } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
// import Report from "./report"
// import Report from "./account/Report"
import { Report } from "./Report/index";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import withAuthorization from "../authentication/withAuthorization";
import SignOutButton from "../authentication/SignOut";
import { SECONDARYBUTTONSTYLE } from "../components/header/Header";
import { Typography, Button } from "@material-ui/core";
import "../components/App.css";
import logo from "../../assets/images/white_logo.png";
import iimage from "../../assets/images/iimage.png";
import {
  getpersonal,
  getincome,
  getexpenditure,
  getinvestments,
} from "../../firebase/getdata";
const Iimage = () => {
  return <img src={iimage} width="20px" />;
};

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "22px",
    padding: theme.spacing(2, 4),

    "&:hover": {
      background: theme.palette.primary.dark,
      opacity: 0.5,
      color: "white"
    },
  }
}))

function MainPage(props) {
  const classes = useStyles()
  const [statep, setstatep] = useState();
  const [statei, setstatei] = useState();
  const [stateme, setstateme] = useState();
  const [stateinv, setstateinv] = useState();
  let user = firebase.auth().currentUser;
  const uid = props.userId ? props.userId : user.uid;
  const colorwhite = "#FEF9F3";
  const [color1, setcolor1] = useState("#FEF9F3");
  const [color2, setcolor2] = useState("black");
  const [color3, setcolor3] = useState("black");
  const [color4, setcolor4] = useState("black");
  const [color5, setcolor5] = useState("black");
  const [color6, setcolor6] = useState("black");
  const [a, setA] = useState(0);
  const [preva, setpreva] = useState(0);

  useEffect(() => {
    const page = window.location.search.split("=")[1]
    if (page) {
      setA(parseInt(page))
    }
  }, [])

  useEffect(() => {
    const personalInfoRef = ref(db1, `users/${uid}/personal`);
    onValue(personalInfoRef, (snapshot) => {
      setstatep(snapshot.val());
    });
  }, []);
  // useEffect(() => {
  //   console.log(preva);
  //   if (preva == 1 || (preva == 0 && a != 0)) {
  //     console.log(statep);
  //     db.docreatepersonal(uid, statep);
  //   }
  // }, [a]);
  const items = [
    <NavLink to="/" tag={Link}>
      <img src={`${logo}`} width="80%" style={{ marginLeft: "22px" }} />
    </NavLink>,
    <Link to="/dashboard" className={classes.link}>
      Dashboard 
    </Link>,
    <SidebarItem color={color1} textAlign="left">
      <div
        onClick={() => back(1)}
        className="primaryFont700 fontSize22"
        style={{ paddingBottom: "10px" }}
      >
        Personal Profile
      </div>
    </SidebarItem>,
    <b
      className="black primaryFont700 fontSize22 padl20"
      style={{ paddingLeft: "30px" }}
    >
      Financial Profile
    </b>,
    <SidebarItem color={color2} textAlign="left">
      <div onClick={() => back(2)} className="secondaryFont fontSize18">
        {" "}
        - Monthly Income
      </div>
    </SidebarItem>,
    <SidebarItem color={color3} textAlign="left">
      <div onClick={() => back(3)} className="secondaryFont fontSize18">
        {" "}
        - Monthly Expenses
      </div>
    </SidebarItem>,
    <SidebarItem color={color4} textAlign="left">
      <div onClick={() => back(4)} className="secondaryFont fontSize18">
        {" "}
        - Investments
      </div>
    </SidebarItem>,
    <SidebarItem color={color6} textAlign="left">
      <div onClick={() => back(6)} className="secondaryFont fontSize18">
        {" "}
        - Financial Goals
      </div>
    </SidebarItem>,
    <SidebarItem color={color5} textAlign="left">
      <div onClick={() => back(5)} className="primaryFont700 fontSize22 center">
        Report
      </div>
    </SidebarItem>,
    <p></p>,
    <div className="padl20">
      <SignOutButton />
    </div>,
  ];
  const back = (x) => {
    setpreva(a);
    setA(x);
    if (x == 1) {
      setcolor1(colorwhite);
      setcolor2("black");
      setcolor3("black");
      setcolor4("black");
      setcolor5("black");
      setcolor6("black");
    } else if (x == 2) {
      setcolor1("black");
      setcolor2(colorwhite);
      setcolor3("black");
      setcolor4("black");
      setcolor5("black");
      setcolor6("black");
    } else if (x == 3) {
      setcolor1("black");
      setcolor2("black");
      setcolor3(colorwhite);
      setcolor4("black");
      setcolor5("black");
      setcolor6("black");
    } else if (x == 4) {
      setcolor1("black");
      setcolor2("black");
      setcolor3("black");
      setcolor4(colorwhite);
      setcolor5("black");
      setcolor6("black");
    } else if (x == 6) {
      setcolor1("black");
      setcolor2("black");
      setcolor3("black");
      setcolor4("black");
      setcolor5("black");
      setcolor6(colorwhite);
    } else {
      setcolor1("black");
      setcolor2("black");
      setcolor3("black");
      setcolor4("black");
      setcolor5(colorwhite);
      setcolor6("black");
    }
  };
  return (
    <div className="marginsidebar secondaryFont">
      <Sidebar width={230} background="#7AE7F5" content={items}>
        {(() => {
          if (a === 1) {
            return (
              <Dashboard
                a={a}
                state={statep}
                userId={uid}
                setstate={setstatep}
                setA={setA}
                setcolor1={setcolor1}
                setcolor2={setcolor2}
              />
            );
          } else if (a === 2) {
            return (
              <Income
                a={a}
                state={statei}
                userId={uid}
                setstate={setstatei}
                setA={setA}
                setcolor1={setcolor1}
                setcolor2={setcolor2}
                setcolor3={setcolor3}
              />
            );
          } else if (a === 3) {
            return (
              <Monthlyexp
                a={a}
                state={stateme}
                userId={uid}
                setstate={setstateme}
                setA={setA}
                setcolor2={setcolor2}
                setcolor3={setcolor3}
                setcolor4={setcolor4}
              />
            );
          } else if (a === 4) {
            return (
              <Investment
                a={a}
                state={stateinv}
                userId={uid}
                setstate={setstateinv}
                setA={setA}
                setcolor3={setcolor3}
                setcolor4={setcolor4}
                setcolor5={setcolor5}
              />
            );
          } else if (a === 5) {
            return <Report userId={uid} />;
          } else if (a == 6) {
            return (
              <Financialgoal
                a={a}
                state={stateinv}
                userId={uid}
                setstate={setstateinv}
                setA={setA}
                setcolor4={setcolor4}
                setcolor5={setcolor5}
                setcolor6={setcolor6}
              />
            );
          } else {
            return (
              <Dashboard
                a={a}
                state={statep}
                userId={uid}
                setstate={setstatep}
                setA={setA}
                setcolor1={setcolor1}
                setcolor2={setcolor2}
              />
            );
          }
        })()}
      </Sidebar>
    </div>
  );
}

function Income(props) {
  let user = firebase.auth().currentUser;
  const uid = props.userId ? props.userId : user.uid;
  const colorwhite = "#FEF9F3";
  const [x, setx] = useState(0);
  const [loaded, setloaded] = useState(false);
  const [state, setState] = useState({ Total: 0, Netincome: 0 });
  const [submit, setSubmit] = useState(false);
  const [discclick, setdiscclick] = useState(false);
  const funcdisclaimer = () => {
    if (discclick == true) {
      setdiscclick(false);
    } else {
      setdiscclick(true);
    }
  };
  const changex = (y) => {
    if (x === y) {
      setx(0);
    } else {
      setx(y);
    }
  };
  const handleSubmit = (e) => {
    setSubmit(true);
    const timeout = setTimeout(() => {
      setSubmit(false);
    }, 2000);
    e.preventDefault();
    db.docreateincome(uid, state);
    console.log("success");
  };

  useEffect(() => {
    const dbr = ref(db1, `users/${uid}/income`);
    onValue(dbr, function (snapshot) {
      if (snapshot.val() != null) {
        setState(snapshot.val());
        setloaded(true);
      } else {
        setloaded(true);
      }
    });
  }, []);

  const next = () => {
    db.docreateincome(uid, state);
    props.setA(3);
    props.setcolor2("black");
    props.setcolor3(colorwhite);
  };
  const prev = () => {
    db.docreateincome(uid, state);
    props.setA(1);
    props.setcolor2("black");
    props.setcolor1(colorwhite);
  };

  const handlechange = (e) => {
    var gross = 0;
    const { name, value } = e.target;
    if (name === "Basic" || name === "Hra" || name === "Allow") {
      gross = Number(value) - Number(state[name] ? state[name] : 0);
    }
    gross += state.Total;
    var newi = 0;
    if (name === "Fund" || name === "Professionaltax" || name === "Incometax") {
      newi = -Number(value) + Number(state[name] ? state[name] : 0);
    }
    newi += state.Netincome - state.Total + gross;
    const name1 = "Total";
    const name2 = "Netincome";
    setState((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
    setState((prevState) => ({
      ...prevState,
      [name1]: Number(gross),
      [name2]: Number(newi),
    }));
  };

  const Inputbox = (props) => {
    return (
      <div className="flex">
        <div className="flex4">
          <span className="pos">{props.head}</span>
        </div>
        <div className="flex5">
          ₹{" "}
          <input
            type="number"
            value={props.val}
            Name={props.name}
            onChange={handlechange}
            style={{ width: "80%", textAlign: "right" }}
            step="100"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {loaded ? (
        <div className="marginsidebar">
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="flex1 primaryFont700 fontSize22">
                <p className="leftpos">Monthly Income</p>
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
            <div className="flexm padt50 fontSize18">
              <div style={{ width: "2.5%" }}></div>
              <div className="flex1m">
                <div className="flex borderbot">
                  <div className="flex4">
                    <span className="pos" style={{ fontWeight: "bold" }}>
                      Income
                    </span>
                  </div>
                  <div className="flex5"></div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Basic* </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(1);
                      }}
                    ></span>
                    <span>
                      {x === 1 ? (
                        <span className="itext">
                          Basic;ieufgb;iEWJBKVPYG3RWBDJAXCBPRY8GUFDBCNLaPUGRVBDN
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      required
                      value={state.Basic}
                      Name="Basic"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">House Rent Allowance (HRA)</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(2);
                      }}
                    ></span>
                    <span>
                      {x === 2 ? (
                        <span className="itext">
                          Basic;ieufgb;iEWJBKVPYG3RWBDJAXCBPRY8GUFDBCNLaPUGRVBDN
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Hra}
                      Name="Hra"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10 padb10">
                  <div className="flex4">
                    <span className="pos">Special / Other Allowance</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(3);
                      }}
                    ></span>
                    <span>
                      {x === 3 ? (
                        <span className="itext">
                          Basic;ieufgb;iEWJBKVPYG3RWBDJAXCBPRY8GUFDBCNLaPUGRVBDN
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Allow}
                      Name="Allow"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="bordertop flex padt10 padb10">
                  <div className="flex4">
                    <span className="pos">Gross Income before Tax</span>
                  </div>
                  <div className="flex5">
                    ₹ {state.Total.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
              <div style={{ width: "5%" }}></div>
              <div className="flex1m">
                <div className="flex borderbot">
                  <div className="flex4">
                    <span className="pos1" style={{ fontWeight: "bold" }}>
                      Deductions
                    </span>
                  </div>
                  <div className="flex5"></div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Provident Fund (PF / EPF)</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(4);
                      }}
                    ></span>
                    <span>
                      {x === 4 ? (
                        <span className="itext">
                          Basic;ieufgb;iEWJBKVPYG3RWBDJAXCBPRY8GUFDBCNLaPUGRVBDN
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>

                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Fund}
                      Name="Fund"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Professional Tax</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(5);
                      }}
                    ></span>
                    <span>
                      {x === 5 ? (
                        <span className="itext">
                          Basic;ieufgb;iEWJBKVPYG3RWBDJAXCBPRY8GUFDBCNLaPUGRVBDN
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Professionaltax}
                      Name="Professionaltax"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10 padb10">
                  <div className="flex4">
                    <span className="pos">Income Tax (TDS)</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(6);
                      }}
                    ></span>
                    <span>
                      {x === 6 ? (
                        <span>
                          <span className="itext"></span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Incometax}
                      Name="Incometax"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="bordertop flex padt10 padb10">
                  <div className="flex4 pos2">
                    <span className="pos1">Net Income after Tax</span>
                  </div>
                  <div className="flex5">
                    ₹ {state.Netincome.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <p className="padb20 fontSize18 secondaryFont leftpos">
              Source: Your latest payslip
            </p>
            <div className="flex padt50">
              <div className="leftpos scaledown">
                <Button
                  color="primary"
                  variant="contained"
                  style={SECONDARYBUTTONSTYLE}
                  onClick={prev}
                >
                  <Typography
                    className="primaryFont700 white"
                    variant="h6"
                    style={{ textTransform: "none" }}
                  >
                    Previous
                  </Typography>
                </Button>
              </div>
              <div className="centerbutton1 scaledown padb20">
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
                Successfully submitted
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

function Monthlyexp(props) {
  const colorwhite = "#FEF9F3";
  let user = firebase.auth().currentUser;
  const uid = props.userId ? props.userId : user.uid;
  const [loaded, setloaded] = useState(false);
  const [state, setState] = useState({ Subtotal1: 0, Subtotal2: 0 });
  const [netincome, setnetincome] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [submit1, setSubmit1] = useState(false);
  const [discclick, setdiscclick] = useState(false);
  const funcdisclaimer = () => {
    if (discclick == true) {
      setdiscclick(false);
    } else {
      setdiscclick(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    const timeout = setTimeout(() => {
      setSubmit(false);
    }, 2000);
    db.docreateexpenditure(uid, state);
    console.log("success");
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    setSubmit1(true);
    const timeout = setTimeout(() => {
      setSubmit1(false);
    }, 2000);
    db.docreateexpenditure(uid, state);
    console.log("success");
  };

  useEffect(() => {
    const dbr = ref(db1, `users/${uid}/monthlyexpenditure`);
    onValue(dbr, (snapshot) => {
      if (snapshot.val() != null) {
        setState(snapshot.val());
        setloaded(true);
      } else {
        setloaded(true);
      }
    });

    const dbri = ref(db1, `users/${uid}/income`);
    onValue(dbri, (snapshot) => {
      if (snapshot.val() != null) {
        setnetincome(snapshot.val().Netincome);
      } else {
        console.log("not existed");
      }
    });
  }, []);

  const next = () => {
    console.log("State: ", state)
    db.docreateexpenditure(uid, state);
    props.setA(4);
    props.setcolor3("black");
    props.setcolor4(colorwhite);
  };
  const prev = () => {
    db.docreateexpenditure(uid, state);
    props.setA(2);
    props.setcolor3("black");
    props.setcolor2(colorwhite);
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    if (
      name === "Rent" ||
      name === "Bills" ||
      name === "Groceries" ||
      name === "Transport" ||
      name === "Otherexpenses" ||
      name === "Medical" ||
      name === "Domestic" ||
      name === "Emi"
    ) {
      const val =
        state.Subtotal1 + Number(value) - (state[name] ? state[name] : 0);
      setState((prevState) => ({
        ...prevState,
        ["Subtotal1"]: Number(val),
      }));
      console.log("Subtotal1: ", Number(value), state[name])
      console.log(val)
    }
    if (
      name === "Shopping" ||
      name === "Gym" ||
      name === "Subscription" ||
      name === "Entertainment" ||
      name === "Others"
    ) {
      const val =
        state.Subtotal2 + Number(value) - (state[name] ? state[name] : 0);
      setState((prevState) => ({
        ...prevState,
        ["Subtotal2"]: Number(val),
      }));
    }
    setState((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const submit1func = (e) => {
    handleSubmit1(e);
  };
  const [x, setx] = useState(0);
  const changex = (y) => {
    if (x === y) {
      setx(0);
    } else {
      setx(y);
    }
  };

  return (
    <div>
      {loaded ? (
        <div className="marginsidebar">
          {submit1 ? (
            <div className="center_align position11">
              Successfully submitted
            </div>
          ) : (
            <div className="center_align position1"></div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex padt10" style={{ paddingTop: "28px" }}>
              <div className="flex1 left_align primaryFont700 fontSize22">
                <p className="leftpos">Monthly Expenditure</p>
              </div>
              <div className="rightpos scaledown">
                <Button
                  color="primary"
                  onClick={submit1func}
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

            <div className="flexm padt50 fontSize18">
              <div style={{ width: "2.5%" }}></div>
              <div className="flex1m">
                <div className="flex borderbot">
                  <div className="flex4">
                    <span className="pos" style={{ fontWeight: "bold" }}>
                      Needs
                    </span>
                  </div>
                  <div className="flex5" style={{ fontWeight: "bold" }}>
                    Amount
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Rent + Maintenance </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(1);
                      }}
                    >
                      <Iimage />
                    </span>
                    <span>
                      {x === 1 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Includes your rent and maintenance
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Rent}
                      name="Rent"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Bills / Utility </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(2);
                      }}
                    >
                      <Iimage />
                    </span>
                    <span>
                      {x === 2 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Includes your phone, mobile, electricity, wifi, gas,
                            etc. bills
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Bills}
                      name="Bills"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Groceries </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(3);
                      }}
                    >
                      <Iimage />
                    </span>
                    <span>
                      {x === 3 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Includes groceries, milk, snacks, munchies, bread,
                            egg, meat, soap, shampoo, cream, lotion, etc.
                            related expenses
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Groceries}
                      name="Groceries"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Transport </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(4);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 4 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Includes Ola, Uber, fuel, bus, taxi, etc.
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Transport}
                      name="Transport"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Medical and Insurance </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(5);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 5 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Includes expenses related to doctor visits,
                            medicines, average monthly health and life insurance
                            premiums
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Medical}
                      name="Medical"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Domestic Help </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(6);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 6 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Payment to house, maid, driver, etc.
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Domestic}
                      name="Domestic"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">EMI </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(7);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 7 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            EMIs paid for the loan taken
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Emi}
                      name="Emi"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10 padb10">
                  <div className="flex4">
                    <span className="pos">Other Expenses </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(8);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 8 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            basic expenses that are not covered above
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Otherexpenses}
                      name="Otherexpenses"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="bordertop flex padt10 padb10">
                  <div className="flex4">
                    <span className="pos">Sub-Total</span>
                  </div>
                  <div className="flex5">
                    ₹ {state.Subtotal1.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              <div style={{ width: "5%" }}></div>
              <div className="flex1m">
                <div className="flex borderbot">
                  <div className="flex4">
                    <span className="pos1" style={{ fontWeight: "bold" }}>
                      Wants
                    </span>
                  </div>
                  <div className="flex5" style={{ fontWeight: "bold" }}>
                    Amount
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos1">Shopping </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(9);
                      }}
                    >
                      <Iimage />
                    </span>
                    <span>
                      {x === 9 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Shopping of clothes, accessories, electronics, home
                            appilances, expenses for pet, etc.
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Shopping}
                      name="Shopping"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos1">Gym / Spa / Salon </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(13);
                      }}
                    >
                      <Iimage />
                    </span>
                    <span>
                      {x === 13 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Fitness, hobby, self-grroming related expenses
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Gym}
                      name="Gym"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos1">
                      Entertainment / Dining In / Out{" "}
                    </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(10);
                      }}
                    >
                      <Iimage />
                    </span>
                    <span>
                      {x === 10 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Movies, partying, dining out, ordering in, etc.
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Entertainment}
                      name="Entertainment"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos1">Subscription </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(14);
                      }}
                    >
                      <Iimage />
                    </span>
                    <span>
                      {x === 14 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Netflix, Amazon prime, Disney Hotstar, etc.
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Subscription}
                      name="Subscription"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10 padb10">
                  <div className="flex4">
                    <span className="pos1">Other </span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(11);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 11 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Any other discretionary expense not covred above
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Others}
                      name="Others"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="padtx">
                  <div className="bordertop flex padt10 padb10">
                    <div className="flex4 pos2">
                      <span className="pos1">Sub-Total</span>
                    </div>
                    <div className="flex5">
                      ₹ {state.Subtotal2.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4 pos2">
                    <span className="pos1">Total Expenses</span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    {(state.Subtotal1 + state.Subtotal2).toLocaleString(
                      "en-IN"
                    )}
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4 pos2">
                    <span className="pos1">Monthly Savings / Investments</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(12);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 12 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Savings or investments made from the income received
                            like investment in mutual fund, stocks, gold, PPF,
                            does not include investment made by your company for
                            provident fund
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Savings}
                      name="Savings"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4 pos2">
                    <span className="pos1">Unassigned Income</span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    {(
                      netincome -
                      state.Subtotal1 -
                      state.Subtotal2 -
                      (state.Savings ? state.Savings : 0)
                    ).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>

            <br></br>
            <p className="fontSize18 secondaryFont leftpos">
              Enter approximate rounded numbers
            </p>
            {submit ? (
              <div className="center_align position1">
                Successfully submitted
              </div>
            ) : (
              <div
                className="center_align position1"
                style={{ paddingTop: "28px" }}
              ></div>
            )}
            <div className="flex padt50 padb20">
              <div className="leftpos scaledown">
                <Button
                  color="primary"
                  variant="contained"
                  style={SECONDARYBUTTONSTYLE}
                  onClick={prev}
                >
                  <Typography
                    className="primaryFont700 white"
                    variant="h6"
                    style={{ textTransform: "none" }}
                  >
                    Previous
                  </Typography>
                </Button>
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
                partnered/associated/ affiliated with any platform/company for
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

function Investment(props) {
  const colorwhite = "#FEF9F3";
  let user = firebase.auth().currentUser;
  const uid = props.userId ? props.userId : user.uid;
  const [loaded, setloaded] = useState(false);
  const [state, setState] = useState({ Total: Number(0) });
  const [submit, setSubmit] = useState(false);
  const [liabilitystate, liabilitySetState] = useState({ Total: Number(0) });
  const [insuranceState, setInsuranceState] = useState({});
  const [showLiability, setShowLiability] = useState(false);
  const [discclick, setdiscclick] = useState(false);
  const [x, setx] = useState(0);
  const changex = (y) => {
    if (x === y) {
      setx(0);
    } else {
      setx(y);
    }
  };
  const funcdisclaimer = () => {
    if (discclick == true) {
      setdiscclick(false);
    } else {
      setdiscclick(true);
    }
  };
  let fxProps = {
    count: 5,
    interval: 200,
    bubbleSizeMinimum: 1,
    colors: ["#238EE7", "#4ED0CE", "#7AE7F5", "#FFBC42"],
    calc: (props, i) => ({
      ...props,
      x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0),
    }),
  };
  const handleSubmit = (e) => {
    setSubmit(true);
    const timeout = setTimeout(() => {
      setSubmit(false);
    }, 2000);
    e.preventDefault();
    let finalState = {};
    finalState["Assets"] = state;
    for (let liability in liabilitystate) {
      if (
        liability == "HomeLoanInterestRate" ||
        liability == "EducationLoanInterestRate" ||
        liability === "VehicleLoanInterestRate" ||
        liability === "PersonalLoanInterestRate" ||
        liability == "CreditCardLoanInterestRate"
      ) {
        liabilitystate[liability] = Number.parseFloat(
          liabilitystate[liability]
        ).toFixed(2);
      }
    }
    finalState["Liabilities"] = liabilitystate;
    finalState["Insurance"] = insuranceState;
    db.docreateinvestments(uid, finalState);
    console.log("success");
  };
  useEffect(() => {
    const dbr = ref(db1, `users/${uid}/investment`);
    onValue(dbr, (snapshot) => {
      if (snapshot.val()) {
        console.log("Data: ", snapshot.val())
        setState(snapshot.val())
        if (snapshot.val().Assets) {
          setState(snapshot.val().Assets);
        }
        if (snapshot.val().Liabilities) {
          liabilitySetState(snapshot.val().Liabilities);
        }
        if (snapshot.val().Insurance) {
          setInsuranceState(snapshot.val().Insurance);
        }
        setloaded(true);
      } else {
        setloaded(true);
      }
    });
  }, []);

  const next = () => {
    // db.docreateinvestments(uid, state);
    props.setA(5);
    props.setcolor4("black");
    props.setcolor5(colorwhite);
    let finalState = {};
    finalState["Assets"] = state;
    for (let liability in liabilitystate) {
      if (
        liability == "HomeLoanInterestRate" ||
        liability == "EducationLoanInterestRate" ||
        liability === "VehicleLoanInterestRate" ||
        liability === "PersonalLoanInterestRate" ||
        liability == "CreditCardLoanInterestRate"
      ) {
        liabilitystate[liability] = Number.parseFloat(
          liabilitystate[liability]
        ).toFixed(2);
      }
    }
    finalState["Liabilities"] = liabilitystate;
    finalState["Insurance"] = insuranceState;
    db.docreateinvestments(uid, finalState);
    console.log("success");
  };
  const prev = () => {
    // db.docreateinvestments(uid, state);
    props.setA(3);
    props.setcolor4("black");
    props.setcolor3(colorwhite);
    let finalState = {};
    finalState["Assets"] = state;
    for (let liability in liabilitystate) {
      if (
        liability == "HomeLoanInterestRate" ||
        liability == "EducationLoanInterestRate" ||
        liability === "VehicleLoanInterestRate" ||
        liability === "PersonalLoanInterestRate" ||
        liability == "CreditCardLoanInterestRate"
      ) {
        liabilitystate[liability] = Number.parseFloat(
          liabilitystate[liability]
        ).toFixed(2);
      }
    }
    finalState["Liabilities"] = liabilitystate;
    finalState["Insurance"] = insuranceState;
    db.docreateinvestments(uid, finalState);
    console.log("success");
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    const val = state.Total + Number(value) - (state[name] ? state[name] : 0);

    setState((prevState) => ({
      ...prevState,
      [name]: value,
      ["Total"]: val,
    }));
  };
  const Liabilityhandlechange = (e) => {
    let { name, value } = e.target;
    let val = liabilitystate.Total;

    if (
      name == "HomeLoanAmount" ||
      name == "VehicleLoanAmount" ||
      name == "EducationLoanAmount" ||
      name == "PersonalLoanAmount" ||
      name == "CreditCardLoanAmount"
    ) {
      val += Number(value) - (liabilitystate[name] ? liabilitystate[name] : 0);
    }

    liabilitySetState((prevState) => ({
      ...prevState,
      [name]: value,
      ["Total"]: val,
    }));
  };
  const InsuranceHandleChange = (e) => {
    let { name, value } = e.target;

    setInsuranceState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
      {loaded ? (
        <div className="marginsidebar">
          <form onSubmit={handleSubmit}>
            <div className="flex ">
              <div className="flex1m">
                <div className="flex padt10" style={{ paddingTop: "28px" }}>
                  <div className="flex1 left_align primaryFont700 fontSize22">
                    <p className="leftpos">Investments</p>
                  </div>
                  <div className="rightpos scaledown">
                    <Button
                      color="primary"
                      onClick={() => setShowLiability(!showLiability)}
                      variant="contained"
                      style={SECONDARYBUTTONSTYLE}
                    >
                      <Typography
                        className="primaryFont700 white"
                        variant="h6"
                        style={{ textTransform: "none" }}
                      >
                        Additional info for full consultation
                      </Typography>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flexm padt50 fontSize18">
              <div style={{ width: "2.5%" }}></div>
              <div className="flex1m">
                <div className="flex1  primaryFont700 fontSize22">
                  <p>Assets</p>
                </div>
                <div className="flex borderbot">
                  <div className="flex4">
                    <p className="pos toa">Type of Assets</p>
                  </div>
                  <div className="flex5" style={{ fontWeight: "bold" }}>
                    Current Value of Investments
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Fixed Deposit</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(1);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 1 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Fixed deposits in your bank or investment in debt
                            mutual fund
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Fixeddeposit}
                      name="Fixeddeposit"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Shares / Stocks</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(2);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 2 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">Shares or stocks</span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Shares}
                      name="Shares"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Mutual Funds</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(3);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 3 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Equity mutual funds, ELSS, etc.
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Mutualfunds}
                      name="Mutualfunds"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Gold</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(4);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 4 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">Excluding jewellery</span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Gold}
                      name="Gold"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Cash in Bank Account</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(5);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 5 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Cash in hand or in savings account
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Cash}
                      name="Cash"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10">
                  <div className="flex4">
                    <span className="pos">Cryptocurrency</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(6);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 6 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Any form of cryptocurrency
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Cryptocurrency}
                      name="Cryptocurrency"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className="flex padt10 padb10">
                  <div className="flex4">
                    <span className="pos">Other</span>
                    <span
                      className="cursor"
                      onClick={() => {
                        changex(7);
                      }}
                    >
                      <Iimage />{" "}
                    </span>
                    <span>
                      {x === 7 ? (
                        <span style={{ marginLeft: "10px" }}>
                          <span className="itext">
                            Other than above mentioned things
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div className="flex5">
                    ₹{" "}
                    <input
                      type="number"
                      value={state.Other}
                      name="Other"
                      onChange={handlechange}
                      style={{ width: "80%", textAlign: "right" }}
                      step="100"
                    />
                  </div>
                </div>
                <div className=" bordertop flex padt10 padb10">
                  <div className="flex4">
                    <span className="pos">Total Assets</span>
                  </div>
                  <div className="flex5">
                    ₹ {state.Total.toLocaleString("en-IN")}
                  </div>
                </div>
                {showLiability && (
                  <div>
                    <div className="flex padt10">
                      <div className="flex4">
                        <span className="pos">Life Insurance</span>
                        <span
                          className="cursor"
                          onClick={() => {
                            changex(8);
                          }}
                        >
                          <Iimage />{" "}
                        </span>
                        <span>
                          {x === 8 ? (
                            <span style={{ marginLeft: "10px" }}>
                              <span className="itext">
                                Total Life Insurance Policy Coverage
                              </span>
                            </span>
                          ) : (
                            <></>
                          )}
                        </span>
                      </div>
                      <div className="flex5">
                        ₹{" "}
                        <input
                          type="number"
                          value={insuranceState.LifeInsurance}
                          name="LifeInsurance"
                          onChange={InsuranceHandleChange}
                          style={{ width: "80%", textAlign: "right" }}
                          step="100"
                        />
                      </div>
                    </div>
                    <div className="flex padt10 padb10">
                      <div className="flex4">
                        <span className="pos">Health Insurance</span>
                        <span
                          className="cursor"
                          onClick={() => {
                            changex(9);
                          }}
                        >
                          <Iimage />{" "}
                        </span>
                        <span>
                          {x === 9 ? (
                            <span style={{ marginLeft: "10px" }}>
                              <span className="itext">
                                Total Health Insurance Policy Coverage including
                                coverage from your employer
                              </span>
                            </span>
                          ) : (
                            <></>
                          )}
                        </span>
                      </div>
                      <div className="flex5">
                        ₹{" "}
                        <input
                          type="number"
                          value={insuranceState.HealthInsurance}
                          name="HealthInsurance"
                          onChange={InsuranceHandleChange}
                          style={{ width: "80%", textAlign: "right" }}
                          step="100"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ width: "2.5%" }}></div>
              {showLiability && (
                <div className="flex1m">
                  <div
                    className="flex1  primaryFont700 fontSize22"
                    style={{ paddingLeft: "0px" }}
                  >
                    <p>Liabilities</p>
                  </div>
                  <div className="flex borderbot">
                    <div className="flex4">
                      <p className="pos toa">Loan Type</p>
                    </div>
                    <div className="flex4 pos toa">Amount</div>
                    <div className="flex4 pos toa">Interest Rate</div>
                  </div>
                  <div className="flex padt10">
                    <div className="flex4">
                      <span className="pos">Home Loan</span>
                      <span
                        className="cursor"
                        onClick={() => {
                          changex(10);
                        }}
                      >
                        <Iimage />{" "}
                      </span>
                      <span>
                        {x === 10 ? (
                          <span style={{ marginLeft: "10px" }}>
                            <span className="itext">
                              Current outtanding home loan balance and current
                              interest rate
                            </span>
                          </span>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                    <div className="flex4">
                      ₹{" "}
                      <input
                        type="number"
                        value={liabilitystate.HomeLoanAmount}
                        name="HomeLoanAmount"
                        onChange={Liabilityhandlechange}
                        style={{ width: "80%", textAlign: "right" }}
                        step="100"
                      />
                    </div>
                    <div className="flex4">
                      {" "}
                      <input
                        type="number"
                        value={liabilitystate.HomeLoanInterestRate}
                        name="HomeLoanInterestRate"
                        onChange={Liabilityhandlechange}
                        style={{ width: "80%", textAlign: "right" }}
                        step="0.01"
                      />{" "}
                      %
                    </div>
                  </div>
                  <div className="flex padt10">
                    <div className="flex4">
                      <span className="pos">Education Loan</span>
                      <span
                        className="cursor"
                        onClick={() => {
                          changex(11);
                        }}
                      >
                        <Iimage />{" "}
                      </span>
                      <span>
                        {x === 11 ? (
                          <span style={{ marginLeft: "10px" }}>
                            <span className="itext">
                              Current outtanding education loan balance and
                              current interest rate
                            </span>
                          </span>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                    <div className="flex4">
                      ₹{" "}
                      <input
                        type="number"
                        value={liabilitystate.EducationLoanAmount}
                        name="EducationLoanAmount"
                        onChange={Liabilityhandlechange}
                        style={{ width: "80%", textAlign: "right" }}
                        step="100"
                      />
                    </div>
                    <div className="flex4">
                      {" "}
                      <input
                        type="number"
                        value={liabilitystate.EducationLoanInterestRate}
                        name="EducationLoanInterestRate"
                        onChange={Liabilityhandlechange}
                        style={{ width: "80%", textAlign: "right" }}
                        step="0.01"
                      />{" "}
                      %
                    </div>
                  </div>
                  <div className="flex padt10">
                    <div className="flex4">
                      <span className="pos">Vehicle Loan</span>
                      <span
                        className="cursor"
                        onClick={() => {
                          changex(12);
                        }}
                      >
                        <Iimage />{" "}
                      </span>
                      <span>
                        {x === 12 ? (
                          <span style={{ marginLeft: "10px" }}>
                            <span className="itext">
                              Current outtanding car or bike loan balance and
                              current interest rate
                            </span>
                          </span>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                    <div className="flex4">
                      ₹{" "}
                      <input
                        type="number"
                        value={liabilitystate.VehicleLoanAmount}
                        name="VehicleLoanAmount"
                        onChange={Liabilityhandlechange}
                        style={{ width: "80%", textAlign: "right" }}
                        step="100"
                      />
                    </div>
                    <div className="flex4">
                      {" "}
                      <input
                        type="number"
                        value={liabilitystate.VehicleLoanInterestRate}
                        name="VehicleLoanInterestRate"
                        onChange={Liabilityhandlechange}
                        style={{ width: "80%", textAlign: "right" }}
                        step="0.01"
                      />{" "}
                      %
                    </div>
                  </div>
                  <div className="flex padt10">
                    <div className="flex4">
                      <span className="pos">Personal Loan</span>
                      <span
                        className="cursor"
                        onClick={() => {
                          changex(13);
                        }}
                      >
                        <Iimage />{" "}
                      </span>
                      <span>
                        {x === 13 ? (
                          <span style={{ marginLeft: "10px" }}>
                            <span className="itext">
                              Current outtanding personal loan balance and
                              current interest rate
                            </span>
                          </span>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                    <div className="flex4">
                      ₹{" "}
                      <input
                        type="number"
                        value={liabilitystate.PersonalLoanAmount}
                        name="PersonalLoanAmount"
                        onChange={Liabilityhandlechange}
                        style={{ width: "80%", textAlign: "right" }}
                        step="100"
                      />
                    </div>
                    <div className="flex4">
                      {" "}
                      <input
                        type="number"
                        value={liabilitystate.PersonalLoanInterestRate}
                        name="PersonalLoanInterestRate"
                        onChange={Liabilityhandlechange}
                        style={{ width: "80%", textAlign: "right" }}
                        step="0.01"
                      />{" "}
                      %
                    </div>
                  </div>
                  <div className="flex padt10 padb10">
                    <div className="flex4">
                      <span className="pos">Credit Card Loan</span>
                      <span
                        className="cursor"
                        onClick={() => {
                          changex(14);
                        }}
                      >
                        <Iimage />{" "}
                      </span>
                      <span>
                        {x === 14 ? (
                          <span style={{ marginLeft: "10px" }}>
                            <span className="itext">
                              Current outtanding credit card loan balance and
                              current interest rate
                            </span>
                          </span>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                    <div className="flex4">
                      ₹{" "}
                      <input
                        type="number"
                        value={liabilitystate.CreditCardLoanAmount}
                        name="CreditCardLoanAmount"
                        onChange={Liabilityhandlechange}
                        style={{ width: "80%", textAlign: "right" }}
                        step="100"
                      />
                    </div>
                    <div className="flex4">
                      {" "}
                      <input
                        type="number"
                        value={liabilitystate.CreditCardLoanInterestRate}
                        name="CreditCardLoanInterestRate"
                        onChange={Liabilityhandlechange}
                        style={{ width: "80%", textAlign: "right" }}
                        step="0.01"
                      />{" "}
                      %
                    </div>
                  </div>
                  <div className="padtX">
                    <div className="bordertop  flex padt10 padb10">
                      <div className="flex4">
                        <span className="pos">Total Liabilities</span>
                      </div>
                      <div className="flex4">
                        ₹ {liabilitystate.Total.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex padt20">
              <div className="leftpos scaledown">
                <Button
                  color="primary"
                  variant="contained"
                  style={SECONDARYBUTTONSTYLE}
                  onClick={prev}
                >
                  <Typography
                    className="primaryFont700 white"
                    variant="h6"
                    style={{ textTransform: "none" }}
                  >
                    Previous
                  </Typography>
                </Button>
              </div>
              <div className="centerbutton scaledown">
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
                    Submit
                  </Typography>
                </Button>
              </div>
            </div>
            {submit ? (
              <div className="center_align position1 padt50">
                Successfully submitted
              </div>
            ) : (
              <div
                className="center_align position1"
                style={{ paddingTop: "28px" }}
              ></div>
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
                partnered/associated/ affiliated with any platform/company for
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

function Financialgoal(props) {
  const colorwhite = "#FEF9F3";
  const [state, setState] = useState([{}]);
  const [loaded, setloaded] = useState(false);

  let user = firebase.auth().currentUser;
  const uid = props.userId ? props.userId : user.uid;

  useEffect(() => {
    const dbr = ref(db1, `users/${uid}/financialGoal`);
    onValue(dbr, function (snapshot) {
      if (snapshot.val()) {
        setState(snapshot.val());
      }
      setloaded(true);
    });
  }, []);

  const handlechange = (e) => {
    const { name, value, id } = e.target;
    state[id][name] = value;
    setState([...state]);
  };

  const addGoalFunction = () => {
    setState([...state, {}]);
  };

  const submit = () => {
    let finalGoals = [];
    state.forEach((goal) => {
      if (goal.name && goal.amount && goal.time) {
        finalGoals.push(goal);
      }
    });
    db.docreatefinancialGoal(uid, finalGoals);
    props.setA(5);
    props.setcolor6("black");
    props.setcolor5(colorwhite);
  };

  return (
    <div>
      {loaded ? (
        <div>
          <div className="marginsidebar">
            <div className="flex1m">
              <div className="flex padt10" style={{ paddingTop: "28px" }}>
                <div className="flex1 left_align primaryFont700 fontSize22">
                  <p className="leftpos">Financial Goals</p>
                </div>
                <div className="rightpos scaledown">
                  <Button
                    color="primary"
                    onClick={submit}
                    variant="contained"
                    style={SECONDARYBUTTONSTYLE}
                  >
                    <Typography
                      className="primaryFont700 white"
                      variant="h6"
                      style={{ textTransform: "none" }}
                    >
                      Update Info
                    </Typography>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flexm padt50 fontSize18">
              <div style={{ width: "5%" }}></div>
              <div className="flex2m">
                <div className="flex borderbot">
                  <div className="flex4">
                    <p className="pos toa">Financial Goal</p>
                  </div>
                  <div className="flex4 pos toa">Amount Needed</div>
                  <div className="flex4 pos toa">Time Remaining (years)</div>
                </div>
                {state.map((goal, index) => {
                  return (
                    <div className="flex padt10 padb10">
                      <div className="flex4">
                        {
                          <input
                            type="text"
                            name="name"
                            onChange={handlechange}
                            id={index}
                            value={state[index].name}
                            style={{ width: "80%", textAlign: "right" }}
                          />
                        }
                      </div>
                      <div className="flex4">
                        ₹{" "}
                        <input
                          type="number"
                          name="amount"
                          onChange={handlechange}
                          id={index}
                          value={goal.amount}
                          style={{ width: "80%", textAlign: "right" }}
                        />
                      </div>
                      <div className="flex4">
                        {" "}
                        <input
                          type="number"
                          name="time"
                          onChange={handlechange}
                          id={index}
                          value={goal.time}
                          style={{ width: "80%", textAlign: "right" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex padt10">
              <div className="centerbutton scaledown">
                <Button
                  color="primary"
                  onClick={addGoalFunction}
                  variant="contained"
                  style={SECONDARYBUTTONSTYLE}
                >
                  <Typography
                    className="primaryFont700 white"
                    variant="h6"
                    style={{ textTransform: "none" }}
                  >
                    Add more goal
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", left: "40%", top: "30%" }}>
          <CircularProgress size={100} />
        </div>
      )}
    </div>
  );
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(MainPage);
