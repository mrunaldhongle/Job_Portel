import React from "react";
import { Link } from "react-router-dom";
import { MapPin, DollarSign, Briefcase, ArrowRight, Heart } from "lucide-react";
import googleLogo from "../assets/google.png";
import microsoftLogo from "../assets/Microsoft.png";
import amazonLogo from "../assets/amazon.png";
import adobeLogo from "../assets/Adobe.png";
import ibmLogo from "../assets/IBM.png";
import githubLogo from "../assets/github.png";

const JobCard = ({ job }) => {
  const fallbackLogo =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><rect width='96' height='96' rx='16' fill='%23EFF6FF'/><text x='50%25' y='54%25' text-anchor='middle' font-family='Arial' font-size='20' fill='%233B82F6' font-weight='700'>LOGO</text></svg>";

  const companyLogos = {
    Google: googleLogo,
    Microsoft: microsoftLogo,
    Amazon: amazonLogo,
    Adobe: adobeLogo,
    IBM: ibmLogo,
    GitHub: githubLogo,
    "Tech Innovations Inc": googleLogo,
    "Digital Solutions Ltd": microsoftLogo,
    "Creative Studio Co": adobeLogo,
    "Analytics Corp": ibmLogo,
    "StartupXYZ": githubLogo,
    "Finance Consultants": amazonLogo,
    "Brand Marketing Hub": amazonLogo,
    "People First Consulting": microsoftLogo,
  };

  const logoSrc = companyLogos[job.companyName] || fallbackLogo;

  return (
    <Link to={`/job-details/${job._id}`}>
      <div className="card p-7 cursor-pointer h-full flex flex-col hover:shadow-2xl border-blue-100 hover:border-blue-300 hover:scale-105 transition-all">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">

          <img
            src={logoSrc}
            alt={job.companyName}
            className="w-14 h-14 rounded-xl object-contain bg-white p-1 border"
            onError={(e) => {
              e.target.src = fallbackLogo;
            }}
          />

          <button className="p-2.5 hover:bg-red-50 rounded-lg transition">
            <Heart size={22} className="text-gray-300 hover:text-red-500 transition" />
          </button>

        </div>

        {/* Job Type */}
        <div className="mb-4">
          <span className="inline-block px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
            {job.jobType || "Full-time"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-2 hover:text-blue-600 transition">
          {job.jobTitle}
        </h3>

        {/* Company */}
        <p className="text-gray-600 text-sm font-bold mb-5">
          {job.companyName}
        </p>

        {/* Job Info */}
        <div className="space-y-3 mb-5 flex-1">

          <div className="flex items-center space-x-2.5 text-gray-700">
            <MapPin size={18} className="text-blue-500 flex-shrink-0" />
            <span className="text-sm font-medium">{job.location}</span>
          </div>

          <div className="flex items-center space-x-2.5 text-gray-700">
            <DollarSign size={18} className="text-green-500 flex-shrink-0" />
            <span className="text-sm font-bold">
              ${job.salary?.min?.toLocaleString() || "0"} - $
              {job.salary?.max?.toLocaleString() || "0"}
            </span>
          </div>

          <div className="flex items-center space-x-2.5 text-gray-700">
            <Briefcase size={18} className="text-purple-500 flex-shrink-0" />
            <span className="text-sm font-medium">
              {job.experienceLevel || "Mid-level"}
            </span>
          </div>

        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 flex-1 leading-relaxed">
          {job.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">

          {job.skills?.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold border border-blue-200"
            >
              {skill}
            </span>
          ))}

          {job.skills?.length > 3 && (
            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
              +{job.skills.length - 3}
            </span>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-200 group">
          <span className="text-xs font-semibold text-gray-500">
            Posted recently
          </span>

          <ArrowRight
            size={18}
            className="text-blue-600 group-hover:translate-x-1 transition"
          />
        </div>

      </div>
    </Link>
  );
};

export default JobCard;
