import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage'; 
import Football from './components/Football';
import Kabaddi from './components/Kabaddi';
import Atheletics from './components/Atheletics';
import BallBadminton from './components/BallBadminton';
import Basketball from './components/Basketball';
import Hockey from './components/Hockey';
import Shuttle from './components/Shuttle';
import Tabletennis from './components/Tabletennis';
import Volleyball from './components/Volleyball';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  <Homepage searchValue={searchTerm} onSearchChange={handleSearchChange} />

  return (
    <Router>
      {/* Pass the search term and handler to Homepage */}
      

      <Routes>
        <Route path="/" element={<Homepage searchValue={searchTerm} onSearchChange={handleSearchChange} />} />

        <Route path="/football/*" element={<Football />} />
        <Route path="/kabaddi/*" element={<Kabaddi />} />
        <Route path="/volleyball/*" element={<Volleyball />} />
        <Route path="/basketball/*" element={<Basketball />} />
        <Route path="/shuttle/*" element={<Shuttle />} />
        <Route path="/tabletennis/*" element={<Tabletennis />} />
        <Route path="/hockey/*" element={<Hockey />} />
        <Route path="/ballbadminton/*" element={<BallBadminton />} />
        <Route path="/athletics/*" element={<Atheletics />} />
      </Routes>
    </Router>
  );
}

export default App;
