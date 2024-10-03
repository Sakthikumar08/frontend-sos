import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage'; // Import Homepage
import Cards from './components/Cards'; // Import Cards Component
import Football from './components/Football';
import Kabaddi from './components/Kabaddi';
import Atheletics from './components/Atheletics';
import BallBadminton from './components/BallBadminton';
import Basketball from './components/Basketball';
import Hockey from './components/Hockey';
import Shuttle from './components/Shuttle';
import Tabletennis from './components/Tabletennis';
import Volleyball from './components/Volleyball';
import Footballbk from './components/assets/Footballbk.jpg';
import Atheleticsbk from './components/assets/Atheticsbk.jpg';
import Ballbadmintonbk from './components/assets/BallBadminton.jpg';
import Basketballbk from './components/assets/Basketballbk.jpg';
import Hockeybk from './components/assets/Hockeybk.jpg';
import Kabaddibk from './components/assets/kabaddibk.jpg';
import Shuttlebk from './components/assets/Shuttlebk.jpg';
import Tabletennisbk from './components/assets/Tabletennis.jpg';
import Volleyballbk from './components/assets/Volleyballbk.jpg';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const sportsCards = [
    { id: 1, name: "Football", para: "Football is the ultimate game of endurance, passion, and teamwork.", image: Footballbk },
    { id: 2, name: "Kabaddi", para: "Kabaddi is a battle of strength, strategy, and breath control.", image: Kabaddibk },
    { id: 3, name: "Volleyball", para: "Volleyball is not just a game; it's a rhythm of teamwork and precision.", image: Volleyballbk },
    { id: 4, name: "Basketball", para: "Basketball is where skill meets speed and heart meets the hoop.", image: Basketballbk },
    { id: 5, name: "Shuttle", para: "Where quick reflexes meet graceful power.", image: Shuttlebk },
    { id: 6, name: "Table Tennis", para: "Table Tennis: where focus and speed create split-second brilliance.", image: Tabletennisbk },
    { id: 7, name: "Hockey", para: "In hockey, every pass, every shot is a moment of strategy and strength.", image: Hockeybk },
    { id: 8, name: "BallBadminton", para: "In Ball Badminton, agility and accuracy drive the game forward.", image: Ballbadmintonbk },
    { id: 9, name: "Athletics", para: "Athletics is the pursuit of personal limits and the race against time.", image: Atheleticsbk },
  ];

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredCards = sportsCards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      {/* Pass the search term and handler to Homepage */}
      <Homepage searchValue={searchTerm} onSearchChange={handleSearchChange} />

      {/* Sports Cards Container */}
      <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <Cards key={card.id} name={card.name} para={card.para} image={card.image} />
          ))
        ) : (
          <p>No sports found.</p>
        )}
      </div>

      {/* Define Routes for each sport */}
      <Routes>
        <Route path="/Football" element={<Football />} />
        <Route path="/kabaddi" element={<Kabaddi />} />
        <Route path="/volleyball" element={<Volleyball />} />
        <Route path="/basketball" element={<Basketball />} />
        <Route path="/shuttle" element={<Shuttle />} />
        <Route path="/tabletennis" element={<Tabletennis />} />
        <Route path="/hockey" element={<Hockey />} />
        <Route path="/ballbadminton" element={<BallBadminton />} />
        <Route path="/athletics" element={<Atheletics />} />
      </Routes>
    </Router>
  );
}

export default App;
