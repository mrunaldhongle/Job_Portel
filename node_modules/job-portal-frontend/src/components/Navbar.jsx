import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, User, Briefcase } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-2xl hover:scale-105 transition">
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-2 rounded-lg">
              <Briefcase className="text-white" size={24} />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">JobPortal</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-10 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-bold transition relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></span>
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-bold transition relative group">
              Find a Job
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></span>
            </Link>
            <Link to="/recruiters" className="text-gray-700 hover:text-blue-600 font-bold transition relative group">
              Recruiters
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></span>
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-bold transition relative group">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-bold transition relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="px-6 py-2.5 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-bold shadow-sm"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition font-bold shadow-md hover:shadow-lg"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-3 hover:bg-blue-50 px-4 py-2 rounded-lg transition border border-transparent hover:border-blue-200"
                >
                  <img
                    src={user.profilePicture || 'https://via.placeholder.com/32'}
                    alt={user.firstName}
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-200"
                  />
                  <span className="text-gray-800 font-bold">{user.firstName}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl p-2 border border-blue-100">
                    <Link
                      to="/profile"
                      className="flex px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition items-center space-x-3 font-bold hover:text-blue-600"
                    >
                      <User size={20} />
                      <span>My Profile</span>
                    </Link>
                    {user?.role === 'recruiter' && (
                      <Link
                        to="/recruiter-dashboard"
                        className="flex px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition items-center space-x-3 font-bold hover:text-blue-600"
                      >
                        <Briefcase size={20} />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition items-center space-x-3 font-bold"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 hover:bg-blue-50 rounded-lg transition"
          >
            {menuOpen ? <X size={28} className="text-blue-600" /> : <Menu size={28} className="text-blue-600" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t border-blue-100 pt-4">
            <Link
              to="/"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-bold transition"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-bold transition"
            >
              Find Jobs
            </Link>
            <Link
              to="/recruiters"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-bold transition"
            >
              Recruiters
            </Link>
            <Link
              to="/blog"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-bold transition"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-bold transition"
            >
              About
            </Link>
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 text-blue-600 font-bold hover:bg-blue-50 rounded-lg transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-bold transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-bold transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
