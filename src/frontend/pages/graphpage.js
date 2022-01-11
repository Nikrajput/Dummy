import React from "react";

import { Bar } from "react-chartjs-2";

export const GraphPage = () => {
  const data = {
    axis: "y",
    labels: ["Current", "Recomended"],
    datasets: [
      {
        data: [468000, 240800],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
        barThinkness: 10
      },
    ],
  };

  const options = {
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    // responsive: true,
  
  };
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "16px 32px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};
