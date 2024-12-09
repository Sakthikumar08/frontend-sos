import React, { useState } from 'react';
import './Sports.css';
import collegeLogo1 from './assets/kabaddiacheive/sjce.logo.jpeg'; // Example logo 1
import collegeLogo2 from './assets/kabaddiacheive/sathyabama.logp.jpeg'; // Example logo 2

const Kbscorecard = () => {
  const [showMatchPopup, setShowMatchPopup] = useState(false); // Popup for match details
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false); // Popup for adding a match
  const [newMatch, setNewMatch] = useState({
    team1: '',
    team2: '',
    points1: '',
    points2: '',
    winner: '',
    venue: '',
    date: '',
    firstHalf: {
      scored1: '',
      tacklePoints1: '',
      raidPoints1: '',
      allOutCount1: '',
    },
    secondHalf: {
      scored2: '',
      tacklePoints2: '',
      raidPoints2: '',
      allOutCount2: '',
    },
    manOfTheMatch: '',
    highestRaidPlayer: '',
    highestTacklePlayer: '',
  });

  const [editMode, setEditMode] = useState(false);

  // Dummy match data
  const [matches, setMatches] = useState([
    {
      id: 1,
      team1: "St. Joseph's",
      team2: 'Sathyabama',
      points1: 35,
      points2: 30,
      winner: "St. Joseph's",
      venue: 'Sports Ground A',
      date: 'October 10, 2024',
      firstHalf: {
        scored1: 20,
        tacklePoints1: 5,
        raidPoints1: 10,
        allOutCount1: 1,
      },
      
      secondHalf: {
        scored2: 15,
        tacklePoints2: 3,
        raidPoints2: 12,
        allOutCount2: 0,
      },
      manOfTheMatch: 'Sakthi',
      highestRaidPlayer: 'Kumar',
      highestTacklePlayer: 'Poovarasan',
    },
    
    
    
  ]);

  // Function to open match details popup
  const handleMatchDetails = (match) => {
    setSelectedMatch(match);
    setShowMatchPopup(true);
    setEditMode(false); // Reset edit mode
  };

  // Determine the winner for a given match
  const determineWinner = (match) => {
    if (match.team1.score > match.team2.score) return `${match.team1.name} wins the match!`;
    if (match.team1.score < match.team2.score) return `${match.team2.name} wins the match!`;
    return 'It\'s a draw!';
  };

  // Add Match
  const handleAddMatch = () => {
    if (!newMatch.team1.name || !newMatch.team1.logo || !newMatch.team2.name || !newMatch.team2.logo) {
      alert('Please fill all required fields!');
      return;
    }

    const newMatchData = {
      id: matches.length + 1,
      team1: { ...newMatch.team1 },
      team2: { ...newMatch.team2 },
    };

    setMatches([...matches, newMatchData]);
    setActivePopup(null); // Close the popup
    setNewMatch({ team1: { name: '', logo: '', score: 0 }, team2: { name: '', logo: '', score: 0 } }); // Reset form
  };

  // Edit Match
  const handleEditMatch = () => {
    const updatedMatches = matches.map((match) =>
      match.id === selectedMatch.id ? selectedMatch : match
    );
    setMatches(updatedMatches);
    setActivePopup(null); // Close popup
  };

  // Function to delete a match
  const handleDeleteMatch = () => {
    const updatedMatches = matches.filter((match) => match.id !== selectedMatch.id);
    setMatches(updatedMatches);
    setShowMatchPopup(false);
  };

  // Function to add a new match
  const handleAddMatch = () => {
    const newMatchEntry = {
      ...newMatch,
      id: matches.length + 1, // Assign a new ID
    };
    setMatches([...matches, newMatchEntry]);
    setShowAddPopup(false); // Close the add popup
    setNewMatch({ team1: '', team2: '', points1: '', points2: '', winner: '', venue: '', date: '' }); // Reset form
  };

  return (
    <div className="scorecard-container">
      {/* Matches List */}
      <div className="scorecard-grid">
        {matches.map((match) => (
          <div key={match.id} className="scorecard-box">
            <div className="team-logos">
              <img
                src={match.team1.logo}
                alt={match.team1.name}
                className="college-logo"
                onError={(e) => (e.target.src = 'fallback-logo.png')}
              />
              <img
                src={match.team2.logo}
                alt={match.team2.name}
                className="college-logo"
                onError={(e) => (e.target.src = 'fallback-logo.png')}
              />
            </div>
            <div className="team-info">
              <p>
                <strong>{match.team1.name}</strong> vs <strong>{match.team2.name}</strong>
              </p>
              <p>{match.team1.score} - {match.team2.score}</p>
            </div>
            <div className="winner-announcement">
              <p>{determineWinner(match)}</p>
            </div>
            <button className="details-button" onClick={() => { setSelectedMatch(match); setActivePopup('details'); }}>
              Details
            </button>
          </div>
        ))}
      </div>
      <button className="add-match-button" onClick={() => setActivePopup('add')}>+</button>

      {/* Popup */}
      {activePopup && (
        <div className="popup-overlay">
          <div className="popup-box match-details-popup">
            <h2>Match Details</h2>
            <div className="match-details">
              {/* First Half Section */}
              <div className="half-section">
                <h3>First Half</h3>
                <div className="team-details">
                  <div className="team-left">
                    <h4>{selectedMatch.team1}</h4>
                    <p><strong>Points Scored:</strong> <input type="number" value={selectedMatch.firstHalf.scored1} onChange={(e) => handleInputChange(e, 'firstHalf', 'scored1')} /></p>
                    <p><strong>Tackle Points:</strong> <input type="number" value={selectedMatch.firstHalf.tacklePoints1} onChange={(e) => handleInputChange(e, 'firstHalf', 'tacklePoints1')} /></p>
                    <p><strong>Raid Points:</strong> <input type="number" value={selectedMatch.firstHalf.raidPoints1} onChange={(e) => handleInputChange(e, 'firstHalf', 'raidPoints1')} /></p>
                    <p><strong>All Out Count:</strong> <input type="number" value={selectedMatch.firstHalf.allOutCount1} onChange={(e) => handleInputChange(e, 'firstHalf', 'allOutCount1')} /></p>
                  </div>
                  <div className="team-right">
                    <h4>{selectedMatch.team2}</h4>
                    <p><strong>Points Scored:</strong> <input type="number" value={selectedMatch.firstHalf.scored2} onChange={(e) => handleInputChange(e, 'firstHalf', 'scored2')} /></p>
                    <p><strong>Tackle Points:</strong> <input type="number" value={selectedMatch.firstHalf.tacklePoints2} onChange={(e) => handleInputChange(e, 'firstHalf', 'tacklePoints2')} /></p>
                    <p><strong>Raid Points:</strong> <input type="number" value={selectedMatch.firstHalf.raidPoints2} onChange={(e) => handleInputChange(e, 'firstHalf', 'raidPoints2')} /></p>
                    <p><strong>All Out Count:</strong> <input type="number" value={selectedMatch.firstHalf.allOutCount2} onChange={(e) => handleInputChange(e, 'firstHalf', 'allOutCount2')} /></p>
                  </div>
                </div>
              </div>

              {/* Second Half Section */}
              <div className="half-section">
                <h3>Second Half</h3>
                <div className="team-details">
                  <div className="team-left">
                    <h4>{selectedMatch.team1}</h4>
                    <p><strong>Points Scored:</strong> <input type="number" value={selectedMatch.secondHalf.scored1} onChange={(e) => handleInputChange(e, 'secondHalf', 'scored1')} /></p>
                    <p><strong>Tackle Points:</strong> <input type="number" value={selectedMatch.secondHalf.tacklePoints1} onChange={(e) => handleInputChange(e, 'secondHalf', 'tacklePoints1')} /></p>
                    <p><strong>Raid Points:</strong> <input type="number" value={selectedMatch.secondHalf.raidPoints1} onChange={(e) => handleInputChange(e, 'secondHalf', 'raidPoints1')} /></p>
                    <p><strong>All Out Count:</strong> <input type="number" value={selectedMatch.secondHalf.allOutCount1} onChange={(e) => handleInputChange(e, 'secondHalf', 'allOutCount1')} /></p>
                  </div>
                  <div className="team-right">
                    <h4>{selectedMatch.team2}</h4>
                    <p><strong>Points Scored:</strong> <input type="number" value={selectedMatch.secondHalf.scored2} onChange={(e) => handleInputChange(e, 'secondHalf', 'scored2')} /></p>
                    <p><strong>Tackle Points:</strong> <input type="number" value={selectedMatch.secondHalf.tacklePoints2} onChange={(e) => handleInputChange(e, 'secondHalf', 'tacklePoints2')} /></p>
                    <p><strong>Raid Points:</strong> <input type="number" value={selectedMatch.secondHalf.raidPoints2} onChange={(e) => handleInputChange(e, 'secondHalf', 'raidPoints2')} /></p>
                    <p><strong>All Out Count:</strong> <input type="number" value={selectedMatch.secondHalf.allOutCount2} onChange={(e) => handleInputChange(e, 'secondHalf', 'allOutCount2')} /></p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="additional-details">
                <p><strong>Man of the Match:</strong> <input type="text" value={selectedMatch.manOfTheMatch} onChange={(e) => handleInputChange(e, null, 'manOfTheMatch')} /></p>
                <p><strong>Highest Raid Points Player:</strong> <input type="text" value={selectedMatch.highestRaidPlayer} onChange={(e) => handleInputChange(e, null, 'highestRaidPlayer')} /></p>
                <p><strong>Highest Tackle Points Player:</strong> <input type="text" value={selectedMatch.highestTacklePlayer} onChange={(e) => handleInputChange(e, null, 'highestTacklePlayer')} /></p>
              </div>
            </div>

            <div className="button-group">
              <button onClick={handleSaveChanges}>Save</button>
              <button onClick={() => setShowMatchPopup(false)}>Close</button>
              <button onClick={handleDeleteMatch}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="popup-actions">
      <button onClick={handleEditMatch}>Save</button>
      <button onClick={() => setActivePopup(null)}>Close</button>
    </div>
  
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Kbscorecard;
