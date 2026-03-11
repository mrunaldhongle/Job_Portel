import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import { jobAPI, applicationAPI } from '../services/api';
import { Briefcase, Users, TrendingUp } from 'lucide-react';

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
  });
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    jobTitle: '',
    companyName: '',
    description: '',
    location: '',
    category: '',
    salary: { min: 0, max: 0 },
    jobType: 'Full Time',
    experienceLevel: 'Mid Level',
    skills: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [jobsRes, applicationsRes] = await Promise.all([
        jobAPI.getRecruiterJobs(),
        applicationAPI.getRecruiterApplications(),
      ]);

      setJobs(jobsRes.data.data);
      setApplications(applicationsRes.data.data);

      setStats({
        totalJobs: jobsRes.data.count,
        totalApplications: applicationsRes.data.count,
        activeJobs: jobsRes.data.data.filter((j) => j.status === 'Active').length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await jobAPI.createJob(newJob);
      setShowJobForm(false);
      setNewJob({
        jobTitle: '',
        companyName: '',
        description: '',
        location: '',
        category: '',
        salary: { min: 0, max: 0 },
        jobType: 'Full Time',
        experienceLevel: 'Mid Level',
        skills: [],
      });
      fetchDashboardData();
    } catch (error) {
      alert('Failed to create job');
    }
  };

  return (
    <div className="flex min-h-screen bg-light">
      <DashboardSidebar isRecruiter={true} />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Recruiter Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your job listings and view applications</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-dark">{stats.totalJobs}</p>
              </div>
              <Briefcase size={40} className="text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Jobs</p>
                <p className="text-3xl font-bold text-dark">{stats.activeJobs}</p>
              </div>
              <TrendingUp size={40} className="text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Applications</p>
                <p className="text-3xl font-bold text-dark">{stats.totalApplications}</p>
              </div>
              <Users size={40} className="text-purple-600" />
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
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === 'jobs'
                  ? 'text-blue-600 border-b-blue-600'
                  : 'text-gray-600 border-b-transparent'
              }`}
            >
              My Jobs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === 'applications'
                  ? 'text-blue-600 border-b-blue-600'
                  : 'text-gray-600 border-b-transparent'
              }`}
            >
              Applications
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <button
                onClick={() => setShowJobForm(!showJobForm)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold mb-6"
              >
                {showJobForm ? 'Cancel' : 'Post New Job'}
              </button>

              {showJobForm && (
                <form onSubmit={handleCreateJob} className="space-y-6 p-8 bg-gray-50 rounded-lg mb-8">
                  <div className="grid grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={newJob.jobTitle}
                      onChange={(e) => setNewJob({ ...newJob, jobTitle: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={newJob.companyName}
                      onChange={(e) => setNewJob({ ...newJob, companyName: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <textarea
                    placeholder="Job Description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Post Job
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div>
              <h3 className="text-xl font-semibold text-dark mb-4">Your Job Listings</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left px-4 py-3 text-gray-700">Job Title</th>
                      <th className="text-left px-4 py-3 text-gray-700">Location</th>
                      <th className="text-left px-4 py-3 text-gray-700">Status</th>
                      <th className="text-left px-4 py-3 text-gray-700">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-dark">{job.jobTitle}</p>
                        </td>
                        <td className="px-4 py-3">{job.location}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              job.status === 'Active'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{job.applicantsCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div>
              <h3 className="text-xl font-semibold text-dark mb-4">Received Applications</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left px-4 py-3 text-gray-700">Candidate</th>
                      <th className="text-left px-4 py-3 text-gray-700">Job</th>
                      <th className="text-left px-4 py-3 text-gray-700">Status</th>
                      <th className="text-left px-4 py-3 text-gray-700">Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-dark">
                            {app.userId.firstName} {app.userId.lastName}
                          </p>
                        </td>
                        <td className="px-4 py-3">{app.jobId.jobTitle}</td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                            {app.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
