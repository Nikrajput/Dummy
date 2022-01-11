import { db } from "./firebase";
import { ref, onValue } from 'firebase/database'

export default async function calculation(uid) {
  var personal = {
    Firstname: "",
    Lastname: "",
    Email: "",
    Dateofbirth: "",
    Age: 0,
    City: "",
    Financialliteracy: "Intermediate",
    Riskprofile: "",
    Number: "",
    Status: "Single",
  };
  var income = {
    Allow: 0,
    Basic: 0,
    Fund: 0,
    Hra: 0,
    Incometax: 0,
    Professionaltax: 0,
    Total: 0,
    Netincome: 0,
  };
  var investments = {
    Other: 0,
    Cash: 0,
    Fixeddeposit: 0,
    gold: 0,
    Mutualfunds: 0,
    Shares: 0,
    Cryptocurrency: 0,
  };
  let monthlyexpenditure = {
    Rent: 0,
    Bills: 0,
    Groceries: 0,
    Transport: 0,
    Medical: 0,
    Domestic: 0,
    Emi: 0,
    Otherexpenses: 0,
    Subtotal1: 0,
    Shopping: 0,
    Gym: 0,
    Entertainment: 0,
    Subscription: 0,
    Others: 0,
    Subtotal2: 0,
    Total: 0,
    Savings: 0,
    Unaccountedincome: 0,
  };
  let recommendedmonthlyexpenditure;
  var a = 0;
  var requested = false;
  console.log(uid);

  const recommendedmonthlyexpenditureRef = ref(db, `users/${uid}/recommendedmonthlyexpenditure`);
  onValue(recommendedmonthlyexpenditureRef, (snapshot) => {
    if (snapshot.val() !== null) {
      recommendedmonthlyexpenditure=snapshot.val();
    }
  })

  const personalRef = ref(db, `users/${uid}/personal`);
  onValue(personalRef, (snapshot) => {
    if (snapshot.val() !== null) {
      if (snapshot.val().Requested && snapshot.val().Requested !== "Done") requested = true;
      Object.assign(personal, snapshot.val());
      a++
      console.log("a: ", a)
    }
  })
  console.log("outside a", a)
  
  console.log(requested);
  console.log(personal);
  const incomeRef = ref(db, `users/${uid}/income`);
  onValue(incomeRef, (snapshot) => {
    if (snapshot.val() !== null) {
      a++;
      Object.assign(income, snapshot.val())
      console.log("a: ", a)
    }
  })
  console.log("outside a", a)

  const monthlyExpenditureRef = ref(db, `users/${uid}/monthlyexpenditure`);
  onValue(monthlyExpenditureRef, (snapshot) => {
    if (snapshot.val() !== null) {
      a++;
      Object.assign(monthlyexpenditure, snapshot.val())
      console.log("a: ", a)
    }
  })
  console.log("outside a", a)
 
  var Showreport = false;

  const investmentRef = ref(db, `users/${uid}/investment`);
  onValue (investmentRef, (snapshot) => {
    if (snapshot.val() !== null) {
      a++;
      Object.assign(investments, snapshot.val())
      console.log("a: ", a)
      Showreport = true;
    }
  })
  console.log("outside a", a)


  console.log("Report: ", Showreport)
  if (a >= 4) {
    console.log("Yeah a is 4 hehe....")
  }
  

  var Growthassests = 35;
  var Defensiveassests = 65;
  var Savingsrecommendation = 0;
  var Expensesrecommendation = 0;
  var risktaken = false;
  var recommend = 0;
  console.log(personal.Riskprofile);
  if (Showreport) {
    if (personal.Riskprofile === "Conservative") {
      Growthassests = 20;
      Defensiveassests = 80;
      risktaken = true;
    } else if (personal.Riskprofile === "Agressive") {
      Growthassests = 60;
      Defensiveassests = 40;
      risktaken = true;
    } else if (personal.Riskprofile === "Moderate") {
      Growthassests = 35;
      Defensiveassests = 65;
      risktaken = true;
    } else {
      Growthassests = 35;
      Defensiveassests = 65;
    }
    console.log(risktaken);
    var c17 = income.Total;
    var o36 = income.Hra * 12;
    var o37 = income.Basic * 12 * 0.4;
    if (personal.Status == "Married") {
      Expensesrecommendation = income.Netincome * 0.7;
    } else {
      Expensesrecommendation = income.Netincome * 0.6;
    }
    if (
      monthlyexpenditure.Subtotal1 + monthlyexpenditure.Subtotal2 <
      Expensesrecommendation
    ) {
      Expensesrecommendation =
        monthlyexpenditure.Subtotal2 + monthlyexpenditure.Subtotal1;
    }
    var o38 = monthlyexpenditure.Rent * 12 - 0.1 * income.Basic * 12;
    var o39 = 0;
    if (o36 < o37 && o36 < o38) {
      o39 = o36;
    } else if (o37 < o36 && o37 < o38) {
      o39 = o37;
    } else {
      o39 = o38;
    }
    if (o39 < 0) {
      o39 = 10;
    }
    var o27 = 150000 + o39 + 50000 + 2400 + 1.2 * income.Basic + 50000;
    if (c17 * 12 - o27 < Number(500000)) {
      recommend = 0 * (c17 * 12 - o27);
    } else {
      if (c17 * 12 - o27 < 1000000) {
        recommend = (500000 - 250000) * 0.05 + (c17 * 12 - o27 - 500000) * 0.2;
      } else {
        recommend =
          (500000 - 250000) * 0.05 +
          (1000000 - 500000) * 0.2 +
          (c17 * 12 - o27 - 1000000) * 0.3;
      }
    }
  }
  recommend = (recommend / 100).toFixed(0) * 100;
  Expensesrecommendation = (Expensesrecommendation / 1000).toFixed(0) * 1000;
  Savingsrecommendation = income.Netincome - Expensesrecommendation;
  if (
    (Savingsrecommendation / 1000).toFixed(0) * 1000 >
    Savingsrecommendation
  ) {
    Savingsrecommendation =
      (Savingsrecommendation / 1000).toFixed(0) * 1000 - 1000;
  } else {
    Savingsrecommendation = (Savingsrecommendation / 1000).toFixed(0) * 1000;
  }
  const bardata = {
    labels: ["Current", "Recommended"],
    datasets: [
      {
        barThickness: "20",
        // label:["Current","Recommended"],
        axis: "y",
        backgroundColor: ["#238EE7", "#4ED0CE"],
        data: [income.Incometax * 12, recommend],
      },
    ],
  };

  const arbitraryStackKey = "stack1";
  const datas = {
    labels: [
      ["Income"],
      ["Current", "Allocation"],
      ["Recommended", "Allocation"],
    ],
    datasets: [
      {
        barThickness: "50",
        stack: arbitraryStackKey,
        label: "Income",
        data: [income.Netincome, 0, 0],
        backgroundColor: ["#238EE7", "#4ED0CE", "#4ED0CE"],
      },
      {
        barThickness: "50",
        stack: arbitraryStackKey,
        label: "Expenses",
        data: [
          0,
          monthlyexpenditure.Subtotal1 + monthlyexpenditure.Subtotal2,
          Expensesrecommendation,
        ],
        backgroundColor: ["#4ED0CE", "#4ED0CE", "#4ED0CE"],
      },
      {
        barThickness: "50",
        stack: arbitraryStackKey,
        label: "Savings",
        data: [
          0,
          income.Netincome -
            (monthlyexpenditure.Subtotal1 + monthlyexpenditure.Subtotal2),
          Savingsrecommendation,
        ],
        backgroundColor: ["#7AE7F5", "#7AE7F5", "#7AE7F5"],
      },
    ],
  };

  const datadoughnut1 = {
    labels: ["Cash", "Equity", "Debt", "Gold", "Others"],
    datasets: [
      {
        // label:["Cash"],
        backgroundColor: [
          "#238EE7",
          "#4ED0CE",
          "#7AE7F5",
          "#FFBC42",
          "#CC2844",
        ],
        borderColor: "white",
        borderWidth: 1,
        data: [
          Number(investments['Assets'] ? investments['Assets'].Cash : investments.Cash),
          Number(investments['Assets'] ? investments['Assets'].Shares : investments.Shares) + Number(investments['Assets'] ? investments['Assets'].Mutualfunds : investments.Mutualfunds),
          Number(investments['Assets'] ? investments['Assets'].Fixeddeposit : investments.Fixeddeposit),
          Number(investments['Assets'] ? investments['Assets'].Gold : investments.Gold),
          Number(investments['Assets'] ? investments['Assets'].Cryptocurrency : investments.Cryptocurrency) + Number(investments['Assets'] ? investments['Assets'].Other: investments.Other),
        ],
      },
    ],
  };
  console.log(investments);
  const datadoughnut2 = {
    labels: ["Defensive Assets"],
    datasets: [
      {
        label: ["Defensive Assets"],
        backgroundColor: ["#238EE7"],
        borderColor: "white",
        borderWidth: 1,
        data: [20],
      },
    ],
  };

  const datadoughnut3 = {
    labels: ["Defensive Assets", "Growth Assets"],
    datasets: [
      {
        label: ["Defensive Assets", "Growth Assets"],
        backgroundColor: ["#238EE7", "#4ED0CE"],
        borderColor: "white",
        borderWidth: 1,
        data: [Defensiveassests, Growthassests],
      },
    ],
  };

  const datadoughnut4 = {
    labels: ["Needs", "Wants", "Savings", "Others"],
    datasets: [
      {
        label: ["cash"],
        backgroundColor: ["#238EE7", "#4ED0CE", "#7AE7F5", "#FFBC42"],
        borderColor: "white",
        borderWidth: 1,
        data: [
          monthlyexpenditure.Subtotal1,
          monthlyexpenditure.Subtotal2,
          monthlyexpenditure.Savings,
          income.Netincome -
            monthlyexpenditure.Subtotal1 -
            monthlyexpenditure.Subtotal2 -
            monthlyexpenditure.Savings,
        ],
      },
    ],
  };

  const datadoughnut5 = {
    labels: ["Total Expenses", "Savings", "Others"],
    datasets: [
      {
        label: ["cash"],
        backgroundColor: ["#238EE7", "#4ED0CE", "#7AE7F5"],
        borderColor: "white",
        borderWidth: 1,
        data: [
          Expensesrecommendation,
          Savingsrecommendation,
          income.Netincome - Expensesrecommendation - Savingsrecommendation,
        ],
      },
    ],
  };

  const data = {
    personal: personal,
    income: income,
    monthlyexpenditure: monthlyexpenditure,
    investments: investments,
    Savingsrecommendation: Savingsrecommendation,
    recommended: recommend,
    Growthassests: Growthassests,
    Defensiveassests: Defensiveassests,
    Showreport: Showreport,
    bardata: bardata,
    datas: datas,
    datadoughnut1: datadoughnut1,
    datadoughnut2: datadoughnut2,
    datadoughnut3: datadoughnut3,
    datadoughnut4: datadoughnut4,
    datadoughnut5: datadoughnut5,
    risktaken: risktaken,
    requested: requested,
    Expensesrecommendation: Expensesrecommendation,
    recommendedmonthlyexpenditure: recommendedmonthlyexpenditure
  };
  return data
}
