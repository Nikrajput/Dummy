const faker = require("faker");

export const expensesDoughnutData = {
  labels: ["Savings", "Needs", "Wants"],
  datasets: [
    {
      data: [0, 2400, 0],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const expensesDoughnutOptions = {
  maintainAspectRatio: false,
  cutoutPercentage: 40,
  plugins: {
    legend: {
      display: false
    },
  },
  // onHover: (ctx) => {
  //   const { chart: { data, chartArea} } = ctx

  //   console.log(data)
  //   console.log(ctx)
  //   // console.log("Hovering: ", ctx.chart.config.data.datasets[0].data)
  // }
};

const labels = [
  "Savings",
  "Bills",
  "Groceries",
  "Rent",
  "Shopping",
  "Entertainment",
  "Subscription",
];

export const expensesBarData = {
  labels,
  datasets: [
    {
      label: "Budget",
      data: new Array(labels.length).fill(0),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Expenses",
      data: new Array(labels.length).fill(0),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const expensesBarOptions = {
  indexAxes: "y",
  scales: {
    x: {
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
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

export const investmentsDoughnutData = {
  datasets: [
    {
      data: [100],
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
    },
  ],
};

export const taxesBarData = {
  labels: ["Current", "Recommended"],
  datasets: [
    {
      barThickness: "20",
      backgroundColor: ["#238EE7", "#4ED0CE"],
      data: [120000, 85000],
    },
  ],
};

export const taxesBarOptions = {
  indexAxis: "y",
  scales: {
    x: {
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
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};
