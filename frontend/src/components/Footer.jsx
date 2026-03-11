import React from 'react';
import { Mail, Phone, MapPin, Briefcase, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-24">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Company */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-2 rounded-lg">
                <Briefcase className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold">JobPortal</h3>
            </div>
            <p className="text-gray-400 leading-relaxed font-medium">
              Find your dream job with our comprehensive job portal. Connect with top employers and advance your career.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-8">
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 rounded-full flex items-center justify-center transition shadow-lg">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 rounded-full flex items-center justify-center transition shadow-lg">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 rounded-full flex items-center justify-center transition shadow-lg">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 rounded-full flex items-center justify-center transition shadow-lg">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="/" className="text-gray-400 hover:text-blue-400 transition font-medium">Home</a></li>
              <li><a href="/jobs" className="text-gray-400 hover:text-blue-400 transition font-medium">Browse Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition font-medium">For Recruiters</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition font-medium">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition font-medium">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-white">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition font-medium">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition font-medium">Career Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition font-medium">Interview Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition font-medium">Resume Builder</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition font-medium">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-white">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start space-x-4">
                <Mail className="text-blue-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="text-gray-400 text-sm font-bold">Email</p>
                  <a href="mailto:info@jobportal.com" className="text-white hover:text-blue-400 transition font-bold">
                    info@jobportal.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <Phone className="text-blue-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="text-gray-400 text-sm font-bold">Phone</p>
                  <a href="tel:+15551234567" className="text-white hover:text-blue-400 transition font-bold">
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <MapPin className="text-blue-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="text-gray-400 text-sm font-bold">Address</p>
                  <p className="text-white font-bold">123 Main St, City, Country</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 font-bold">
            &copy; {currentYear} JobPortal. All rights reserved.
          </p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition font-bold">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition font-bold">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition font-bold">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
