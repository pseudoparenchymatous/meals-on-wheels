import React from 'react';
import ReactDOM from 'react-dom/client';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';

const root = ReactDOM.createRoot(document.getElementById('contact-form')!);
root.render(
  <>
    <ContactPage />
    <hr className="border-t border-gray-700 my-12 mx-auto w-11/12" />
    <Footer />
  </>
);
