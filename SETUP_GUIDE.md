# Job Portal - Setup & Installation Guide

## System Requirements

- **Node.js**: v14.0.0 or higher
- **MongoDB**: v4.4.0 or higher (local or MongoDB Atlas)
- **npm**: v6.0.0 or higher

## Complete Installation Steps

### Step 1: Clone/Extract Project
```bash
# Navigate to project directory
cd Job_Portal
```

### Step 2: Backend Setup

#### 2.1 Install Backend Dependencies
```bash
cd backend
npm install
```

#### 2.2 Configure Environment Variables
```bash
# Copy example env file
cp .env.example .env

# Edit .env file and update with your values
nano .env  # or use your favorite editor
```

**Required .env variables:**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**For MongoDB:**
- Local: `mongodb://localhost:27017/jobportal`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/jobportal`

**For Email (Gmail):**
1. Go to [Google Account Settings](https://myaccount.google.com)
2. Enable 2-Factor Authentication
3. Create App Password for Gmail
4. Use that password in EMAIL_PASSWORD

#### 2.3 Start Backend Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

### Step 3: Frontend Setup

#### 3.1 Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### 3.2 Configure API Base URL (if needed)
- The frontend is configured to use `http://localhost:5000/api`
- Update in `src/services/api.js` if using different backend URL

#### 3.3 Start Frontend Development Server
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Features Overview

### For Job Seekers
1. **Create Account**: Register as a job seeker
2. **Browse Jobs**: View all available jobs with filters
3. **Search**: Filter by title, location, category, salary, etc.
4. **Apply**: Apply for jobs by uploading resume
5. **Track Applications**: Monitor application status
6. **Profile**: Update profile with skills and experience

### For Recruiters
1. **Create Account**: Register as a recruiter
2. **Post Jobs**: Create job listings with details
3. **Manage Jobs**: Edit or delete job postings
4. **View Applications**: See all applicants for each job
5. **Track Analytics**: View application statistics
6. **Update Status**: Change applicant status (Shortlisted, Rejected, etc.)

### For Admins
1. **User Management**: View and manage all users
2. **Job Management**: Monitor job postings
3. **Platform Statistics**: View overall platform metrics
4. **User Control**: Delete users or recruiters as needed

## Common Issues & Solutions

### MongoDB Connection Error
**Problem**: `Connection refused: 127.0.0.1:27017`

**Solution**:
1. Ensure MongoDB is running
2. For local MongoDB: `mongod`
3. Or use MongoDB Atlas cloud service

### Port Already in Use
**Problem**: `Error: listen EADDRINUSE :::5000`

**Solution**:
```bash
# Change PORT in .env or kill process
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### CORS Error
**Problem**: Frontend can't communicate with backend

**Solution**:
1. Ensure backend is running on http://localhost:5000
2. Check FRONTEND_URL in backend .env matches frontend URL
3. Verify proxy in vite.config.js is correct

### Module Not Found
**Problem**: `Cannot find module`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Add New Job Category
1. Backend: Update enum in `models/Job.js`
2. Frontend: Update CategoryCard.jsx icons
3. Frontend: Update SearchBar.jsx select options

### Modify User Fields
1. Update schema in `models/User.js`
2. Update form fields in Register.jsx/Profile.jsx
3. Update API calls if needed

### Add Email Notifications
Configured but requires Gmail setup. See .env section above.

## Deployment Preparation

### Backend Deployment (Heroku/Railway)
1. Create Profile for Heroku
2. Set environment variables on hosting platform
3. Deploy: `git push heroku main`

### Frontend Deployment (Vercel/Netlify)
1. Build project: `npm run build`
2. Deploy dist folder

## API Documentation

All API endpoints are documented in the README.md file.

## Support & Help

- Check console for error messages
- Verify all dependencies are installed
- Ensure ports 5000 and 5173 are available
- Check `.env` configuration
- Review MongoDB connection string

## Next Steps

1. Create admin user for testing
2. Add sample job data
3. Test authentication flow
4. Verify email notifications
5. Test job application process

Enjoy using JobPortal! 🚀
