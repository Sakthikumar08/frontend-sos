import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Sports.css';
import Fbplayers from './Fbplayers';
import Fbacheivement from './Fbacheivement';
import Fbmatches from './Fbmatches';
import Fbscorecard from './Fbscorecard'; 
import Fbdashboard from './Fbdashboard';

const Football = () => {
  return (
    <>
      <header className="sports-head">
      <h3 className="home-sym" onClick={() => window.location.href = '/'}> 🏠︎</h3>
        <h1>FootBall</h1>
      </header>

      <nav className="sports-navbar">
        <ul className='nav-link'>
          <li><Link to="/football">Players</Link></li>
          <li><Link to="/football/fbscorecard">Scorecard</Link></li>
          <li><Link to="/football/fbacheivement">Achievements</Link></li>
          <li><Link to="/football/fbmatches">Matches</Link></li>
          <li><Link to="/football/fbdashboard">Dashboard</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Fbplayers />} />
        <Route path="/fbscorecard" element={<Fbscorecard />} /> 
        <Route path="/fbacheivement" element={<Fbacheivement />} />
        <Route path="/fbmatches" element={<Fbmatches />} />
        <Route path="/fbdashboard" element={<Fbdashboard />} />
      </Routes>
    </>
  );
};

export default Football;
