import React, { useState } from 'react';
import './Sports.css';


const Kbplayers = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false); // New state for editing stats popup
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Ms dhoni',
      role: 'Wicket Keeper',
      rollNumber: '22IT264',
      imageUrl: 'https://th.bing.com/th/id/OIP.3J8OgAVUAjVJk1jzGnzmpgHaFj?w=226&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      rating: 3,
      stats: {
        matchesPlayed: 10,
        totalPoints: 50,
        raidPointsPerMatch: 5,
        successfulRaidPercentage: 80,
        superRaids: 2,
        superTens: 3,
        totalRaidPoints: 30,
        noOfSuperTackle: 1,
        highFives: 2,
        totalTacklePoints: 20,
        successfulTacklePercentage: 75,
      },
    },
    {
      id: 2,
      name: 'Virat Kohli',
      role: 'Batsmen',
      rollNumber: '22Ec210',
      imageUrl: 'https://th.bing.com/th/id/OIP.ZHVq9HgYtGcoxU0eeDwJ8AHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      rating: 5,
      stats: {
        matchesPlayed: 8,
        totalPoints: 40,
        raidPointsPerMatch: 4,
        successfulRaidPercentage: 70,
        superRaids: 1,
        superTens: 2,
        totalRaidPoints: 20,
        noOfSuperTackle: 3,
        highFives: 1,
        totalTacklePoints: 25,
        successfulTacklePercentage: 80,
      },
    },
    {
        id: 2,
        name: 'Hardrik',
        role: 'All rounder',
        rollNumber: '22Ec333',
        imageUrl: 'data:image/jpeg;base64,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',
        rating: 3,
        stats: {
          matchesPlayed: 8,
          totalPoints: 40,
          raidPointsPerMatch: 4,
          successfulRaidPercentage: 70,
          superRaids: 1,
          superTens: 2,
          totalRaidPoints: 20,
          noOfSuperTackle: 3,
          highFives: 1,
          totalTacklePoints: 25,
          successfulTacklePercentage: 80,
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
    raidPointsPerMatch: 0,
    successfulRaidPercentage: 0,
    superRaids: 0,
    superTens: 0,
    totalRaidPoints: 0,
    noOfSuperTackle: 0,
    highFives: 0,
    totalTacklePoints: 0,
    successfulTacklePercentage: 0,
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
              <button type="submit">Add Player</button>
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
            <p>Raid Points Per Match: {playerStats.raidPointsPerMatch}</p>
            <p>Successful Raid Percentage: {playerStats.successfulRaidPercentage}%</p>
            <p>Super Raids: {playerStats.superRaids}</p>
            <p>Super 10s: {playerStats.superTens}</p>
            <p>Total Raid Points: {playerStats.totalRaidPoints}</p>
            <p>No. of Super Tackle: {playerStats.noOfSuperTackle}</p>
            <p>High 5s: {playerStats.highFives}</p>
            <p>Total Tackle Points: {playerStats.totalTacklePoints}</p>
            <p>Successful Tackle Percentage: {playerStats.successfulTacklePercentage}%</p>
            <button onClick={handleEditStatsClick}>Edit</button>
            <button onClick={() => setShowStatsPopup(false)}>Close</button>
            <button onClick={handleDeletePlayer} className="delete-button">Delete</button>
          </div>
        </div>
      )}

      {/* Edit Stats Popup */}
      {showEditStatsPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Edit Stats for {selectedPlayer.name}</h2>
            <label>
              Matches Played:
              <input
                type="number"
                name="matchesPlayed"
                value={playerStats.matchesPlayed}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br />
            <label>
              Total Points:
              <input
                type="number"
                name="totalPoints"
                value={playerStats.totalPoints}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br />
            <label>
              Raid Points Per Match:
              <input
                type="number"
                name="raidPointsPerMatch"
                value={playerStats.raidPointsPerMatch}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br />
            <label>
              Successful Raid Percentage:
              <input
                type="number"
                name="successfulRaidPercentage"
                value={playerStats.successfulRaidPercentage}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br />
            <label>
              Super Raids:
              <input
                type="number"
                name="superRaids"
                value={playerStats.superRaids}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br />
            <label>
              Super 10s:
              <input
                type="number"
                name="superTens"
                value={playerStats.superTens}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br />
            <label>
              Total Raid Points:
              <input
                type="number"
                name="totalRaidPoints"
                value={playerStats.totalRaidPoints}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br />
            <label>
              No. of Super Tackle:
              <input
                type="number"
                name="noOfSuperTackle"
                value={playerStats.noOfSuperTackle}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br />
            <label>
              High 5s:
              <input
                type="number"
                name="highFives"
                value={playerStats.highFives}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br />
            <label>
              Total Tackle Points:
              <input
                type="number"
                name="totalTacklePoints"
                value={playerStats.totalTacklePoints}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br />
            <label>
              Successful Tackle Percentage:
              <input
                type="number"
                name="successfulTacklePercentage"
                value={playerStats.successfulTacklePercentage}
                onChange={handleStatsChange}
                onKeyPress={handleKeyPress}
              />
            </label><br /> <br />
            <button onClick={handleSaveStats}>Save</button>
            <button onClick={() => setShowEditStatsPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Kbplayers;