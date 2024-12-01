import React, { useState } from 'react';
import './Sports.css';

const Basplayers = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false);
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Ms dhoni',
      position: 'Shooting Guard',
      rollNumber: '22IT264',
      imageUrl: 'https://th.bing.com/th/id/OIP.3J8OgAVUAjVJk1jzGnzmpgHaFj?w=226&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      rating: 3,
      stats: {
        matchesPlayed: 10,
        totalPoints: 500,
        fieldGoalPercentage: 45,
        freeThrowPercentage: 75,
        pointsPerMatch: 50,
        wins: 6,
        losses: 4,
        manOfMatch: 2,
      },
    },
    {
      id: 2,
      name: 'Virat Kohli',
      position: 'Point Guard',
      rollNumber: '22Ec210',
      imageUrl: 'https://th.bing.com/th/id/OIP.ZHVq9HgYtGcoxU0eeDwJ8AHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      rating: 5,
      stats: {
        matchesPlayed: 8,
        totalPoints: 400,
        fieldGoalPercentage: 50,
        freeThrowPercentage: 80,
        pointsPerMatch: 50,
        wins: 5,
        losses: 3,
        manOfMatch: 3,
      },
    },
    {
      id: 3,
      name: 'Hardik Pandya',
      position: 'Small Forward',
      rollNumber: '22Ec333',
      imageUrl: 'https://th.bing.com/th/id/OIP.owQWHbp5gFuILmFzoZXvHAHaE8?rs=1&pid=ImgDetMain',
      rating: 4,
      stats: {
        matchesPlayed: 12,
        totalPoints: 350,
        fieldGoalPercentage: 47,
        freeThrowPercentage: 78,
        pointsPerMatch: 29,
        wins: 7,
        losses: 5,
        manOfMatch: 1,
      },
    },
  ]);

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
      position: '',
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
              <p>Position: {player.position}</p>
              <p>Roll Number: {player.rollNumber}</p>
              {renderStars(player.rating)}
              <button onClick={() => handleStatsClick(player)}>Stats</button>
            </div>
            <img src={player.imageUrl} alt={player.name} className="player-img" />
          </div>
        ))}
      </div>

      <button className="add-button" onClick={() => setShowPopup(true)}>+</button>

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
            <button onClick={handleEditStatsClick}>Edit</button>
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
                <input type="number" name="matchesPlayed" value={playerStats.matchesPlayed} onChange={handleStatsChange} onKeyPress={handleKeyPress} />
              </label>
              <label className="edit-stats-label">
                Total Points:
                <input type="number" name="totalPoints" value={playerStats.totalPoints} onChange={handleStatsChange} onKeyPress={handleKeyPress} />
              </label>
              <label className="edit-stats-label">
                Field Goal Percentage:
                <input type="number" name="fieldGoalPercentage" value={playerStats.fieldGoalPercentage} onChange={handleStatsChange} onKeyPress={handleKeyPress} />
              </label>
              <label className="edit-stats-label">
                Free Throw Percentage:
                <input type="number" name="freeThrowPercentage" value={playerStats.freeThrowPercentage} onChange={handleStatsChange} onKeyPress={handleKeyPress} />
              </label>
              <label className="edit-stats-label">
                Points Per Match:
                <input type="number" name="pointsPerMatch" value={playerStats.pointsPerMatch} onChange={handleStatsChange} onKeyPress={handleKeyPress} />
              </label>
              <label className="edit-stats-label">
                Wins:
                <input type="number" name="wins" value={playerStats.wins} onChange={handleStatsChange} onKeyPress={handleKeyPress} />
              </label>
              <label className="edit-stats-label">
                Losses:
                <input type="number" name="losses" value={playerStats.losses} onChange={handleStatsChange} onKeyPress={handleKeyPress} />
              </label>
              <label className="edit-stats-label">
                Man of Match:
                <input type="number" name="manOfMatch" value={playerStats.manOfMatch} onChange={handleStatsChange} onKeyPress={handleKeyPress} />
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
