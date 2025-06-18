// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#0f0f11] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 text-sm">

        {/* Quick Links */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Donate</a></li>
            <li><a href="#" className="hover:text-white">Volunteer</a></li>
            <li><a href="#" className="hover:text-white">Programs</a></li>
            <li><a href="#" className="hover:text-white">Events</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        {/* Support & Hours */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Support & Hours</h3>
          <p className="text-gray-400 mb-2">Need help or have questions?</p>
          <p className="text-gray-300">Email: contact@mealsonwheels.org</p>
          <p className="text-gray-300">Phone: (023) 416-7810</p>
          <div className="mt-4">
            <h4 className="text-white font-medium">Operating Hours</h4>
            <ul className="text-gray-400 text-sm mt-1">
              <li>Mon - Fri: 8:00 AM – 6:00 PM</li>
              <li>Sat: 9:00 AM – 1:00 PM</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-2">Stay up-to-date with our latest news and events.</p>
          <form className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow min-w-0 p-2 rounded sm:rounded-l bg-[#101014] text-white border border-gray-700 placeholder:text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded sm:rounded-r hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Donate + Legal */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Support Us</h3>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded transition">
            Donate Now
          </button>
          <ul className="mt-6 space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white">Donor Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Accessibility Statement</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 border-t border-gray-700 py-4 text-xs">
        © 2025 Meals on Wheels. All rights reserved. |Tax ID: 02-3416509
      </div>
    </footer>
  );
}

export default Footer;
