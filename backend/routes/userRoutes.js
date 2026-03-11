const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  uploadResume,
  getAllUsers,
  deleteUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/resume', protect, uploadResume);
router.get('/', protect, authorize('admin'), getAllUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
