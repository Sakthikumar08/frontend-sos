import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Sports.css';

const Basplayers = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false);
  const [players, setPlayers] = useState([]);

  const [newPlayer, setNewPlayer] = useState({
    name: '',
    position: '',
    rollNumber: '',
    imageUrl: '',
    rating: 1,
  });

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState({
    matchesPlayed: 0,
    totalPoints: 0,
    fieldGoalPercentage: 0,
    freeThrowPercentage: 0,
    pointsPerMatch: 0,
    wins: 0,
    losses: 0,
    manOfMatch: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/basplayers')
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
  axios.post('http://localhost:5000/api/basplayers', { ...newPlayer, stats: playerStats })
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

  // Handle stats button click to show stats
  
  const handleStatsClick = (player) => {
    if (player && player._id) {
      setSelectedPlayer(player);
      setPlayerStats(player.stats);
      setShowStatsPopup(true);
    } else {
      console.error("Player ID is missing");
    }
  };

  // Handle saving edited stats
 
  const handleSaveStats = () => {
    if (!selectedPlayer || !selectedPlayer._id) {
      console.error("Selected player or player ID is undefined");
      return;
    }
  
    axios.put(`http://localhost:5000/api/basplayers/${selectedPlayer._id}/stats`, playerStats)
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
  
 
  

  // Handle deleting player
  const handleDeletePlayer = () => {
    axios.delete(`http://localhost:5000/api/basplayers/${selectedPlayer._id}`)
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
              <p>Position: {player.position}</p>
              <p>Roll Number: {player.rollNumber}</p>
              {renderStars(player.rating)}
              <button onClick={() => handleStatsClick(player)}>Stats</button>
            </div>
            <img src={player.imageUrl} alt={player.name} className="player-img" />
          </div>
        ))}
      </div>

      <button className="add-match-button" onClick={() => setShowPopup(true)}>+</button>

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
                Position:
                <input type="text" name="position" value={newPlayer.position} onChange={handleChange} required />
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
              <button type="submit" style={{ marginRight: '30px' }}>Add Player</button>
              <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showStatsPopup && selectedPlayer && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>{selectedPlayer.name}'s Stats</h2>
            <p>Matches Played: {playerStats.matchesPlayed}</p>
            <p>Total Points: {playerStats.totalPoints}</p>
            <p>Field Goal Percentage: {playerStats.fieldGoalPercentage}%</p>
            <p>Free Throw Percentage: {playerStats.freeThrowPercentage}%</p>
            <p>Points Per Match: {playerStats.pointsPerMatch}</p>
            <p>Wins: {playerStats.wins}</p>
            <p>Losses: {playerStats.losses}</p>
            <p>Man of Match: {playerStats.manOfMatch}</p>
            <button onClick={() => setShowEditStatsPopup(true)}>Edit</button>
            <button onClick={() => setShowStatsPopup(false)}>Close</button>
            <button onClick={handleDeletePlayer} className="delete-button">Delete</button>
          </div>
        </div>
      )}

      {showEditStatsPopup && (
        <div className="edit-stats-popup-overlay">
          <div className="edit-stats-popup-box">
            <h2>Edit Stats for {selectedPlayer.name}</h2>
            <div className="edit-stats-form">
              <label className="edit-stats-label">
                Matches Played:
                <input type="number" name="matchesPlayed" value={playerStats.matchesPlayed} onChange={handleStatsChange}  />
              </label>
              <label className="edit-stats-label">
                Total Points:
                <input type="number" name="totalPoints" value={playerStats.totalPoints} onChange={handleStatsChange}  />
              </label>
              <label className="edit-stats-label">
                Field Goal Percentage:
                <input type="number" name="fieldGoalPercentage" value={playerStats.fieldGoalPercentage} onChange={handleStatsChange}  />
              </label>
              <label className="edit-stats-label">
                Free Throw Percentage:
                <input type="number" name="freeThrowPercentage" value={playerStats.freeThrowPercentage} onChange={handleStatsChange}  />
              </label>
              <label className="edit-stats-label">
                Points Per Match:
                <input type="number" name="pointsPerMatch" value={playerStats.pointsPerMatch} onChange={handleStatsChange}  />
              </label>
              <label className="edit-stats-label">
                Wins:
                <input type="number" name="wins" value={playerStats.wins} onChange={handleStatsChange}  />
              </label>
              <label className="edit-stats-label">
                Losses:
                <input type="number" name="losses" value={playerStats.losses} onChange={handleStatsChange}  />
              </label>
              <label className="edit-stats-label">
                Man of Match:
                <input type="number" name="manOfMatch" value={playerStats.manOfMatch} onChange={handleStatsChange}  />
              </label>
              <button onClick={handleSaveStats}>Save</button>
              <button onClick={() => setShowEditStatsPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Basplayers;
