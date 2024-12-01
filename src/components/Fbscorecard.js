import React, { useState } from 'react';
import './Sports.css';
import collegeLogo1 from './assets/kabaddiacheive/sjce.logo.jpeg'; // Example logo 1
import collegeLogo2 from './assets/kabaddiacheive/sathyabama.logp.jpeg'; // Example logo 2

const Fbscorecard = () => {
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
      goals1: '',
      player1: '',
      goals2: '',
      player2: '',
    },
    secondHalf: {
      goals1: '',
      player1: '',
      goals2: '',
      player2: '',
    },
    manOfTheMatch: '',
  });

  // Dummy match data
  const [matches, setMatches] = useState([
    {
      id: 1,
      team1: "St. Joseph's",
      team2: 'Sathyabama',
      points1: 5,
      points2: 3,
      winner: "St. Joseph's",
      venue: 'Sports Ground A',
      date: 'October 10, 2024',
      firstHalf: {
        goals1: 3,
        player1: 'Player A',
        goals2: 2,
        player2: 'Player B',
      },
      secondHalf: {
        goals1: 2,
        player1: 'Player C',
        goals2: 1,
        player2: 'Player D',
      },
      manOfTheMatch: 'Player A',
    },
    // Add more matches as needed
  ]);

  // Function to open match details popup
  const handleMatchDetails = (match) => {
    setSelectedMatch(match);
    setShowMatchPopup(true);
  };

  // Function to handle form input changes
  const handleInputChange = (e, half, field) => {
    const { value } = e.target;
    setSelectedMatch((prev) => ({
      ...prev,
      [half]: { ...prev[half], [field]: value },
    }));
  };

  // Function to save changes
  const handleSaveChanges = () => {
    const updatedMatches = matches.map((match) =>
      match.id === selectedMatch.id ? selectedMatch : match
    );
    setMatches(updatedMatches);
    setShowMatchPopup(false);
  };

  // Function to delete match
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
    setNewMatch({
      team1: '',
      team2: '',
      points1: '',
      points2: '',
      winner: '',
      venue: '',
      date: '',
      firstHalf: { goals1: '', player1: '', goals2: '', player2: '' },
      secondHalf: { goals1: '', player1: '', goals2: '', player2: '' },
      manOfTheMatch: '',
    }); // Reset form
  };

  return (
    <div className="scorecard-container">
      <div className="scorecard-grid">
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
      </div>

      {/* Add Match Button */}
      <button className="add-match-button" onClick={() => setShowAddPopup(true)}>+</button>

      {/* Popup for match details */}
      {showMatchPopup && selectedMatch && (
        <div className="popup-overlay">
          <div className="popup-box match-details-popup">
            <h2>Match Details</h2>
            <div className="match-details">
              {/* First Half Section */}
              <div className="half-section">
                <h3>First Half</h3>
                <div className="team-details">
                  <div>
                    <h4>{selectedMatch.team1}</h4>
                    <p>
                      <strong>Goals:</strong>{' '}
                      <input
                        type="number"
                        value={selectedMatch.firstHalf.goals1}
                        onChange={(e) => handleInputChange(e, 'firstHalf', 'goals1')}
                      />
                    </p>
                    <p>
                      <strong>Player:</strong>{' '}
                      <input
                        type="text"
                        value={selectedMatch.firstHalf.player1}
                        onChange={(e) => handleInputChange(e, 'firstHalf', 'player1')}
                      />
                    </p>
                  </div>
                  <div>
                    <h4>{selectedMatch.team2}</h4>
                    <p>
                      <strong>Goals:</strong>{' '}
                      <input
                        type="number"
                        value={selectedMatch.firstHalf.goals2}
                        onChange={(e) => handleInputChange(e, 'firstHalf', 'goals2')}
                      />
                    </p>
                    <p>
                      <strong>Player:</strong>{' '}
                      <input
                        type="text"
                        value={selectedMatch.firstHalf.player2}
                        onChange={(e) => handleInputChange(e, 'firstHalf', 'player2')}
                      />
                    </p>
                  </div>
                </div>
              </div>

              {/* Second Half Section */}
              <div className="half-section">
                <h3>Second Half</h3>
                <div className="team-details">
                  <div>
                    <h4>{selectedMatch.team1}</h4>
                    <p>
                      <strong>Goals:</strong>{' '}
                      <input
                        type="number"
                        value={selectedMatch.secondHalf.goals1}
                        onChange={(e) => handleInputChange(e, 'secondHalf', 'goals1')}
                      />
                    </p>
                    <p>
                      <strong>Player:</strong>{' '}
                      <input
                        type="text"
                        value={selectedMatch.secondHalf.player1}
                        onChange={(e) => handleInputChange(e, 'secondHalf', 'player1')}
                      />
                    </p>
                  </div>
                  <div>
                    <h4>{selectedMatch.team2}</h4>
                    <p>
                      <strong>Goals:</strong>{' '}
                      <input
                        type="number"
                        value={selectedMatch.secondHalf.goals2}
                        onChange={(e) => handleInputChange(e, 'secondHalf', 'goals2')}
                      />
                    </p>
                    <p>
                      <strong>Player:</strong>{' '}
                      <input
                        type="text"
                        value={selectedMatch.secondHalf.player2}
                        onChange={(e) => handleInputChange(e, 'secondHalf', 'player2')}
                      />
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="additional-details">
                <p>
                  <strong>Man of the Match:</strong>{' '}
                  <input
                    type="text"
                    value={selectedMatch.manOfTheMatch}
                    onChange={(e) => handleInputChange(e, null, 'manOfTheMatch')}
                  />
                </p>
              </div>
            </div>

            <div className="button-group">
              <button onClick={handleSaveChanges}>Save</button>
              <button onClick={handleDeleteMatch}>Delete</button>
              <button onClick={() => setShowMatchPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Match Popup */}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Add Match</h2>
            <input
              type="text"
              placeholder="Team 1"
              value={newMatch.team1}
              onChange={(e) => setNewMatch({ ...newMatch, team1: e.target.value })}
            />
            <input
              type="text"
              placeholder="Team 2"
              value={newMatch.team2}
              onChange={(e) => setNewMatch({ ...newMatch, team2: e.target.value })}
            />
            <input
              type="number"
              placeholder="Points for Team 1"
              value={newMatch.points1}
              onChange={(e) => setNewMatch({ ...newMatch, points1: e.target.value })}
            />
            <input
              type="number"
              placeholder="Points for Team 2"
              value={newMatch.points2}
              onChange={(e) => setNewMatch({ ...newMatch, points2: e.target.value })}
            />
            <button onClick={handleAddMatch}>Add Match</button>
            <button onClick={() => setShowAddPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fbscorecard;
