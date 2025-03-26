import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Sports.css';
import Vbplayers from './Vbplayers';
import Vbacheivement from './Vbacheivement';
import Vbmatches from './Vbmatches';
import Vbscorecard from './Vbscorecard';
import Vbdashboard from './Vbdashboard';

const Volleyball = () => {
  return (
    <>
      <header className="sports-head">
      <h3 className="home-sym" onClick={() => window.location.href = '/'}> 🏠︎</h3>
        <h1>Volleyball</h1>
      </header>

      <nav className="sports-navbar">
        <ul className='nav-link'>
          <li><Link to="/volleyball">Players</Link></li>
          <li><Link to="/volleyball/vbscorecard">Scorecard</Link></li>
          <li><Link to="/volleyball/vbacheivement">Achievements</Link></li>
          <li><Link to="/volleyball/vbmatches">Matches</Link></li>
          <li><Link to="/volleyball/vbdashboard">Dashboard</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Vbplayers />} />
        <Route path="/vbscorecard" element={<Vbscorecard />} />
        <Route path="/vbacheivement" element={<Vbacheivement />} />
        <Route path="/vbmatches" element={<Vbmatches />} />
        <Route path="/vbdashboard" element={<Vbdashboard />} />
      </Routes>
    </>
  );
};

export default Volleyball;
