import React from 'react';
import ReactDOM from 'react-dom';
import App from './frontend/components/App';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import CssBaseline from "@material-ui/core/CssBaseline";
import 'chartjs-plugin-datalabels'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


ReactDOM.render(
  <Router>
    <CssBaseline />
            <ToastContainer autoClose={2000} hideProgressBar={true} pauseOnHover={true} position="top-right" />
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
