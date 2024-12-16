import React, { useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';


// Registering required Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const Kbdashboard = () => {
  // Pie Chart Data
  const pieData = {
    labels: ['Win', 'Loss'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['rgb(255, 132, 0)', 'rgba(128, 128, 128, 1)'], // Green for Win, Red for Loss
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Bar Chart Data
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Matches',
        data: [20, 18, 25, 22, 24, 26, 30, 28, 23, 25, 21, 27],
        backgroundColor: 'rgba(128, 128, 128, 0.6)', // Grey
        borderColor: 'rgba(128, 128, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Wins',
        data: [15, 12, 20, 18, 19, 21, 25, 22, 18, 20, 17, 23],
        backgroundColor: 'rgb(255, 132, 0)', // Orange
        borderColor: 'rgb(255, 132, 0)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // Counter Animation for Sports Team
  useEffect(() => {
    function runCounter(targetNumber) {
      let currentNumber = 0;
      const counterElement = document.getElementById('counter');
      const progressElement = document.getElementById('progress');
  
      function updateCounter() {
          // Update counter text
          counterElement.textContent = currentNumber;
  
          // Update progress (speedometer-style border fill)
          const progress = (currentNumber / targetNumber) * 360;
          progressElement.style.background = `conic-gradient( rgb(255, 132, 0)${progress}deg, rgba(128, 128, 128, 1) ${progress}deg)`;
  
          // Stop condition
          if (currentNumber >= targetNumber) return;
  
          currentNumber++;
  
          // Dynamically adjust speed
          const speed = Math.max(5, 300 - (currentNumber / targetNumber) * 450);
          setTimeout(updateCounter, speed);
      }
  
      updateCounter();
  }
  
  // Example: Run the counter to represent 150 players
  runCounter(50);
  }, []);

  return (
  
    <div className="dashboard-container">
      {/* First Row */}
      <br />
      <br />
      <div className="row">
        {/* Sports Team Dashboard */}
        <div className="box dashboard-box">
          <h2>Total Players</h2>
          <br />
          <div className="circle">
            <div id="progress" className="circle-progress"></div>
            <div id="counter" className="circle-counter">0</div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="box pie-chart-box">
          <h2>Percentage Chart</h2>
          <br />
          <div className="chart-container">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

     
      </div>

      {/* Second Row */}
      <br />
        {/* Bar Chart */}
        <div className="box-bar-chart-box">
          <h2>Team Performance Chart</h2><br />
          <div className="bar-chart-container">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    
  );
};

export default Kbdashboard;
