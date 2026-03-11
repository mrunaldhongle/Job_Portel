const express = require('express');
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getRecruiterJobs,
  getJobStatistics,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllJobs);
router.get('/statistics', getJobStatistics);
router.get('/:id', getJobById);
router.post('/', protect, authorize('recruiter'), createJob);
router.get('/recruiter/my-jobs', protect, authorize('recruiter'), getRecruiterJobs);
router.put('/:id', protect, authorize('recruiter'), updateJob);
router.delete('/:id', protect, authorize('recruiter'), deleteJob);

module.exports = router;
