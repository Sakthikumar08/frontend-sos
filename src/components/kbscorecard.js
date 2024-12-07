import React, { useState } from 'react';
import './Sports.css';

const Kbscorecard = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      team1: {
        name: "St. Joseph's",
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd8R1cXLJ5QORsGXlJMZ-1KZ2VoZ2ZsTPRg&s',
        score: 45,
        stats: {
          firstHalf: { raid: 10, tackle: 20, allout: 15 },
          secondHalf: { raid: 15, tackle: 10, allout: 20 },
        },
      },
      team2: {
        name: 'Sathyabama',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkvSqzIXwRzSpmGTKiPwLrSxC7Hc21NMUBQg&s',
        score: 30,
        stats: {
          firstHalf: { raid: 5, tackle: 10, allout: 15 },
          secondHalf: { raid: 10, tackle: 5, allout: 15 },
        },
      },
    },
  ]);

  const [activePopup, setActivePopup] = useState(null); // 'details', 'add', 'edit', or null
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [newMatch, setNewMatch] = useState({
    team1: { name: '', logo: '', score: 0 },
    team2: { name: '', logo: '', score: 0 },
  });

  // Determine the winner for a given match
  const determineWinner = (match) => {
    if (match.team1.score > match.team2.score) return `${match.team1.name} wins the match!`;
    if (match.team1.score < match.team2.score) return `${match.team2.name} wins the match!`;
    return 'It\'s a draw!';
  };

  // Add Match
  const handleAddMatch = () => {
    if (!newMatch.team1.name || !newMatch.team1.logo || !newMatch.team2.name || !newMatch.team2.logo) {
      alert('Please fill all required fields!');
      return;
    }

    const newMatchData = {
      id: matches.length + 1,
      team1: { ...newMatch.team1 },
      team2: { ...newMatch.team2 },
    };

    setMatches([...matches, newMatchData]);
    setActivePopup(null); // Close the popup
    setNewMatch({ team1: { name: '', logo: '', score: 0 }, team2: { name: '', logo: '', score: 0 } }); // Reset form
  };

  // Edit Match
  const handleEditMatch = () => {
    const updatedMatches = matches.map((match) =>
      match.id === selectedMatch.id ? selectedMatch : match
    );
    setMatches(updatedMatches);
    setActivePopup(null); // Close popup
  };

  // Delete Match
  const handleDeleteMatch = (matchId) => {
    setMatches(matches.filter((match) => match.id !== matchId));
    setActivePopup(null); // Close popup
  };

  return (
    <div className="scorecard-container">
      {/* Matches List */}
      <div className="scorecard-grid">
        {matches.map((match) => (
          <div key={match.id} className="scorecard-box">
            <div className="team-logos">
              <img
                src={match.team1.logo}
                alt={match.team1.name}
                className="college-logo"
                onError={(e) => (e.target.src = 'fallback-logo.png')}
              />
              <img
                src={match.team2.logo}
                alt={match.team2.name}
                className="college-logo"
                onError={(e) => (e.target.src = 'fallback-logo.png')}
              />
            </div>
            <div className="team-info">
              <p>
                <strong>{match.team1.name}</strong> vs <strong>{match.team2.name}</strong>
              </p>
              <p>{match.team1.score} - {match.team2.score}</p>
            </div>
            <div className="winner-announcement">
              <p>{determineWinner(match)}</p>
            </div>
            <button className="details-button" onClick={() => { setSelectedMatch(match); setActivePopup('details'); }}>
              Details
            </button>
          </div>
        ))}
      </div>
      <button className="add-match-button" onClick={() => setActivePopup('add')}>+</button>

      {/* Popup */}
      {activePopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            {activePopup === 'details' && selectedMatch && (
              <>
                 <h2>Match Details</h2>

{/* First Half Details */}
<div className="half-section">
  <h3>First Half</h3>
  <div className="team-details">
    <div className="team-left">
      <p><strong>{selectedMatch.team1.name}</strong></p>
      <p>Score: {selectedMatch.team1.stats.firstHalf.raid + selectedMatch.team1.stats.firstHalf.tackle + selectedMatch.team1.stats.firstHalf.allout}</p>
      <p>Raid Points: {selectedMatch.team1.stats.firstHalf.raid}</p>
      <p>Tackle Points: {selectedMatch.team1.stats.firstHalf.tackle}</p>
      <p>Allout Points: {selectedMatch.team1.stats.firstHalf.allout}</p>
    </div>
    <div className="team-right">
      <p><strong>{selectedMatch.team2.name}</strong></p>
      <p>Score: {selectedMatch.team2.stats.firstHalf.raid + selectedMatch.team2.stats.firstHalf.tackle + selectedMatch.team2.stats.firstHalf.allout}</p>
      <p>Raid Points: {selectedMatch.team2.stats.firstHalf.raid}</p>
      <p>Tackle Points: {selectedMatch.team2.stats.firstHalf.tackle}</p>
      <p>Allout Points: {selectedMatch.team2.stats.firstHalf.allout}</p>
    </div>
  </div>
</div>

{/* Second Half Details */}
<div className="half-section">
  <h3>Second Half</h3>
  <div className="team-details">
    <div className="team-left">
      <p><strong>{selectedMatch.team1.name}</strong></p>
      <p>Score: {selectedMatch.team1.stats.secondHalf.raid + selectedMatch.team1.stats.secondHalf.tackle + selectedMatch.team1.stats.secondHalf.allout}</p>
      <p>Raid Points: {selectedMatch.team1.stats.secondHalf.raid}</p>
      <p>Tackle Points: {selectedMatch.team1.stats.secondHalf.tackle}</p>
      <p>Allout Points: {selectedMatch.team1.stats.secondHalf.allout}</p>
    </div>
    <div className="team-right">
      <p><strong>{selectedMatch.team2.name}</strong></p>
      <p>Score: {selectedMatch.team2.stats.secondHalf.raid + selectedMatch.team2.stats.secondHalf.tackle + selectedMatch.team2.stats.secondHalf.allout}</p>
      <p>Raid Points: {selectedMatch.team2.stats.secondHalf.raid}</p>
      <p>Tackle Points: {selectedMatch.team2.stats.secondHalf.tackle}</p>
      <p>Allout Points: {selectedMatch.team2.stats.secondHalf.allout}</p>
    </div>
  </div>
</div>

                <button onClick={() => setActivePopup('edit')}>Edit</button>
                <button onClick={() => handleDeleteMatch(selectedMatch.id)}>Delete</button>
                <button onClick={() => setActivePopup(null)}>Close</button>
              </>
            )}
            {activePopup === 'add' && (
              <>
                <h2>Add Match</h2>
                <input
                  type="text"
                  placeholder="Team 1 Name"
                  value={newMatch.team1.name}
                  onChange={(e) => setNewMatch({ ...newMatch, team1: { ...newMatch.team1, name: e.target.value } })}
                />
                <input
                  type="text"
                  placeholder="Team 1 Logo URL"
                  value={newMatch.team1.logo}
                  onChange={(e) => setNewMatch({ ...newMatch, team1: { ...newMatch.team1, logo: e.target.value } })}
                />
                <input
                  type="text"
                  placeholder="Team 2 Name"
                  value={newMatch.team2.name}
                  onChange={(e) => setNewMatch({ ...newMatch, team2: { ...newMatch.team2, name: e.target.value } })}
                />
                <input
                  type="text"
                  placeholder="Team 2 Logo URL"
                  value={newMatch.team2.logo}
                  onChange={(e) => setNewMatch({ ...newMatch, team2: { ...newMatch.team2, logo: e.target.value } })}
                />
                <button onClick={handleAddMatch}>Add Match</button>
                <button onClick={() => setActivePopup(null)}>Close</button>
              </>
            )}
            {activePopup === 'edit' && selectedMatch && (
              <>
                <h2>Edit Match</h2>
    <div className="edit-popup-container">
      {/* First Half */}
      <div className="team-section">
        <h3>First Half</h3>
        <h4>{selectedMatch.team1.name}</h4>
        <div>
          <label>Score</label>
          <input
            type="number"
            value={selectedMatch.team1.stats.firstHalf.score || selectedMatch.team1.score}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team1: {
                  ...selectedMatch.team1,
                  stats: {
                    ...selectedMatch.team1.stats,
                    firstHalf: {
                      ...selectedMatch.team1.stats.firstHalf,
                      score: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label>Raid Points</label>
          <input
            type="number"
            value={selectedMatch.team1.stats.firstHalf.raid}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team1: {
                  ...selectedMatch.team1,
                  stats: {
                    ...selectedMatch.team1.stats,
                    firstHalf: {
                      ...selectedMatch.team1.stats.firstHalf,
                      raid: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label>Tackle Points</label>
          <input
            type="number"
            value={selectedMatch.team1.stats.firstHalf.tackle}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team1: {
                  ...selectedMatch.team1,
                  stats: {
                    ...selectedMatch.team1.stats,
                    firstHalf: {
                      ...selectedMatch.team1.stats.firstHalf,
                      tackle: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label>Allout Points</label>
          <input
            type="number"
            value={selectedMatch.team1.stats.firstHalf.allout}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team1: {
                  ...selectedMatch.team1,
                  stats: {
                    ...selectedMatch.team1.stats,
                    firstHalf: {
                      ...selectedMatch.team1.stats.firstHalf,
                      allout: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
      </div>
      <div className="team-section">
        <h3>First Half</h3>
        <h4>{selectedMatch.team2.name}</h4>
        <div>
          <label>Score</label>
          <input
            type="number"
            value={selectedMatch.team2.stats.firstHalf.score || selectedMatch.team2.score}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team2: {
                  ...selectedMatch.team2,
                  stats: {
                    ...selectedMatch.team2.stats,
                    firstHalf: {
                      ...selectedMatch.team2.stats.firstHalf,
                      score: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label>Raid Points</label>
          <input
            type="number"
            value={selectedMatch.team2.stats.firstHalf.raid}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team2: {
                  ...selectedMatch.team2,
                  stats: {
                    ...selectedMatch.team2.stats,
                    firstHalf: {
                      ...selectedMatch.team2.stats.firstHalf,
                      raid: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label>Tackle Points</label>
          <input
            type="number"
            value={selectedMatch.team2.stats.firstHalf.tackle}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team2: {
                  ...selectedMatch.team2,
                  stats: {
                    ...selectedMatch.team2.stats,
                    firstHalf: {
                      ...selectedMatch.team2.stats.firstHalf,
                      tackle: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label>Allout Points</label>
          <input
            type="number"
            value={selectedMatch.team2.stats.firstHalf.allout}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team2: {
                  ...selectedMatch.team2,
                  stats: {
                    ...selectedMatch.team2.stats,
                    firstHalf: {
                      ...selectedMatch.team2.stats.firstHalf,
                      allout: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
      </div>
      {/* Second Half */}
      <div className="team-section">
        <h3>Second Half</h3>
        <h4>{selectedMatch.team1.name}</h4>
        <div>
          <label>Raid Points</label>
          <input
            type="number"
            value={selectedMatch.team1.stats.secondHalf.raid}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team1: {
                  ...selectedMatch.team1,
                  stats: {
                    ...selectedMatch.team1.stats,
                    secondHalf: {
                      ...selectedMatch.team1.stats.secondHalf,
                      raid: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label>Tackle Points</label>
          <input
            type="number"
            value={selectedMatch.team1.stats.secondHalf.tackle}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team1: {
                  ...selectedMatch.team1,
                  stats: {
                    ...selectedMatch.team1.stats,
                    secondHalf: {
                      ...selectedMatch.team1.stats.secondHalf,
                      tackle: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />

        </div>
        <div>
          <label>Allout Points</label>
          <input
            type="number"
            value={selectedMatch.team1.stats.secondHalf.allout}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team1: {
                  ...selectedMatch.team1,
                  stats: {
                    ...selectedMatch.team1.stats,
                    secondHalf: {
                      ...selectedMatch.team1.stats.secondHalf,
                      allout: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
      </div>
      <div className="team-section">
        <h3>Second Half</h3>
        <h4>{selectedMatch.team2.name}</h4>
        <div>
          <label>Raid Points</label>
          <input
            type="number"
            value={selectedMatch.team2.stats.secondHalf.raid}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team2: {
                  ...selectedMatch.team2,
                  stats: {
                    ...selectedMatch.team2.stats,
                    secondHalf: {
                      ...selectedMatch.team2.stats.secondHalf,
                      raid: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label>Tackle Points</label>
          <input
            type="number"
            value={selectedMatch.team2.stats.secondHalf.tackle}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team2: {
                  ...selectedMatch.team2,
                  stats: {
                    ...selectedMatch.team2.stats,
                    secondHalf: {
                      ...selectedMatch.team2.stats.secondHalf,
                      tackle: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label>Allout Points</label>
          <input
            type="number"
            value={selectedMatch.team2.stats.secondHalf.allout}
            onChange={(e) =>
              setSelectedMatch({
                ...selectedMatch,
                team2: {
                  ...selectedMatch.team2,
                  stats: {
                    ...selectedMatch.team2.stats,
                    secondHalf: {
                      ...selectedMatch.team2.stats.secondHalf,
                      allout: Number(e.target.value),
                    },
                  },
                },
              })
            }
          />
        </div>
      </div>
    </div>
    <div className="popup-actions">
      <button onClick={handleEditMatch}>Save</button>
      <button onClick={() => setActivePopup(null)}>Close</button>
    </div>
  
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Kbscorecard;
