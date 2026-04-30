// stores MLB teams by division
const divisions = {
  "AL East": ["BAL", "BOS", "NYY", "TB", "TOR"],
  "AL Central": ["CLE", "CWS", "DET", "KC", "MIN"],
  "AL West": ["HOU", "LAA", "OAK", "SEA", "TEX"],
  "NL East": ["ATL", "MIA", "NYM", "PHI", "WSH"],
  "NL Central": ["CHC", "CIN", "MIL", "PIT", "STL"],
  "NL West": ["AZ", "COL", "LAD", "SD", "SF"]
};

// colors used for divisions and charts
const divisionColors = {
  "AL East": "#5FBF5A",
  "AL Central": "#C68642",
  "AL West": "#F28C38",
  "NL East": "#C44536",
  "NL Central": "#8C8C8C",
  "NL West": "#17324d"
};

// labels for selectable features
const featureLabels = {
  hr_park_effect: "Home Run Park Effect",
  elevation: "Elevation",
  avg_temp: "Average Temperature",
  min_wall_height: "Minimum Wall Height",
  max_wall_height: "Maximum Wall Height",
  left_field: "Left Field Distance",
  center_field: "Center Field Distance",
  right_field: "Right Field Distance",
  extra_distance: "Extra Distance",
  roof: "Roof Factor",
  daytime: "Daytime Factor"
};

// global variables for data and charts
let allRows = [];
let topParks = [];
let topDivisionChart;
let featureChart;
let scatterChart;

// global chart text styling
Chart.defaults.color = "#1f2933";
Chart.defaults.font.family = "Poppins";
Chart.defaults.font.size = 13;

// load CSV data
Papa.parse("./data/mlb_ballparks_clean.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: function(results) {

    // remove empty rows
    allRows = results.data.filter(d => d.team && d.ballpark);

    // find highest HR effect park in each division
    topParks = getTopParksByDivision(allRows);

    // create visuals and comparison tool
    createTopDivisionChart();
    createFeatureChart();
    createScatterChart();
    setupDropdowns();
  }
});

// finds the highest HR effect park from each division
function getTopParksByDivision(rows) {
  const winners = [];

  Object.keys(divisions).forEach(division => {
    const teams = divisions[division];

    const divisionRows = rows.filter(row =>
      teams.includes(row.team)
    );

    const topPark = divisionRows.sort(
      (a, b) => b.hr_park_effect - a.hr_park_effect
    )[0];

    winners.push({
      ...topPark,
      division: division
    });
  });

  return winners;
}

// first visual: highest HR effect park from each division
function createTopDivisionChart() {
  const labels = topParks.map(d => `${d.division}: ${d.ballpark}`);
  const values = topParks.map(d => d.hr_park_effect);
  const colors = topParks.map(d => divisionColors[d.division]);

  topDivisionChart = new Chart(document.getElementById("topDivisionChart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Home Run Park Effect",
        data: values,
        backgroundColor: colors,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              const row = topParks[ctx.dataIndex];

              return [
                `Division: ${row.division}`,
                `Team: ${row.team}`,
                `Ballpark: ${row.ballpark}`,
                `HR Park Effect: ${row.hr_park_effect}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#1f2933",
            font: {
              size: 12,
              weight: "500"
            }
          },
          title: {
            display: true,
            text: "Division Winner",
            color: "#1f2933",
            font: {
              size: 15,
              weight: "600"
            }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: "#1f2933",
            font: {
              size: 13,
              weight: "500"
            }
          },
          title: {
            display: true,
            text: "Home Run Park Effect",
            color: "#1f2933",
            font: {
              size: 15,
              weight: "600"
            }
          }
        }
      }
    }
  });
}

// second visual setup
function createFeatureChart() {
  const select = document.getElementById("featureSelect");

  select.addEventListener("change", () => {
    updateFeatureChart(select.value);
  });

  updateFeatureChart(select.value);
}

// updates second chart based on selected feature
function updateFeatureChart(feature) {
  const labels = topParks.map(d => `${d.division}: ${d.team}`);
  const values = topParks.map(d => d[feature]);
  const colors = topParks.map(d => divisionColors[d.division]);

  if (featureChart) featureChart.destroy();

  featureChart = new Chart(document.getElementById("featureChart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: featureLabels[feature],
        data: values,
        backgroundColor: colors,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#1f2933",
            font: {
              size: 13,
              weight: "500"
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              const row = topParks[ctx.dataIndex];

              return [
                `Division: ${row.division}`,
                `Team: ${row.team}`,
                `Ballpark: ${row.ballpark}`,
                `${featureLabels[feature]}: ${row[feature]}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#1f2933",
            font: {
              size: 12,
              weight: "500"
            }
          },
          title: {
            display: true,
            text: "Top Home Run Park by Division",
            color: "#1f2933",
            font: {
              size: 15,
              weight: "600"
            }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: "#1f2933",
            font: {
              size: 13,
              weight: "500"
            }
          },
          title: {
            display: true,
            text: featureLabels[feature],
            color: "#1f2933",
            font: {
              size: 15,
              weight: "600"
            }
          }
        }
      }
    }
  });
}

// third visual setup
function createScatterChart() {
  const select = document.getElementById("scatterFeatureSelect");

  select.addEventListener("change", () => {
    updateScatterChart(select.value);
  });

  updateScatterChart(select.value);
}

// updates scatterplot x-axis based on selected feature
function updateScatterChart(feature) {
  const datasets = Object.keys(divisions).map(division => {
    const teams = divisions[division];

    const points = allRows
      .filter(row => teams.includes(row.team))
      .map(row => ({
        x: row[feature],
        y: row.hr_park_effect,
        meta: {
          ...row,
          division: division
        }
      }));

    return {
      label: division,
      data: points,
      backgroundColor: divisionColors[division],
      pointRadius: 6,
      pointHoverRadius: 9
    };
  });

  const featureValues = allRows.map(row => row[feature]);
  const minX = Math.min(...featureValues);
  const maxX = Math.max(...featureValues);

  // reference line for league average HR effect
  const averageLine = {
    label: "League Average HR Effect",
    data: [
      { x: minX, y: 100 },
      { x: maxX, y: 100 }
    ],
    type: "line",
    borderColor: "#1f2933",
    borderWidth: 2,
    borderDash: [6, 6],
    pointRadius: 0
  };

  datasets.push(averageLine);

  if (scatterChart) scatterChart.destroy();

  scatterChart = new Chart(document.getElementById("scatterChart"), {
    type: "scatter",
    data: {
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#1f2933",
            font: {
              size: 13,
              weight: "500"
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              if (!ctx.raw.meta) {
                return "League Average HR Effect: 100";
              }

              const row = ctx.raw.meta;

              return [
                `${row.ballpark} (${row.team})`,
                `Division: ${row.division}`,
                `${featureLabels[feature]}: ${row[feature]}`,
                `HR Park Effect: ${row.hr_park_effect}`,
                row.hr_park_effect > 100 ? "Above league average" : "Below league average"
              ];
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#1f2933",
            font: {
              size: 13,
              weight: "500"
            }
          },
          title: {
            display: true,
            text: featureLabels[feature],
            color: "#1f2933",
            font: {
              size: 15,
              weight: "600"
            }
          }
        },
        y: {
          beginAtZero: false,
          ticks: {
            color: "#1f2933",
            font: {
              size: 13,
              weight: "500"
            }
          },
          title: {
            display: true,
            text: "Home Run Park Effect",
            color: "#1f2933",
            font: {
              size: 15,
              weight: "600"
            }
          }
        }
      }
    }
  });
}

// fills dropdowns for comparing two parks
function setupDropdowns() {
  const p1 = document.getElementById("parkOne");
  const p2 = document.getElementById("parkTwo");

  allRows.forEach((d, i) => {
    let opt1 = new Option(`${d.team} - ${d.ballpark}`, i);
    let opt2 = new Option(`${d.team} - ${d.ballpark}`, i);

    p1.add(opt1);
    p2.add(opt2);
  });

  p1.value = 0;
  p2.value = 7;

  p1.onchange = updateCompare;
  p2.onchange = updateCompare;

  updateCompare();
}

// updates comparison cards
function updateCompare() {
  const p1 = allRows[document.getElementById("parkOne").value];
  const p2 = allRows[document.getElementById("parkTwo").value];

  document.getElementById("comparisonBox").innerHTML = `
    ${card(p1)}
    ${card(p2)}
  `;
}

// creates ballpark card HTML
function card(p) {
  return `
    <div class="park-card">
      <img class="park-image" src="./images/${p.team}.png" alt="${p.ballpark} stadium outline">

      <h3>${p.ballpark}</h3>
      <p><strong>Team:</strong> ${p.team}</p>
      <p><strong>HR Effect:</strong> ${p.hr_park_effect}</p>
      <p><strong>Elevation:</strong> ${p.elevation} ft</p>
      <p><strong>Average Temp:</strong> ${p.avg_temp}°F</p>
      <p><strong>Left Field:</strong> ${p.left_field} ft</p>
      <p><strong>Center Field:</strong> ${p.center_field} ft</p>
      <p><strong>Right Field:</strong> ${p.right_field} ft</p>
      <p><strong>Wall Height:</strong> ${p.min_wall_height} ft to ${p.max_wall_height} ft</p>
      <p><strong>Extra Distance:</strong> ${p.extra_distance} ft</p>
    </div>
  `;
}