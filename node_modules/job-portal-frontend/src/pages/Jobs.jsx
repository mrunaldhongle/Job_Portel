import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import { jobAPI } from '../services/api';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    minSalary: searchParams.get('minSalary') || '',
    maxSalary: searchParams.get('maxSalary') || '',
    jobType: searchParams.get('jobType') || '',
    experienceLevel: searchParams.get('experienceLevel') || '',
  });

  useEffect(() => {
    fetchJobs();
  }, [currentPage, filters]);

  useEffect(() => {
    const nextFilters = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      location: searchParams.get('location') || '',
      minSalary: searchParams.get('minSalary') || '',
      maxSalary: searchParams.get('maxSalary') || '',
      jobType: searchParams.get('jobType') || '',
      experienceLevel: searchParams.get('experienceLevel') || '',
    };
    const nextPage = parseInt(searchParams.get('page') || '1', 10) || 1;

    const filtersChanged = Object.keys(nextFilters).some((key) => nextFilters[key] !== filters[key]);
    if (filtersChanged) {
      setFilters(nextFilters);
    }
    if (nextPage !== currentPage) {
      setCurrentPage(nextPage);
    }
  }, [searchParams, filters, currentPage]);

  const syncSearchParams = (nextFilters, nextPage) => {
    const params = {};
    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value !== '') params[key] = value;
    });
    if (nextPage > 1) params.page = String(nextPage);
    setSearchParams(params);
  };

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        ...filters,
        page: currentPage,
        limit: 12,
      };
      const response = await jobAPI.getAllJobs(params);
      setJobs(response.data.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
      setTotalPages(1);
      setError('Unable to load jobs. Make sure the backend is running and refresh.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchData) => {
    setFilters(searchData);
    setCurrentPage(1);
    syncSearchParams(searchData, 1);
  };

  const handleFilterChange = (filterName, value) => {
    const nextFilters = { ...filters, [filterName]: value };
    setFilters(nextFilters);
    setCurrentPage(1);
    syncSearchParams(nextFilters, 1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-lg text-gray-600">Browse through thousands of job opportunities</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <SearchBar
            onSearch={handleSearch}
            initialSearch={filters.search}
            initialLocation={filters.location}
            initialCategory={filters.category}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24 h-fit">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Refine Your Search</h3>

              {/* Salary Range */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Salary Range
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min salary"
                    value={filters.minSalary}
                    onChange={(e) => handleFilterChange('minSalary', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max salary"
                    value={filters.maxSalary}
                    onChange={(e) => handleFilterChange('maxSalary', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Job Type
                </label>
                <select
                  value={filters.jobType}
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Experience Level
                </label>
                <select
                  value={filters.experienceLevel}
                  onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Levels</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  const nextFilters = {
                    search: '',
                    category: '',
                    location: '',
                    minSalary: '',
                    maxSalary: '',
                    jobType: '',
                    experienceLevel: '',
                  };
                  setFilters(nextFilters);
                  setCurrentPage(1);
                  syncSearchParams(nextFilters, 1);
                }}
                className="w-full px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="lg:col-span-3">
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 mt-4">Loading jobs...</p>
              </div>
            ) : jobs.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600 font-medium">
                    Showing <span className="font-bold text-gray-900">{jobs.length}</span> jobs
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => {
                        const nextPage = Math.max(1, currentPage - 1);
                        setCurrentPage(nextPage);
                        syncSearchParams(filters, nextPage);
                      }}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx + 1}
                        onClick={() => {
                          const nextPage = idx + 1;
                          setCurrentPage(nextPage);
                          syncSearchParams(filters, nextPage);
                        }}
                        className={`px-4 py-2 rounded-lg transition ${
                          currentPage === idx + 1
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        const nextPage = Math.min(totalPages, currentPage + 1);
                        setCurrentPage(nextPage);
                        syncSearchParams(filters, nextPage);
                      }}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No jobs found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
