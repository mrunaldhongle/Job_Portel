const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Please enter job title'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Please enter company name'],
    },
    companyLogo: {
      type: String,
      default: '',
    },
    companyWebsite: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Please enter job description'],
    },
    requirements: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
      required: [true, 'Please enter location'],
    },
    category: {
      type: String,
      enum: [
        'Software Development',
        'Marketing',
        'Finance',
        'Human Resources',
        'Data Science',
        'UI/UX Design',
      ],
      required: true,
    },
    salary: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: 'USD',
      },
    },
    jobType: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Contract', 'Temporary', 'Remote'],
      default: 'Full Time',
    },
    experienceLevel: {
      type: String,
      enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'],
      default: 'Mid Level',
    },
    skills: [
      {
        type: String,
      },
    ],
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Closed'],
      default: 'Active',
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    closingDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
