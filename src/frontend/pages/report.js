import React, { useState, useEffect } from "react";
import "./report.css";
import { CircularProgress } from "@material-ui/core";
import img2 from "../../assets/images/2.JPG";
import img4 from "../../assets/images/4.JPG";
import img5 from "../../assets/images/5.JPG";
import img6 from "../../assets/images/6.JPG";
import img7 from "../../assets/images/7.JPG";
import blur from "../../assets/images/blur.JPG";
import recommen from "../../assets/images/recommen.JPG";
import li from "../../assets/images/li.JPG";
import hi from "../../assets/images/hi.JPG";
import li1 from "../../assets/images/li1.JPG";
import hi1 from "../../assets/images/hi1.JPG";
import { Bar, Doughnut } from "react-chartjs-2";
import { db1 } from "../../firebase/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import calculation from "../../firebase/getreportdata";
import { SECONDARYBUTTONSTYLE } from "../components/header/Header";
import { Typography, Button } from "@material-ui/core";
import { db } from "../../firebase";
import { renderToString } from "react-dom/server";
import "@progress/kendo-theme-material/dist/all.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useRef } from "react";
import { PersonalVideo } from "@material-ui/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import defaul from "../../assets/images/default.png";
import { getpersonal } from "../../firebase/getdata";
import reportPic from "../../assets/images/reportCover.png";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "chart.js";
import { sendEmail } from "../../utils/sendEmail";

Chart.register(ChartDataLabels);

const print = () => {
  const string = renderToString(<Report />);
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addMetadata(string);
  pdf.save("pdf");
};

export default function Report(props) {
  const footer = (tooltipItems) => {
    console.log(tooltipItems);
    let sum = 0;
    let label = "";
    label = tooltipItems.label;
    sum = Number(tooltipItems.raw).toLocaleString("en-IN");
    return label + ":" + sum;
  };

  const optionsdatastacked = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return value.toLocaleString("en-IN");
          },
          padding: 0,
        },
        grid: {
          display: false,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
        position: "bottom",
        // labels: {
        //   font: {
        //     family: "Verdana",
        //     size: ,
        //   },
        // },
      },
      datalabels: {
        formatter: function (value) {
          return "₹" + value.toLocaleString("en-IN");
        },
        color: "white",
        anchor: "center",
        padding: 0,
        clamp: true,
        font: {
          family: "Verdana",
          size: 8,
        },
      },
    },
    maintainAspectRatio: false,
  };

  Chart.defaults.font.size = 8;

  const optionsbardata1 = {
    layout: {
      padding: 20,
    },
    indexAxis: "y",
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return "₹" + value.toLocaleString("en-IN");
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      datalabels: {
        formatter: function (value) {
          return "₹" + value.toLocaleString("en-IN");
        },
        // display: `₹ ${true}`,
        color: "white",
        anchor: "center",
        clamp: true,
      },
      legend: {
        display: false,
        labels: {
          font: {
            family: "Verdana",
            size: 5,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: footer,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const footer1 = (tooltipItems) => {
    let sum = 0;
    let label = "";
    label = tooltipItems.label;
    for (let i = 0; i < tooltipItems.dataset.data.length; i++) {
      sum += Number(tooltipItems.dataset.data[i]);
    }
    sum = (Number(tooltipItems.raw) * 100) / sum;
    sum = sum.toFixed(0);
    return label + ": " + sum + "%";
  };

  const footer2 = (tooltipItems) => {
    return "Value: ₹" + Number(tooltipItems[0].raw).toLocaleString("en-IN");
  };

  const optionsdoughnut3 = {
    tooltips: {
      enabled: false,
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          let percentage = 0;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            percentage = Math.round((value / sum) * 100) + "%";
            return percentage;
          } else {
            return percentage;
          }
        },
        color: "#fff",
      },

      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: footer1,
        },
      },
    },
    maintainAspectRatio: false,
  };
  // let numSectors = data?.datasets[0]?.data?.length;
  // let sectorDegree = 180 / numSectors;
  const optionsdoughnut4 = {
    // pieceLabel: {
    //   mode: "value",
    //   position: "outside",
    //   fontColor: "#000",
    //   format: function (value) {
    //     return "$" + value;
    //   },
    // },
    // title: {
    //   display: true,
    //   text: "Total Sales by Country - Top 5",
    //   fontSize: 15,
    //   fontStyle: "bold",
    // },
    legend: {
      display: false,
      position: "bottom",
    },
    plugins: {
      datalabels: {
        formatter: function (value) {
          return value.toLocaleString("en-IN");
        },
        color: "black",
        // anchor: "end",
        // align: "end",
        // offset: 20,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: footer1,
          footer: footer2,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const ref = useRef();
  const pdfexport = useRef(null);
  const handleexport = (event) => {
    pdfexport.current.save();
  };
  const [fullsize, setfullsize] = useState(false);
  const [load, setload] = useState(false);
  const [personal, setpersonal] = useState("");
  const [request, setrequest] = useState(false);
  let user = firebase.auth().currentUser;
  const uid = user.uid;
  var dataa;
  const [data, setData] = useState();
  console.log(data);
  useEffect(() => {
    const dbp = db1.ref(`users/${uid}/personal`);
    dbp.once("value", function (snapshot) {
      if (snapshot.val() != null) {
        setpersonal(snapshot.val());
      }
    });

    dataa = calculation(uid);
    dataa.then(function (result) {
      console.log("result");
      console.log(result);
      setData(result);
      setload(true);
    });
  }, []);

  const requested = async () => {
    db.requested(uid);
    setrequest(true);

    const htmlTemplate = `
      <p>Firstname: ${personal.Firstname}</p>
      <p>Lastname: ${personal.Lastname}</p>
      <p>Email: ${personal.Email}</p>
      <p>Number: ${personal.Number}</p>
    `;

    await sendEmail("Consultation Request", htmlTemplate);
  };

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    const input1 = document.getElementById("divToPrint1");
    const input2 = document.getElementById("divToPrint2");
    const input3 = document.getElementById("divToPrint3");
    const input4 = document.getElementById("divToPrint4");
    const input5 = document.getElementById("divToPrint5");
    const input6 = document.getElementById("divToPrint6");
    const pdf = new jsPDF("portrait", "mm", "a4", true);
    pdf.addImage(defaul, "JPEG", 0, 0, 210, 100);
    pdf.addPage();
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      pdf.addPage();
    });

    html2canvas(input1).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      pdf.addPage();
    });
    html2canvas(input2).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      pdf.addPage();
    });
    html2canvas(input3).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      pdf.addPage();
    });
    html2canvas(input4).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      pdf.addPage();
    });
    html2canvas(input5).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      pdf.addPage();
    });
    html2canvas(input6).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      pdf.save("download.pdf");
    });
  };

  const IntroPage = () => {
    return <div className="reportCoverArea"></div>;
  };

  const ForWhomCreatedThisPage = () => {
    return (
      <div className="container dynamicUserName">
        <h1>
          <b>Financial Report for</b>
        </h1>
        <h1>{`${data.personal.Firstname} ${data.personal.Lastname}`}</h1>
        <br />

        <h5>
          Created by BeFinSavvy <br /> in September 2021
        </h5>
      </div>
    );
  };

  const Page1 = () => {
    return (
      <div className="pdfreport">
        <div>
          <div className="text">
            <div className="d-flex justify-content-between align-items-right">
              <p>Dear {data.personal.Firstname},</p>
              <div>
                <span>
                  <b>Age:</b> {data.personal.Age} years
                </span>
                <br></br>
                <span>
                  <b>Marital Status:</b> {data.personal.Status}
                </span>
                <br></br>
                <span>
                  <b>Risk Profile:</b> {data.personal.Riskprofile}
                </span>
              </div>
            </div>
            <br />

            <p>
              Thanks for trusting us with your information and choosing us as a
              partner in your journey towards achieving your financial goals.
              <br />
              As per our discussion, please find below the key recommendations.
              <br />
              Feel free to get in touch with us if you have any questions.
              <br />
              We wish you all the best on this journey!
            </p>
            <p>
              Best Wishes,
              <br />
              Ankit Agrawal
              <br />
              Co-Founder, BeFinSavvy
            </p>
          </div>
        </div>
        <div className="heading2">Saving Your Taxes</div>
        <span>
          <b>Tax Liability:</b>
        </span>
        <div className="bar">
          <Bar data={data.bardata} options={optionsbardata1} />
        </div>
        <br />
        <div style={{ textAlign: "center", color: "#CC2844" }}>
          <b>
            You will save upto ₹{" "}
            {(
              Number(
                (data.income.Incometax * 12 - data.recommended) / 1000
              ).toFixed(0) * 1000
            ).toLocaleString("en-IN")}{" "}
            to in taxes for the current financial year
          </b>
        </div>
        <div className="heading2 ">Optimising Your Expenses</div>
        <span>
          <b>Monthly Budget:</b>
        </span>
        <br />
        <br />
        <div className="bar1">
          <Bar data={data.datas} options={optionsdatastacked} />
        </div>
        <p style={{ textAlign: "center", color: "#CC2844" }}>
          <b>
            You will have an additional saving of ₹{" "}
            {(
              (
                (-data.income.Netincome +
                  data.monthlyexpenditure.Subtotal1 +
                  data.monthlyexpenditure.Subtotal2 +
                  data.Savingsrecommendation) /
                100
              ).toFixed(0) * 100
            ).toLocaleString("en-IN")}{" "}
            per month by following recommended budget and financial discipline.
          </b>
        </p>
      </div>
    );
  };
  const Page1pdf = () => {
    return (
      <div
        // id="divToPrint"
        className="pad"
        style={{ width: "210mm", height: "270mm" }}
      >
        <div className="supertext ">
          <div className="textpdf">
            <p>Dear {data.personal.Firstname},</p>
            <br />
            <p>
              Thanks for trusting us with your information and choosing us as a
              partner in your journey towards achieving your financial goals.
            </p>
            <p>
              As per our discussion, please find below the key recommendations.
            </p>
            <p>Feel free to get in touch with us if you have any questions.</p>
            <p>We wish you all the best on this journey!</p>
            <p>
              Best Wishes,
              <br />
              Ankit Agrawal
              <br />
              Co-Founder, BeFinSavvy
            </p>
          </div>
          <div className="sidetext1">
            <span>
              <b>Age:</b> {data.personal.Age} years
            </span>
            <br></br>
            <span>
              <b>Marital Status:</b> {data.personal.Status}
            </span>
            <br></br>
            <span>
              <b>Risk Profile:</b> {data.personal.Riskprofile}
            </span>
          </div>
          <br />
        </div>
        <div className="heading2">Saving Your Taxes</div>
        <p>
          <b>Tax Liability:</b>
        </p>
        <div className="bar pad">
          <Bar data={data.bardata} options={optionsbardata1} />
          <br></br>
        </div>
        <br />
        <div style={{ textAlign: "center", color: "#CC2844" }}>
          <b>
            You will save upto ₹{" "}
            {(
              Number(
                (data.income.Incometax * 12 - data.recommended) / 1000
              ).toFixed(0) * 1000
            ).toLocaleString("en-IN")}{" "}
            to in taxes for the current financial year
          </b>
        </div>
        <br />
        <div className="heading2">Optimising Your Expenses</div>
        <p>
          <b>Monthly Budget:</b>
        </p>
        <br />
        <div className="bar1">
          <Bar data={data.datas} options={optionsdatastacked} />
        </div>
        <br></br>
        <p style={{ textAlign: "center", color: "#CC2844" }}>
          <b>
            You will have an additional saving of ₹{" "}
            {(
              (
                (-data.income.Netincome +
                  data.monthlyexpenditure.Subtotal1 +
                  data.monthlyexpenditure.Subtotal2 +
                  data.Savingsrecommendation) /
                100
              ).toFixed(0) * 100
            ).toLocaleString("en-IN")}{" "}
            per month by following recommended budget and financial discipline.
          </b>
        </p>
      </div>
    );
  };
  const Page2 = () => {
    return (
      <div className="pad pdfreport">
        <div className="heading2">Managing Your Investments</div>
        <p>
          <b>Current Asset Allocation:</b>
        </p>
        <div className="doughnut">
          <Doughnut data={data.datadoughnut1} options={optionsdoughnut4} />
        </div>

        <p style={{ paddingTop: "40px" }}>
          <b>Recommended Asset Allocation:</b>
        </p>
        <div style={{ display: "flex", paddingBottom: "40px" }}>
          <div style={{ width: "50%", paddingTop: "20px" }}>
            <p style={{ paddingBottom: "40px" }}>For Short-term Goals</p>
            <div className="doughnut2">
              <Doughnut data={data.datadoughnut2} options={optionsdoughnut3} />
            </div>
          </div>
          <div style={{ width: "50%", paddingTop: "20px" }}>
            <p style={{ paddingBottom: "40px" }}>For Long-term Goals</p>
            <div className="doughnut2">
              <Doughnut data={data.datadoughnut3} options={optionsdoughnut3} />
            </div>
            {data.risktaken ? (
              <div></div>
            ) : (
              <span>[* assuming you are a moderate risk taker]</span>
            )}
          </div>
        </div>
        <br></br>
        <p
          style={{ textAlign: "center", color: "#CC2844", fontWeight: "bold" }}
        >
          In order to have a robust investment portfolio, you should have a well
          diversified portfolio aligned with your financial goals and risk
          appetite.
        </p>
      </div>
    );
  };
  const Page3 = () => {
    return (
      <div className="pdfreport">
        <div className="heading2">
          {data.personal.Firstname}'s Tax-Saving Strategy
        </div>
        <div className="consultbutton">
          <Button
            color="primary"
            type="submit"
            variant="contained"
            style={SECONDARYBUTTONSTYLE}
            onClick={requested}
          >
            <Typography
              className="primaryFont700 white"
              variant="h6"
              style={{ textTransform: "none" }}
            >
              {data.requested || request ? (
                <span>You had already requested a consultation</span>
              ) : (
                <span>To know more request a consultation</span>
              )}
            </Typography>
          </Button>
        </div>
        <img src={`${img2}`} width="100%" />
        <br></br>
      </div>
    );
  };
  const Page4 = () => {
    return (
      <div className="pdfreport">
        <div className="heading2">
          Monthly Budgeting Plan for {data.personal.Firstname}
        </div>
        <p style={{ textAlign: "left" }}>
          <b style={{ color: "#238EE7", paddingLeft: "2%" }}>Expenses:</b>
        </p>
        <div className="flex" style={{ fontWeight: "bold" }}>
          <div
            className="flexl"
            style={{ color: "#238EE7", borderRight: "0px" }}
          >
            Needs
          </div>
          <div
            className="flexi"
            style={{ color: "#238EE7", borderRight: "0px" }}
          >
            Current
          </div>
          <div
            className="flexb"
            style={{ color: "#4ED0CE", textAlign: "right" }}
          >
            Recommended
          </div>
        </div>
        <div className="flex">
          <div className="flexl">Rent / Maintenance </div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Rent.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="95%" />
          </div>
        </div>
        <div className="flex">
          <div className="flexl">Bills / Utility</div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Bills.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <div className="flex">
          <div className="flexl">Groceries</div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Groceries.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <div className="flex">
          <div className="flexl">Transport</div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Transport.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <div className="flex">
          <div className="flexl">Medical and Insurance</div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Medical.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <div className="flex">
          <div className="flexl">Domestic Help</div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Domestic.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <div className="flex">
          <div className="flexl">EMI</div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Emi.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <div className="flex">
          <div className="flexl">Others / Charity</div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Otherexpenses.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <div className="flex">
          <div
            className="flexl"
            style={{ color: "white", backgroundColor: "#238EE7" }}
          >
            Sub-total
          </div>
          <div
            className="flexi"
            style={{ color: "white", backgroundColor: "#238EE7" }}
          >
            ₹ {data.monthlyexpenditure.Subtotal1.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <br></br>
        <div className="flex" style={{ fontWeight: "bold" }}>
          <div
            className="flexl"
            style={{ color: "#238EE7", borderRight: "0px" }}
          >
            Wants
          </div>
          <div
            className="flexi"
            style={{ color: "#238EE7", borderRight: "0px" }}
          >
            Current
          </div>
          <div
            className="flexb"
            style={{ color: "#4ED0CE", textAlign: "right" }}
          >
            Recommended
          </div>
        </div>
        <div className="flex">
          <div className="flexl">Shopping</div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Shopping.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <div className="flex">
          <div className="flexl">Entertainment / Dining Out</div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Entertainment.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <div className="flex">
          <div className="flexl">Other / Self-Education</div>
          <div className="flexi">
            ₹ {data.monthlyexpenditure.Others.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <div className="flex">
          <div
            className="flexl"
            style={{ color: "white", backgroundColor: "#238EE7" }}
          >
            Sub-total
          </div>
          <div
            className="flexi"
            style={{ color: "white", backgroundColor: "#238EE7" }}
          >
            ₹ {data.monthlyexpenditure.Subtotal2.toLocaleString("en-IN")}
          </div>
          <div className="flexb">
            <img src={`${blur}`} width="100%" height="100%" />
          </div>
        </div>
        <br></br>
        <div className="flex">
          <div
            className="flexl"
            style={{ color: "white", backgroundColor: "#238EE7" }}
          >
            Total Expenses
          </div>
          <div
            className="flexi"
            style={{ color: "white", backgroundColor: "#238EE7" }}
          >
            ₹{" "}
            {(
              data.monthlyexpenditure.Subtotal1 +
              data.monthlyexpenditure.Subtotal2
            ).toLocaleString("en-IN")}
          </div>
          <div
            className="flexb"
            style={{ color: "white", backgroundColor: "#4ED0CE" }}
          >
            ₹{" "}
            {(
              (data.Expensesrecommendation / 1000).toFixed(0) * 1000
            ).toLocaleString("en-IN")}
          </div>
        </div>
        <div className="flex" style={{ fontWeight: "bold" }}>
          <div
            className="flexl"
            style={{ backgroundColor: "#238EE7", color: "white" }}
          >
            Savings / Investments
          </div>
          <div
            className="flexi"
            style={{ backgroundColor: "#238EE7", color: "white" }}
          >
            ₹ {data.monthlyexpenditure.Savings.toLocaleString("en-IN")}
          </div>
          <div
            className="flexb"
            style={{ backgroundColor: "#4ED0CE", color: "white" }}
          >
            ₹{" "}
            {(
              (data.Savingsrecommendation / 1000).toFixed(0) * 1000
            ).toLocaleString("en-IN")}
          </div>
        </div>
        <br></br>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            fontWeight: "bold",
          }}
        >
          <div style={{ width: "50%" }}>
            <p style={{ paddingLeft: "5%" }}>Current:</p>
            <div className="doughnut2">
              <Doughnut data={data.datadoughnut4} options={optionsdoughnut4} />
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <p>Recommended:</p>
            <div className="doughnut2">
              <Doughnut data={data.datadoughnut5} options={optionsdoughnut4} />
            </div>
          </div>
        </div>
        <br></br>
      </div>
    );
  };
  const Page5 = () => {
    return (
      <div className="pdfreport">
        <div className="heading2">
          Immediate Action Plan for {data.personal.Firstname}
        </div>
        <span
          style={{ textAlign: "left", color: "#238EE7", fontWeight: "bold" }}
        ></span>
        <div style={{ textAlign: "left", paddingLeft: "20px" }}>
          <span style={{ fontWeight: "bold" }}>
            Maintain two bank accounts.
          </span>
          <p>
            1. Income-cum-expense account - where you get your salary and from
            where you make all your expenses. <br></br>
            2. Savings-cum-investment account - which has all your savings and
            from where you make all your investment.<br></br>
            Set up an automatic transfer of ₹{" "}
            {(
              (data.Savingsrecommendation / 100).toFixed(0) * 100
            ).toLocaleString("en-IN")}{" "}
            per month from expense account to the investment account soon after
            receiving your salary.<br></br>
            <br></br>
            Keep approximately ₹{" "}
            {(
              ((data.Expensesrecommendation * 3) / 10000).toFixed(0) * 10000
            ).toLocaleString("en-IN")}{" "}
            in cash for expenses in your expense account.<br></br>
            <b>Create an emergency fund</b> in your investment account.<br></br>
            Create 2 fixed deposits of ₹{" "}
            {(data.Expensesrecommendation * 3).toLocaleString("en-IN")} each
            with the first FD maturing in 6 months (that will be rolled forward
            for 1 year at maturity) and second FD maturing in 1 year (that will
            also be rolled forward for 1 year at maturity).<br></br>
            At the time of renewal, revisit your expenses and FD. If your
            expenses have increased, FD amount needs to be increased
            accordingly.<br></br>
            <br></br>
            <b>Get adequate insurance coverage</b>
            <br></br>
          </p>
        </div>
        <img
          src={`${img4}`}
          width="98%"
          height="180px"
          style={{ paddingLeft: "15px" }}
        />
        <p
          style={{ textAlign: "left", fontWeight: "bold", paddingLeft: "15px" }}
        >
          Our recommended policies for you
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingLeft: "15px",
          }}
        >
          <div>
            <div
              style={{ display: "flex", marginLeft: "0px", height: "100px" }}
            >
              <div style={{ width: "20%", marginLeft: "0px" }}>
                <img src={`${li}`} width="100%" height="95%" />
              </div>
              <div style={{ width: "80%" }}>
                <img src={`${li1}`} width="100%" height="95%" />
              </div>
            </div>
          </div>
          <div>
            <div
              style={{ display: "flex", marginLeft: "0px", height: "100px" }}
            >
              <div style={{ width: "20%", marginLeft: "0px" }}>
                <img src={`${hi}`} width="100%" height="95%" />
              </div>
              <div style={{ width: "80%" }}>
                <img src={`${hi1}`} width="100%" height="95%" />
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </div>
    );
  };
  const Page6 = () => {
    return (
      <div id="divToPrint5" className="pdfreport">
        <div className="heading2">
          {data.personal.Firstname}'s Investment Plan
        </div>
        <p style={{ textAlign: "left", color: "#238EE7", fontWeight: "bold" }}>
          {" "}
          Short-term goals
        </p>
        <img src={`${img5}`} width="100%" height="700px" />
        <br></br>
      </div>
    );
  };
  const makezoom = () => {
    if (fullsize) {
      setfullsize(false);
    } else {
      setfullsize(true);
    }
  };
  const Page7 = () => {
    return (
      <div id="divToPrint6" className="pdfreport">
        <div className="heading2">
          {data.personal.Firstname}'s Investment Plan
        </div>
        <p style={{ textAlign: "left", color: "#238EE7", fontWeight: "bold" }}>
          {" "}
          Long-term goals
        </p>
        <img src={`${img6}`} width="100%" />
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      {load ? (
        <div>
          {data && data.Showreport ? (
            <>
              <>
                <div className="body secondaryFont fontSize18">
                  {/*page 1*/}
                  <div className="scalepdf">
                    <IntroPage />
                    <ForWhomCreatedThisPage />
                    <Page1 />
                    <Page2 />
                    <Page3 />
                    <Page4 />
                    <Page5 />
                    <Page6 />
                    <Page7 />
                  </div>
                  <br />
                  <br />
                  <p>
                    <b>*Disclaimer:</b> BeFinSavvy is not a registered
                    investment advisor or broker/ dealer. All financial/
                    investment opinions expressed are based on personal research
                    and experience. All investments are subject to market risk.
                    Please understand the associated risks properly before
                    making any investment. Also note, we are not
                    partnered/associated/affiliated with any platform/company
                    for financial/investment products and hence offer completely
                    unbiased advice. The recommended products names are inldued
                    only for the purpose of reference and investors should feel
                    free to explore similar products from any financial
                    institutions that meet the investment objective.
                  </p>
                </div>
              </>
            </>
          ) : (
            <div className="notsubmit">
              <h2>Please fill all details in previous sections</h2>
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
