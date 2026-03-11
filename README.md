# Job Portal - MERN Stack Web Application

A full-stack job portal web application built with the MERN stack (React + Vite, Node.js, Express.js, MongoDB).

## Features

### User Roles
- **Job Seeker**: Browse jobs, apply, manage applications
- **Recruiter**: Post jobs, manage applicants, view analytics
- **Admin**: Manage users, monitor platform statistics

###Core Features
- JWT Authentication with bcrypt password hashing
- Advanced job search and filtering
- Job application system
- User profile management
- Recruiter dashboard with analytics
- Admin panel for platform management
- Responsive design with modern UI

## Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
Job_Portal/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── DashboardSidebar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── RecruiterDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── backend/
    ├── models/
    │   ├── User.js
    │   ├── Job.js
    │   └── Application.js
    ├── controllers/
    │   ├── authController.js
    │   ├── jobController.js
    │   ├── applicationController.js
    │   └── userController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── jobRoutes.js
    │   ├── applicationRoutes.js
    │   └── userRoutes.js
    ├── middleware/
    │   ├── auth.js
    │   └── errorHandler.js
    ├── utils/
    │   ├── jwtUtils.js
    │   └── emailUtils.js
    ├── config/
    │   └── database.js
    ├── server.js
    ├── package.json
    └── .env.example
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/jobportal
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (Recruiter)
- `PUT /api/jobs/:id` - Update job (Recruiter)
- `DELETE /api/jobs/:id` - Delete job (Recruiter)
- `GET /api/jobs/recruiter/my-jobs` - Get recruiter's jobs

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications/user` - Get user applications
- `GET /api/applications/recruiter` - Get recruiter applications
- `PUT /api/applications/:id` - Update application status
- `DELETE /api/applications/:id` - Withdraw application

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/resume` - Upload resume

## Features Implemented

✅ User authentication (JWT)
✅ Role-based access control
✅ Job listing and search
✅ Advanced filtering
✅ Job application system
✅ User profile management
✅ Recruiter dashboard
✅ Admin panel
✅ Responsive design
✅ Modern UI with Tailwind CSS

## Future Enhancements

- AI-based job recommendations
- Resume skill extraction
- Email notifications
- Interview scheduling
- Payment integration
- Video interview feature
- AI Chatbot for job queries

## Contributing

Contributions are welcome! Feel free to submit pull requests.

## License

This project is open source and available under the MIT License.

## Support

For support, please reach out to info@jobportal.com
