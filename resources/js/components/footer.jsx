// src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

function Footer() {
  const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', content: '' });

  const openModal = (title) => {
    let content = '';
    switch (title) {
      case 'Privacy Policy':
        content = `We value your privacy. All personal information collected through this site is used solely to process your requests and enhance your experience. We do not share your data with third parties without your consent.`;
        break;
      case 'Terms of Use':
        content = `By accessing this site, you agree to use it for lawful purposes only. Any misuse or attempt to disrupt services will result in legal action and revocation of access.`;
        break;
      case 'Donor Privacy Policy':
        content = `Donor information is kept confidential. We do not sell, share, or trade donors’ personal or contact information with any other entity.`;
        break;
      case 'Accessibility Statement':
        content = `We are committed to ensuring digital accessibility for people with disabilities. We welcome feedback on improving accessibility.`;
        break;
      default:
        content = '';
    }
    setModalInfo({ isOpen: true, title, content });
  };

  const closeModal = () => setModalInfo({ isOpen: false, title: '', content: '' });

  return (
    <footer className="bg-[#0f0f11] text-white mt-20 relative z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 text-sm">

        {/* Quick Links */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/donation" className="hover:text-white">Donate</a></li>
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
              <li>Mon - Fri: 8:00 AM – 6:00 PM (Hot Meal Deliveries)</li>
              <li>Sat - Sun: 9:00 AM – 1:00 PM (Frozen Meal Support Only)</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              *Weekend service is limited to frozen meal delivery for members outside a 10km radius.
            </p>
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
          <Link href="/donation">
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded transition">
              Donate Now
            </button>
          </Link>
          <ul className="mt-6 space-y-2 text-gray-400">
            <li><button onClick={() => openModal('Privacy Policy')} className="hover:text-white text-left w-full">Privacy Policy</button></li>
            <li><button onClick={() => openModal('Terms of Use')} className="hover:text-white text-left w-full">Terms of Use</button></li>
            <li><button onClick={() => openModal('Donor Privacy Policy')} className="hover:text-white text-left w-full">Donor Privacy Policy</button></li>
            <li><button onClick={() => openModal('Accessibility Statement')} className="hover:text-white text-left w-full">Accessibility Statement</button></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 border-t border-gray-700 py-4 text-xs">
        © 2025 Meals on Wheels. All rights reserved. | Tax ID: 02-3416509
      </div>

      {/* Inline Modal */}
                    {modalInfo.isOpen && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-saturate-150 transition duration-300"
                      onClick={closeModal}
                      onKeyDown={(e) => e.key === 'Escape' && closeModal()}
                      role="dialog"
                      aria-modal="true"
                      tabIndex={-1}
                    >
                      <div
                        className="bg-white rounded-lg shadow-2xl max-w-xl w-[90%] sm:w-full p-6 relative transform transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={closeModal}
                          aria-label="Close modal"
                          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
                        >
                          &times;
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">{modalInfo.title}</h2>
                        <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                          {modalInfo.content}
                        </div>
                      </div>
                    </div>
                  )}



    </footer>
  );
}

export default Footer;
