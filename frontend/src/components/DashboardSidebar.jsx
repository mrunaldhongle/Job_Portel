import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Briefcase, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardSidebar = ({ isRecruiter = false }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const recruiterLinks = [
    { path: '/recruiter-dashboard', label: 'Dashboard', icon: <BarChart3 size={20} /> },
    { path: '/recruiter-dashboard/jobs', label: 'My Jobs', icon: <Briefcase size={20} /> },
    { path: '/recruiter-dashboard/applicants', label: 'Applicants', icon: <Users size={20} /> },
  ];

  const adminLinks = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: <BarChart3 size={20} /> },
    { path: '/admin-dashboard/users', label: 'Users', icon: <Users size={20} /> },
    { path: '/admin-dashboard/jobs', label: 'Jobs', icon: <Briefcase size={20} /> },
  ];

  const links = isRecruiter ? recruiterLinks : adminLinks;

  return (
    <div className="w-64 bg-dark text-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold gradient-text mb-8">JobPortal</h2>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                location.pathname === link.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-400 hover:bg-gray-700 rounded-lg transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
