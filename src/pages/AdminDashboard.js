import React from 'react';
import { FaUsers, FaMoneyBill, FaCog, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaUsers className="mb-3" size={40} color="#563d7c" />
              <h5>Active Users</h5>
              <h3>523</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaMoneyBill className="mb-3" size={40} color="#28a745" />
              <h5>Today's Revenue</h5>
              <h3>₹12,345</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaCog className="mb-3" size={40} color="#ffc107" />
              <h5>Teams Generated</h5>
              <h3>1,234</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaChartLine className="mb-3" size={40} color="#dc3545" />
              <h5>Success Rate</h5>
              <h3>85%</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              Recent Activities
            </div>
            <div className="list-group list-group-flush">
              <div className="list-group-item">New user registration</div>
              <div className="list-group-item">Team generation request</div>
              <div className="list-group-item">Payment received</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              System Status
            </div>
            <div className="list-group list-group-flush">
              <div className="list-group-item">Server Load: Normal</div>
              <div className="list-group-item">API Status: Online</div>
              <div className="list-group-item">Database: Healthy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
