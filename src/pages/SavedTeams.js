import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const SavedTeams = () => {
  const [savedTeams, setSavedTeams] = useState([]);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [playerPoints, setPlayerPoints] = useState({});
  const [uniquePlayers, setUniquePlayers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const teams = JSON.parse(localStorage.getItem('savedTeams') || '[]');
    setSavedTeams(teams);

    // Get unique players from all teams
    const allPlayers = new Set();
    teams.forEach(team => {
      team.players.forEach(player => {
        allPlayers.add(JSON.stringify({ name: player.name, role: player.role }));
      });
    });
    
    const uniquePlayersList = Array.from(allPlayers).map(player => JSON.parse(player));
    setUniquePlayers(uniquePlayersList);

    // Initialize points from existing data
    const initialPoints = {};
    teams.forEach(team => {
      team.players.forEach(player => {
        if (player.points) {
          initialPoints[player.name] = player.points;
        }
      });
    });
    setPlayerPoints(initialPoints);
  }, []);

  const calculateTeamPoints = (team, points) => {
    let totalPoints = 0;
    team.players.forEach(player => {
      const playerPoints = parseFloat(points[player.name] || 0);
      if (player.name === team.captain) {
        totalPoints += playerPoints * 2; // Captain points x2
      } else if (player.name === team.viceCaptain) {
        totalPoints += playerPoints * 1.5; // Vice Captain points x1.5
      } else {
        totalPoints += playerPoints;
      }
    });
    return totalPoints;
  };

  const handlePointsChange = (playerName, points) => {
    setPlayerPoints(prev => ({
      ...prev,
      [playerName]: points
    }));
  };

  const handleSavePoints = () => {
    const updatedTeams = savedTeams.map(team => ({
      ...team,
      players: team.players.map(player => ({
        ...player,
        points: playerPoints[player.name] || 0
      })),
      totalPoints: calculateTeamPoints(team, playerPoints)
    }));

    setSavedTeams(updatedTeams);
    localStorage.setItem('savedTeams', JSON.stringify(updatedTeams));
    setShowPointsModal(false);
  };

  const handleDeleteTeam = (index) => {
    setTeamToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTeam = () => {
    const updatedTeams = savedTeams.filter((_, index) => index !== teamToDelete);
    setSavedTeams(updatedTeams);
    localStorage.setItem('savedTeams', JSON.stringify(updatedTeams));
    setShowDeleteConfirm(false);
    setTeamToDelete(null);
  };

  const handleDeleteAllTeams = () => {
    setTeamToDelete('all');
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAllTeams = () => {
    setSavedTeams([]);
    localStorage.setItem('savedTeams', '[]');
    setShowDeleteConfirm(false);
    setTeamToDelete(null);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Sort teams by total points
  const sortedTeams = [...savedTeams].sort((a, b) => 
    (b.totalPoints || 0) - (a.totalPoints || 0)
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Saved Teams</h2>
        <div>
          <button 
            className="btn btn-primary me-2" 
            onClick={() => setShowPointsModal(true)}
          >
            Add Player Points
          </button>
          {savedTeams.length > 0 && (
            <button 
              className="btn btn-danger me-2"
              onClick={handleDeleteAllTeams}
            >
              Delete All Teams
            </button>
          )}
          <button className="btn btn-secondary" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center bg-danger text-white">
            <h5 className="mb-0">Confirm Delete</h5>
            <button 
              className="btn btn-sm btn-outline-light"
              onClick={() => setShowDeleteConfirm(false)}
            >
              ×
            </button>
          </div>
          <div className="card-body">
            <p>
              {teamToDelete === 'all' 
                ? 'Are you sure you want to delete all saved teams? This action cannot be undone.'
                : 'Are you sure you want to delete this team? This action cannot be undone.'
              }
            </p>
            <div className="text-end">
              <button 
                className="btn btn-secondary me-2"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={teamToDelete === 'all' ? confirmDeleteAllTeams : confirmDeleteTeam}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Points Management Modal */}
      {showPointsModal && (
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Player Points</h5>
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setShowPointsModal(false)}
            >
              ×
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-3">
                <div className="alert alert-info">
                  Enter points for each player. These points will be used to calculate team totals.
                  Remember: Captain gets 2x points and Vice Captain gets 1.5x points.
                </div>
              </div>
              {uniquePlayers.sort((a, b) => a.role.localeCompare(b.role)).map((player, index) => (
                <div key={index} className="col-md-6 mb-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <strong>{player.name}</strong> ({player.role})
                    </div>
                    <input
                      type="number"
                      className="form-control ms-2"
                      style={{ width: '100px' }}
                      value={playerPoints[player.name] || ''}
                      onChange={(e) => handlePointsChange(player.name, e.target.value)}
                      placeholder="Points"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-end mt-3">
              <button 
                className="btn btn-success"
                onClick={handleSavePoints}
              >
                Save & Calculate Team Points
              </button>
            </div>
          </div>
        </div>
      )}

      {sortedTeams.length === 0 ? (
        <div className="alert alert-info">
          No saved teams yet. Generate and save some teams to see them here!
        </div>
      ) : (
        sortedTeams.map((team, teamIndex) => (
          <div key={teamIndex} className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Team {teamIndex + 1}</h5>
                <div>Total Points: {team.totalPoints?.toFixed(2) || 0}</div>
              </div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteTeam(teamIndex)}
              >
                <FaTrash /> Delete Team
              </button>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Captain:</strong> {team.captain} (2x points)<br />
                <strong>Vice Captain:</strong> {team.viceCaptain} (1.5x points)
              </div>
              <div className="row">
                {team.players.map((player, playerIndex) => (
                  <div key={playerIndex} className="col-md-6 mb-2">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        {player.name} ({player.role})
                        {player.name === team.captain && " - Captain"}
                        {player.name === team.viceCaptain && " - Vice Captain"}
                      </div>
                      <div className="ms-2" style={{ width: '100px' }}>
                        {player.points || 0} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedTeams;
