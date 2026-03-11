import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import { userAPI, jobAPI } from '../services/api';
import { Users, Briefcase, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
  });
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [usersRes, jobsRes] = await Promise.all([
        userAPI.getAllUsers(),
        jobAPI.getJobStatistics(),
      ]);

      setUsers(usersRes.data.data);
      setStats({
        totalUsers: usersRes.data.count,
        totalJobs: jobsRes.data.data.totalJobs,
        totalApplications: 0, // Would need a separate API call
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(userId);
        setUsers(users.filter((u) => u._id !== userId));
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-light">
      <DashboardSidebar isRecruiter={false} />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage users, jobs, and platform statistics</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-dark">{stats.totalUsers}</p>
              </div>
              <Users size={40} className="text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-dark">{stats.totalJobs}</p>
              </div>
              <Briefcase size={40} className="text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-dark">{stats.totalApplications}</p>
              </div>
              <TrendingUp size={40} className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4 mb-8 border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-blue-600'
                  : 'text-gray-600 border-b-transparent'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-blue-600'
                  : 'text-gray-600 border-b-transparent'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === 'jobs'
                  ? 'text-blue-600 border-b-blue-600'
                  : 'text-gray-600 border-b-transparent'
              }`}
            >
              Jobs
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-semibold text-dark mb-4">Platform Overview</h3>
              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-gray-600 mb-4">
                  Welcome to the admin dashboard. Here you can view platform statistics and manage all users and jobs.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Monitor total users, jobs, and applications</li>
                  <li>• Manage user accounts and permissions</li>
                  <li>• Approve or reject job postings</li>
                  <li>• View platform analytics and statistics</li>
                </ul>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h3 className="text-xl font-semibold text-dark mb-4">Manage Users</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left px-4 py-3 text-gray-700">Name</th>
                      <th className="text-left px-4 py-3 text-gray-700">Email</th>
                      <th className="text-left px-4 py-3 text-gray-700">Role</th>
                      <th className="text-left px-4 py-3 text-gray-700">Joined</th>
                      <th className="text-left px-4 py-3 text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-dark">
                            {user.firstName} {user.lastName}
                          </p>
                        </td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm capitalize">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div>
              <h3 className="text-xl font-semibold text-dark mb-4">Manage Jobs</h3>
              <p className="text-gray-600">Job management features coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
