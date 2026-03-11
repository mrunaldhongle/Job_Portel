import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Recruiters = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <Briefcase size={40} className="text-blue-600" />,
      title: 'Post Jobs Easily',
      description: 'Create and manage job postings in minutes with our intuitive posting tool.',
    },
    {
      icon: <Users size={40} className="text-blue-600" />,
      title: 'Find Top Talent',
      description: 'Access thousands of qualified job seekers and build your ideal team.',
    },
    {
      icon: <TrendingUp size={40} className="text-blue-600" />,
      title: 'Analytics Dashboard',
      description: 'Track applications, manage candidates, and make data-driven hiring decisions.',
    },
    {
      icon: <CheckCircle size={40} className="text-blue-600" />,
      title: 'Verified Candidates',
      description: 'All candidates are pre-screened and verified to ensure quality applicants.',
    },
  ];

  const handleGetStarted = () => {
    if (user?.role === 'recruiter') {
      navigate('/recruiter-dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Hire the Best Talent</h1>
          <p className="text-xl text-blue-100 mb-8">
            Post jobs, find qualified candidates, and build your dream team with ease.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:shadow-xl transition inline-flex items-center space-x-2"
          >
            <span>{user?.role === 'recruiter' ? 'Go to Dashboard' : 'Get Started'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose JobPortal for Recruiting?</h2>
            <p className="text-xl text-gray-600">Everything you need to find, manage, and hire top talent</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 hover:shadow-xl transition">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-600 mb-2">500+</h3>
              <p className="text-gray-600 text-lg font-medium">Active Companies</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-600 mb-2">50K+</h3>
              <p className="text-gray-600 text-lg font-medium">Successful Hires</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-600 mb-2">1M+</h3>
              <p className="text-gray-600 text-lg font-medium">Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Hire?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of companies using JobPortal to find and hire top talent.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition"
          >
            Start Posting Jobs Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Recruiters;
