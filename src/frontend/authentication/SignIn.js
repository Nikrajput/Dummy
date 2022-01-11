import React, { Component } from "react";
import {  Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { FacebookLoginButton,GoogleLoginButton } from "react-social-login-buttons";
import { withRouter } from "react-router-dom";
import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget";
import { auth} from "../../firebase";
import * as routes from "../../routes/routes";
import "./signin.css"
import facebook from "../../assets/images/facebook.png"
import { Typography, Button } from '@material-ui/core'
import google from "../../assets/images/google.png"
import logo from "../../assets/images/white_logo.png"
import { NavLink, Link } from "react-router-dom";
const SignInPage = ({ history }) => {
  return (
    <div className="div-flex imagebackground secondaryFont" style={{paddingTop:"50px"}}>
      <p style={{textAlign:"center",paddingBottom:"20px",color:"white",fontSize:"25px",fontWeight:"bold"}}>Start your journey towards financial freedom here!</p>
      <div className="cardd">
        <h3 className="centered opacity"><NavLink to="/" tag={Link}><img src={`${logo}`} width="200px" style={{paddingLeft:"40px"}}/></NavLink></h3>
        <SignInForm history={history} />
      </div>
      <div style={{textAlign:"center",fontSize:"20px",paddingTop:"10px"}}>
        <NavLink to="/" tag={Link} ><div style={{color:"white"}}>Back to Homepage</div></NavLink>
      </div>
    </div>
  );
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  showingAlert: false
};
const SECONDARYBUTTONSTYLE = { 
  padding: "8px 100px 8px 100px",
  borderRadius: "60px"
}
class SignInForm extends Component {


  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.Mainpage);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
        this.timer(); //defined below
      });

    event.preventDefault();
  };
  googleLogin=()=>{
    const { history } = this.props;
    auth
      .dogoogleSignIn()
      .then(authUser =>{
        history.push(routes.Mainpage);
        console.log("authUser", authUser);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
        console.log(error);
      });
  };

  facebookLogin = () => {
    const { history } = this.props;
    auth
      .doFacebookSignIn()
      .then(authUser => {
        history.push(routes.Mainpage);
        console.log("authUser", authUser);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
        console.log(error);
      });
  };

  timer = () => {
    this.setState({
      showingAlert: true
    });

    setTimeout(() => {
      this.setState({
        showingAlert: false
      });
    }, 4000);
  };

  render() {
    const { email, password, error, showingAlert } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div style={{fontWeight:"bold"}}>
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {error.message}
          </Alert>
        )}

        <Form onSubmit={this.onSubmit} style={{paddingBottom:"20px"}} className="opacity">
          <FormGroup>
            <input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email Address"
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
             style={{width:"280px",height:"40px"}}/>
          </FormGroup>
          <FormGroup>
            <input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              value={password}
              onChange={event =>
                this.setState(byPropKey("password", event.target.value))
              }
              style={{width:"280px",height:"40px"}}/>
          </FormGroup>
          <FormGroup >
            <div style={{display:"flex"}}>
            <input
              type="checkbox"
              name="password"
              id="examplePassword"
              value={password}
              onChange={event =>
                this.setState(byPropKey("password", event.target.value))
              }
              style={{width:"15px",height:"15px",float:"left",marginTop:"2px"}}/><label style={{paddingLeft:"10px",color:"white",fontSize:"14px"}}>Keep me signed in</label></div> 
            </FormGroup>
          <div className="text-center">
          <Button color="primary" type="submit" variant="contained" style={SECONDARYBUTTONSTYLE}>
            <Typography className="primaryFont700 white" variant="h6" style={{textTransform:"none"}}>
              <b>Sign in</b>
            </Typography>
          </Button>
          </div>
        </Form>
        <PasswordForgetLink />
        <SignUpLink />
        <div style={{display:"flex",justifyContent:"space-evenly",paddingTop:"20px",paddingBottom:"20px"}}>
          <span style={{color:"white",fontSize:"14px",textAlign:"left"}}>Or Login Using: </span>
          <img onClick={this.googleLogin} src={google} style={{cursor:"pointer"}}   width="30px" height="30px"/>
          <img onClick={this.facebookLogin} src={facebook} style={{cursor:"pointer"}}   width="30px" height="30px"/>
        </div>
        {/* <button onClick={this.facebookLogin}>Login with Facebook</button> */}
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
