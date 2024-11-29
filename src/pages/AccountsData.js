import React from 'react';
import { FaChartBar, FaUsers, FaMoneyBill } from 'react-icons/fa';

const AccountsData = () => {
  return (
    <div className="container">
      <h2 className="mb-4">Accounts Data</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaUsers className="mb-3" size={40} color="#563d7c" />
              <h5>Total Users</h5>
              <h3>1,234</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaChartBar className="mb-3" size={40} color="#28a745" />
              <h5>Active Subscriptions</h5>
              <h3>856</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaMoneyBill className="mb-3" size={40} color="#ffc107" />
              <h5>Total Revenue</h5>
              <h3>₹123,456</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsData;
