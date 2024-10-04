import React, { useState } from 'react';
import './Homepage.css';
import Cards from './Cards'; 
import Footballbk from './assets/Footballbk.jpg';
import Atheleticsbk from './assets/Atheticsbk.jpg';
import Ballbadmintonbk from './assets/BallBadminton.jpg';
import Basketballbk from './assets/Basketballbk.jpg';
import Hockeybk from './assets/Hockeybk.jpg';
import Kabaddibk from './assets/kabaddibk.jpg';
import Shuttlebk from './assets/Shuttlebk.jpg';
import Tabletennisbk from './assets/Tabletennis.jpg';
import Volleyballbk from './assets/Volleyballbk.jpg';

const Homepage = ({ searchValue, onSearchChange }) => {
  const [isActive, setIsActive] = useState(false);

  const searchToggle = (evt) => {
    setIsActive(!isActive);
    if (!isActive) evt.preventDefault();
  };

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

  const filteredCards = sportsCards.filter((card) =>
    card.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className="container-home">
        <header>
          <h1 className="head-name">Spotlight On Sports</h1>

          <div className={`search-wrapper ${isActive ? 'active' : ''}`}>
            <div className="input-holder">
              <input
                type="text"
                className="search-input"
                placeholder="Search sports..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)} // Update search term from App.js
              />
              <button className="search-icon" onClick={searchToggle}>
                <span></span>
              </button>
            </div>
            <span className="close" onClick={searchToggle}></span>
          </div>
        </header>
      </div>

      {/* Display Cards */}
      <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <Cards key={card.id} name={card.name} para={card.para} image={card.image} />
          ))
        ) : (
          <p>No sports found.</p>
        )}
      </div>
    </>
  );
};

export default Homepage;
