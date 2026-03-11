const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    resumeURL: {
      type: String,
      default: '',
    },
    coverLetter: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Rejected', 'Interview Scheduled', 'Selected'],
      default: 'Applied',
    },
    ratingByRecruiter: {
      type: Number,
      min: 1,
      max: 5,
      default: 0,
    },
    feedbackByRecruiter: {
      type: String,
      default: '',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    interviewDate: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Ensure unique applications
applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
