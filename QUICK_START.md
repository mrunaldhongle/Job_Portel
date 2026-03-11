# Quick Start Guide - Job Portal

Get the Job Portal application up and running in 5 minutes!

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

## 1. Clone & Navigate
```bash
cd Job_Portal
```

## 2. Install All Dependencies
```bash
# Install root dependencies
npm install

# Install all packages (frontend + backend)
npm run install-all
```

## 3. Configure Environment

### Backend Configuration
```bash
cd backend

# Edit .env file with your settings
# IMPORTANT SETTINGS:
# - MONGO_URI: MongoDB connection string
# - JWT_SECRET: Any random string
# - FRONTEND_URL: http://localhost:5173
```

## 4. Start Development Servers

### Option A: Run in Separate Terminals
```bash
# Terminal 1: Backend
cd backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm run dev
# Runs on http://localhost:5173
```

### Option B: Run Concurrently (from root)
```bash
npm run dev
# Both servers start automatically
```

## 5. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **API Test**: http://localhost:5000 (should show "Job Portal API is running")

## Test Accounts

Use these to test different roles:

**Admin**
- Email: admin@jobportal.com
- Password: Admin@123

**Recruiter**
- Email: recruiter@jobportal.com
- Password: Recruiter@123

**Job Seeker**
- Email: jobseeker@jobportal.com
- Password: JobSeeker@123

## Quick Testing Flow

1. **Register/Login** - Create a new account or use test credentials
2. **Browse Jobs** - Visit /jobs to see job listings
3. **Search & Filter** - Use search bar and filters
4. **Job Details** - Click job card to see details
5. **Apply** - Click "Apply Now" to submit application
6. **Profile** - Update your profile at /profile
7. **Dashboard** (if Recruiter) - Post new jobs and manage applications

## Folder Structure
```
Job_Portal/
├── frontend/          # React + Vite application
├── backend/           # Node.js + Express server
├── README.md          # Main documentation
├── SETUP_GUIDE.md     # Detailed setup instructions
├── FEATURES_IMPLEMENTED.md  # Feature list
└── package.json       # Root scripts
```

## Key Commands

### Frontend
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run linter
```

### Backend
```bash
cd backend
npm run dev      # Start with nodemon
npm start        # Start production server
```

### Root (Both)
```bash
npm run dev          # Run both servers
npm run install-all  # Install all dependencies
npm run build        # Build both projects
```

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify .env configuration
- Check port 5000 is available
- Ensure all dependencies installed: `cd backend && npm install`

### Frontend won't start
- Verify port 5173 is available
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version (v14+)

### Can't connect to MongoDB
- Start MongoDB: `mongod`
- Or use MongoDB Atlas cloud connection
- Check connection string in .env

### CORS errors
- Ensure backend is running
- Check FRONTEND_URL in backend .env
- Clear browser cache

## Next Steps

1. ✅ Run the application
2. ✅ Test authentication
3. ✅ Explore job listings
4. ✅ Try posting a job (as recruiter)
5. ✅ Apply for a job (as job seeker)
6. ✅ View dashboard (as recruiter/admin)
7. 📚 Read full documentation in README.md
8. 🚀 Deploy to production

## Getting Help

- Check SETUP_GUIDE.md for detailed instructions
- Review README.md for API documentation
- Check browser console for errors
- Check backend terminal for logs
- Verify environment variables are set correctly

**Happy coding! 🎉**
