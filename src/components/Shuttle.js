import React, { useState } from 'react';
import './Sports.css';

const Shuttle = () => {
  const [activeTab, setActiveTab] = useState('players');

  const renderContent = () => {
    switch (activeTab) {
      case 'players':
        return <div>Player Information...</div>;
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
        <h1>SHUTTLE</h1>
      </header>

      <nav className="sports-navbar">
        <ul>
          <li 
            className={activeTab === 'players' ? 'active' : ''} 
            onClick={() => setActiveTab('players')}>
            Players
          </li>
          <li 
            className={activeTab === 'scorecard' ? 'active' : ''} 
            onClick={() => setActiveTab('scorecard')}>
            Scorecard
          </li>
          <li 
            className={activeTab === 'achievements' ? 'active' : ''} 
            onClick={() => setActiveTab('achievements')}>
            Achievements
          </li>
          <li 
            className={activeTab === 'matches' ? 'active' : ''} 
            onClick={() => setActiveTab('matches')}>
            Matches
          </li>
        </ul>
      </nav>

      <main className="sports-content">
        {renderContent()}
      </main>
    </>
  );
}

export default Shuttle
