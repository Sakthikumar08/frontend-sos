import React, { useState } from 'react';
import './Sports.css';


const Shtplayers = () => {

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
        imageUrl: 'https://th.bing.com/th/id/OIP.owQWHbp5gFuILmFzoZXvHAHaE8?rs=1&pid=ImgDetMain',
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
          Raid Points Per Match:
          <input
            type="number"
            name="raidPointsPerMatch"
            value={playerStats.raidPointsPerMatch}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Successful Raid Percentage:
          <input
            type="number"
            name="successfulRaidPercentage"
            value={playerStats.successfulRaidPercentage}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Super Raids:
          <input
            type="number"
            name="superRaids"
            value={playerStats.superRaids}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Super 10s:
          <input
            type="number"
            name="superTens"
            value={playerStats.superTens}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Total Raid Points:
          <input
            type="number"
            name="totalRaidPoints"
            value={playerStats.totalRaidPoints}
            onChange={handleStatsChange} 
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          No. of Super Tackle:
          <input
            type="number"
            name="noOfSuperTackle"
            value={playerStats.noOfSuperTackle}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          High 5s:
          <input
            type="number"
            name="highFives"
            value={playerStats.highFives}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Total Tackle Points:
          <input
            type="number"
            name="totalTacklePoints"
            value={playerStats.totalTacklePoints}
            onChange={handleStatsChange}
            onKeyPress={handleKeyPress}
          />
        </label>

        <label className="edit-stats-label">
          Successful Tackle Percentage:
          <input
            type="number"
            name="successfulTacklePercentage"
            value={playerStats.successfulTacklePercentage}
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

export default Shtplayers;