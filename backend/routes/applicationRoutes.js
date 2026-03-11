const express = require('express');
const {
  applyJob,
  getUserApplications,
  getRecruiterApplications,
  getJobApplications,
  updateApplicationStatus,
  withdrawApplication,
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('jobSeeker'), applyJob);
router.get('/user', protect, authorize('jobSeeker'), getUserApplications);
router.get('/recruiter', protect, authorize('recruiter'), getRecruiterApplications);
router.get('/job/:jobId', protect, authorize('recruiter'), getJobApplications);
router.put('/:id', protect, authorize('recruiter'), updateApplicationStatus);
router.delete('/:id', protect, authorize('jobSeeker'), withdrawApplication);

module.exports = router;
