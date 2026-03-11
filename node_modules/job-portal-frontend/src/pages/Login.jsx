import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Briefcase, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-3 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-2.5 rounded-lg shadow-lg">
              <Briefcase className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">JobPortal</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h2>
          <p className="text-gray-600 font-medium">Sign in to access your account and find great opportunities</p>
        </div>

        {/* Form Container */}
        <div className="card p-8 shadow-xl border-blue-100">
          {errors.general && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-lg mb-6 font-bold">
              ✕ {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-blue-500 group-focus-within:text-blue-600" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition"
                  required
                />
              </div>
              {errors.email && <p className="text-red-600 text-sm mt-2 font-bold">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-blue-500 group-focus-within:text-blue-600" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition"
                  required
                />
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-2 font-bold">{errors.password}</p>}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-2 border-gray-300 accent-blue-600" />
                <span className="text-gray-700 font-bold group-hover:text-blue-600 transition">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-600 font-bold">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="py-3 border-2 border-gray-300 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition font-bold text-gray-800 shadow-sm">
              Google
            </button>
            <button className="py-3 border-2 border-gray-300 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition font-bold text-gray-800 shadow-sm">
              GitHub
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-700 mt-8 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
