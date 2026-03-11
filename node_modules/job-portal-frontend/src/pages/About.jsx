import React from 'react';
import { Users, Target, Heart, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target size={40} className="text-blue-600" />,
      title: "Our Mission",
      description: "To connect talented professionals with opportunities that match their skills and aspirations, creating meaningful career paths."
    },
    {
      icon: <Heart size={40} className="text-blue-600" />,
      title: "Our Vision",
      description: "To be the most trusted platform where job seekers and employers build successful professional relationships."
    },
    {
      icon: <Zap size={40} className="text-blue-600" />,
      title: "Our Values",
      description: "Integrity, Innovation, Inclusivity, and Excellence in everything we do for our community."
    },
    {
      icon: <Users size={40} className="text-blue-600" />,
      title: "Our Community",
      description: "Supporting millions of users in their career journey with tools, resources, and opportunities."
    }
  ];

  const team = [
    { name: "John Smith", role: "Founder & CEO", image: "https://i.pinimg.com/736x/f1/2f/37/f12f37a580349c171e0cb7ff6f3e8331.jpg" },
    { name: "Sarah Johnson", role: "CTO", image: "https://i.pinimg.com/736x/8a/b4/8e/8ab48ee24a4e058c56ac63aa0d163273.jpg" },
    { name: "Michael Chen", role: "Head of Recruiting", image: "https://i.pinimg.com/1200x/63/f3/a0/63f3a0fe0c318b623d9a431e2817b515.jpg" },
    { name: "Emily Davis", role: "Head of Operations", image: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">About JobPortal</h1>
          <p className="text-xl text-blue-100">
            Building the future of work, one connection at a time
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="card p-10 space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2020, JobPortal was born from a simple idea: connecting talented individuals with opportunities that match their aspirations. We noticed that the job search process was complicated, time-consuming, and often frustrating for both job seekers and employers.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our team decided to build a platform that would simplify this process, leveraging technology to create meaningful professional connections. What started as a small project has grown into a thriving community with millions of users worldwide.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, JobPortal is proud to be a leading job board that has helped countless professionals launch their careers and businesses find their next great hire. We continue to innovate and improve our platform to serve our community better.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {values.map((value, index) => (
              <div key={index} className="flex space-x-6">
                <div className="flex-shrink-0">{value.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-lg">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-xl transition">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200"
                />
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold mb-2">4+</h3>
              <p className="text-blue-100 text-lg">Years in Business</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">1M+</h3>
              <p className="text-blue-100 text-lg">Active Users</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">500K+</h3>
              <p className="text-blue-100 text-lg">Jobs Posted</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">50K+</h3>
              <p className="text-blue-100 text-lg">Successful Hires</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
