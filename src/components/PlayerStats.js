import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';

const PlayerStats = ({ 
  player, 
  onStatsChange,
  stadiumStats, 
  onStadiumStatsChange, 
  teamType,
  onTeamTypeChange,
  teams = [] 
}) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <h5 className="mb-3">Player Statistics - {player.name}</h5>
        
        {/* Player Attributes */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Average Points</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={player.stats?.avgPoints || ''}
                onChange={(e) => onStatsChange(player.id, 'avgPoints', parseFloat(e.target.value))}
                placeholder="Enter average points"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Selection Percentage</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                value={player.stats?.selectionPercentage || ''}
                onChange={(e) => onStatsChange(player.id, 'selectionPercentage', parseInt(e.target.value))}
                placeholder="Enter selection %"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Stadium Statistics */}
        <h5 className="mb-3">Stadium Statistics</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Pitch Type</Form.Label>
              <Form.Select
                value={stadiumStats.pitchType || ''}
                onChange={(e) => onStadiumStatsChange('pitchType', e.target.value)}
              >
                <option value="">Select pitch type</option>
                <option value="Bowling-friendly">Bowling-friendly</option>
                <option value="Batting-friendly">Batting-friendly</option>
                <option value="Balanced">Balanced</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Average Score on Ground</Form.Label>
              <Form.Control
                type="number"
                value={stadiumStats.avgScore || ''}
                onChange={(e) => onStadiumStatsChange('avgScore', parseInt(e.target.value))}
                placeholder="Enter average score"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>1st Innings Score</Form.Label>
              <Form.Control
                type="number"
                value={stadiumStats.firstInningsScore || ''}
                onChange={(e) => onStadiumStatsChange('firstInningsScore', parseInt(e.target.value))}
                placeholder="Enter 1st innings score"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>2nd Innings Score</Form.Label>
              <Form.Control
                type="number"
                value={stadiumStats.secondInningsScore || ''}
                onChange={(e) => onStadiumStatsChange('secondInningsScore', parseInt(e.target.value))}
                placeholder="Enter 2nd innings score"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Team Batting First</Form.Label>
              <Form.Select
                value={stadiumStats.teamBattingFirst || ''}
                onChange={(e) => onStadiumStatsChange('teamBattingFirst', e.target.value)}
              >
                <option value="">Select team batting first</option>
                {teams.map((team, index) => (
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Team Generation Strategy */}
        <h5 className="mb-3">Team Generation Strategy</h5>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Team Type</Form.Label>
              <Form.Select
                value={teamType || ''}
                onChange={(e) => onTeamTypeChange(e.target.value)}
              >
                <option value="">Select team type</option>
                <option value="Safe">Safe (High-performing & consistent players)</option>
                <option value="Balanced">Balanced (Mix of consistent & high-potential players)</option>
                <option value="Risky">Risky (High-potential underpicked players)</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PlayerStats;
