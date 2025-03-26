import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Sports.css';
import Ballplayers from './Ballplayers';
import Ballacheivement from './Ballacheivement';
import Ballmatches from './Ballmatches';
import Ballscorecard from './Ballscorecard'; 

const BallBadminton = () => {
  return (
    <>
      <header className="sports-head">
      <h3 className="home-sym" onClick={() => window.location.href = '/'}> 🏠︎</h3>
        <h1>BallBadminton</h1>
      </header>

      <nav className="sports-navbar">
        <ul className='nav-link'>
          <li><Link to="/ballbadminton">Players</Link></li>
          <li><Link to="/ballbadminton/ballscorecard">Scorecard</Link></li>
          <li><Link to="/ballbadminton/ballacheivement">Achievements</Link></li>
          <li><Link to="/ballbadminton/ballmatches">Matches</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Ballplayers />} />
        <Route path="/ballscorecard" element={<Ballscorecard />} /> 
        <Route path="/ballacheivement" element={<Ballacheivement />} />
        <Route path="/ballmatches" element={<Ballmatches />} />
      </Routes>
    </>
  );
};

export default BallBadminton;
