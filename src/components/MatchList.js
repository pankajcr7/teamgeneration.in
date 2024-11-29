import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MatchList = ({ userRole }) => {
  const navigate = useNavigate();
  const [matches] = useState([
    {
      id: 1,
      team1: "India",
      team2: "Australia",
      date: "2024-01-20",
      time: "14:00",
      venue: "Mumbai"
    },
    {
      id: 2,
      team1: "England",
      team2: "South Africa",
      date: "2024-01-21",
      time: "19:00",
      venue: "London"
    },
    {
      id: 3,
      team1: "New Zealand",
      team2: "Pakistan",
      date: "2024-01-22",
      time: "15:30",
      venue: "Wellington"
    }
  ]);

  const handleMatchClick = (matchId) => {
    navigate(`/match/${matchId}`);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Upcoming Matches</h3>
      <div className="row">
        {matches.map((match) => (
          <div key={match.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card match-card h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{match.team1} vs {match.team2}</h5>
              </div>
              <div className="card-body">
                <p className="mb-2">
                  <strong>Date:</strong> {match.date}
                </p>
                <p className="mb-2">
                  <strong>Time:</strong> {match.time}
                </p>
                <p className="mb-2">
                  <strong>Venue:</strong> {match.venue}
                </p>
                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => handleMatchClick(match.id)}
                >
                  {userRole === 'admin' ? 'Add Players' : 'Select Team'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchList;
