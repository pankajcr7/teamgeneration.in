import React from 'react';
import './TeamPreview.css';

const TeamPreview = ({ team }) => {
  // Group players by their roles
  const playersByRole = {
    'Wicket Keeper': team.filter(player => player.role === 'Wicket Keeper'),
    'Batsman': team.filter(player => player.role === 'Batsman'),
    'All-rounder': team.filter(player => player.role === 'All-rounder'),
    'Bowler': team.filter(player => player.role === 'Bowler')
  };

  const getPlayerIcon = (role) => {
    switch (role) {
      case 'Wicket Keeper':
        return '🧤';
      case 'Batsman':
        return '🏏';
      case 'All-rounder':
        return '⚡';
      case 'Bowler':
        return '🎯';
      default:
        return '👤';
    }
  };

  return (
    <div className="team-preview">
      <div className="cricket-field">
        {/* Wicket Keeper Section - Top Center */}
        <div className="section wicket-keeper-section">
          <div className="players-container">
            {playersByRole['Wicket Keeper'].map((player, index) => (
              <div key={index} className={`player-card ${index % 2 === 0 ? 'team-a' : 'team-b'}`}>
                <span className="player-icon">{getPlayerIcon(player.role)}</span>
                <span className="player-name">{player.name}</span>
                {player.isCaptain && <div className="captain-indicator">C</div>}
                {player.isViceCaptain && <div className="vice-captain-indicator">VC</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Batsman Section - Row below WK */}
        <div className="section batsman-section">
          <div className="players-container">
            {playersByRole['Batsman'].map((player, index) => (
              <div key={index} className={`player-card ${index % 2 === 0 ? 'team-a' : 'team-b'}`}>
                <span className="player-icon">{getPlayerIcon(player.role)}</span>
                <span className="player-name">{player.name}</span>
                {player.isCaptain && <div className="captain-indicator">C</div>}
                {player.isViceCaptain && <div className="vice-captain-indicator">VC</div>}
              </div>
            ))}
          </div>
        </div>

        {/* All-rounder Section - Middle Row */}
        <div className="section all-rounder-section">
          <div className="players-container">
            {playersByRole['All-rounder'].map((player, index) => (
              <div key={index} className={`player-card ${index % 2 === 0 ? 'team-a' : 'team-b'}`}>
                <span className="player-icon">{getPlayerIcon(player.role)}</span>
                <span className="player-name">{player.name}</span>
                {player.isCaptain && <div className="captain-indicator">C</div>}
                {player.isViceCaptain && <div className="vice-captain-indicator">VC</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Bowler Section - Bottom Row */}
        <div className="section bowler-section">
          <div className="players-container">
            {playersByRole['Bowler'].map((player, index) => (
              <div key={index} className={`player-card ${index % 2 === 0 ? 'team-a' : 'team-b'}`}>
                <span className="player-icon">{getPlayerIcon(player.role)}</span>
                <span className="player-name">{player.name}</span>
                {player.isCaptain && <div className="captain-indicator">C</div>}
                {player.isViceCaptain && <div className="vice-captain-indicator">VC</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPreview;
