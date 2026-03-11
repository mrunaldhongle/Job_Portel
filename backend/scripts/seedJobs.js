const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Job = require('../models/Job');
const User = require('../models/User');

const seedJobs = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');

    // Find or create recruiter
    let recruiter = await User.findOne({ role: 'recruiter' });

    if (!recruiter) {
      recruiter = await User.create({
        firstName: 'John',
        lastName: 'Recruiter',
        email: 'recruiter@example.com',
        password: 'password123',
        role: 'recruiter',
      });

      console.log('Sample recruiter created');
    }

    // Clear old jobs
    await Job.deleteMany({});
    console.log('Old jobs removed');

    // Sample Jobs
    const sampleJobs = [
      {
        jobTitle: 'Senior React Developer',
        companyName: 'Google',
        companyWebsite: 'google.com',
        description: 'We are looking for an experienced React developer.',
        location: 'Mountain View, CA',
        category: 'Software Development',
        salary: { min: 120000, max: 160000 },
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        skills: ['React', 'JavaScript', 'Redux'],
        recruiterId: recruiter._id,
      },
      {
        jobTitle: 'Full Stack Developer',
        companyName: 'Microsoft',
        companyWebsite: 'microsoft.com',
        description: 'Join our dynamic team as a Full Stack Developer.',
        location: 'New York, NY',
        category: 'Software Development',
        salary: { min: 100000, max: 140000 },
        jobType: 'Full Time',
        experienceLevel: 'Mid Level',
        skills: ['React', 'Node.js', 'MongoDB'],
        recruiterId: recruiter._id,
      },
      {
        jobTitle: 'UI/UX Designer',
        companyName: 'Adobe',
        companyWebsite: 'adobe.com',
        description: 'Design beautiful and intuitive user interfaces.',
        location: 'Austin, TX',
        category: 'UI/UX Design',
        salary: { min: 80000, max: 120000 },
        jobType: 'Full Time',
        experienceLevel: 'Mid Level',
        skills: ['Figma', 'UX Research'],
        recruiterId: recruiter._id,
      },
      {
        jobTitle: 'Data Scientist',
        companyName: 'IBM',
        companyWebsite: 'ibm.com',
        description: 'Analyze complex datasets and build ML models.',
        location: 'Boston, MA',
        category: 'Data Science',
        salary: { min: 110000, max: 150000 },
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        skills: ['Python', 'Machine Learning', 'SQL'],
        recruiterId: recruiter._id,
      },
      {
        jobTitle: 'Junior Developer',
        companyName: 'GitHub',
        companyWebsite: 'github.com',
        description: 'Start your career as a Junior Developer.',
        location: 'Remote',
        category: 'Software Development',
        salary: { min: 50000, max: 70000 },
        jobType: 'Full Time',
        experienceLevel: 'Entry Level',
        skills: ['JavaScript', 'HTML', 'CSS'],
        recruiterId: recruiter._id,
      }
    ];

    // ✅ Automatically generate logos
    const jobsWithLogos = sampleJobs.map(job => ({
      ...job,
      companyLogo: `https://logo.clearbit.com/${job.companyWebsite}`
    }));

    // Insert jobs
    const insertedJobs = await Job.insertMany(jobsWithLogos);

    console.log(`✅ ${insertedJobs.length} jobs inserted successfully`);

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding jobs:', error.message);
    process.exit(1);
  }
};

seedJobs();