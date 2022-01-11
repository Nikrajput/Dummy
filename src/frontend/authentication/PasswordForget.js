import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import "./signin.css"
import { auth } from "../../firebase";
import * as routes from "../../routes/routes";
import logo from "../../assets/images/white_logo.png"
import { NavLink, Link } from "react-router-dom";
//it resets your password. It doesn’t matter if you are authenticated or not
const PasswordForgetPage = ({ history }) => {
  return(
  <div className="div-flex imagebackground" style={{paddingTop:"100px"}}>
    <div className="cardd" >
    <h3 className="centered" ><NavLink to="/" tag={Link}><img src={`${logo}`} width="280px" style={{paddingBottom:"20px",paddingTop:"20px"}}/></NavLink></h3>
      <PasswordForgetForm history={history}/>
    </div>
  </div>)
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

//################### PasswordForget Form ###################
const INITIAL_STATE = {
  email: "",
  error: null,
  showingAlert: false
};
class PasswordForgetForm extends Component {
  state = { ...INITIAL_STATE };
  onSubmit = event => {
    const { email } = this.state;
    const { history } = this.props;
    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        history.push(routes.SIGN_IN)
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
        this.timer(); //show alert message for some seconds
      });

    event.preventDefault();
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
    const { email, error, showingAlert } = this.state;

    const isInvalid = email === "";

    return (
      <div>
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {error.message}
          </Alert>
        )}

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email"
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
            />
          </FormGroup>

          <div className="text-center" style={{paddingBottom:"40px"}}>
            <button className="buttonsignin" type="submit">
              Reset Password
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

//################### PasswordForget Link ###################
const PasswordForgetLink = () => (
  <span>
    <Link to={routes.PASSWORD_FORGET}><span style={{color:"white",fontSize:"11px",paddingRight:"20px"}}>FORGOT PASSWORD?</span></Link>
  </span>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink }