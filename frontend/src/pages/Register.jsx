import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'jobSeeker',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/');
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Briefcase className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">JobPortal</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Our Community</h2>
          <p className="text-gray-600">Create an account to start your career journey</p>
        </div>

        {/* Form Container */}
        <div className="card p-8">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
                {errors.firstName && <p className="text-red-600 text-xs mt-2">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
                {errors.lastName && <p className="text-red-600 text-xs mt-2">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">I am a:</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                  style={{ borderColor: formData.role === 'jobSeeker' ? '#3b82f6' : '', backgroundColor: formData.role === 'jobSeeker' ? '#eff6ff' : '' }}>
                  <input
                    type="radio"
                    name="role"
                    value="jobSeeker"
                    checked={formData.role === 'jobSeeker'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Job Seeker</p>
                    <p className="text-xs text-gray-600">Looking for opportunities</p>
                  </div>
                </label>
                <label className="flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                  style={{ borderColor: formData.role === 'recruiter' ? '#3b82f6' : '', backgroundColor: formData.role === 'recruiter' ? '#eff6ff' : '' }}>
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={formData.role === 'recruiter'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Recruiter</p>
                    <p className="text-xs text-gray-600">Hiring talent</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-2">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <label className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" required />
              <span className="text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Creating account...' : 'Create Account'}</span>
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
