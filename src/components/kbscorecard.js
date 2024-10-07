import React, { useState } from 'react';
import './Sports.css';
import collegeLogo1 from './assets/kabaddiacheive/sjce.logo.jpeg'; // Example logo 1
import collegeLogo2 from './assets/kabaddiacheive/sathyabama.logp.jpeg';

const Kbscorecard = () => {
  const [showMatchPopup, setShowMatchPopup] = useState(false); // Popup for match details
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Function to open match details popup
  const handleMatchDetails = (match) => {
    setSelectedMatch(match);
    setShowMatchPopup(true);
  };

  // Dummy match data
  const matches = [
    {
      id: 1,
      team1: "St. Joseph's",
      team2: 'Panimalar',
      points1: 35,
      points2: 30,
      winner: "St. Joseph's",
      venue: 'Sports Ground A',
      date: 'October 10, 2024',
    },
    {
      id: 2,
      team1: 'College C',
      team2: 'College D',
      points1: 28,
      points2: 45,
      winner: 'College D',
      venue: 'Sports Ground B',
      date: 'October 12, 2024',
    },
  ];

  return (
    <div className="scorecard-container">
      {matches.map((match) => (
        <div className="scorecard-box" key={match.id}>
          <div className="team-logos">
            <img src={collegeLogo1} alt={match.team1} className="college-logo" />
            <span>VS</span>
            <img src={collegeLogo2} alt={match.team2} className="college-logo" />
          </div>
          <div className="team-info">
            <p>{match.team1}: {match.points1} points</p>
            <p>{match.team2}: {match.points2} points</p>
          </div>
          <div className="winner-announcement">
            <p>{match.winner} has won the match!</p>
          </div>
          <button onClick={() => handleMatchDetails(match)}>Details</button>
        </div>
      ))}

      {/* Popup for match details */}
      {showMatchPopup && selectedMatch && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Match Details</h2>
            <p><strong>{selectedMatch.team1}</strong> vs <strong>{selectedMatch.team2}</strong></p>
            <p><strong>Points:</strong> {selectedMatch.points1} - {selectedMatch.points2}</p>
            <p><strong>Winner:</strong> {selectedMatch.winner}</p>
            <p><strong>Venue:</strong> {selectedMatch.venue}</p>
            <p><strong>Date:</strong> {selectedMatch.date}</p>
            <button onClick={() => setShowMatchPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kbscorecard;
