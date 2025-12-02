document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("compChart");
  if (!ctx) return;

  const years = [
    2012, 2013, 2014, 2015, 2016, 2017, 2018,
    2019, 2020, 2021, 2022, 2023, 2024
  ];

  const trustee = [
    4400, 4840, 5000, 5000, 10333, 10333, 10333,
    9000, 9000, 9000, 9000, 9000, 9000
  ];

  const board = [
    1500, 1650, 1800, 1800, 1800, 1750, 1800,
    1800, 2100, 2100, 2100, 2100, 2100
  ];

  const deputy = [
    3500, 3850, 4000, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ];

  new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "Trustee total",
          data: trustee,
          tension: 0.2
        },
        {
          label: "Board total (all members)",
          data: board,
          tension: 0.2
        },
        {
          label: "Deputy / Clerk total",
          data: deputy,
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        tooltip: { mode: "index", intersect: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Total annual compensation (USD)" }
        },
        x: {
          title: { display: true, text: "Year" }
        }
      }
    }
  });
});

