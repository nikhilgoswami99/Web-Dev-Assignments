document.addEventListener("DOMContentLoaded", () => {
  const data = {
      orangeCap: { players: ["Player1", "Player2", "Player3"], runs: [750, 720, 680] },
      mostFours: { players: ["PlayerA", "PlayerB", "PlayerC"], fours: [120, 110, 105] },
      mostSixes: { players: ["PlayerX", "PlayerY", "PlayerZ"], sixes: [45, 42, 40] },
      mostCenturies: { players: ["P1", "P2", "P3"], centuries: [3, 3, 2] },
      mostFifties: { players: ["Q1", "Q2", "Q3"], fifties: [7, 6, 6] }
  };

  function createChart(canvasId, label, labels, data) {
      new Chart(document.getElementById(canvasId), {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: label,
                  data: data,
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              responsive: true,
              scales: {
                  y: { beginAtZero: true }
              }
          }
      });
  }

  createChart("orangeCapChart", "Runs Scored", data.orangeCap.players, data.orangeCap.runs);
  createChart("mostFoursChart", "Fours", data.mostFours.players, data.mostFours.fours);
  createChart("mostSixesChart", "Sixes", data.mostSixes.players, data.mostSixes.sixes);
  createChart("mostCenturiesChart", "Centuries", data.mostCenturies.players, data.mostCenturies.centuries);
  createChart("mostFiftiesChart", "Fifties", data.mostFifties.players, data.mostFifties.fifties);
});
