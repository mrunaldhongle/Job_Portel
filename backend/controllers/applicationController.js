const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const sendEmail = require('../utils/emailUtils');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private/JobSeeker
exports.applyJob = async (req, res, next) => {
  try {
    const { jobId, resumeURL, coverLetter } = req.body;

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'Job ID is required' });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      userId: req.userId,
      jobId,
    });

    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied for this job' });
    }

    // Create application
    const application = await Application.create({
      userId: req.userId,
      jobId,
      resumeURL,
      coverLetter,
    });

    // Update job applicants count
    job.applicantsCount += 1;
    await job.save();

    // Send email notification to recruiter
    const recruiter = await User.findById(job.recruiterId);
    const jobSeeker = await User.findById(req.userId);

    const mailOptions = {
      email: recruiter.email,
      subject: `New Application for ${job.jobTitle}`,
      message: `<p>Hi ${recruiter.firstName},</p>
      <p>${jobSeeker.firstName} ${jobSeeker.lastName} has applied for the position of ${job.jobTitle}.</p>
      <p>Email: ${jobSeeker.email}</p>
      <p>Check the dashboard to view the application.</p>`,
    };

    await sendEmail(mailOptions);

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user applications
// @route   GET /api/applications/user
// @access  Private/JobSeeker
exports.getUserApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ userId: req.userId })
      .populate('jobId')
      .populate('userId', 'firstName lastName email profilePicture');

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get recruiter applications
// @route   GET /api/applications/recruiter
// @access  Private/Recruiter
exports.getRecruiterApplications = async (req, res, next) => {
  try {
    // Get all jobs posted by this recruiter
    const jobs = await Job.find({ recruiterId: req.userId });
    const jobIds = jobs.map((job) => job._id);

    // Get all applications for those jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('jobId')
      .populate('userId', 'firstName lastName email phone resume profilePicture skills');

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get applications for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private/Recruiter
exports.getJobApplications = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to view these applications' });
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('userId', 'firstName lastName email phone resume profilePicture skills');

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private/Recruiter
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, interviewDate, ratingByRecruiter, feedbackByRecruiter } = req.body;

    let application = await Application.findById(req.params.id).populate('jobId userId');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Check if user is the recruiter
    if (application.jobId.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this application' });
    }

    application.status = status || application.status;
    application.interviewDate = interviewDate || application.interviewDate;
    application.ratingByRecruiter = ratingByRecruiter || application.ratingByRecruiter;
    application.feedbackByRecruiter = feedbackByRecruiter || application.feedbackByRecruiter;

    await application.save();

    // Send email notification to job seeker
    const mailOptions = {
      email: application.userId.email,
      subject: `Application Status Update - ${application.jobId.jobTitle}`,
      message: `<p>Hi ${application.userId.firstName},</p>
      <p>Your application status for ${application.jobId.jobTitle} has been updated to: <strong>${status}</strong></p>
      <p>Keep checking your dashboard for further updates.</p>`,
    };

    await sendEmail(mailOptions);

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Withdraw application
// @route   DELETE /api/applications/:id
// @access  Private/JobSeeker
exports.withdrawApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to withdraw this application' });
    }

    const job = await Job.findById(application.jobId);
    if (job) {
      job.applicantsCount = Math.max(0, job.applicantsCount - 1);
      await job.save();
    }

    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Application withdrawn successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
