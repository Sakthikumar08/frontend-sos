import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Sports.css';
const Kbplayers = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
const [showEditDetailsPopup, setShowEditDetailsPopup] = useState(false);


  const [showEditStatsPopup, setShowEditStatsPopup] = useState(false); 
  const [players, setPlayers] = useState([]);
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


  const [playerDetails, setPlayerDetails] = useState({
    fullName: "",
    dateOfBirth: "",
    academicYear: "",
    quota: "",
    bloodGroup: "",
    height: "",
    weight: "",
    strength: "",
    contactNumber: "",
    email: "",
    department: "",
    address: "",
  });
  useEffect(() => {
    axios.get('http://localhost:5000/api/players')
      .then(response => setPlayers(response.data))
      .catch(error => console.error("Error fetching players:", error));
  }, []);

  // Handle changes for form inputs
  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  // Handle stats changes
  const handleStatsChange = (e) => {
    setPlayerStats({ ...playerStats, [e.target.name]: e.target.value });
  };

  // Handle form submission for new player
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/players', { ...newPlayer, stats: playerStats })
      .then(response => {
        setPlayers([...players, response.data]);
        setShowPopup(false);
        setNewPlayer({ name: '', role: '', rollNumber: '', imageUrl: '', rating: 1 });
      })
      .catch(error => console.error("Error adding player:", error));
  };
  // Render star ratings
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
    axios.put(`http://localhost:5000/api/players/${selectedPlayer._id}/stats`, playerStats)
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
    axios.delete(`http://localhost:5000/api/players/${selectedPlayer._id}`)
      .then(() => {
        setPlayers(players.filter(player => player._id !== selectedPlayer._id));
        setShowStatsPopup(false);
        setShowEditStatsPopup(false);
        setSelectedPlayer(null);
      })
      .catch(error => console.error("Error deleting player:", error));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setPlayerDetails({
      ...playerDetails,
      [name]: value,
    });
  };
  
  const handleSaveDetails = () => {
    // Save logic (e.g., API call or state update)
    console.log("Updated Details:", playerDetails);
    setShowEditDetailsPopup(false); // Close the popup after saving
  };



  return (
    <>
      <div className="player-container">
        {players.map((player) => (
          <div className="player-box" key={player._id}>
            <div className="player-info">
              <h3>{player.name}</h3>
              <p>Role: {player.role}</p>
              <p>Roll Number: {player.rollNumber}</p>
              {renderStars(player.rating)}
              
              <button onClick={() => handleStatsClick(player)}>Stats</button>
              <button
                  onClick={() => {
                   const playerDetails = players.find((player) => player._id === player._id);
                   setSelectedPlayer(playerDetails); // Fetch the latest player data
                  setShowDetailsPopup(true); }}>
                   Details
               </button>

            </div>
            <img src={player.imageUrl} alt={player.name} className="player-img" />
          </div>
        ))}
      </div>
      {/* Add Player Popup */}
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
            <button onClick={() => setShowEditStatsPopup(true)}>Edit</button>
            <button onClick={() => setShowStatsPopup(false)}>Close</button>
            <button onClick={handleDeletePlayer} className="delete-button">Delete</button>
          </div>
        </div>
      )}
      {/* Edit Stats Popup */}
      {showEditStatsPopup && (
        <div className="edit-stats-popup-overlay">
          <div className="edit-stats-popup-box">
            <h2>Edit Stats for {selectedPlayer.name}</h2>
            <div className="edit-stats-form">
              
              <label>Matches Played:
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
          Raid Points Per Match:
          <input
            type="number"
            name="raidPointsPerMatch"
            value={playerStats.raidPointsPerMatch}
            onChange={handleStatsChange}
          />
        </label>
        <label className="edit-stats-label">
          Successful Raid Percentage:
          <input
            type="number"
            name="successfulRaidPercentage"
            value={playerStats.successfulRaidPercentage}
            onChange={handleStatsChange}         
          />
        </label>
        <label className="edit-stats-label">
          Super Raids:
          <input
            type="number"
            name="superRaids"
            value={playerStats.superRaids}
            onChange={handleStatsChange}          
          />
        </label>
        <label className="edit-stats-label">
          Super 10s:
          <input
            type="number"
            name="superTens"
            value={playerStats.superTens}
            onChange={handleStatsChange}         
          />
        </label>
        <label className="edit-stats-label">
          Total Raid Points:
          <input
            type="number"
            name="totalRaidPoints"
            value={playerStats.totalRaidPoints}
            onChange={handleStatsChange}           
          />
        </label>
        <label className="edit-stats-label">
          No. of Super Tackle:
          <input
            type="number"
            name="noOfSuperTackle"
            value={playerStats.noOfSuperTackle}
            onChange={handleStatsChange}         
          />
        </label>
        <label className="edit-stats-label">
          High 5s:
          <input
            type="number"
            name="highFives"
            value={playerStats.highFives}
            onChange={handleStatsChange}        
          />
        </label>
        <label className="edit-stats-label">
          Total Tackle Points:
          <input
            type="number"
            name="totalTacklePoints"
            value={playerStats.totalTacklePoints}
            onChange={handleStatsChange}          
          />
        </label>
        <label className="edit-stats-label">
          Successful Tackle Percentage:
          <input
            type="number"
            name="successfulTacklePercentage"
            value={playerStats.successfulTacklePercentage}
            onChange={handleStatsChange}
          />
        </label> 
              <button onClick={handleSaveStats}>Save</button>
              <button onClick={() => setShowEditStatsPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
      {/* Details Popup */}
    {showDetailsPopup && (
      <div className="popup-overlay">
        <div className="popup-box">
          <h2>{playerDetails.fullName}'s Details</h2>
          <p>Full Name: {playerDetails.fullName}</p>
          <p>Date of Birth: {playerDetails.dateOfBirth}</p>
          <p>Academic Year: {playerDetails.academicYear}</p>
          <p>Quota: {playerDetails.quota}</p>
          <p>Blood Group: {playerDetails.bloodGroup}</p>
          <p>Height: {playerDetails.height} cm</p>
          <p>Weight: {playerDetails.weight} kg</p>
          <p>Strength: {playerDetails.strength}</p>
          <p>Contact Number: {playerDetails.contactNumber}</p>
          <p>Email: {playerDetails.email}</p>
          <p>Department: {playerDetails.department}</p>
          <p>Address: {playerDetails.address}</p>
          <button onClick={() => setShowEditDetailsPopup(true)}>Edit</button>
          <button onClick={() => setShowDetailsPopup(false)}>Close</button>
        </div>
      </div>
    )}

    {/* Edit Details Popup */}
    {showEditDetailsPopup && (
      <div className="popup-overlay">
        <div className="edit-details-popup-box">
          <h2>Edit Details for {playerDetails.fullName}</h2>
          <div className="edit-details-form">
            <label>Full Name:
              <input
                type="text"
                name="fullName"
                value={playerDetails.fullName}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={playerDetails.dateOfBirth}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Academic Year:
              <input
                type="text"
                name="academicYear"
                value={playerDetails.academicYear}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Quota:
              <input
                type="text"
                name="quota"
                value={playerDetails.quota}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Blood Group:
              <input
                type="text"
                name="bloodGroup"
                value={playerDetails.bloodGroup}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Height (cm):
              <input
                type="number"
                name="height"
                value={playerDetails.height}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Weight (kg):
              <input
                type="number"
                name="weight"
                value={playerDetails.weight}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Strength:
              <input
                type="text"
                name="strength"
                value={playerDetails.strength}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Contact Number:
              <input
                type="text"
                name="contactNumber"
                value={playerDetails.contactNumber}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Email:
              <input
                type="email"
                name="email"
                value={playerDetails.email}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Department:
              <input
                type="text"
                name="department"
                value={playerDetails.department}
                onChange={handleDetailsChange}
              />
            </label>
            <label>Address:
              <textarea
                name="address"
                value={playerDetails.address}
                onChange={handleDetailsChange}
              />
            </label>
            <div className="button-group">
              <button onClick={handleSaveDetails}>Save</button>
              <button onClick={() => setShowEditDetailsPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};
export default Kbplayers;