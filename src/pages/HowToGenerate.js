import React from 'react';
import { FaLightbulb, FaUserPlus, FaCog, FaCheck } from 'react-icons/fa';

const HowToGenerate = () => {
  return (
    <div className="container">
      <h2 className="mb-4">How to Generate Teams</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            <FaLightbulb className="me-2 text-warning" />
            Getting Started
          </h5>
          <p className="card-text">
            Our team generation system uses advanced algorithms to create winning combinations
            for Dream11. Follow these steps to generate your teams.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <FaUserPlus className="mb-3" size={40} color="#563d7c" />
              <h5>Step 1: Register</h5>
              <p>Create an account or login to access team generation features.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <FaCog className="mb-3" size={40} color="#28a745" />
              <h5>Step 2: Configure</h5>
              <p>Select match and set your preferences for team generation.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <FaCheck className="mb-3" size={40} color="#ffc107" />
              <h5>Step 3: Generate</h5>
              <p>Click generate and get your winning combinations!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Detailed Instructions</h5>
        </div>
        <div className="card-body">
          <ol className="list-group list-group-numbered">
            <li className="list-group-item">
              <h6>Select Match</h6>
              <p className="mb-0">Choose the upcoming match you want to play.</p>
            </li>
            <li className="list-group-item">
              <h6>Choose Players</h6>
              <p className="mb-0">Select your favorite players or let our system recommend them.</p>
            </li>
            <li className="list-group-item">
              <h6>Set Preferences</h6>
              <p className="mb-0">Configure team combination preferences (Captain, Vice-Captain, etc.).</p>
            </li>
            <li className="list-group-item">
              <h6>Generate Teams</h6>
              <p className="mb-0">Click generate and get multiple team combinations.</p>
            </li>
            <li className="list-group-item">
              <h6>Review and Edit</h6>
              <p className="mb-0">Review generated teams and make any final adjustments.</p>
            </li>
          </ol>
        </div>
      </div>

      <div className="alert alert-info mt-4">
        <strong>Pro Tip:</strong> Use our analytics feature to check player performance history
        and make informed decisions while selecting your team.
      </div>
    </div>
  );
};

export default HowToGenerate;
