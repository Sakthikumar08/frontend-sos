import React, { useState } from 'react';
import './Sports.css';

const VbPlayers = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false); // New state for editing stats popup
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Outside Hitter',
      rollNumber: '22IT264',
      imageUrl: 'https://th.bing.com/th/id/OIP.3J8OgAVUAjVJk1jzGnzmpgHaFj?w=226&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      rating: 4,
      stats: {
        matchesPlayed: 15,
        totalPoints: 120,
        aces: 10,
        assists: 25,
        blocks: 8,
        kills: 50,
        attackPercentage: 45,
        digs: 30,
        servePercentage: 80,
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Libero',
      rollNumber: '22Ec210',
      imageUrl: 'https://th.bing.com/th/id/OIP.ZHVq9HgYtGcoxU0eeDwJ8AHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      rating: 5,
      stats: {
        matchesPlayed: 18,
        totalPoints: 95,
        aces: 15,
        assists: 20,
        blocks: 5,
        kills: 40,
        attackPercentage: 50,
        digs: 40,
        servePercentage: 85,
      },
    },
    {
      id: 3,
      name: 'Michael Lee',
      role: 'Setter',
      rollNumber: '22Ec333',
      imageUrl: 'https://th.bing.com/th/id/OIP.owQWHbp5gFuILmFzoZXvHAHaE8?rs=1&pid=ImgDetMain',
      rating: 3,
      stats: {
        matchesPlayed: 12,
        totalPoints: 85,
        aces: 5,
        assists: 40,
        blocks: 3,
        kills: 20,
        attackPercentage: 38,
        digs: 20,
        servePercentage: 75,
      },
    },
  ]);

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
    aces: 0,
    assists: 0,
    blocks: 0,
    kills: 0,
    attackPercentage: 0,
    digs: 0,
    servePercentage: 0,
  });

  // Function to handle input changes in the form
  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  // Function to handle stats input changes
  const handleStatsChange = (e) => {
    setPlayerStats({ ...playerStats, [e.target.name]: e.target.value });
  };

  // Function to submit the new player form
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayers([...players, { ...newPlayer, id: players.length + 1, stats: playerStats }]);
    setShowPopup(false); // Close the popup after adding
    setNewPlayer({
      name: '',
      role: '',
      rollNumber: '',
      imageUrl: '',
      rating: 1,
    });
  };

  // Function to render star rating based on player's rating
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(totalStars - rating);
    return <div className="player-rating">{filledStars + emptyStars}</div>;
  };

  // Function to handle stats button click
  const handleStatsClick = (player) => {
    setSelectedPlayer(player);
    setPlayerStats(player.stats);
    setShowStatsPopup(true);
  };

  // Function to open the edit stats popup
  const handleEditStatsClick = () => {
    setShowEditStatsPopup(true);
  };

  // Function to save the edited stats
  const handleSaveStats = () => {
    const updatedPlayers = players.map((player) =>
      player.id === selectedPlayer.id ? { ...player, stats: playerStats } : player
    );
    setPlayers(updatedPlayers);
    setShowEditStatsPopup(false);
    setShowStatsPopup(false);
  };

  // Function to delete player
  const handleDeletePlayer = () => {
    const updatedPlayers = players.filter((player) => player.id !== selectedPlayer.id);
    setPlayers(updatedPlayers);
    setShowStatsPopup(false);
    setShowEditStatsPopup(false);
    setSelectedPlayer(null);
  };

  // Function to handle the key press for saving stats on Enter key
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
              <button type="submit"  style={{ marginRight: '30px' }}> Add Player  </button>  
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
            <p>Total Points: {playerStats.totalPoints}</p>
            <p>Aces: {playerStats.aces}</p>
            <p>Assists: {playerStats.assists}</p>
            <p>Blocks: {playerStats.blocks}</p>
            <p>Kills: {playerStats.kills}</p>
            <p>Attack Percentage: {playerStats.attackPercentage}%</p>
            <p>Digs: {playerStats.digs}</p>
            <p>Serve Percentage: {playerStats.servePercentage}%</p>
            <button onClick={handleEditStatsClick}>Edit</button>
            <button onClick={() => setShowStatsPopup(false)}>Close</button>
            <button onClick={handleDeletePlayer} className="delete-button">Delete Player</button>
          </div>
        </div>
      )}

      {/* Edit Stats Popup */}
      {showEditStatsPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Edit {selectedPlayer.name}'s Stats</h2>
            <label>
              Matches Played:
              <input type="number" name="matchesPlayed" value={playerStats.matchesPlayed} onChange={handleStatsChange} />
            </label>
            <label>
              Total Points:
              <input type="number" name="totalPoints" value={playerStats.totalPoints} onChange={handleStatsChange} />
            </label>
            <label>
              Aces:
              <input type="number" name="aces" value={playerStats.aces} onChange={handleStatsChange} />
            </label>
            <label>
              Assists:
              <input type="number" name="assists" value={playerStats.assists} onChange={handleStatsChange} />
            </label>
            <label>
              Blocks:
              <input type="number" name="blocks" value={playerStats.blocks} onChange={handleStatsChange} />
            </label>
            <label>
              Kills:
              <input type="number" name="kills" value={playerStats.kills} onChange={handleStatsChange} />
            </label>
            <label>
              Attack Percentage:
              <input type="number" name="attackPercentage" value={playerStats.attackPercentage} onChange={handleStatsChange} />
            </label>
            <label>
              Digs:
              <input type="number" name="digs" value={playerStats.digs} onChange={handleStatsChange} />
            </label>
            <label>
              Serve Percentage:
              <input type="number" name="servePercentage" value={playerStats.servePercentage} onChange={handleStatsChange} />
            </label>
            <button type="button" onClick={handleSaveStats}>Save Stats</button>
            <button type="button" onClick={() => setShowEditStatsPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

    </>
  );
};

export default VbPlayers;
