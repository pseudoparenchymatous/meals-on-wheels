// resources/js/components/ContactPage.tsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const ContactPage = () => {
  return (
    <div className="w-full bg-[#0f0f11] text-white">
      {/* Hero Section */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-[center_25%] animate-pulse-slow"
          style={{ backgroundImage: "url('/forcontact.webp')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-500 opacity-70 mix-blend-multiply backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* LEFT: Contact Info */}
        <div className="space-y-8">
          <div className="bg-[#1b1b1e] p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-white border-b pb-2">Get in Touch</h2>
            <p className="text-gray-300 mt-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-red-500" />
              023 University Of Cebu, Banilad Campus
            </p>
            <p className="text-gray-300">
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-400" />
              (023) 416-7810
            </p>
            <p className="text-gray-300">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-yellow-400" />
              contact@mealsonwheels.org
            </p>
          </div>

          {/* Social Icons */}
          <div className="bg-[#1b1b1e] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-medium text-white mb-2">Follow Us</h3>
            <div className="flex gap-4 text-2xl">
              <a href="https://facebook.com" className="text-blue-500 hover:scale-110 transition" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://instagram.com/mealswheelsppl/" className="text-pink-500 hover:scale-110 transition" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://twitter.com" className="text-white hover:scale-110 transition" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a href="https://youtube.com" className="text-red-500 hover:scale-110 transition" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="h-64 overflow-hidden rounded-xl shadow-md border border-gray-700">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.236651146681!2d-122.42002108468118!3d37.77851957975833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e2e0db4c70d%3A0x8f2f23e0c0ef0e1e!2sCivic%20Center%20Plaza!5e0!3m2!1sen!2sus!4v1616719457881!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="bg-[#1b1b1e] backdrop-blur-md shadow-xl rounded-xl p-8 border border-gray-800 animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                className="w-full bg-[#101014] border border-gray-700 p-3 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                className="w-full bg-[#101014] border border-gray-700 p-3 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-300">Message</label>
              <textarea
                className="w-full bg-[#101014] border border-gray-700 p-3 rounded-md h-32 resize-none text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
