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
      manOfTheMatch: 'Player A',
      highestRaidPlayer: 'Player B',
      highestTacklePlayer: 'Player C',
    },
    // Add more matches as needed
  ]);

  // Function to open match details popup
  const handleMatchDetails = (match) => {
    setSelectedMatch(match);
    setShowMatchPopup(true);
    setEditMode(false); // Reset edit mode
  };

  // Function to handle form input changes
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
            <input type="text" placeholder="Venue" value={newMatch.venue} onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })} /> <br />
            <input type="date" placeholder="Date" value={newMatch.date} onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })} />
            <div className="button-group">
              <button onClick={handleAddMatch}>Add Match</button>
              <button onClick={() => setShowAddPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kbscorecard;