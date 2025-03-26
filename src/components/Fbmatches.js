import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './Sports.css';
import collegeLogo1 from './assets/kabaddiacheive/sjce.logo.jpeg'; // Example logo 1
import collegeLogo2 from './assets/kabaddiacheive/sathyabama.logp.jpeg'; // Example logo 2

const Fbmatches = () => {
  const API_URL = "https://backend-spotligth-on-sports.onrender.com";
  const [matches, setMatches] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newMatch, setNewMatch] = useState({
    team1: '',
    team2: '',
    logo1: '',
    logo2: '',
    venue: '',
    date: '',
  });

  // Fetch matches from the backend
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/fbmatches`);
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    fetchMatches();
  }, []);

  // Add a new match to the backend
  const handleAddMatch = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/fbmatches`, newMatch);
      setMatches([...matches, response.data]); // Update matches state with the newly added match
      setShowAddPopup(false); // Close the popup
      setNewMatch({ team1: '', team2: '', logo1: '', logo2: '', venue: '', date: '' }); // Reset form
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewMatch({ ...newMatch, [e.target.name]: e.target.value });
  };

  return (
    <div className="matches-container">
      <h2>Football Matches</h2>
      <div className="matches-grid">
        {matches.map((match) => (
          <div className="match-card" key={match._id}>
            <div className="match-content">
              <div className="team-info left-team">
                <img src={match.logo1 || collegeLogo1} alt={`${match.team1} logo`} className="team-logo" />
                <p>{match.team1}</p>
              </div>
              <div className="match-details">
                <p><strong>Venue:</strong> {match.venue}</p>
                <p><strong>Date:</strong> {new Date(match.date).toLocaleDateString()}</p>
              </div>
              <div className="team-info right-team">
                <img src={match.logo2 || collegeLogo2} alt={`${match.team2} logo`} className="team-logo" />
                <p>{match.team2}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button className="add-match-button" onClick={() => setShowAddPopup(true)}>+</button>

      {/* Add Match Popup */}
      {showAddPopup && (
        <div className="popup-overlay scorecard-popup">
          <div className="popup-box scorecard-popup-box">
            <h2>Add New Match</h2>
            <label>Team 1 Name:
              <input type="text" name="team1" value={newMatch.team1} onChange={handleInputChange} />
            </label>
            <label>Team 1 Logo URL:
              <input type="text" name="logo1" value={newMatch.logo1} onChange={handleInputChange} />
            </label>
            <label>Team 2 Name:
              <input type="text" name="team2" value={newMatch.team2} onChange={handleInputChange} />
            </label>
            <label>Team 2 Logo URL:
              <input type="text" name="logo2" value={newMatch.logo2} onChange={handleInputChange} />
            </label>
            <label>Venue:
              <input type="text" name="venue" value={newMatch.venue} onChange={handleInputChange} />
            </label>
            <label>Date:
              <input type="date" name="date" value={newMatch.date} onChange={handleInputChange} />
            </label>
            <button onClick={handleAddMatch}>Add Match</button>
            <button onClick={() => setShowAddPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fbmatches;
