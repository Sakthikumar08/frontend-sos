import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Sports.css';
import Hocplayers from './Hocplayers';
import Hocacheivement from './Hocacheivement';
import Hocmatches from './Hocmatches';
import Hocscorecard from './Hocscorecard';

const Hockey = () => {
  return (
    <>
      <header className="sports-head">
        <h1>Hockey</h1>
      </header>

      <nav className="sports-navbar">
        <ul className='nav-link'>
          <li><Link to="/hockey">Players</Link></li>
          <li><Link to="/hockey/hocscorecard">Scorecard</Link></li>
          <li><Link to="/hockey/hocacheivement">Achievements</Link></li>
          <li><Link to="/hockey/hocmatches">Matches</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Hocplayers />} />
        <Route path="/hocscorecard" element={<Hocscorecard />} />
        <Route path="/hocacheivement" element={<Hocacheivement />} />
        <Route path="/hocmatches" element={<Hocmatches />} />
      </Routes>
    </>
  );
};

export default Hockey;
