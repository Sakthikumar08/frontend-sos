import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Sports.css';
import Tabplayers from './Tabplayers';
import Tabacheivement from './Tabacheivement';
import Tabmatches from './Tabmatches';
import Tabscorecard from './Tabscorecard';

const Tabletennis = () => {
  return (
    <>
      <header className="sports-head">
        <h1>Tabletennis</h1>
      </header>

      <nav className="sports-navbar">
        <ul>
          <li><Link to="/tabletennis">Players</Link></li>
          <li><Link to="/tabletennis/tabscorecard">Scorecard</Link></li>
          <li><Link to="/tabletennis/tabacheivement">Achievements</Link></li>
          <li><Link to="/tabletennis/tabmatches">Matches</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Tabplayers />} />
        <Route path="/tabscorecard" element={<Tabscorecard />} />
        <Route path="/tabacheivement" element={<Tabacheivement />} />
        <Route path="/tabmatches" element={<Tabmatches />} />
      </Routes>
    </>
  );
};

export default Tabletennis;
