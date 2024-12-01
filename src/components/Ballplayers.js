import React, { useState } from 'react';
import './Sports.css';

const Ballplayers = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false); // New state for editing stats popup
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'P.V. Sindhu',
      role: 'Player',
      rollNumber: '22IT264',
      imageUrl: 'https://example.com/pv_sindhu.jpg',
      rating: 5,
      stats: {
        matchesPlayed: 30,
        totalPoints: 150,
        smashPointsPerMatch: 10,
        rallyPoints: 60,
        successfulServes: 25,
        faults: 5,
        totalSmashPoints: 300,
        successfulRallies: 40,
        netPlays: 10,
        totalRallyPoints: 180,
        successfulServePercentage: 90,
      },
    },
    {
      id: 2,
      name: 'Saina Nehwal',
      role: 'Player',
      rollNumber: '22Ec210',
      imageUrl: 'https://example.com/saina_nehwal.jpg',
      rating: 4,
      stats: {
        matchesPlayed: 25,
        totalPoints: 130,
        smashPointsPerMatch: 8,
        rallyPoints: 50,
        successfulServes: 22,
        faults: 3,
        totalSmashPoints: 200,
        successfulRallies: 35,
        netPlays: 12,
        totalRallyPoints: 160,
        successfulServePercentage: 85,
      },
    },
    {
      id: 3,
      name: 'Kidambi Srikanth',
      role: 'Player',
      rollNumber: '22Ec333',
      imageUrl: 'https://example.com/kidambi_srikanth.jpg',
      rating: 4,
      stats: {
        matchesPlayed: 28,
        totalPoints: 140,
        smashPointsPerMatch: 9,
        rallyPoints: 55,
        successfulServes: 20,
        faults: 4,
        totalSmashPoints: 250,
        successfulRallies: 38,
        netPlays: 9,
        totalRallyPoints: 170,
        successfulServePercentage: 88,
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
            <button onClick={handleEditStatsClick}>Edit</button>
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
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Total Points:
          <input
            type="number"
            name="totalPoints"
            value={playerStats.totalPoints}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Smash Points Per Match:
          <input
            type="number"
            name="smashPointsPerMatch"
            value={playerStats.smashPointsPerMatch}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Rally Points:
          <input
            type="number"
            name="rallyPoints"
            value={playerStats.rallyPoints}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Successful Serves:
          <input
            type="number"
            name="successfulServes"
            value={playerStats.successfulServes}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Faults:
          <input
            type="number"
            name="faults"
            value={playerStats.faults}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Total Smash Points:
          <input
            type="number"
            name="totalSmashPoints"
            value={playerStats.totalSmashPoints}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Successful Rallies:
          <input
            type="number"
            name="successfulRallies"
            value={playerStats.successfulRallies}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Net Plays:
          <input
            type="number"
            name="netPlays"
            value={playerStats.netPlays}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Total Rally Points:
          <input
            type="number"
            name="totalRallyPoints"
            value={playerStats.totalRallyPoints}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Successful Serve Percentage:
          <input
            type="number"
            name="successfulServePercentage"
            value={playerStats.successfulServePercentage}
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

export default Ballplayers;
