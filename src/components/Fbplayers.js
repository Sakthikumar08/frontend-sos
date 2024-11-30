import React, { useState } from 'react';
import './Sports.css';

const Fbplayers = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false);
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Lionel Messi',
      role: 'Forward',
      rollNumber: '22IT264',
      imageUrl: 'https://th.bing.com/th/id/OIP.3J8OgAVUAjVJk1jzGnzmpgHaFj?w=226&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      rating: 5,
      stats: {
        matchesPlayed: 20,
        goals: 15,
        assists: 10,
        passesCompleted: 200,
        successfulPassPercentage: 85,
        tackles: 5,
        interceptions: 3,
        shotsOnTarget: 30,
        cleanSheets: 0,
        yellowCards: 2,
        redCards: 0,
      },
    },
    {
      id: 2,
      name: 'Cristiano Ronaldo',
      role: 'Forward',
      rollNumber: '22EC210',
      imageUrl: 'https://th.bing.com/th/id/OIP.ZHVq9HgYtGcoxU0eeDwJ8AHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      rating: 5,
      stats: {
        matchesPlayed: 18,
        goals: 14,
        assists: 8,
        passesCompleted: 180,
        successfulPassPercentage: 80,
        tackles: 4,
        interceptions: 2,
        shotsOnTarget: 25,
        cleanSheets: 0,
        yellowCards: 1,
        redCards: 0,
      },
    },
    {
      id: 3,
      name: 'Kevin De Bruyne',
      role: 'Midfielder',
      rollNumber: '22EC333',
      imageUrl: 'https://th.bing.com/th/id/OIP.owQWHbp5gFuILmFzoZXvHAHaE8?rs=1&pid=ImgDetMain',
      rating: 5,
      stats: {
        matchesPlayed: 15,
        goals: 8,
        assists: 12,
        passesCompleted: 250,
        successfulPassPercentage: 90,
        tackles: 6,
        interceptions: 4,
        shotsOnTarget: 10,
        cleanSheets: 0,
        yellowCards: 0,
        redCards: 0,
      },
    },
  ]);

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

  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  const handleStatsChange = (e) => {
    setPlayerStats({ ...playerStats, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayers([...players, { ...newPlayer, id: players.length + 1, stats: playerStats }]);
    setShowPopup(false);
    setNewPlayer({
      name: '',
      role: '',
      rollNumber: '',
      imageUrl: '',
      rating: 1,
    });
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(totalStars - rating);
    return <div className="player-rating">{filledStars + emptyStars}</div>;
  };

  const handleStatsClick = (player) => {
    setSelectedPlayer(player);
    setPlayerStats(player.stats);
    setShowStatsPopup(true);
  };

  const handleEditStatsClick = () => {
    setShowEditStatsPopup(true);
  };

  const handleSaveStats = () => {
    const updatedPlayers = players.map((player) =>
      player.id === selectedPlayer.id ? { ...player, stats: playerStats } : player
    );
    setPlayers(updatedPlayers);
    setShowEditStatsPopup(false);
    setShowStatsPopup(false);
  };

  const handleDeletePlayer = () => {
    const updatedPlayers = players.filter((player) => player.id !== selectedPlayer.id);
    setPlayers(updatedPlayers);
    setShowStatsPopup(false);
    setShowEditStatsPopup(false);
    setSelectedPlayer(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveStats();
    }
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
      <button className="add-button" onClick={() => setShowPopup(true)}>+</button>

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
            <button onClick={handleEditStatsClick}>Edit</button>
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
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Goals:
          <input
            type="number"
            name="goals"
            value={playerStats.goals}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Assists:
          <input
            type="number"
            name="assists"
            value={playerStats.assists}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Tackles:
          <input
            type="number"
            name="tackles"
            value={playerStats.tackles}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Interceptions:
          <input
            type="number"
            name="interceptions"
            value={playerStats.interceptions}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Clean Sheets:
          <input
            type="number"
            name="cleanSheets"
            value={playerStats.cleanSheets}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Shots on Target:
          <input
            type="number"
            name="shotsOnTarget"
            value={playerStats.shotsOnTarget}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Yellow Cards:
          <input
            type="number"
            name="yellowCards"
            value={playerStats.yellowCards}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Red Cards:
          <input
            type="number"
            name="redCards"
            value={playerStats.redCards}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
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
