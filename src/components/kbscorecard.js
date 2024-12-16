import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sports.css';

const Kbscorecard = () => {

  const [scorecards, setScorecards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedScorecard, setSelectedScorecard] = useState(null);
 
  const [newScorecard, setNewScorecard] = useState({
    team1: { name: '', logo: '', score: 0, stats: { firstHalf: { raid: 0, tackle: 0, allout: 0 }, secondHalf: { raid: 0, tackle: 0, allout: 0 } } },
    team2: { name: '', logo: '', score: 0, stats: { firstHalf: { raid: 0, tackle: 0, allout: 0 }, secondHalf: { raid: 0, tackle: 0, allout: 0 } } },
    date:'',
  });

  
 // Fetch scorecards
useEffect(() => {
  const fetchScorecards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/scorecards');
      if (response.data && Array.isArray(response.data)) {
        setScorecards(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setScorecards([]); // Fallback to empty array if response is unexpected
      }
    } catch (error) {
      console.error('Error fetching scorecards:', error);
      setScorecards([]); // Fallback to empty array if an error occurs
    }
  };

  fetchScorecards();
}, []);


  

  const determineWinner = (match) => {
    if (match.team1.score > match.team2.score) {
      return `${match.team1.name} wins`;
    } else if (match.team2.score > match.team1.score) {
      return `${match.team1.name} loss`;
    } else {
      return "It's a draw";
    }
  };

  const handleEditChange = (e, team, half, statType) => {
    const { value } = e.target;
    setSelectedScorecard(prev => {
      const updatedTeam = { ...prev[team] };
      updatedTeam.stats[half][statType] = Number(value);
      return { ...prev, [team]: updatedTeam };
    });
  };
  


  const handleSaveEdit = () => {
    // Make the API call to save updated scorecard
    axios
      .put(`http://localhost:5000/api/scorecards/${selectedScorecard._id}`, selectedScorecard)
      .then((response) => {
        // Update the state with the updated scorecard
        const updatedScorecards = scorecards.map((score) =>
          score._id === selectedScorecard._id ? response.data : score
        );
        setScorecards(updatedScorecards);  // Update the list of scorecards
        setShowPopup(null);  // Close the popup after saving
      })
      .catch((error) => {
        console.error('Error updating scorecard:', error);
      });
  };
  
  const handleDelete = (scorecardId) => {
    axios
      .delete(`http://localhost:5000/api/scorecards/${scorecardId}`)
      .then(() => {
        setScorecards((prevScorecards) =>
          prevScorecards.filter((scorecard) => scorecard._id !== scorecardId)
        );
        setSelectedScorecard(null); // Clear the selected scorecard if it was deleted
        setShowPopup(null); // Close the popup after deletion
      })
      .catch((error) => console.error('Error deleting scorecard:', error));
  };
  

  // Add Match
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/scorecards', { ...newScorecard })
      .then(response => {

    
    setScorecards([...scorecards, newScorecard]);
    setShowPopup(null); // Close the popup
    setNewScorecard({ team1: { name: '', logo: '', score: 0 }, team2: { name: '', logo: '', score: 0 },date:'' }); // Reset form
  })
  .catch(error => console.error("Error adding player:", error));
  }
  

  return (
    <div className="scorecard-container">
     
      <div className="scorecard-grid">
        {scorecards.map((scorecard) => (
          <div key={scorecard.id} className="scorecard-box">
            <div className="team-logos">
              <img
                src={scorecard.team1.logo}
                alt={scorecard.team1.name}
                className="college-logo"
                onError={(e) => (e.target.src = 'fallback-logo.png')}
              />
              <img
                src={scorecard.team2.logo}
                alt={scorecard.team2.name}
                className="college-logo"
                onError={(e) => (e.target.src = 'fallback-logo.png')}
              />
            </div>
            <div className="team-info">
              <p>
                <strong>{scorecard.team1.name}</strong> vs <strong>{scorecard.team2.name}</strong>
              </p>
              <p><strong>Match Date:</strong> {new Date(scorecard.date).toLocaleDateString()}</p>
              <p>{scorecard.team1.score} - {scorecard.team2.score}</p>
            </div>
            <div className="winner-announcement">
              <p>{determineWinner(scorecard)}</p>
            </div>
            <button className="details-button" onClick={() => { setSelectedScorecard(scorecard); setShowPopup('details'); }}>
              Details
            </button>
          </div>
        ))}
      </div>
      <button className="add-match-button" onClick={() => setShowPopup('add')}>+</button>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            {showPopup === 'details' && selectedScorecard && (
              <>
                 <h2>Match Details</h2>

{/* First Half Details */}
<div className="half-section">
  <h3>First Half</h3>
  <div className="team-details">
    <div className="team-left">
      <p><strong>{selectedScorecard.team1.name}</strong></p>
      <p>Score: {selectedScorecard.team1.score}</p>
      <p>Raid Points: {selectedScorecard.team1.stats.firstHalf.raid}</p>
      <p>Tackle Points: {selectedScorecard.team1.stats.firstHalf.tackle}</p>
      <p>Allout Points: {selectedScorecard.team1.stats.firstHalf.allout}</p>
    </div>
    <div className="team-right">
      <p><strong>{selectedScorecard.team2.name}</strong></p>
      <p>Score: {selectedScorecard.team2.score}</p>
      <p>Raid Points: {selectedScorecard.team2.stats.firstHalf.raid}</p>
      <p>Tackle Points: {selectedScorecard.team2.stats.firstHalf.tackle}</p>
      <p>Allout Points: {selectedScorecard.team2.stats.firstHalf.allout}</p>
    </div>
  </div>
</div>

{/* Second Half Details */}
<div className="half-section">
  <h3>Second Half</h3>
  <div className="team-details">
    <div className="team-left">
      <p><strong>{selectedScorecard.team1.name}</strong></p>
      <p>Score: {selectedScorecard.team1.score}</p>
      <p>Raid Points: {selectedScorecard.team1.stats.secondHalf.raid}</p>
      <p>Tackle Points: {selectedScorecard.team1.stats.secondHalf.tackle}</p>
      <p>Allout Points: {selectedScorecard.team1.stats.secondHalf.allout}</p>
    </div>
    <div className="team-right">
      <p><strong>{selectedScorecard.team2.name}</strong></p>
      <p>Score: {selectedScorecard.team2.score}</p>
      <p>Raid Points: {selectedScorecard.team2.stats.secondHalf.raid}</p>
      <p>Tackle Points: {selectedScorecard.team2.stats.secondHalf.tackle}</p>
      <p>Allout Points: {selectedScorecard.team2.stats.secondHalf.allout}</p>
    </div>
  </div>
</div>

                <button onClick={() => setShowPopup('edit') }>Edit</button>
                <button onClick={() => handleDelete(selectedScorecard._id)}>Delete</button>

                <button onClick={() => setShowPopup(null)}>Close</button>
              </>
            )}
           
            {showPopup === 'add' && (
              <>
                <h2>Add Match</h2>
                <input
                  type="text"
                  placeholder="Team 1 Name"
                  value={newScorecard.team1.name}
                  onChange={(e) => setNewScorecard({ ...newScorecard, team1: { ...newScorecard.team1, name: e.target.value } })}
                />
                <input
                  type="text"
                  placeholder="Team 1 Logo URL"
                  value={newScorecard.team1.logo}
                  onChange={(e) => setNewScorecard({ ...newScorecard, team1: { ...newScorecard.team1, logo: e.target.value } })}
                />
                <input
                  type="number"
                  placeholder="Team 1 score"
                  value={newScorecard.team1.score}
                  onChange={(e) => setNewScorecard({ ...newScorecard, team1: { ...newScorecard.team1, score: e.target.value } })}
                />
                <input
                  type="text"
                  placeholder="Team 2 name"
                  value={newScorecard.team2.name}
                  onChange={(e) => setNewScorecard({ ...newScorecard, team2: { ...newScorecard.team2, name: e.target.value } })}
                />
                <input
                  type="text"
                  placeholder="Team 2 Logo URL"
                  value={newScorecard.team2.logo}
                  onChange={(e) => setNewScorecard({ ...newScorecard, team2: { ...newScorecard.team2, logo: e.target.value } })}
                />
                <input
                  type="number"
                  placeholder="Team 2 score"
                  value={newScorecard.team2.score}
                  onChange={(e) => setNewScorecard({ ...newScorecard, team2: { ...newScorecard.team2, score: e.target.value } })}
                /><br></br>
                 <input
                   type="date" // Add date input
                   value={newScorecard.date}
                   onChange={(e) => setNewScorecard({ ...newScorecard, date: e.target.value })}
                /><br></br>
                <button onClick={handleSubmit}>Add Match</button>
                <button onClick={() => setShowPopup(null)}>Close </button>
              </>
            )}
         {showPopup === 'edit' && selectedScorecard && (
  <>
    <h2>Edit Match</h2>
    <div className="edit-popup-container">
      {/* First Half Team 1 */}
      <div className="team-section">
        <h3>First Half</h3>
        <h4>{selectedScorecard.team1.name}</h4>
        {['score', 'raid', 'tackle', 'allout'].map(statType => (
          <div key={statType}>
            <label>{statType.charAt(0).toUpperCase() + statType.slice(1)} Points</label>
            <input
              type="number"
              value={selectedScorecard.team1.stats.firstHalf[statType]}
              onChange={(e) =>
                handleEditChange(e, 'team1', 'firstHalf', statType)
              }
            />
          </div>
        ))}
      </div>

      {/* First Half Team 2 */}
      <div className="team-section">
        <h3>First Half</h3>
        <h4>{selectedScorecard.team2.name}</h4>
        {['score', 'raid', 'tackle', 'allout'].map(statType => (
          <div key={statType}>
            <label>{statType.charAt(0).toUpperCase() + statType.slice(1)} Points</label>
            <input
              type="number"
              value={selectedScorecard.team2.stats.firstHalf[statType]}
              onChange={(e) =>
                handleEditChange(e, 'team2', 'firstHalf', statType)
              }
            />
          </div>
        ))}
      </div>

      {/* Second Half Team 1 */}
      <div className="team-section">
        <h3>Second Half</h3>
        <h4>{selectedScorecard.team1.name}</h4>
        {['raid', 'tackle', 'allout'].map(statType => (
          <div key={statType}>
            <label>{statType.charAt(0).toUpperCase() + statType.slice(1)} Points</label>
            <input
              type="number"
              value={selectedScorecard.team1.stats.secondHalf[statType]}
              onChange={(e) =>
                handleEditChange(e, 'team1', 'secondHalf', statType)
              }
            />
          </div>
        ))}
      </div>

      {/* Second Half Team 2 */}
      <div className="team-section">
        <h3>Second Half</h3>
        <h4>{selectedScorecard.team2.name}</h4>
        {['raid', 'tackle', 'allout'].map(statType => (
          <div key={statType}>
            <label>{statType.charAt(0).toUpperCase() + statType.slice(1)} Points</label>
            <input
              type="number"
              value={selectedScorecard.team2.stats.secondHalf[statType]}
              onChange={(e) =>
                handleEditChange(e, 'team2', 'secondHalf', statType)
              }
            />
          </div>
        ))}
      </div>
    </div>

    <div className="popup-actions">
      <button onClick={handleSaveEdit}>Save</button>
      <button onClick={() => setShowPopup(null)}>Close</button>
    </div>
  </>
  )}

          </div>
        </div>
      )};
</div>
  );
};

export default Kbscorecard;
