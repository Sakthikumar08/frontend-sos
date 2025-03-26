import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const Vbdashboard = () => {
  const API_URL = "https://backend-spotligth-on-sports.onrender.com";

  const [team1Stats, setTeam1Stats] = useState({ totalMatches: 0, team1Wins: 0, winningPercentage: 0 });
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const teamStatsResponse = await axios.get(`${API_URL}/api/team1-stats`);
        setTeam1Stats(teamStatsResponse.data);

        const totalPlayersResponse = await axios.get(`${API_URL}/api/total-players`);
        setTotalPlayers(totalPlayersResponse.data.totalPlayers);

        const monthlyStatsResponse = await axios.get(`${API_URL}/api/team1-stats-per-month`);
        setMonthlyStats(monthlyStatsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    function runCounter(targetNumber) {
      let currentNumber = 0;
      const counterElement = document.getElementById('counter');
      const progressElement = document.getElementById('progress');

      function updateCounter() {
        counterElement.textContent = currentNumber;
        const progress = (currentNumber / targetNumber) * 360;
        progressElement.style.background = `conic-gradient(rgb(255, 132, 0) ${progress}deg, rgba(128, 128, 128, 1) ${progress}deg)`;

        if (currentNumber >= targetNumber) return;

        currentNumber++;
        setTimeout(updateCounter, Math.max(5, 300 - (currentNumber / targetNumber) * 450));
      }

      updateCounter();
    }

    if (totalPlayers > 0) runCounter(totalPlayers);
  }, [totalPlayers]);

  const pieData = {
    labels: ['Win', 'Loss'],
    datasets: [
      {
        data: [team1Stats.team1Wins, team1Stats.totalMatches - team1Stats.team1Wins],
        backgroundColor: ['rgb(255, 132, 0)', 'rgba(128, 128, 128, 1)'],
      },
    ],
  };

  const barData = {
    labels: monthlyStats.map((stat) => `${stat.month}-${stat.year}`),
    datasets: [
      {
        label: 'Total Matches',
        data: monthlyStats.map((stat) => stat.totalMatches),
        backgroundColor: 'rgba(128, 128, 128, 0.6)',
        borderColor: 'rgba(128, 128, 128, 1)',
      },
      {
        label: 'Wins',
        data: monthlyStats.map((stat) => stat.team1Wins),
        backgroundColor: 'rgb(255, 132, 0)',
        borderColor: 'rgb(255, 132, 0)',
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="row">
        <div className="box dashboard-box">
          <h2>Total Players</h2>
          <div className="circle">
            <div id="progress" className="circle-progress"></div>
            <div id="counter" className="circle-counter">0</div>  
          </div>
        </div>
        <div className="box pie-chart-box">
          <h2>Percentage Chart</h2>
          <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
      </div>
      <div className="box-bar-chart-box">
        <h2>Team Performance Chart</h2>
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
  );
};

export default Vbdashboard;
