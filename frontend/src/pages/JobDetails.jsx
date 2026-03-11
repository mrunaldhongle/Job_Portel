import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase, ArrowRight, ArrowLeft, Share2 } from 'lucide-react';
import { jobAPI, applicationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyData, setApplyData] = useState({
    resumeURL: '',
    coverLetter: '',
  });
  const fallbackLogo =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><rect width='96' height='96' rx='16' fill='%23EFF6FF'/><text x='50%25' y='54%25' text-anchor='middle' font-family='Arial' font-size='20' fill='%233B82F6' font-weight='700'>LOGO</text></svg>";
  const buildLogoUrl = (website) => {
    if (!website) return '';
    const trimmed = website.trim();
    if (!trimmed) return '';
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      const url = new URL(withProtocol);
      return `https://logo.clearbit.com/${url.hostname}`;
    } catch {
      return '';
    }
  };
  const buildLogoUrlFromCompany = (companyName) => {
    if (!companyName) return '';
    const cleaned = companyName
      .toLowerCase()
      .replace(/\b(inc|ltd|llc|limited|corp|corporation|company|co|pvt|private)\b/g, '')
      .replace(/[^a-z0-9]/g, '');
    if (!cleaned) return '';
    return `https://logo.clearbit.com/${cleaned}.com`;
  };
  const logoSrc =
    job?.companyLogo ||
    buildLogoUrl(job?.companyWebsite) ||
    buildLogoUrlFromCompany(job?.companyName) ||
    fallbackLogo;

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await jobAPI.getJobById(id);
      setJob(response.data.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      await applicationAPI.applyJob({
        jobId: id,
        resumeURL: applyData.resumeURL,
        coverLetter: applyData.coverLetter,
      });
      alert('Applied successfully!');
      setShowApplyModal(false);
      setApplyData({ resumeURL: '', coverLetter: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <p className="text-lg text-gray-600">Job not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Jobs</span>
        </button>

        {/* Job Header Card */}
        <div className="card p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-6">
            <div className="flex items-start space-x-6">
              <img
                src={logoSrc}
                alt={job.companyName}
                className="w-24 h-24 rounded-xl object-cover bg-gray-100"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackLogo;
                }}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    {job.jobType}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.jobTitle}</h1>
                <p className="text-xl text-gray-600 mb-4">{job.companyName}</p>
                <div className="flex flex-wrap gap-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin size={20} className="text-gray-400" />
                    <span className="font-medium">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign size={20} className="text-gray-400" />
                    <span className="font-bold text-gray-900">
                      ${job.salary?.min?.toLocaleString() || '0'} - ${job.salary?.max?.toLocaleString() || '0'}/hr
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase size={20} className="text-gray-400" />
                    <span className="font-medium">{job.experienceLevel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => user ? setShowApplyModal(true) : navigate('/login')}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <span>Apply Now</span>
                <ArrowRight size={20} />
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition flex items-center justify-center">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-4 text-gray-700">
                      <span className="text-blue-600 font-bold text-xl mt-0">✓</span>
                      <span className="pt-0.5">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Meta */}
            <div className="card p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Job Details</h3>
              <div className="space-y-5">
                <div className="pb-5 border-b border-gray-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">Job Type</p>
                  <p className="font-bold text-gray-900">{job.jobType}</p>
                </div>
                <div className="pb-5 border-b border-gray-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">Experience Level</p>
                  <p className="font-bold text-gray-900">{job.experienceLevel}</p>
                </div>
                <div className="pb-5 border-b border-gray-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">Total Applicants</p>
                  <p className="font-bold text-gray-900">{job.applicantsCount || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Posted Date</p>
                  <p className="font-bold text-gray-900">
                    {new Date(job.postedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for this job</h2>
            <p className="text-gray-600 mb-6">{job.jobTitle} at {job.companyName}</p>
            <form onSubmit={handleApply} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Resume URL
                </label>
                <input
                  type="text"
                  value={applyData.resumeURL}
                  onChange={(e) =>
                    setApplyData((prev) => ({ ...prev, resumeURL: e.target.value }))
                  }
                  placeholder="https://example.com/resume.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={applyData.coverLetter}
                  onChange={(e) =>
                    setApplyData((prev) => ({ ...prev, coverLetter: e.target.value }))
                  }
                  placeholder="Tell us why you're a great fit..."
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={applying}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
                >
                  {applying ? 'Applying...' : 'Submit Application'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
