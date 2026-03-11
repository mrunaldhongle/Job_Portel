import React, { useEffect, useState } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

const SearchBar = ({ onSearch, initialSearch = '', initialLocation = '', initialCategory = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ search: searchTerm, location, category });
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="bg-gradient-to-r from-white via-blue-50 to-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Keywords Input */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-800 mb-3">Keywords</label>
            <div className="relative group">
              <Search className="absolute left-4 top-3.5 text-blue-500 group-focus-within:text-blue-600" size={20} />
              <input
                type="text"
                placeholder="Job title, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition"
              />
            </div>
          </div>

          {/* Industry Dropdown */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-800 mb-3">Industry</label>
            <div className="relative group">
              <Briefcase className="absolute left-4 top-3.5 text-blue-500 pointer-events-none" size={20} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition appearance-none bg-white font-medium"
              >
                <option value="">All Industries</option>
                <option value="Software Development">Software</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Human Resources">HR</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX Design">Design</option>
              </select>
            </div>
          </div>

          {/* Location Input */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-800 mb-3">Location</label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-3.5 text-blue-500 group-focus-within:text-blue-600" size={20} />
              <input
                type="text"
                placeholder="City or region..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 transition font-bold flex items-center justify-center space-x-2 hover:shadow-lg shadow-md text-base"
            >
              <Search size={20} />
              <span>Search Jobs</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
