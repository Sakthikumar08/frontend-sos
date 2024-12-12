import React, { useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registering the required Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const Kbdashboard = () => {
  // Data for Pie Chart
  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['red', 'blue', 'yellow'],
        hoverOffset: 4,
      },
    ],
  };

  // Options for Pie Chart
  const pieOptions = {
    responsive: false,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    layout: {
      padding: 0,
    },
  };

  // Data for Bar Graph
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for Bar Chart
  const barOptions = {
    responsive: false,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    const targetNumber = 150;
    let currentNumber = 0;
    const counterElement = document.getElementById('counter');
    const progressElement = document.getElementById('progress');

    function updateCounter() {
      if (!counterElement || !progressElement) return;

      counterElement.textContent = currentNumber;
      const progress = (currentNumber / targetNumber) * 360;
      progressElement.style.background = `conic-gradient(blue ${progress}deg, white ${progress}deg)`;

      if (currentNumber >= targetNumber) return;
      currentNumber++;
      const speed = Math.max(5, 150 - (currentNumber / targetNumber) * 450);
      setTimeout(updateCounter, speed);
    }

    updateCounter();
  }, []);

  return (
    <div>
      {/* Pie Chart */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          width: 'fit-content',
          display: 'inline-block',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2>Pie Chart</h2>
        <div style={{ width: '300px', height: '300px' }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Counter Section */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          width: 'fit-content',
          display: 'inline-block',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <h1>Sports Team Dashboard</h1>
        <p>Total Players in College Sports Teams:</p>
        <div
          className="circle"
          style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            margin: '0 auto',
          }}
        >
          <div
            id="progress"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'conic-gradient(blue 0deg, white 0deg)',
            }}
          ></div>
          <div
            id="counter"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            0
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          width: 'fit-content',
          display: 'inline-block',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2>Bar Chart</h2>
        <div style={{ width: '500px', height: '300px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Kbdashboard;
