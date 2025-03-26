import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Sports.css';

const Fbplayers = () => {
  const API_URL = "https://backend-spotligth-on-sports.onrender.com";
  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false);
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    
      name: '',
      role: '',
      rollNumber: '',
      imageUrl: '',
      rating: 1,
  });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState({
    
        matchesPlayed: 0,
        goals: 0,
        assists: 0,
        passesCompleted: 0,
        successfulPassPercentage: 0,
        tackles: 0,
        interceptions: 0,
        shotsOnTarget: 0,
        cleanSheets: 0,
        yellowCards: 0,
        redCards: 0,
});
useEffect(() => {
  axios.get(`${API_URL}/api/fbplayers`)
    .then(response => setPlayers(response.data))
    .catch(error => console.error("Error fetching players:", error));
}, []);
    
  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  const handleStatsChange = (e) => {
    setPlayerStats({ ...playerStats, [e.target.name]: e.target.value });
  };

 // Handle form submission for new player
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/fbplayers`, { ...newPlayer, stats: playerStats })
      .then(response => {
        setPlayers([...players, response.data]);
        setShowPopup(false);
        setNewPlayer({ name: '', role: '', rollNumber: '', imageUrl: '', rating: 1 });
      })
      .catch(error => console.error("Error adding player:", error));
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(totalStars - rating);
    return <div className="player-rating">{filledStars + emptyStars}</div>;
  };

  const handleStatsClick = (player) => {
    if (player && player._id) {
      setSelectedPlayer(player);
      setPlayerStats(player.stats);
      setShowStatsPopup(true);
    } else {
      console.error("Player ID is missing");
    }
  };

  const handleSaveStats = () => {
    if (!selectedPlayer || !selectedPlayer._id) {
      console.error("Selected player or player ID is undefined");
      return;
    }

    axios.put(`${API_URL}/api/fbplayers/${selectedPlayer._id}/stats`, playerStats)
    .then(response => {
      const updatedPlayers = players.map(player =>
        player._id === selectedPlayer._id ? { ...player, stats: playerStats } : player
      );
      setPlayers(updatedPlayers);
      setShowEditStatsPopup(false);
      setShowStatsPopup(false);
    })
    .catch(error => console.error("Error saving stats:", error));
};

const handleDeletePlayer = () => {
  axios.delete(`${API_URL}/api/fbplayers/${selectedPlayer._id}`)
    .then(() => {
      setPlayers(players.filter(player => player._id !== selectedPlayer._id));
      setShowStatsPopup(false);
      setShowEditStatsPopup(false);
      setSelectedPlayer(null);
    })
    .catch(error => console.error("Error deleting player:", error));
};


  return (
    <>
      <div className="player-container">
        {players.map((player) => (
          <div className="player-box" key={player.id}>
            <div className="player-info">
              <h3>{player.name}</h3>
              <p>Role: {player.role}</p>
              <p>Roll Number: {player.rollNumber}</p>
              {renderStars(player.rating)}
              <button onClick={() => handleStatsClick(player)}>Stats</button>
            </div>
            <img src={player.imageUrl} alt={player.name} className="player-img" />
          </div>
        ))}
      </div>

      {/* Add Symbol */}
      <button className="add-match-button" onClick={() => setShowPopup(true)}>+</button>

      {/* Popup Form */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Add New Player</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={newPlayer.name} onChange={handleChange} required />
              </label>
              <label>
                Role:
                <input type="text" name="role" value={newPlayer.role} onChange={handleChange} required />
              </label>
              <label>
                Roll Number:
                <input type="text" name="rollNumber" value={newPlayer.rollNumber} onChange={handleChange} required />
              </label>
              <label>
                Image URL:
                <input type="text" name="imageUrl" value={newPlayer.imageUrl} onChange={handleChange} required />
              </label>
              <label>
                Rating:
                <input type="number" name="rating" value={newPlayer.rating} onChange={handleChange} min="1" max="5" required />
              </label>
              <button type="submit" style={{ marginRight: '30px' }}> Add Player </button>
              <button type="button" onClick={() => setShowPopup(false)}> Cancel </button>
            </form>
          </div>
        </div>
      )}

      {/* Stats Popup */}
      {showStatsPopup && selectedPlayer && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>{selectedPlayer.name}'s Stats</h2>
            <p>Matches Played: {playerStats.matchesPlayed}</p>
            <p>Goals: {playerStats.goals}</p>
            <p>Assists: {playerStats.assists}</p>
            <p>Passes Completed: {playerStats.passesCompleted}</p>
            <p>Successful Pass Percentage: {playerStats.successfulPassPercentage}%</p>
            <p>Tackles: {playerStats.tackles}</p>
            <p>Interceptions: {playerStats.interceptions}</p>
            <p>Shots on Target: {playerStats.shotsOnTarget}</p>
            <p>Clean Sheets: {playerStats.cleanSheets}</p>
            <p>Yellow Cards: {playerStats.yellowCards}</p>
            <p>Red Cards: {playerStats.redCards}</p>
            <button onClick={() => setShowEditStatsPopup(true)}>Edit</button>
            <button onClick={() => setShowStatsPopup(false)}>Close</button>
            <button onClick={handleDeletePlayer} className="delete-button">Delete</button>
          </div>
        </div>
      )}

      {/* Edit Stats Popup */}
      {showEditStatsPopup && (
  <div className="edit-stats-popup-overlay">
    <div className="edit-stats-popup-box">
      <h2>Edit Football Stats for {selectedPlayer.name}</h2>
      <div className="edit-stats-form">
        <label className="edit-stats-label">
          Matches Played:
          <input
            type="number"
            name="matchesPlayed"
            value={playerStats.matchesPlayed}
            onChange={handleStatsChange}
         
          />
        </label>

        <label className="edit-stats-label">
          Goals:
          <input
            type="number"
            name="goals"
            value={playerStats.goals}
            onChange={handleStatsChange}
           
          />
        </label>

        <label className="edit-stats-label">
          Assists:
          <input
            type="number"
            name="assists"
            value={playerStats.assists}
            onChange={handleStatsChange}
          
          />
        </label>

        <label className="edit-stats-label">
          Tackles:
          <input
            type="number"
            name="tackles"
            value={playerStats.tackles}
            onChange={handleStatsChange}
           
          />
        </label>

        <label className="edit-stats-label">
          Interceptions:
          <input
            type="number"
            name="interceptions"
            value={playerStats.interceptions}
            onChange={handleStatsChange}
          
          />
        </label>

        <label className="edit-stats-label">
          Clean Sheets:
          <input
            type="number"
            name="cleanSheets"
            value={playerStats.cleanSheets}
            onChange={handleStatsChange}
           
          />
        </label>

        <label className="edit-stats-label">
          Shots on Target:
          <input
            type="number"
            name="shotsOnTarget"
            value={playerStats.shotsOnTarget}
            onChange={handleStatsChange}
          
          />
        </label>

        <label className="edit-stats-label">
          Yellow Cards:
          <input
            type="number"
            name="yellowCards"
            value={playerStats.yellowCards}
            onChange={handleStatsChange}
          
          />
        </label>

        <label className="edit-stats-label">
          Red Cards:
          <input
            type="number"
            name="redCards"
            value={playerStats.redCards}
            onChange={handleStatsChange}
           
          />
        </label>
      </div>

      <div className="edit-stats-buttons">
        <button onClick={handleSaveStats}>Save</button>
        <button onClick={() => setShowEditStatsPopup(false)}>Close</button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Fbplayers;
