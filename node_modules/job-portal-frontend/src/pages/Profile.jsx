import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';
import { Upload, X, User, Mail, Phone } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    skills: user?.skills || [],
  });
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill)) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await userAPI.updateUserProfile(profileData);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Please login to view your profile</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your professional information</p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg mb-8 border ${
              message.includes('success')
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        {/* Profile Header Card */}
        <div className="card p-8 mb-8">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={user.profilePicture || 'https://via.placeholder.com/96'}
                alt={user.firstName}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                <Upload size={16} />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              <div className="space-y-1 mt-2 text-gray-600">
                <p className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <User size={16} />
                  <span className="capitalize font-medium">{user.role}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="space-y-8">
          {/* Basic Info */}
          <div className="card p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="card p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">About You</h3>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself, your experience, and your goals..."
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            ></textarea>
          </div>

          {/* Skills */}
          <div className="card p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Skills</h3>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Add Skills
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  placeholder="e.g., React, Python, Project Management"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  onClick={addSkill}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap"
                >
                  Add
                </button>
              </div>
            </div>

            {profileData.skills.length > 0 ? (
              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">Your Skills ({profileData.skills.length})</p>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full flex items-center space-x-2 font-medium"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-blue-700 hover:text-blue-900 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-6">No skills added yet. Add your skills to improve your profile!</p>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-bold text-lg"
          >
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
