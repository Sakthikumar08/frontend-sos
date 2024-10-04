import React, { useState } from 'react';
import './Sports.css';

const Football = () => {
  const [activeTab, setActiveTab] = useState('players');
  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false);
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Attacker',
      rollNumber: '22IT264',
      imageUrl: 'https://via.placeholder.com/150',
      rating: 4,
      stats: {
        matchesPlayed: 10,
        position: 'Forward',
        goals: 15,
        footedness: 'Right',
        shotAccuracy: 78,
        tackles: 25,
        clearance: 10,
        interception: 8,
        goalsPerMatch: 1.5,
        wins: 8,
        loss: 2,
        manOfMatches: 5,
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Defender',
      rollNumber: '22IT265',
      imageUrl: 'https://via.placeholder.com/150',
      rating: 3,
      stats: {
        matchesPlayed: 8,
        position: 'Center Back',
        goals: 2,
        footedness: 'Left',
        shotAccuracy: 65,
        tackles: 30,
        clearance: 15,
        interception: 12,
        goalsPerMatch: 0.25,
        wins: 6,
        loss: 2,
        manOfMatches: 2,
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
    position: '',
    goals: 0,
    footedness: '',
    shotAccuracy: 0,
    tackles: 0,
    clearance: 0,
    interception: 0,
    goalsPerMatch: 0,
    wins: 0,
    loss: 0,
    manOfMatches: 0,
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

  // Function to save the edited stats on pressing Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveStats();
    }
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

  const renderContent = () => {
    switch (activeTab) {
      case 'players':
        return (
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
        );
      case 'scorecard':
        return <div>Scorecard details...</div>;
      case 'achievements':
        return <div>Achievements overview...</div>;
      case 'matches':
        return <div>Upcoming and Past Matches...</div>;
      default:
        return <div>Select a tab to view details.</div>;
    }
  };

  return (
    <>
      <header className="sports-head">
        <h1>FOOTBALL</h1>
      </header>

      <nav className="sports-navbar">
        <ul>
          <li className={activeTab === 'players' ? 'active' : ''} onClick={() => setActiveTab('players')}>
            Players
          </li>
          <li className={activeTab === 'scorecard' ? 'active' : ''} onClick={() => setActiveTab('scorecard')}>
            Scorecard
          </li>
          <li className={activeTab === 'achievements' ? 'active' : ''} onClick={() => setActiveTab('achievements')}>
            Achievements
          </li>
          <li className={activeTab === 'matches' ? 'active' : ''} onClick={() => setActiveTab('matches')}>
            Matches
          </li>
        </ul>
      </nav>

      <main className="sports-content">
        {renderContent()}
      </main>

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
              <label>
                Position Played:
                <input type="text" name="position" value={playerStats.position} onChange={handleStatsChange} required />
              </label>
              <label>
                Footedness:
                <input type="text" name="footedness" value={playerStats.footedness} onChange={handleStatsChange} required />
              </label>
              <button type="submit">Add Player</button>
              <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Stats Popup */}
      {showStatsPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Player Stats - {selectedPlayer?.name}</h2>
            <p>Matches Played: {playerStats.matchesPlayed}</p>
            <p>Position: {playerStats.position}</p>
            <p>Goals: {playerStats.goals}</p>
            <p>Footedness: {playerStats.footedness}</p>
            <p>Shot Accuracy: {playerStats.shotAccuracy}%</p>
            <p>Tackles: {playerStats.tackles}</p>
            <p>Clearance: {playerStats.clearance}</p>
            <p>Interception: {playerStats.interception}</p>
            <p>Goals Per Match: {playerStats.goalsPerMatch}</p>
            <p>Wins: {playerStats.wins}</p>
            <p>Loss: {playerStats.loss}</p>
            <p>Man of the Matches: {playerStats.manOfMatches}</p>

            <button onClick={handleEditStatsClick}>Edit Stats</button>
            <button onClick={handleDeletePlayer}>Delete Player</button>
            <button onClick={() => setShowStatsPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Stats Popup */}
      {showEditStatsPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Edit Stats for {selectedPlayer?.name}</h2>
            <form onKeyPress={handleKeyPress}>
              <label>
                Matches Played:
                <input type="number" name="matchesPlayed" value={playerStats.matchesPlayed} onChange={handleStatsChange} />
              </label>
              <label>
                Position Played:
                <input type="text" name="position" value={playerStats.position} onChange={handleStatsChange} />
              </label>
              <label>
                Goals:
                <input type="number" name="goals" value={playerStats.goals} onChange={handleStatsChange} />
              </label>
              <label>
                Footedness:
                <input type="text" name="footedness" value={playerStats.footedness} onChange={handleStatsChange} />
              </label>
              <label>
                Shot Accuracy:
                <input type="number" name="shotAccuracy" value={playerStats.shotAccuracy} onChange={handleStatsChange} />
              </label>
              <label>
                Tackles:
                <input type="number" name="tackles" value={playerStats.tackles} onChange={handleStatsChange} />
              </label>
              <label>
                Clearance:
                <input type="number" name="clearance" value={playerStats.clearance} onChange={handleStatsChange} />
              </label>
              <label>
                Interception:
                <input type="number" name="interception" value={playerStats.interception} onChange={handleStatsChange} />
              </label>
              <label>
                Goals Per Match:
                <input type="number" name="goalsPerMatch" value={playerStats.goalsPerMatch} onChange={handleStatsChange} />
              </label>
              <label>
                Wins:
                <input type="number" name="wins" value={playerStats.wins} onChange={handleStatsChange} />
              </label>
              <label>
                Loss:
                <input type="number" name="loss" value={playerStats.loss} onChange={handleStatsChange} />
              </label>
              <label>
                Man of the Matches:
                <input type="number" name="manOfMatches" value={playerStats.manOfMatches} onChange={handleStatsChange} />
              </label>
              <button type="button" onClick={handleSaveStats}>Save Stats</button>
              <button type="button" onClick={() => setShowEditStatsPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Football;
