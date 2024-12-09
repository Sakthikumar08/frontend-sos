import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Sports.css';

const Shtplayers = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false); // New state for editing stats popup
  const [players, setPlayers] = useState([]);

  // Form state for the new player
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    role: '',
    rollNumber: '',
    imageUrl: '',
    rating: 1,
  });

  // State for stats
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState({
    matchesPlayed: 0,
    totalPoints: 0,
    smashPointsPerMatch: 0,
    rallyPoints: 0,
    successfulServes: 0,
    faults: 0,
    totalSmashPoints: 0,
    successfulRallies: 0,
    netPlays: 0,
    totalRallyPoints: 0,
    successfulServePercentage: 0,
  });
   
  useEffect(() => {
    axios.get('http://localhost:5000/api/shtplayers')
      .then(response => setPlayers(response.data))
      .catch(error => console.error("Error fetching players:", error));
  }, []);

  // Function to handle input changes in the form
  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  // Function to handle stats input changes
  const handleStatsChange = (e) => {
    setPlayerStats({ ...playerStats, [e.target.name]: e.target.value });
  };

  // Handle form submission for new player
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/shtplayers', { ...newPlayer, stats: playerStats })
      .then(response => {
        setPlayers([...players, response.data]);
        setShowPopup(false);
        setNewPlayer({ name: '', role: '', rollNumber: '', imageUrl: '', rating: 1 });
      })
      .catch(error => console.error("Error adding player:", error));
  };

  // Function to render star rating based on player's rating
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
  
    axios.put(`http://localhost:5000/api/shtplayers/${selectedPlayer._id}/stats`, playerStats)
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
    axios.delete(`http://localhost:5000/api/shtplayers/${selectedPlayer._id}`)
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
              <button type="submit" style={{ marginRight: '30px' }}>Add Player</button>
              <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
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
            <p>Total Points: {playerStats.totalPoints}</p>
            <p>Smash Points Per Match: {playerStats.smashPointsPerMatch}</p>
            <p>Rally Points: {playerStats.rallyPoints}</p>
            <p>Successful Serves: {playerStats.successfulServes}</p>
            <p>Faults: {playerStats.faults}</p>
            <p>Total Smash Points: {playerStats.totalSmashPoints}</p>
            <p>Successful Rallies: {playerStats.successfulRallies}</p>
            <p>Net Plays: {playerStats.netPlays}</p>
            <p>Total Rally Points: {playerStats.totalRallyPoints}</p>
            <p>Successful Serve Percentage: {playerStats.successfulServePercentage}%</p>
            <button onClick={() => setShowEditStatsPopup(true)}>Edit</button>
            <button onClick={() => setShowStatsPopup(false)}>Close</button>
            <button onClick={handleDeletePlayer} style={{ backgroundColor: 'red' }}>Delete Player</button>
          </div>
        </div>
      )}

      {/* Edit Stats Popup */}
      {showEditStatsPopup && (
  <div className="edit-stats-popup-overlay">
    <div className="edit-stats-popup-box">
      <h2>Edit Stats for {selectedPlayer.name}</h2>
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
          Total Points:
          <input
            type="number"
            name="totalPoints"
            value={playerStats.totalPoints}
            onChange={handleStatsChange}
            
          />
        </label>

        <label className="edit-stats-label">
          Smash Points Per Match:
          <input
            type="number"
            name="smashPointsPerMatch"
            value={playerStats.smashPointsPerMatch}
            onChange={handleStatsChange}
            
          />
        </label>

        <label className="edit-stats-label">
          Rally Points:
          <input
            type="number"
            name="rallyPoints"
            value={playerStats.rallyPoints}
            onChange={handleStatsChange}
            
          />
        </label>

        <label className="edit-stats-label">
          Successful Serves:
          <input
            type="number"
            name="successfulServes"
            value={playerStats.successfulServes}
            onChange={handleStatsChange}
            
          />
        </label>

        <label className="edit-stats-label">
          Faults:
          <input
            type="number"
            name="faults"
            value={playerStats.faults}
            onChange={handleStatsChange}
            
          />
        </label>

        <label className="edit-stats-label">
          Total Smash Points:
          <input
            type="number"
            name="totalSmashPoints"
            value={playerStats.totalSmashPoints}
            onChange={handleStatsChange}
            
          />
        </label>

        <label className="edit-stats-label">
          Successful Rallies:
          <input
            type="number"
            name="successfulRallies"
            value={playerStats.successfulRallies}
            onChange={handleStatsChange}
            
          />
        </label>

        <label className="edit-stats-label">
          Net Plays:
          <input
            type="number"
            name="netPlays"
            value={playerStats.netPlays}
            onChange={handleStatsChange}
            
          />
        </label>

        <label className="edit-stats-label">
          Total Rally Points:
          <input
            type="number"
            name="totalRallyPoints"
            value={playerStats.totalRallyPoints}
            onChange={handleStatsChange}
            
          />
        </label>

        <label className="edit-stats-label">
          Successful Serve Percentage:
          <input
            type="number"
            name="successfulServePercentage"
            value={playerStats.successfulServePercentage}
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

export default Shtplayers;
