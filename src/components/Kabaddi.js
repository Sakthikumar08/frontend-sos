import React, { useState } from 'react';
import './Sports.css';
import win1kb from './assets/kabaddiacheive/win1kb.jpg';
import win2kb from './assets/kabaddiacheive/win2kb.jpg';
import win3kb from './assets/kabaddiacheive/win3kb.jpg';
import collegeLogo1 from './assets/kabaddiacheive/sjce.logo.jpeg'; // Example logo 1
import collegeLogo2 from './assets/kabaddiacheive/sathyabama.logp.jpeg'; // Example logo 2

const Kabaddi = () => {
  const [activeTab, setActiveTab] = useState('players');
  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false); 
  const [showMatchPopup, setShowMatchPopup] = useState(false); // Popup for match details
  const [selectedMatch, setSelectedMatch] = useState(null);

  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'MSDhoni',
      role: 'Raider',
      rollNumber: 'SJCE123',
      imageUrl: 'https://th.bing.com/th/id/OIP.qsplzvWk0P-dUEVCZNNZ7gHaJQ?w=218&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7, // Player image path',
      rating: 4,
      stats: {
        matchesPlayed: 12,
        totalPoints: 45,
        raidPointsPerMatch: 5,
        successfulRaidPercentage: 60,
        superRaids: 2,
        superTens: 1,
        totalRaidPoints: 35,
        noOfSuperTackle: 3,
        highFives: 5,
        totalTacklePoints: 30,
        successfulTacklePercentage: 70,
      },
    },
    {
      id: 2,
      name: 'Suresh Raina',
      role: 'Defender',
      rollNumber: 'SJCE124',
      imageUrl: "https://th.bing.com/th/id/OIP.nyau5FUWYjJFBrIzpq3SdgHaE8?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      rating: 5,
      stats: {
        matchesPlayed: 10,
        totalPoints: 50,
        raidPointsPerMatch: 6,
        successfulRaidPercentage: 55,
        superRaids: 3,
        superTens: 1,
        totalRaidPoints: 40,
        noOfSuperTackle: 2,
        highFives: 6,
        totalTacklePoints: 35,
        successfulTacklePercentage: 75,
      },
    }
  ]);


  //-------------- Form state for the new player
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    role: '',
    rollNumber: '',
    imageUrl: '',
    rating: 1,
  });

  //----------- State for stats
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

  //------------ Function to handle input changes in the form
  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  //-------- Function to handle stats input changes
  const handleStatsChange = (e) => {
    setPlayerStats({ ...playerStats, [e.target.name]: e.target.value });
  };

  //--------- Function to submit the new player form
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

  //--------- Function to render star rating based on player's rating
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(totalStars - rating);
    return <div className="player-rating">{filledStars + emptyStars}</div>;
  };

  //-------- Function to handle stats button click
  const handleStatsClick = (player) => {
    setSelectedPlayer(player);
    setPlayerStats(player.stats);
    setShowStatsPopup(true);
  };

  //------------ Function to open the edit stats popup
  const handleEditStatsClick = () => {
    setShowEditStatsPopup(true);
  };

  //------------ Function to save the edited stats
  const handleSaveStats = () => {
    const updatedPlayers = players.map((player) =>
      player.id === selectedPlayer.id ? { ...player, stats: playerStats } : player
    );
    setPlayers(updatedPlayers);
    setShowEditStatsPopup(false);
    setShowStatsPopup(false);
  };

  //---------------- Function to delete player
  const handleDeletePlayer = () => {
    const updatedPlayers = players.filter((player) => player.id !== selectedPlayer.id);
    setPlayers(updatedPlayers);
    setShowStatsPopup(false);
    setShowEditStatsPopup(false);
    setSelectedPlayer(null);
  };

  //------------- Function to handle the key press for saving stats on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveStats();
    }
  };

  //--- Function to open match details popup
  const handleMatchDetails = (match) => {
    setSelectedMatch(match);
    setShowMatchPopup(true);
  };

  // Dummy match data
  const matches = [
    {
      id: 1,
      team1: 'College A',
      team2: 'College B',
      points1: 35,
      points2: 30,
      winner: 'College A',
      venue: 'Sports Ground A',
      date: 'October 10, 2024',
    },
    {
      id: 2,
      team1: 'College C',
      team2: 'College D',
      points1: 28,
      points2: 45,
      winner: 'College D',
      venue: 'Sports Ground B',
      date: 'October 12, 2024',
    },
  ];

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
      case 'achievements':
        return (
          <div className='acheive-img-container'>
            <div className="acheivement-container">
              <img src={win1kb} alt="winner1" className='image-acheive' />
              <div className="overlay-acheive">
                <div className="caption-acheive">The winner of PKL winner of season 2023</div>
              </div>
            </div>
            <div className="acheivement-container">
              <img src={win3kb} alt="winner2" className='image-acheive' />
              <div className="overlay-acheive">
                <div className="caption-acheive">The winner of PKL winner of season 2023</div>
              </div>
            </div>
            <div className="acheivement-container">
              <img src={win2kb} alt="winner3" className='image-acheive' />
              <div className="overlay-acheive">
                <div className="caption-acheive">The winner of PKL winner of season 2023</div>
              </div>
            </div>
          </div>
        );
      case 'scorecard':
        return (
          <div className="scorecard-container">
            {matches.map((match) => (
              <div className="scorecard-box" key={match.id}>
                <div className="team-logos">
                  <img src={collegeLogo1} alt={match.team1} className="college-logo" />
                  <span>VS</span>
                  <img src={collegeLogo2} alt={match.team2} className="college-logo" />
                </div>
                <div className="team-info">
                  <p>{match.team1}: {match.points1} points</p>
                  <p>{match.team2}: {match.points2} points</p>
                </div>
                <div className="winner-announcement">
                  <p>{match.winner} has won the match!</p>
                </div>
                <button onClick={() => handleMatchDetails(match)}>Details</button>
              </div>
            ))}
          </div>
        );
      case 'matches':
        return <div>Upcoming and Past Matches...</div>;
      default:
        return <div>Select a tab to view details.</div>;
    }
  };

  return (
    <>
      <header className="sports-head">
        <h1>KABADDI</h1>
      </header>

      <nav className="sports-navbar">
        <ul>
          <li className={activeTab === 'players' ? 'active' : ''} onClick={() => setActiveTab('players')}>Players</li>
          <li className={activeTab === 'scorecard' ? 'active' : ''} onClick={() => setActiveTab('scorecard')}>Scorecard</li>
          <li className={activeTab === 'achievements' ? 'active' : ''} onClick={() => setActiveTab('achievements')}>Achievements</li>
          <li className={activeTab === 'matches' ? 'active' : ''} onClick={() => setActiveTab('matches')}>Matches</li>
        </ul>
      </nav>

      <div className="sports-content">
        {renderContent()}
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
      <div className="stats-container">
  <div className="label-column">
    <p>Matches Played:</p>
    <p>Total Points:</p>
    <p>Raid Points Per Match:</p>
    <p>Successful Raid Percentage:</p>
    <p>Super Raids:</p>
    <p>Super 10s:</p>
    <p>Total Raid Points:</p>
    <p>No. of Super Tackles:</p>
    <p>High 5s:</p>
    <p>Total Tackle Points:</p>
    <p>Successful Tackle Percentage:</p>
  </div>
  <div className="value-column">
    <p>{playerStats.matchesPlayed}</p>
    <p>{playerStats.totalPoints}</p>
    <p>{playerStats.raidPointsPerMatch}</p>
    <p>{playerStats.successfulRaidPercentage}%</p>
    <p>{playerStats.superRaids}</p>
    <p>{playerStats.superTens}</p>
    <p>{playerStats.totalRaidPoints}</p>
    <p>{playerStats.noOfSuperTackle}</p>
    <p>{playerStats.highFives}</p>
    <p>{playerStats.totalTacklePoints}</p>
    <p>{playerStats.successfulTacklePercentage}%</p>
  </div>
</div>
      <button onClick={handleEditStatsClick}>Edit</button>
      <button onClick={() => setShowStatsPopup(false)}>Close</button>
      <button onClick={handleDeletePlayer} className="delete-button">Delete</button>
    </div>
  </div>
)}

{showEditStatsPopup && (
<div className="popup-overlay">
<div className="popup-box">
<h2>Edit Stats for {selectedPlayer.name}</h2>
<div className="edit-stats-container">
  <div className="label-column">
    <label>Matches Played:</label>
    <label>Total Points:</label>
    <label>Raid Points Per Match:</label>
    <label>Successful Raid Percentage:</label>
    <label>Super Raids:</label>
    <label>Super 10s:</label>
    <label>Total Raid Points:</label>
    <label>No. of Super Tackles:</label>
    <label>High 5s:</label>
    <label>Total Tackle Points:</label>
    <label>Successful Tackle Percentage:</label>
  </div>
  <div className="input-column">
    <input
      type="number"
      name="matchesPlayed"
      value={playerStats.matchesPlayed}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
    <input
      type="number"
      name="totalPoints"
      value={playerStats.totalPoints}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
    <input
      type="number"
      name="raidPointsPerMatch"
      value={playerStats.raidPointsPerMatch}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
    <input
      type="number"
      name="successfulRaidPercentage"
      value={playerStats.successfulRaidPercentage}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
    <input
      type="number"
      name="superRaids"
      value={playerStats.superRaids}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
    <input
      type="number"
      name="superTens"
      value={playerStats.superTens}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
    <input
      type="number"
      name="totalRaidPoints"
      value={playerStats.totalRaidPoints}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
    <input
      type="number"
      name="noOfSuperTackle"
      value={playerStats.noOfSuperTackle}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
    <input
      type="number"
      name="highFives"
      value={playerStats.highFives}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
    <input
      type="number"
      name="totalTacklePoints"
      value={playerStats.totalTacklePoints}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
    <input
      type="number"
      name="successfulTacklePercentage"
      value={playerStats.successfulTacklePercentage}
      onChange={handleStatsChange}
      onKeyPress={handleKeyPress}
    />
  </div>
</div>
<div className="button-container">
  <button onClick={handleSaveStats}>Save</button>
  <button onClick={() => setShowEditStatsPopup(false)}>Close</button>
</div>
</div>
</div>
)}

      {/* Popup for match details */}
      {showMatchPopup && selectedMatch && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Match Details</h2>
            <p><strong>{selectedMatch.team1}</strong> vs <strong>{selectedMatch.team2}</strong></p>
            <p><strong>Points:</strong> {selectedMatch.points1} - {selectedMatch.points2}</p>
            <p><strong>Winner:</strong> {selectedMatch.winner}</p>
            <p><strong>Venue:</strong> {selectedMatch.venue}</p>
            <p><strong>Date:</strong> {selectedMatch.date}</p>
            <button onClick={() => setShowMatchPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Kabaddi;
