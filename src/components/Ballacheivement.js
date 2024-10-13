import React from 'react';
import './Sports.css';
import win1kb from './assets/kabaddiacheive/win1kb.jpg';
import win2kb from './assets/kabaddiacheive/win2kb.jpg';
import win3kb from './assets/kabaddiacheive/win3kb.jpg';

const Ballacheivement = () => {
    return (
        <div className='acheive-img-container'>
          <div className="acheivement-container">
            <img src={win1kb} alt="winner1" className='image-acheive' />
            <div className="overlay-acheive">
              <div className="caption-acheive">The winner of PKL winner of season 2023</div>
            </div>
          </div>
          <div className="acheivement-container">
            <img src={win3kb} alt="winner2" className='image-acheive' />
            <div className="overlay-acheive">
              <div className="caption-acheive">The winner of PKL winner of season 2023</div>
            </div>
          </div>
          <div className="acheivement-container">
            <img src={win2kb} alt="winner3" className='image-acheive' />
            <div className="overlay-acheive">
              <div className="caption-acheive">The winner of PKL winner of season 2023</div>
            </div>
          </div>
        </div>
      );

}

export default Ballacheivement
