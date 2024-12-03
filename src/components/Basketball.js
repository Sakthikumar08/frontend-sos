import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Sports.css';
import Basplayers from './Basplayers';
import Basacheivement from './Basacheievment';
import Basmatches from './Basmatches';
import Basscorecard from './Basscorecard'; 

const Basketball = () => {
  return (
    <>
      <header className="sports-head">
        <h1>BasketBall</h1>
      </header>

      <nav className="sports-navbar">
        <ul  className='nav-link'>
          <li><Link to="/basketball">Players</Link></li>
          <li><Link to="/basketball/basscorecard">Scorecard</Link></li>
          <li><Link to="/basketball/basacheivement">Achievements</Link></li>
          <li><Link to="/basketball/basmatches">Matches</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Basplayers />} />
        <Route path="/basscorecard" element={<Basscorecard />} /> 
        <Route path="/basacheivement" element={<Basacheivement />} />
        <Route path="/basmatches" element={<Basmatches />} />
      </Routes>
    </>
  );
};

export default Basketball;
