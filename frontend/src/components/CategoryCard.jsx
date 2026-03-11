import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Briefcase, BarChart3, Users, PenTool, LineChart, ArrowRight } from 'lucide-react';

const categoryIcons = {
  'Software Development': <Code size={40} />,
  'Marketing': <Briefcase size={40} />,
  'Finance': <BarChart3 size={40} />,
  'Human Resources': <Users size={40} />,
  'UI/UX Design': <PenTool size={40} />,
  'Data Science': <LineChart size={40} />,
};

const CategoryCard = ({ category, jobCount }) => {
  return (
    <Link
      to={`/jobs?category=${category}`}
      className="card p-8 text-center cursor-pointer group"
    >
      <div className="flex justify-center mb-6 text-blue-600 group-hover:scale-110 transition transform">
        {categoryIcons[category] || <Briefcase size={40} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">{category}</h3>
      <p className="text-gray-600 mb-4 font-medium">{jobCount} Jobs Available</p>
      <div className="flex items-center justify-center space-x-1 text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition">
        <span>View Jobs</span>
        <ArrowRight size={16} />
      </div>
    </Link>
  );
};

export default CategoryCard;
