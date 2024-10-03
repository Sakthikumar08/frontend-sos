import React from 'react';
import './Homepage.css';

const Homepage = ({ searchValue, onSearchChange }) => {
  // Toggle Search Bar (optional functionality)
  const [isActive, setIsActive] = React.useState(false);

  const searchToggle = (evt) => {
    setIsActive(!isActive);
    if (!isActive) evt.preventDefault();
  };

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
                onChange={(e) => onSearchChange(e.target.value)} // Pass search input change to App.js
              />
              <button className="search-icon" onClick={searchToggle}>
                <span></span>
              </button>
            </div>
            <span className="close" onClick={searchToggle}></span>
          </div>
        </header>
      </div>
    </>
  );
};

export default Homepage;
