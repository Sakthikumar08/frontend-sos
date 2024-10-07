import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Sports.css';
import Kbplayers from './kbplayers';
import Kbacheivement from './kbacheivement';
import Kbmatches from './kbmatches';
import Kbscorecard from './kbscorecard';

const Kabaddi = () => {
  return (
    <>
      <header className="sports-head">
        <h1>KABADDI</h1>
      </header>

      <nav className="sports-navbar">
        <ul>
          <li ><Link to="/kabaddi">Players</Link></li>
          <li><Link to="/kabaddi/kbscorecard">Scorecard</Link></li>
          <li><Link to="/kabaddi/kbacheivement">Achievements</Link></li>
          <li><Link to="/kabaddi/kbmatches">Matches</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Kbplayers />} />
        <Route path="/kbscorecard" element={<Kbscorecard />} />
        <Route path="/kbacheivement" element={<Kbacheivement />} />
        <Route path="/kbmatches" element={<Kbmatches />} />
      </Routes>
    </>
  );
};

export default Kabaddi;
