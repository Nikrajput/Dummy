import React, { useState, useEffect } from "react";
import { SECONDARYBUTTONSTYLE } from "../components/header/Header";
import { Typography, Button } from "@material-ui/core";
import { db1, storage, user, auth } from "../../firebase/firebase";
import { db } from "../../firebase";
import getalldata from "../../firebase/backend";
import Printdata from "../components/showreportdata";
import "../pages/Faq.css";
import withAuthorization from "../authentication/withAuthorization";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import "@progress/kendo-theme-material/dist/all.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useRef } from "react";
import { PersonalVideo } from "@material-ui/icons";
import Data from "../components/Data";

import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from 'firebase/database'

function Admin() {
  const pdfexport = useRef(null);
  const handleexport = (event) => {
    pdfexport.current.save();
  };

  const [state, setState] = useState([]);
  const [a, seta] = useState(false);
  const [ar, setar] = useState([]);
  const [searched, setsearched] = useState();

  let arr = [];

  const [result, setResult] = useState({});

  useEffect(() => {
    console.log("things....");
    const usersRef = ref(db1, `users`);
    onValue(usersRef, (snapshot) => {
      setResult(snapshot.val());
    });
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser.uid) {
        console.log("Result: ", result);
        for (let i = 0; i < Object.values(result).length; i++) {
          arr[i] = {
            uid: Object.keys(result)[i],
            val: Object.values(result)[i],
          };
        }
        setar(arr);
        setState(Object.keys(result));
        seta(true);
      }
    });
  }, [result]);

  const Admindata = () => {
    if (user) {
      return (
        <div className="admincard">
          <input
            type="text"
            value={searched}
            placeholder="Search"
            style={{ height: "30px" }}
            onChange={(e) => setsearched(e.target.value)}
          />
          <br />
          <br />
          <table>
            <tr
              class="adminTable"
              style={{ color: "#238EE7", padding: "20px" }}
            >
              <td className="td2">Firstname</td>
              <td className="td2">Lastname</td>
              <td className="td2">Email</td>
              <td className="td2">Phone number</td>
              <td className="td2">Status</td>
              <td className="td2">Requested</td>
              <td className="td2">Show full data</td>
            </tr>
            {ar.map((item) => {
              if (searched) {
                return <Printdata data={item} />;
              }
            })}
          </table>
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  return (
    <>
      <div className="admincard">
        <input
          type="text"
          value={searched}
          placeholder="Search"
          style={{ height: "30px" }}
          onChange={(e) => setsearched(e.target.value)}
        />
        <br />
        <br />
        <table>
          <tr style={{ color: "#238EE7", fontWeight: "800", fontSize: "16px" }}>
            <td className="td2">Firstname</td>
            <td className="td2">Lastname</td>
            <td className="td2">Email</td>
            <td className="td2">Phone number</td>
            <td className="td2">Status</td>
            <td className="td2">Requested</td>
            <td className="td2">Show full data</td>
          </tr>
          {ar.map((item) => {
            if (!searched || searched === "") {
              return <Printdata data={item} />;
            } else {
              try {
                if (
                  item.val.personal.Email.indexOf(searched) != -1 ||
                  item.val.personal.Firstname.indexOf(searched) != -1 ||
                  item.val.personal.Lastname.indexOf(searched) != -1 ||
                  item.val.personal.Requested.indexOf(searched) != -1
                ) {
                  return <Printdata data={item} />;
                }
              } catch (e) {}
            }
          })}
        </table>
      </div>
    </>
  );
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Admin);
