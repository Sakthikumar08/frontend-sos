import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Sports.css';
import Athplayers from './Athplayers';
import Athacheivement from './Athacheivement';
import Athmatches from './Athmatches';
import Athscorecard from './Athscorecard'; 

const Atheletics = () => {
  return (
    <>
      <header className="sports-head">
        <h1>Atheletics</h1>
      </header>

      <nav className="sports-navbar">
        <ul>
          <li><Link to="/athletics">Players</Link></li>
          <li><Link to="/athletics/athscorecard">Scorecard</Link></li>
          <li><Link to="/athletics/athacheivement">Achievements</Link></li>
          <li><Link to="/athletics/athmatches">Matches</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Athplayers />} />
        <Route path="/athscorecard" element={<Athscorecard />} /> 
        <Route path="/athacheivement" element={<Athacheivement />} />
        <Route path="/athmatches" element={<Athmatches />} />
      </Routes>
    </>
  );
};

export default Atheletics;
