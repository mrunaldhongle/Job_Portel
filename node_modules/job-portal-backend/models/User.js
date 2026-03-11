const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please enter last name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    phone: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['jobSeeker', 'recruiter', 'admin'],
      default: 'jobSeeker',
    },
    profilePicture: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    skills: [
      {
        type: String,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],
    experience: [
      {
        jobTitle: String,
        company: String,
        duration: String,
        description: String,
      },
    ],
    resume: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
