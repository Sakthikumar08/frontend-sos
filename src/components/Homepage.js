import React from 'react';
import './Homepage.css';
import { useState } from 'react';




const Homepage = () => {
   
    const [isActive, setIsActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const searchToggle = (evt) => {
        if (!isActive) {
            setIsActive(true);
            evt.preventDefault();
        } else {
            setIsActive(false);
            setSearchValue(''); // Clear input when closing
        }
    };
    

   


  return (
   <>
     <div className='container-home'>
          <header>
            <h1 className='head-name'>Spotlight On Sports</h1>
            <div className={`search-wrapper ${isActive ? 'active' : ''}`}>
            <div className="input-holder">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="search-icon" onClick={searchToggle}>
                    <span></span>
                </button>
            </div>
            <span className="close" onClick={searchToggle}></span>
        </div>
          </header>
          <div >


          </div>
     </div>
   </>
  )
}

export default Homepage
