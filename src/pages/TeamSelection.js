import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GeneratedTeamCard from '../components/GeneratedTeamCard';
import PlayerStats from '../components/PlayerStats';

const TeamSelection = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  
  const [allPlayers, setAllPlayers] = useState([]);
  const [fixedPlayers, setFixedPlayers] = useState([]);
  const [captainChoices, setCaptainChoices] = useState([]);
  const [viceCaptainChoices, setViceCaptainChoices] = useState([]);
  const [numTeams, setNumTeams] = useState(1);
  const [teamComposition, setTeamComposition] = useState({
    wk: { min: 1, max: 4 },
    bat: { min: 1, max: 6 },
    all: { min: 1, max: 6 },
    bowl: { min: 1, max: 6 }
  });
  const [generatedTeams, setGeneratedTeams] = useState([]);
  const [error, setError] = useState('');
  const [showSaveButton, setShowSaveButton] = useState(false);
  
  // State for individual player stats
  const [playerStats, setPlayerStats] = useState({});

  // State for stadium stats
  const [stadiumStats, setStadiumStats] = useState({
    pitchType: 'Balanced',
    avgScore: '',
    firstInningsScore: '',
    secondInningsScore: '',
    teamBattingFirst: ''
  });

  // State for team generation type
  const [teamType, setTeamType] = useState('Balanced');

  // Add winning team state
  const [winningTeam, setWinningTeam] = useState('');

  // Add team names state
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    const matchData = localStorage.getItem(`match_${matchId}`);
    if (matchData) {
      const data = JSON.parse(matchData);
      // Set team names
      setTeamNames([data.team1Name, data.team2Name]);
      
      const allPlayersList = [...data.team1Players, ...data.team2Players].map(player => ({
        ...player,
        id: player.name, // Ensure unique ID for each player
        stats: {
          avgPoints: '',
          selectionPercentage: ''
        }
      }));
      
      setAllPlayers(allPlayersList);
    } else {
      navigate('/');
    }
  }, [matchId, navigate]);

  const handleFixedPlayerToggle = (player) => {
    if (fixedPlayers.includes(player.name)) {
      setFixedPlayers(fixedPlayers.filter(p => p !== player.name));
      // Remove from captain/vice-captain choices if they were selected
      setCaptainChoices(captainChoices.filter(name => name !== player.name));
      setViceCaptainChoices(viceCaptainChoices.filter(name => name !== player.name));
    } else {
      setFixedPlayers([...fixedPlayers, player.name]);
    }
  };

  const handleCaptainSelect = (playerName) => {
    if (captainChoices.includes(playerName)) {
      setCaptainChoices(captainChoices.filter(name => name !== playerName));
    } else {
      setCaptainChoices([...captainChoices, playerName]);
    }
  };

  const handleViceCaptainSelect = (playerName) => {
    if (viceCaptainChoices.includes(playerName)) {
      setViceCaptainChoices(viceCaptainChoices.filter(name => name !== playerName));
    } else {
      setViceCaptainChoices([...viceCaptainChoices, playerName]);
    }
  };

  // Function to handle individual player stat changes
  const handlePlayerStatChange = (playerId, statType, value) => {
    setAllPlayers(prevPlayers => {
      return prevPlayers.map(player => {
        if (player.id === playerId) {
          return {
            ...player,
            stats: {
              ...player.stats,
              [statType]: value
            }
          };
        }
        return {...player};
      });
    });
  };

  // Handle stadium stats changes
  const handleStadiumStatsChange = (field, value) => {
    setStadiumStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle team type changes
  const handleTeamTypeChange = (value) => {
    setTeamType(value);
  };

  const calculatePlayerScore = (player) => {
    const stats = player.stats || {};
    let score = stats.avgPoints || 0;
    const selectionPercentage = stats.selectionPercentage || 50;

    // Winning team bonus
    if (winningTeam && player.team === winningTeam) {
      score *= 1.8; // 80% bonus for players from predicted winning team
    }

    // Base score calculation
    switch (teamType) {
      case 'Safe':
        // For safe teams:
        // - Heavily favor players with high selection % (popular picks)
        // - Prioritize consistent performers (high avg points)
        // - Reduce variance by avoiding low-selected players
        if (selectionPercentage >= 70) score *= 1.5;
        if (selectionPercentage >= 50) score *= 1.2;
        if (selectionPercentage < 30) score *= 0.7;
        break;

      case 'Balanced':
        // For balanced teams:
        // - Mix of popular and differential picks
        // - Moderate boost to players with medium selection %
        // - Still consider high performers but with less weight
        if (selectionPercentage >= 40 && selectionPercentage <= 60) score *= 1.3;
        if (selectionPercentage > 60) score *= 1.1;
        if (selectionPercentage < 40) score *= 1.1;
        break;

      case 'Risky':
        // For risky teams:
        // - Heavily favor differential picks (low selection %)
        // - Give bonus to high-point players with low selection
        // - Reduce score of highly-selected players
        if (selectionPercentage <= 30) score *= 1.8;
        if (selectionPercentage <= 50) score *= 1.3;
        if (selectionPercentage > 70) score *= 0.6;
        break;
    }

    // Additional factors for all strategies
    // Pitch type consideration
    if (player.type === 'BAT' && stadiumStats.pitchType === 'Batting-friendly') {
      score *= 1.2;
    } else if (player.type === 'BOWL' && stadiumStats.pitchType === 'Bowling-friendly') {
      score *= 1.2;
    }

    // Batting order consideration
    const playerTeam = allPlayers.find(p => p.id === player.id)?.team;
    if (playerTeam === stadiumStats.teamBattingFirst) {
      if (player.type === 'BAT' || player.type === 'ALL') {
        score *= 1.1;
      }
    } else {
      if (player.type === 'BOWL') {
        score *= 1.1;
      }
    }

    return score;
  };

  const generateTeams = () => {
    try {
      const validationError = validateTeamComposition(teamComposition);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError('');

      const teams = [];
      for (let i = 0; i < numTeams; i++) {
        const team = {
          players: [...fixedPlayers],
          captain: '',
          viceCaptain: ''
        };

        // Count player types in fixed players
        const fixedCount = {
          wk: fixedPlayers.filter(name => allPlayers.find(p => p.name === name)?.type === 'WK').length,
          bat: fixedPlayers.filter(name => allPlayers.find(p => p.name === name)?.type === 'BAT').length,
          all: fixedPlayers.filter(name => allPlayers.find(p => p.name === name)?.type === 'ALL').length,
          bowl: fixedPlayers.filter(name => allPlayers.find(p => p.name === name)?.type === 'BOWL').length
        };

        // Function to get available players of a type with strategy-based sorting
        const getAvailablePlayers = (type) => {
          const players = allPlayers.filter(p => 
            p.type === type && 
            !team.players.includes(p.name)
          );
          
          // Sort players by calculated score
          const sortedPlayers = players.sort((a, b) => calculatePlayerScore(b) - calculatePlayerScore(a));

          // If winning team is selected, prioritize players from that team
          if (winningTeam) {
            // Split players into winning team and other team
            const winningTeamPlayers = sortedPlayers.filter(p => p.team === winningTeam);
            const otherTeamPlayers = sortedPlayers.filter(p => p.team !== winningTeam);

            // Create a weighted list with more players from winning team
            const weightedPlayers = [
              ...winningTeamPlayers,
              ...winningTeamPlayers, // Add winning team players twice to increase their chances
              ...otherTeamPlayers
            ];

            // Apply strategy-specific player selection to the weighted list
            switch (teamType) {
              case 'Safe':
                return weightedPlayers.slice(0, Math.ceil(weightedPlayers.length * 0.7));
              case 'Risky':
                const lowSelectedPlayers = weightedPlayers.filter(p => 
                  (p.stats?.selectionPercentage || 50) <= 50
                );
                return lowSelectedPlayers.length > 0 ? lowSelectedPlayers : weightedPlayers;
              case 'Balanced':
              default:
                return weightedPlayers;
            }
          }

          // If no winning team selected, use original strategy
          switch (teamType) {
            case 'Safe':
              return sortedPlayers.slice(0, Math.ceil(sortedPlayers.length * 0.7));
            case 'Risky':
              const lowSelectedPlayers = sortedPlayers.filter(p => 
                (p.stats?.selectionPercentage || 50) <= 50
              );
              return lowSelectedPlayers.length > 0 ? lowSelectedPlayers : sortedPlayers;
            case 'Balanced':
            default:
              return sortedPlayers;
          }
        };

        // Modified addPlayersOfType to consider strategy
        const addPlayersOfType = (type, min, max, typeKey) => {
          const currentCount = fixedCount[typeKey];
          let availablePlayers = getAvailablePlayers(type);
          
          // Add minimum required players
          while (currentCount + team.players.length < 11 && 
                 team.players.filter(name => allPlayers.find(p => p.name === name)?.type === type).length < min) {
            if (availablePlayers.length === 0) break;

            // Strategy-specific player selection
            let selectedIndex = 0;
            if (teamType === 'Balanced') {
              // Mix of high and low ranked players
              selectedIndex = Math.floor(Math.random() * Math.min(3, availablePlayers.length));
            } else if (teamType === 'Risky') {
              // Prefer lower selected players
              selectedIndex = Math.floor(Math.random() * availablePlayers.length);
            }
            // Safe strategy always takes the top player (selectedIndex = 0)

            team.players.push(availablePlayers[selectedIndex].name);
            availablePlayers.splice(selectedIndex, 1);
          }
        };

        // Add players for each type
        addPlayersOfType('WK', teamComposition.wk.min, teamComposition.wk.max, 'wk');
        addPlayersOfType('BAT', teamComposition.bat.min, teamComposition.bat.max, 'bat');
        addPlayersOfType('ALL', teamComposition.all.min, teamComposition.all.max, 'all');
        addPlayersOfType('BOWL', teamComposition.bowl.min, teamComposition.bowl.max, 'bowl');

        // Fill remaining spots while respecting maximums
        while (team.players.length < 11) {
          const typeCountInTeam = {
            WK: team.players.filter(name => allPlayers.find(p => p.name === name)?.type === 'WK').length,
            BAT: team.players.filter(name => allPlayers.find(p => p.name === name)?.type === 'BAT').length,
            ALL: team.players.filter(name => allPlayers.find(p => p.name === name)?.type === 'ALL').length,
            BOWL: team.players.filter(name => allPlayers.find(p => p.name === name)?.type === 'BOWL').length
          };

          // Get all available players that won't exceed max limits
          const availablePlayers = allPlayers.filter(p => 
            !team.players.includes(p.name) && 
            ((p.type === 'WK' && typeCountInTeam.WK < teamComposition.wk.max) ||
             (p.type === 'BAT' && typeCountInTeam.BAT < teamComposition.bat.max) ||
             (p.type === 'ALL' && typeCountInTeam.ALL < teamComposition.all.max) ||
             (p.type === 'BOWL' && typeCountInTeam.BOWL < teamComposition.bowl.max))
          );

          if (availablePlayers.length === 0) break;
          const randomIndex = Math.floor(Math.random() * availablePlayers.length);
          team.players.push(availablePlayers[randomIndex].name);
        }

        // Captain and Vice-captain selection logic (unchanged)
        const captainPool = captainChoices.length > 0 
          ? captainChoices.filter(name => team.players.includes(name))
          : team.players;
        
        if (captainPool.length > 0) {
          const randomCaptainIndex = Math.floor(Math.random() * captainPool.length);
          team.captain = captainPool[randomCaptainIndex];
        } else {
          const randomCaptainIndex = Math.floor(Math.random() * team.players.length);
          team.captain = team.players[randomCaptainIndex];
        }

        const viceCaptainPool = viceCaptainChoices.length > 0
          ? viceCaptainChoices.filter(name => team.players.includes(name) && name !== team.captain)
          : team.players.filter(name => name !== team.captain);

        if (viceCaptainPool.length > 0) {
          const randomViceCaptainIndex = Math.floor(Math.random() * viceCaptainPool.length);
          team.viceCaptain = viceCaptainPool[randomViceCaptainIndex];
        } else {
          let randomViceCaptainIndex;
          do {
            randomViceCaptainIndex = Math.floor(Math.random() * team.players.length);
          } while (team.players[randomViceCaptainIndex] === team.captain);
          team.viceCaptain = team.players[randomViceCaptainIndex];
        }

        teams.push(team);
      }
      setGeneratedTeams(teams);
      setShowSaveButton(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveTeams = () => {
    const teamsToSave = generatedTeams.map(team => ({
      ...team,
      players: team.players.map(playerName => {
        const playerData = allPlayers.find(p => p.name === playerName);
        return {
          name: playerName,
          role: playerData?.type || '',
          points: 0 // Initialize points as 0
        };
      }),
      totalPoints: 0
    }));

    const existingSavedTeams = JSON.parse(localStorage.getItem('savedTeams') || '[]');
    const updatedSavedTeams = [...existingSavedTeams, ...teamsToSave];
    localStorage.setItem('savedTeams', JSON.stringify(updatedSavedTeams));
    
    alert('Teams saved successfully!');
    setShowSaveButton(false);
  };

  const handleViewSavedTeams = () => {
    navigate('/saved-teams');
  };

  const validateTeamComposition = (composition) => {
    const { wk, bat, all, bowl } = composition;
    
    // Check if any values are negative
    if (wk.min < 0 || wk.max < 0 || bat.min < 0 || bat.max < 0 || 
        all.min < 0 || all.max < 0 || bowl.min < 0 || bowl.max < 0) {
      return "Values cannot be negative";
    }

    // Check if min is greater than max
    if (wk.min > wk.max || bat.min > bat.max || 
        all.min > all.max || bowl.min > bowl.max) {
      return "Minimum values cannot be greater than maximum values";
    }

    // Check if total minimum is less than 11
    const totalMin = wk.min + bat.min + all.min + bowl.min;
    if (totalMin > 11) {
      return "Total minimum players cannot exceed 11";
    }

    // Check if total maximum is at least 11
    const totalMax = wk.max + bat.max + all.max + bowl.max;
    if (totalMax < 11) {
      return "Total maximum players must be at least 11";
    }

    return "";
  };

  const handleCompositionChange = (type, field, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    const newComposition = {
      ...teamComposition,
      [type]: {
        ...teamComposition[type],
        [field]: newValue
      }
    };
    
    const validationError = validateTeamComposition(newComposition);
    setError(validationError);
    setTeamComposition(newComposition);
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Team Settings</h5>
            </div>
            <div className="card-body">
              {/* Player List with Stats */}
              <div className="mb-4">
                <h6>Available Players</h6>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Type</th>
                        <th>Avg Points</th>
                        <th>Selection %</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPlayers.map((player) => (
                        <tr key={player.id}>
                          <td>{player.name}</td>
                          <td>{player.team}</td>
                          <td>{player.type}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={player.stats?.avgPoints || ''}
                              onChange={(e) => {
                                const value = e.target.value === '' ? '' : parseFloat(e.target.value);
                                handlePlayerStatChange(player.id, 'avgPoints', value);
                              }}
                              min="0"
                              step="0.1"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={player.stats?.selectionPercentage || ''}
                              onChange={(e) => {
                                const value = e.target.value === '' ? '' : parseFloat(e.target.value);
                                handlePlayerStatChange(player.id, 'selectionPercentage', value);
                              }}
                              min="0"
                              max="100"
                              step="0.1"
                            />
                          </td>
                          <td>
                            <div className="btn-group">
                              <button
                                className={`btn btn-sm ${fixedPlayers.includes(player.name) ? 'btn-success' : 'btn-outline-success'}`}
                                onClick={() => handleFixedPlayerToggle(player)}
                              >
                                Fix
                              </button>
                              <button
                                className={`btn btn-sm ${captainChoices.includes(player.name) ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleCaptainSelect(player.name)}
                              >
                                C
                              </button>
                              <button
                                className={`btn btn-sm ${viceCaptainChoices.includes(player.name) ? 'btn-info' : 'btn-outline-info'}`}
                                onClick={() => handleViceCaptainSelect(player.name)}
                              >
                                VC
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Team Composition Settings */}
              <div className="mb-3">
                <label className="form-label">Number of Teams to Generate</label>
                <input
                  type="number"
                  className="form-control"
                  value={numTeams}
                  onChange={(e) => setNumTeams(parseInt(e.target.value))}
                  min="1"
                />
              </div>

              {/* Stadium Stats Section */}
              <div className="mb-4">
                <h6>Stadium and Match Conditions</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Pitch Type</label>
                    <select 
                      className="form-select"
                      value={stadiumStats.pitchType}
                      onChange={(e) => handleStadiumStatsChange('pitchType', e.target.value)}
                    >
                      <option value="Balanced">Balanced</option>
                      <option value="Batting-friendly">Batting-friendly</option>
                      <option value="Bowling-friendly">Bowling-friendly</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Average Ground Score</label>
                    <input
                      type="number"
                      className="form-control"
                      value={stadiumStats.avgScore}
                      onChange={(e) => handleStadiumStatsChange('avgScore', e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">1st Innings Score</label>
                    <input
                      type="number"
                      className="form-control"
                      value={stadiumStats.firstInningsScore}
                      onChange={(e) => handleStadiumStatsChange('firstInningsScore', e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">2nd Innings Score</label>
                    <input
                      type="number"
                      className="form-control"
                      value={stadiumStats.secondInningsScore}
                      onChange={(e) => handleStadiumStatsChange('secondInningsScore', e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Team Batting First</label>
                    <select
                      className="form-select"
                      value={stadiumStats.teamBattingFirst}
                      onChange={(e) => handleStadiumStatsChange('teamBattingFirst', e.target.value)}
                    >
                      <option value="">Select Team</option>
                      {teamNames.map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Predicted Winning Team:</label>
                    <select
                      value={winningTeam}
                      onChange={(e) => setWinningTeam(e.target.value)}
                      className="form-select"
                    >
                      <option value="">No Prediction</option>
                      {teamNames.map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Team Generation Strategy</label>
                    <select
                      className="form-select"
                      value={teamType}
                      onChange={(e) => handleTeamTypeChange(e.target.value)}
                    >
                      <option value="Safe">Safe</option>
                      <option value="Balanced">Balanced</option>
                      <option value="Risky">Risky</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Team Generation Strategy */}
              <div className="mb-4">
                <label className="form-label">Team Composition</label>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="composition-grid">
                  <div className="composition-type">
                    <h6 className="text-primary mb-2">Wicket Keepers</h6>
                    <div className="d-flex gap-2 align-items-center mb-2">
                      <div className="flex-grow-1">
                        <label className="small">Min</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={teamComposition.wk.min}
                          onChange={(e) => handleCompositionChange('wk', 'min', e.target.value)}
                          min="0"
                          max="4"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <label className="small">Max</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={teamComposition.wk.max}
                          onChange={(e) => handleCompositionChange('wk', 'max', e.target.value)}
                          min="1"
                          max="4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="composition-type">
                    <h6 className="text-primary mb-2">Batsmen</h6>
                    <div className="d-flex gap-2 align-items-center mb-2">
                      <div className="flex-grow-1">
                        <label className="small">Min</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={teamComposition.bat.min}
                          onChange={(e) => handleCompositionChange('bat', 'min', e.target.value)}
                          min="0"
                          max="6"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <label className="small">Max</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={teamComposition.bat.max}
                          onChange={(e) => handleCompositionChange('bat', 'max', e.target.value)}
                          min="1"
                          max="6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="composition-type">
                    <h6 className="text-primary mb-2">All Rounders</h6>
                    <div className="d-flex gap-2 align-items-center mb-2">
                      <div className="flex-grow-1">
                        <label className="small">Min</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={teamComposition.all.min}
                          onChange={(e) => handleCompositionChange('all', 'min', e.target.value)}
                          min="0"
                          max="4"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <label className="small">Max</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={teamComposition.all.max}
                          onChange={(e) => handleCompositionChange('all', 'max', e.target.value)}
                          min="1"
                          max="4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="composition-type">
                    <h6 className="text-primary mb-2">Bowlers</h6>
                    <div className="d-flex gap-2 align-items-center mb-2">
                      <div className="flex-grow-1">
                        <label className="small">Min</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={teamComposition.bowl.min}
                          onChange={(e) => handleCompositionChange('bowl', 'min', e.target.value)}
                          min="0"
                          max="6"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <label className="small">Max</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={teamComposition.bowl.max}
                          onChange={(e) => handleCompositionChange('bowl', 'max', e.target.value)}
                          min="1"
                          max="6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={generateTeams}
                disabled={!!error}
              >
                Generate Teams
              </button>
              {error && <div className="text-danger mt-2">{error}</div>}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          {generatedTeams.length > 0 && (
            <div className="mb-4">
              <h3>Generated Teams</h3>
              {generatedTeams.map((team, index) => (
                <GeneratedTeamCard 
                  key={index} 
                  team={team} 
                  index={index}
                  players={allPlayers}
                />
              ))}
              <div className="mt-3">
                {showSaveButton && (
                  <button 
                    className="btn btn-success me-2"
                    onClick={handleSaveTeams}
                  >
                    Save Teams
                  </button>
                )}
                <button 
                  className="btn btn-primary"
                  onClick={handleViewSavedTeams}
                >
                  View Saved Teams
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .fixed-players-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.5rem;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .player-select {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .player-select:hover {
          background: #e9ecef;
        }
        
        .player-select.selected {
          background: #cce5ff;
          border-color: #b8daff;
        }

        .player-select.captain-selected {
          background: #ffd700;
          border-color: #daa520;
        }

        .player-select.vc-selected {
          background: #c0c0c0;
          border-color: #a9a9a9;
        }
        
        .player-name {
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        
        .player-type {
          font-size: 0.8rem;
          color: #666;
        }

        .composition-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .composition-type {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .composition-type h6 {
          margin: 0;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default TeamSelection;
