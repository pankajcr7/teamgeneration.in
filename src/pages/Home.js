import React from 'react';
import { FaTrophy, FaUsers, FaChartLine } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1>Welcome to Team Generation</h1>
          <p className="lead">Create winning Dream11 teams with our advanced algorithms</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <FaTrophy className="mb-3" size={40} color="#ffd700" />
              <h5 className="card-title">Winning Teams</h5>
              <p className="card-text">Our algorithms analyze player statistics and create high-scoring teams.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <FaUsers className="mb-3" size={40} color="#563d7c" />
              <h5 className="card-title">Expert Community</h5>
              <p className="card-text">Join our community of successful Dream11 players and share strategies.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <FaChartLine className="mb-3" size={40} color="#28a745" />
              <h5 className="card-title">Data-Driven</h5>
              <p className="card-text">Make informed decisions with our comprehensive player analytics.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Latest Matches</h5>
              <div className="list-group">
                {/* This would be populated with real match data */}
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">IND vs AUS</h6>
                    <small>3 hrs</small>
                  </div>
                  <p className="mb-1">T20 World Cup 2023</p>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">ENG vs NZ</h6>
                    <small>5 hrs</small>
                  </div>
                  <p className="mb-1">ODI Series 2023</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
