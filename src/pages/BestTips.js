import React from 'react';
import { FaTrophy, FaChartLine, FaUsers, FaLightbulb } from 'react-icons/fa';

const BestTips = () => {
  return (
    <div className="container">
      <h2 className="mb-4">Best Tips for Winning</h2>

      <div className="alert alert-primary">
        <FaTrophy className="me-2" />
        Follow these expert tips to increase your chances of winning!
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <FaChartLine className="me-2" />
                Research & Analysis
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Study player performance history</li>
                <li className="list-group-item">Check pitch and weather conditions</li>
                <li className="list-group-item">Analyze head-to-head statistics</li>
                <li className="list-group-item">Consider recent form of players</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <FaUsers className="me-2" />
                Team Selection
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Balance your team with both safe and risky picks</li>
                <li className="list-group-item">Choose players who bat in top order</li>
                <li className="list-group-item">Select players who can contribute in multiple ways</li>
                <li className="list-group-item">Don't ignore the impact players</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <FaLightbulb className="me-2" />
            Pro Strategies
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Captain Selection</h6>
              <ul>
                <li>Choose consistent performers</li>
                <li>Look for all-rounders</li>
                <li>Consider player's record against opponent</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6>Team Combination</h6>
              <ul>
                <li>Create a balanced team</li>
                <li>Don't ignore wicket-keepers</li>
                <li>Include power hitters</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-warning">
        <strong>Important Note:</strong> These tips are based on statistical analysis and expert
        opinions. Always use your own judgment and stay within your budget while playing.
      </div>

      <div className="card">
        <div className="card-body">
          <h5>Additional Resources</h5>
          <ul>
            <li>Check our daily match predictions</li>
            <li>Join our Telegram channel for instant updates</li>
            <li>Follow our YouTube channel for detailed analysis</li>
            <li>Use our team generator tool for better combinations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BestTips;
