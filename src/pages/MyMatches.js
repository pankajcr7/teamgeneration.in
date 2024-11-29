import React from 'react';
import { FaGamepad, FaClock } from 'react-icons/fa';

const MyMatches = () => {
  return (
    <div className="container">
      <h2 className="mb-4">My Matches</h2>
      <div className="list-group">
        <div className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">
                <FaGamepad className="me-2" />
                India vs Australia
              </h5>
              <p className="mb-1 text-muted">
                <FaClock className="me-2" />
                Today, 2:30 PM
              </p>
            </div>
            <button className="btn btn-primary">View Teams</button>
          </div>
        </div>
      </div>
      
      <div className="alert alert-info mt-4">
        <p className="mb-0">No past matches to display.</p>
      </div>
    </div>
  );
};

export default MyMatches;
