import React, { useLayoutEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify'

import "./App.css";
import * as routes from "../../routes/routes";
//nav stuff
import SignUpPage from "../authentication/SignUp";
import SignInPage from "../authentication/SignIn";
import PasswordForgetPage from "../authentication/PasswordForget";
import Risk from "../pages/riskprofile";
import Home from "../pages/riskprofilehomepage";
import Finance from "../pages/financeliteracy";
import Faq from "../pages/Faq";
import withAuthentication from "../authentication/withAuthentication";
import Mainpage from "../pages/personalprofile";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
// import Landing from "../pages/homepage";
import Landingpagefinancialliteracy from "../pages/financialliteracyhomepage";
import Admin from "../pages/admin";
const Services = React.lazy(() => import("../pages/services"));
const About = React.lazy(() => import("../pages/aboutus"));
import Careers from "../pages/careers";
const Userfulldata = React.lazy(() => import("../pages/Userfulldata"));
const UserList = React.lazy(() => import("../pages/userList"))
const SuperAdmin = React.lazy(() => import("../pages/superAdmin"))

import ReactGA from "react-ga";
if (window.location.host === "www.befinsavvy.in" || window.location.host === "befinsavvy.com") {
  // ** Google Analytics
  const measurementId = "UA-213828673-1";
  ReactGA.initialize(measurementId);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

import RouterChangeTracker from "./RouterChangeTracker";

// ** Pages
const Homepage = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const Signup = React.lazy(() => import("../pages/auth/Signup"));
const ResetPassword = React.lazy(() => import("../pages/auth/ResetPassword"));
const Dashboard = React.lazy(() => import("../pages/Dashboard/index"))

import { GraphPage } from "../pages/graphpage";
import { FeedBack } from "./feedback";

import ScrollToTop from "../utils/ScrollToTop";
import { Suspense } from "react";

const theme = createTheme({
  typography: {
    htmlFontSize: 18,
    fontFamily: ["Manrope", "Nunito", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#4ED0CE",
    },
    secondary: {
      main: "#CC2844",
    },
    background: {
      default: "#FEF9F4",
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.54)",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 460,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  overrides: {
    MuiTypography: {
      h1: {
        fontFamily: "Nunito, sans-serif",
      },
      h2: {
        fontFamily: "Nunito, sans-serif",
      },
      h3: {
        fontFamily: "Nunito, sans-serif",
      },
      h4: {
        fontFamily: "Manrope, sans-serif",
      },
      h5: {
        fontFamily: "Manrope, sans-serif",
      },
      h6: {
        fontFamily: "Manrope, sans-serif",
      },
    },
  },
});
const App = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Suspense fallback={<div></div>}>
        <div className="App" style={{ flex: 1 }}>
          <FeedBack />
          <BrowserRouter>
            <RouterChangeTracker />
            <ScrollToTop>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path={routes.SIGN_UP} component={Signup} />
              <Route exact path={routes.SIGN_IN} component={Login} />
              <Route
                exact
                path={routes.PASSWORD_FORGET}
                component={ResetPassword}
              />
              <Route
                exact
                path={routes.Risk}
                component={Risk}
                theme={props.theme}
              />
              <Route exact path={routes.Home} component={Home} />
              <Route exact path={routes.Finance} component={Finance} />
              <Route exact path={routes.Faq} component={Faq} />
              <Route exact path={routes.Mainpage} component={Mainpage} />
              <Route exact path={routes.Landingpage} component={Homepage} />
              <Route exact path={routes.UserList} component={UserList} />
              <Route exact path={routes.SuperAdmin} component={SuperAdmin} />
              <Route
                exact
                path={routes.Landingpagefinancialliteracy}
                component={Landingpagefinancialliteracy}
              />
              <Route exact path={routes.Admin} component={Admin} />
              <Route exact path={routes.Services} component={Services} />
              <Route exact path={routes.About} component={About} />
              <Route exact path={routes.Careers} component={Careers} />
              <Route
                exact
                path={routes.Userfulldata}
                component={Userfulldata}
              />
            </ScrollToTop>
          </BrowserRouter>
        </div>
      </Suspense>
    </MuiThemeProvider>
  );
};

// export default App;
export default withAuthentication(App); //using HoC to handle session
