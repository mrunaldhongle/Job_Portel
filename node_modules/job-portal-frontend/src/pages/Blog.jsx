import React, { useState } from 'react';
import { Clock, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [blogs] = useState([
    {
      id: 1,
      title: "Top 10 Skills Employers Are Looking For in 2024",
      excerpt: "Discover the most in-demand skills that will boost your career prospects and make you a competitive candidate in the job market.",
      author: "Sarah Johnson",
      date: "March 8, 2024",
      category: "Career Tips",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "How to Ace Your Job Interview",
      excerpt: "Learn proven techniques and strategies to prepare for job interviews and make a lasting impression on hiring managers.",
      author: "Michael Chen",
      date: "March 5, 2024",
      category: "Interview Guide",
      image: "https://i.pinimg.com/1200x/8d/0c/4f/8d0c4f7a3b8d936f6a83385e47e72e2a.jpg",
    },
    {
      id: 3,
      title: "Remote Work: The Future of Employment",
      excerpt: "Explore how remote work is transforming the job market and tips for finding remote job opportunities.",
      author: "Emily Davis",
      date: "March 1, 2024",
      category: "Trends",
      image: "https://i.pinimg.com/1200x/9d/9a/6b/9d9a6b8c7dcf47c88adb535a8e7535ed.jpg",
    },
    {
      id: 4,
      title: "Salary Negotiation Guide: Getting What You Deserve",
      excerpt: "Master the art of salary negotiation and learn how to advocate for competitive compensation.",
      author: "James Wilson",
      date: "February 28, 2024",
      category: "Career Tips",
      image: "https://i.pinimg.com/1200x/7c/60/05/7c6005347a471c2b237ecb28181084fb.jpg",
    },
    {
      id: 5,
      title: "Building Your Professional Network Online",
      excerpt: "Strategies for expanding your professional network and building meaningful connections in your industry.",
      author: "Lisa Anderson",
      date: "February 25, 2024",
      category: "Networking",
      image: "https://i.pinimg.com/1200x/a0/4b/54/a04b5407297b30f4ef00d5f74b24f74d.jpg",
    },
    {
      id: 6,
      title: "Career Transition: How to Switch Fields Successfully",
      excerpt: "Complete guide to changing careers, including resume tips, skill development, and overcoming challenges.",
      author: "Robert Martinez",
      date: "February 22, 2024",
      category: "Career Tips",
      image: "https://i.pinimg.com/736x/8b/6f/d1/8b6fd1da7cb3f0b7e9f7bceb5dd3a05d.jpg",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Career Insights & Tips</h1>
          <p className="text-xl text-blue-100">
            Expert advice to accelerate your career and stay ahead in the job market
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="card p-0 overflow-hidden hover:shadow-xl transition cursor-pointer group">
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                      {blog.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>

                  {/* Meta Info */}
                  <div className="space-y-2 border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User size={16} />
                      <span className="font-medium">{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{blog.date}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <button className="mt-4 flex items-center space-x-2 text-blue-600 font-bold hover:space-x-3 transition">
                    <span>Read More</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for weekly career tips and job market insights.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
