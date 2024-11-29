import React from 'react';
import TeamPreview from './TeamPreview';

const GeneratedTeamCard = ({ team, players, index }) => {
  return (
    <div className="generated-team-container">
      <TeamPreview 
        team={team.players.map(name => {
          const player = players.find(p => p.name === name);
          return {
            name,
            role: player?.type === 'WK' ? 'Wicket Keeper' :
                  player?.type === 'BAT' ? 'Batsman' :
                  player?.type === 'ALL' ? 'All-rounder' :
                  player?.type === 'BOWL' ? 'Bowler' : '',
            isCaptain: team.captain === name,
            isViceCaptain: team.viceCaptain === name,
            teamId: index % 2 === 0 ? 'A' : 'B' // Alternate between team A and B for visual variety
          };
        })}
      />
    </div>
  );
};

export default GeneratedTeamCard;