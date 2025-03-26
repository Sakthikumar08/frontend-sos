import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Sports.css';
import Shtplayers from './Shtplayers';
import Shtacheivement from './Shtacheivement';
import Shtmatches from './Shtmatches';
import Shtscorecard from './Shtscorecard';

const Shuttle = () => {
  return (
    <>
      <header className="sports-head">
      <h3 className="home-sym" onClick={() => window.location.href = '/'}> 🏠︎</h3>
        <h1>Shuttle</h1>
      </header>

      <nav className="sports-navbar">
        <ul className='nav-link'>
          <li><Link to="/shuttle">Players</Link></li>
          <li><Link to="/shuttle/shtscorecard">Scorecard</Link></li>
          <li><Link to="/shuttle/shtacheivement">Achievements</Link></li>
          <li><Link to="/shuttle/shtmatches">Matches</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Shtplayers />} />
        <Route path="/shtscorecard" element={<Shtscorecard />} />
        <Route path="/shtacheivement" element={<Shtacheivement />} />
        <Route path="/shtmatches" element={<Shtmatches />} />
      </Routes>
    </>
  );
};

export default Shuttle;
