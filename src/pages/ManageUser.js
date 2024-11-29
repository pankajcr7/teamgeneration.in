import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUserCheck, FaUserTimes } from 'react-icons/fa';

const ManageUser = () => {
  const [users] = useState([
    { id: 1, username: 'user1', email: 'user1@example.com', status: 'active', role: 'user' },
    { id: 2, username: 'user2', email: 'user2@example.com', status: 'inactive', role: 'user' },
    { id: 3, username: 'admin1', email: 'admin1@example.com', status: 'active', role: 'admin' },
  ]);

  const handleStatusToggle = (userId) => {
    // Toggle user status logic here
    console.log('Toggle status for user:', userId);
  };

  const handleEdit = (userId) => {
    // Edit user logic here
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId) => {
    // Delete user logic here
    console.log('Delete user:', userId);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Manage Users</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge bg-${user.role === 'admin' ? 'danger' : 'primary'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge bg-${user.status === 'active' ? 'success' : 'warning'}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleStatusToggle(user.id)}
                  >
                    {user.status === 'active' ? <FaUserTimes /> : <FaUserCheck />}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
