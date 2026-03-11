import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, MapPin, Briefcase, Users, TrendingUp } from 'lucide-react';
import JobCard from '../components/JobCard';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import { jobAPI } from '../services/api';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([
    { name: 'Software Development', count: 0, icon: '💻' },
    { name: 'Marketing', count: 0, icon: '📊' },
    { name: 'Finance', count: 0, icon: '💰' },
    { name: 'Human Resources', count: 0, icon: '👥' },
    { name: 'Data Science', count: 0, icon: '📈' },
    { name: 'UI/UX Design', count: 0, icon: '🎨' },
  ]);
  const [stats, setStats] = useState({ totalJobs: 0 });
  const [selectedCategory, setSelectedCategory] = useState('Software');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jobsRes = await jobAPI.getAllJobs({ limit: 8 });
      setJobs(jobsRes.data.data);

      const statsRes = await jobAPI.getJobStatistics();
      setStats(statsRes.data.data);

      // Update category counts
      const updatedCategories = categories.map((cat) => ({
        ...cat,
        count: statsRes.data.data.jobsByCategory?.find((c) => c._id === cat.name)?.count || 0,
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    // Search is handled by navigating to jobs page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 text-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <span className="inline-block px-4 py-2 bg-blue-400/30 rounded-full text-sm font-semibold mb-6 border border-blue-300/50">
                Your Dream Job Awaits
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The Easiest Way to Get Your New Job
              </h1>
              <p className="text-xl text-blue-100 mb-8 opacity-90">
                Explore opportunities with all the top employers and find the perfect job that matches your skills and aspirations.
              </p>
              
              {/* Popular Tags */}
              <div className="mb-8">
                <p className="text-sm text-blue-200 uppercase font-semibold mb-4">Popular searches:</p>
                <div className="flex flex-wrap gap-3">
                  {['Content Writer', 'Finance', 'Human Resource', 'Management'].map((tag) => (
                    <button
                      key={tag}
                      className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full transition font-semibold border border-white/30 backdrop-blur-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-40 h-40 bg-white rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-white rounded-full opacity-10 blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20">
                  <Briefcase size={140} className="text-white mx-auto opacity-80" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-12">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:bg-blue-50 transition">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-6 shadow-md">
                <Briefcase className="text-blue-600" size={40} />
              </div>
              <h3 className="text-5xl font-bold text-gray-900 mb-2">{stats.totalJobs || 0}+</h3>
              <p className="text-gray-600 text-lg font-bold">Active Jobs</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-green-50 transition">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-6 shadow-md">
                <Users className="text-green-600" size={40} />
              </div>
              <h3 className="text-5xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600 text-lg font-bold">Active Job Seekers</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-purple-50 transition">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-6 shadow-md">
                <TrendingUp className="text-purple-600" size={40} />
              </div>
              <h3 className="text-5xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600 text-lg font-bold">Partner Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Browse by category</h2>
            <p className="text-xl text-gray-600 font-medium">Find the job that is perfect for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group card p-8 cursor-pointer bg-white hover:shadow-xl hover:border-blue-200"
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition">{category.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">{category.name}</h3>
                <p className="text-gray-600 font-semibold text-lg">{category.count} Jobs Available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-8 lg:mb-0">
              <h3 className="text-sm uppercase font-bold text-blue-600 mb-2">We are Hiring</h3>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Let's Work Together &<br />Explore Opportunities
              </h2>
              <p className="text-gray-600 text-lg">
                Join thousands of professionals finding their dream job
              </p>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-bold whitespace-nowrap"
            >
              <span>Apply Now</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Jobs of the Day */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Jobs of the day</h2>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-3">
              {['Software', 'Finance', 'Human Resource', 'Management', 'Marketing', 'Design'].map((cat) => (
                <button
                  key={cat}
                  className={`px-6 py-2 rounded-full font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No jobs available at the moment</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/jobs"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-bold text-lg"
            >
              <span>View All Jobs</span>
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to find your next opportunity?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of job seekers and employers on JobPortal
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            <span>Get Started Now</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
