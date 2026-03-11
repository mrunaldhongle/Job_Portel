const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Job = require('../models/Job');

const websiteByCompany = {
  'Google': 'google.com',
  'Microsoft': 'microsoft.com',
  'Adobe': 'adobe.com',
  'IBM': 'ibm.com',
  'HubSpot': 'hubspot.com',
  'Workday': 'workday.com',
  'GitHub': 'github.com',
  'Goldman Sachs': 'goldmansachs.com',
  'Tech Innovations Inc': 'google.com',
  'Digital Solutions Ltd': 'microsoft.com',
  'Creative Studio Co': 'adobe.com',
  'Analytics Corp': 'ibm.com',
  'Brand Marketing Hub': 'hubspot.com',
  'People First Consulting': 'workday.com',
  'StartupXYZ': 'github.com',
  'Finance Consultants': 'goldmansachs.com',
};

const dataLogoByCompany = {
  'Google':
    'data:image/png;base64,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',
};
const defaultDataLogo = dataLogoByCompany.Google;

const guessWebsiteFromCompany = (companyName) => {
  if (!companyName) return '';
  const cleaned = companyName
    .toLowerCase()
    .replace(/\b(inc|ltd|llc|limited|corp|corporation|company|co|pvt|private)\b/g, '')
    .replace(/[^a-z0-9]/g, '');
  if (!cleaned) return '';
  return `${cleaned}.com`;
};

const shouldReplaceLogo = (logoUrl) => {
  if (!logoUrl) return true;
  return logoUrl.includes('via.placeholder.com');
};

const updateJobLogos = async () => {
  try {
    console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for logo update...');

    const jobs = await Job.find({});
    let updated = 0;

    for (const job of jobs) {
      const website = websiteByCompany[job.companyName] || guessWebsiteFromCompany(job.companyName);
      if (!website) continue;

      if (dataLogoByCompany[job.companyName]) {
        job.companyLogo = dataLogoByCompany[job.companyName];
        await job.save();
        updated += 1;
        continue;
      }

      if (!job.companyWebsite) {
        job.companyWebsite = website;
      }

      if (shouldReplaceLogo(job.companyLogo)) {
        job.companyLogo = defaultDataLogo || `https://logo.clearbit.com/${website}`;
      }

      await job.save();
      updated += 1;
    }

    console.log(`Updated logos for ${updated} job(s).`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error updating job logos:', error.message);
    process.exit(1);
  }
};

updateJobLogos();
