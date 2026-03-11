const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Job = require('../models/Job');

const LOGO_DIR = path.join(__dirname, '..', 'public', 'logos');
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

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

const guessWebsiteFromCompany = (companyName) => {
  if (!companyName) return '';
  const cleaned = companyName
    .toLowerCase()
    .replace(/\b(inc|ltd|llc|limited|corp|corporation|company|co|pvt|private)\b/g, '')
    .replace(/[^a-z0-9]/g, '');
  if (!cleaned) return '';
  return `${cleaned}.com`;
};

const buildLogoUrlFromWebsite = (website) => {
  if (!website) return '';
  const trimmed = website.trim();
  if (!trimmed) return '';
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    return `https://logo.clearbit.com/${url.hostname}`;
  } catch {
    return '';
  }
};

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'company';

const download = (url, filePath) =>
  new Promise((resolve, reject) => {
    const client = url.startsWith('https://') ? https : http;
    const request = client.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(download(res.headers.location, filePath));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => fileStream.close(resolve));
    });
    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy(new Error('Request timeout'));
    });
  });

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const cacheCompanyLogos = async () => {
  try {
    console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for logo caching...');

    ensureDir(LOGO_DIR);

    const jobs = await Job.find({});
    let updated = 0;
    let downloaded = 0;

    for (const job of jobs) {
      const website =
        job.companyWebsite ||
        websiteByCompany[job.companyName] ||
        guessWebsiteFromCompany(job.companyName);
      const logoUrl = job.companyLogo || buildLogoUrlFromWebsite(website);
      if (!logoUrl) continue;

      const filename = `${slugify(job.companyName)}.png`;
      const filePath = path.join(LOGO_DIR, filename);
      const publicUrl = `${BASE_URL}/logos/${filename}`;

      if (!fs.existsSync(filePath)) {
        try {
          await download(logoUrl, filePath);
          downloaded += 1;
        } catch (error) {
          console.warn(`Failed to download logo for ${job.companyName}: ${error.message}`);
          continue;
        }
      }

      job.companyWebsite = website;
      job.companyLogo = publicUrl;
      await job.save();
      updated += 1;
    }

    console.log(`Downloaded ${downloaded} logo(s). Updated ${updated} job(s).`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error caching company logos:', error.message);
    process.exit(1);
  }
};

cacheCompanyLogos();
