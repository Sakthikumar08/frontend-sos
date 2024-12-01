import React, { useState } from 'react';
import './Sports.css';
import collegeLogo1 from './assets/kabaddiacheive/sjce.logo.jpeg'; // Example logo 1
import collegeLogo2 from './assets/kabaddiacheive/sathyabama.logp.jpeg'; // Example logo 2

const Ballscorecard = () => {
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
    player1: '',
    player2: '',
    firstHalf: { scored1: '', scored2: '' },
    secondHalf: { scored1: '', scored2: '' },
    winnerPlayer: '',
  });

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
      player1: 'Player A',
      player2: 'Player B',
      firstHalf: { scored1: 20, scored2: 15 },
      secondHalf: { scored1: 15, scored2: 15 },
      winnerPlayer: 'Player A',
    },
    // Add more matches as needed
  ]);

  // Function to open match details popup
  const handleMatchDetails = (match) => {
    setSelectedMatch(match);
    setShowMatchPopup(true);
  };

  // Function to handle input changes
  const handleInputChange = (e, half, field) => {
    const { value } = e.target;
    if (half === 'firstHalf') {
      setSelectedMatch((prev) => ({
        ...prev,
        firstHalf: { ...prev.firstHalf, [field]: value },
      }));
    } else if (half === 'secondHalf') {
      setSelectedMatch((prev) => ({
        ...prev,
        secondHalf: { ...prev.secondHalf, [field]: value },
      }));
    } else {
      setSelectedMatch((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Function to save changes
  const handleSaveChanges = () => {
    const updatedMatches = matches.map((match) =>
      match.id === selectedMatch.id ? selectedMatch : match
    );
    setMatches(updatedMatches);
    setShowMatchPopup(false);
  };

  // Function to delete a match
  const handleDeleteMatch = () => {
    const updatedMatches = matches.filter((match) => match.id !== selectedMatch.id);
    setMatches(updatedMatches);
    setShowMatchPopup(false);
  };

  // Function to add a new match
  const handleAddMatch = () => {
    const newMatchEntry = { ...newMatch, id: matches.length + 1 };
    setMatches([...matches, newMatchEntry]);
    setShowAddPopup(false);
    setNewMatch({
      team1: '',
      team2: '',
      points1: '',
      points2: '',
      winner: '',
      venue: '',
      date: '',
      player1: '',
      player2: '',
    });
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
                  <div className="team-left">
                    <h4>{selectedMatch.team1}</h4>
                    <p><strong>Player:</strong> {selectedMatch.player1}</p>
                    <p><strong>Points Scored:</strong> 
                      <input 
                        type="number" 
                        value={selectedMatch.firstHalf.scored1} 
                        onChange={(e) => handleInputChange(e, 'firstHalf', 'scored1')} />
                    </p>
                  </div>
                  <div className="team-right">
                    <h4>{selectedMatch.team2}</h4>
                    <p><strong>Player:</strong> {selectedMatch.player2}</p>
                    <p><strong>Points Scored:</strong> 
                      <input 
                        type="number" 
                        value={selectedMatch.firstHalf.scored2} 
                        onChange={(e) => handleInputChange(e, 'firstHalf', 'scored2')} />
                    </p>
                  </div>
                </div>
              </div>

              {/* Second Half Section */}
              <div className="half-section">
                <h3>Second Half</h3>
                <div className="team-details">
                  <div className="team-left">
                    <h4>{selectedMatch.team1}</h4>
                    <p><strong>Player:</strong> {selectedMatch.player1}</p>
                    <p><strong>Points Scored:</strong> 
                      <input 
                        type="number" 
                        value={selectedMatch.secondHalf.scored1} 
                        onChange={(e) => handleInputChange(e, 'secondHalf', 'scored1')} />
                    </p>
                  </div>
                  <div className="team-right">
                    <h4>{selectedMatch.team2}</h4>
                    <p><strong>Player:</strong> {selectedMatch.player2}</p>
                    <p><strong>Points Scored:</strong> 
                      <input 
                        type="number" 
                        value={selectedMatch.secondHalf.scored2} 
                        onChange={(e) => handleInputChange(e, 'secondHalf', 'scored2')} />
                    </p>
                  </div>
                </div>
              </div>

              {/* Winner Section */}
              <div className="winner-details">
                <p><strong>Winner:</strong> {selectedMatch.winner}</p>
                <p><strong>Winner Player:</strong> {selectedMatch.winnerPlayer}</p>
              </div>
            </div>

            <div className="button-group">
              <button onClick={handleSaveChanges}>Save</button>
              <button onClick={() => setShowMatchPopup(false)}>Close</button>
              <button onClick={handleDeleteMatch}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Match Popup */}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Add Match</h2>
            <input type="text" placeholder="Team 1" value={newMatch.team1} onChange={(e) => setNewMatch({ ...newMatch, team1: e.target.value })} />
            <input type="text" placeholder="Team 2" value={newMatch.team2} onChange={(e) => setNewMatch({ ...newMatch, team2: e.target.value })} />
            <input type="number" placeholder="Points Team 1" value={newMatch.points1} onChange={(e) => setNewMatch({ ...newMatch, points1: e.target.value })} />
            <input type="number" placeholder="Points Team 2" value={newMatch.points2} onChange={(e) => setNewMatch({ ...newMatch, points2: e.target.value })} />
            <input type="text" placeholder="Winner" value={newMatch.winner} onChange={(e) => setNewMatch({ ...newMatch, winner: e.target.value })} />
            <input type="text" placeholder="Player 1" value={newMatch.player1} onChange={(e) => setNewMatch({ ...newMatch, player1: e.target.value })} />
            <input type="text" placeholder="Player 2" value={newMatch.player2} onChange={(e) => setNewMatch({ ...newMatch, player2: e.target.value })} />
            <input type="text" placeholder="Winner Player" value={newMatch.winnerPlayer} onChange={(e) => setNewMatch({ ...newMatch, winnerPlayer: e.target.value })} />
            <input type="text" placeholder="Venue" value={newMatch.venue} onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })} />
            <input type="date" value={newMatch.date} onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })} />
            <button onClick={handleAddMatch}>Add Match</button>
            <button onClick={() => setShowAddPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ballscorecard;
