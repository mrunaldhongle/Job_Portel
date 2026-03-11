const Job = require('../models/Job');

// @desc    Get all jobs with filters and search
// @route   GET /api/jobs
// @access  Public
exports.getAllJobs = async (req, res, next) => {
  try {
    const { search, category, location, minSalary, maxSalary, jobType, experienceLevel, sort, page = 1, limit = 10 } = req.query;

    let query = { status: 'Active' };

    // Search by job title, company name, or skills
    if (search) {
      query.$or = [
        { jobTitle: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Filter by salary range
    if (minSalary || maxSalary) {
      query['salary.min'] = { $gte: minSalary || 0 };
      query['salary.max'] = { $lte: maxSalary || Infinity };
    }

    // Filter by job type
    if (jobType) {
      query.jobType = jobType;
    }

    // Filter by experience level
    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }

    // Sort
    let sortBy = '-postedDate';
    if (sort === 'salary') {
      sortBy = '-salary.max';
    } else if (sort === 'latest') {
      sortBy = '-postedDate';
    }

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * pageSize;

    // Execute query
    const jobs = await Job.find(query)
      .populate('recruiterId', 'firstName lastName profilePicture')
      .sort(sortBy)
      .skip(skip)
      .limit(pageSize);

    const total = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / pageSize),
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('recruiterId', 'firstName lastName profilePicture email phone');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create job
// @route   POST /api/jobs
// @access  Private/Recruiter
exports.createJob = async (req, res, next) => {
  try {
    const { jobTitle, companyName, companyWebsite, companyLogo, description, requirements, location, category, salary, jobType, experienceLevel, skills } = req.body;

    if (!jobTitle || !companyName || !description || !location || !category) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    const job = await Job.create({
      jobTitle,
      companyName,
      companyWebsite,
      companyLogo,
      description,
      requirements,
      location,
      category,
      salary,
      jobType,
      experienceLevel,
      skills,
      recruiterId: req.userId,
    });

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private/Recruiter
exports.updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check if user owns the job
    if (job.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this job' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private/Recruiter
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check if user owns the job
    if (job.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get recruiter jobs
// @route   GET /api/jobs/recruiter/my-jobs
// @access  Private/Recruiter
exports.getRecruiterJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ recruiterId: req.userId });

    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get job statistics
// @route   GET /api/jobs/statistics
// @access  Public
exports.getJobStatistics = async (req, res, next) => {
  try {
    const totalJobs = await Job.countDocuments({ status: 'Active' });
    const jobsByCategory = await Job.aggregate([
      { $match: { status: 'Active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalJobs,
        jobsByCategory,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
