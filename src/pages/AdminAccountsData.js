import React from 'react';
import { FaMoneyBill, FaUsers, FaChartLine } from 'react-icons/fa';

const AdminAccountsData = () => {
  return (
    <div className="container">
      <h2 className="mb-4">Admin Accounts Data</h2>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaMoneyBill className="mb-3" size={40} color="#28a745" />
              <h5>Monthly Revenue</h5>
              <h3>₹45,678</h3>
              <p className="text-success">+15% from last month</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaUsers className="mb-3" size={40} color="#563d7c" />
              <h5>New Users</h5>
              <h3>234</h3>
              <p className="text-success">+25% from last month</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaChartLine className="mb-3" size={40} color="#ffc107" />
              <h5>Conversion Rate</h5>
              <h3>12.5%</h3>
              <p className="text-danger">-2% from last month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Recent Transactions</h5>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023-06-01</td>
                <td>user123</td>
                <td>Premium</td>
                <td>₹999</td>
                <td><span className="badge bg-success">Completed</span></td>
              </tr>
              <tr>
                <td>2023-06-01</td>
                <td>user456</td>
                <td>Basic</td>
                <td>₹499</td>
                <td><span className="badge bg-success">Completed</span></td>
              </tr>
              <tr>
                <td>2023-05-31</td>
                <td>user789</td>
                <td>Premium</td>
                <td>₹999</td>
                <td><span className="badge bg-warning">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountsData;
