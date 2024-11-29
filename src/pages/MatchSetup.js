import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

const MatchSetup = ({ userRole }) => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [team1Players, setTeam1Players] = useState(Array(11).fill(''));
  const [team2Players, setTeam2Players] = useState(Array(11).fill(''));
  const [playerTypes, setPlayerTypes] = useState({});
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Load existing data if available
    const savedData = localStorage.getItem(`match_${matchId}`);
    if (savedData) {
      const data = JSON.parse(savedData);
      setTeam1Name(data.team1Name || '');
      setTeam2Name(data.team2Name || '');
      setTeam1Players(data.team1Players.map(p => p.name));
      setTeam2Players(data.team2Players.map(p => p.name));
      const types = {};
      data.team1Players.forEach(p => types[p.name] = p.type);
      data.team2Players.forEach(p => types[p.name] = p.type);
      setPlayerTypes(types);
    }
  }, [matchId]);

  useEffect(() => {
    // Auto-save whenever data changes
    if (team1Players.some(p => p) || team2Players.some(p => p)) {
      const matchData = {
        matchId,
        team1Name,
        team2Name,
        team1Players: team1Players.map(name => ({ name, type: playerTypes[name] || '' })),
        team2Players: team2Players.map(name => ({ name, type: playerTypes[name] || '' })),
      };
      localStorage.setItem(`match_${matchId}`, JSON.stringify(matchData));
      setSaveStatus('Saved!');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  }, [team1Players, team2Players, playerTypes, matchId, team1Name, team2Name]);

  if (userRole !== 'admin') {
    navigate('/');
    return null;
  }

  const handlePlayerChange = (team, index, value, type = '') => {
    if (team === 1) {
      const newPlayers = [...team1Players];
      newPlayers[index] = value;
      setTeam1Players(newPlayers);
      if (value && type) {
        setPlayerTypes({ ...playerTypes, [value]: type });
      }
    } else {
      const newPlayers = [...team2Players];
      newPlayers[index] = value;
      setTeam2Players(newPlayers);
      if (value && type) {
        setPlayerTypes({ ...playerTypes, [value]: type });
      }
    }
  };

  const handleContinue = () => {
    if (!team1Name || !team2Name) {
      alert('Please enter names for both teams');
      return;
    }
    if (team1Players.every(player => player) && team2Players.every(player => player)) {
      navigate(`/match/${matchId}/select`);
    } else {
      alert('Please fill all player names');
    }
  };

  const playerTypeOptions = ['WK', 'BAT', 'ALL', 'BOWL'];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Add Players for Match {matchId}</h3>
        {saveStatus && (
          <div className="text-success">
            <FaSave className="me-2" />
            {saveStatus}
          </div>
        )}
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Team 1</h5>
                <input
                  type="text"
                  className="form-control form-control-sm w-50"
                  value={team1Name}
                  onChange={(e) => setTeam1Name(e.target.value)}
                  placeholder="Enter Team 1 Name"
                />
              </div>
            </div>
            <div className="card-body">
              {team1Players.map((player, index) => (
                <div key={index} className="mb-3 row align-items-center">
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control"
                      value={player}
                      onChange={(e) => handlePlayerChange(1, index, e.target.value)}
                      placeholder={`Player ${index + 1}`}
                    />
                  </div>
                  <div className="col-5">
                    <select
                      className="form-select"
                      value={playerTypes[player] || ''}
                      onChange={(e) => handlePlayerChange(1, index, player, e.target.value)}
                      disabled={!player}
                    >
                      <option value="">Type</option>
                      {playerTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Team 2</h5>
                <input
                  type="text"
                  className="form-control form-control-sm w-50"
                  value={team2Name}
                  onChange={(e) => setTeam2Name(e.target.value)}
                  placeholder="Enter Team 2 Name"
                />
              </div>
            </div>
            <div className="card-body">
              {team2Players.map((player, index) => (
                <div key={index} className="mb-3 row align-items-center">
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control"
                      value={player}
                      onChange={(e) => handlePlayerChange(2, index, e.target.value)}
                      placeholder={`Player ${index + 1}`}
                    />
                  </div>
                  <div className="col-5">
                    <select
                      className="form-select"
                      value={playerTypes[player] || ''}
                      onChange={(e) => handlePlayerChange(2, index, player, e.target.value)}
                      disabled={!player}
                    >
                      <option value="">Type</option>
                      {playerTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-primary btn-lg px-5"
          onClick={handleContinue}
        >
          Continue to Team Selection
        </button>
      </div>
    </div>
  );
};

export default MatchSetup;
