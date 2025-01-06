import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-600 text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Fashion Gallery</h3>
            <p>123 Fashion Street</p>
            <p>New York, NY 10001</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <p>Email: info@fashiongallery.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">Facebook</a>
              <a href="#" className="hover:text-gray-400">Twitter</a>
              <a href="#" className="hover:text-gray-400">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; {new Date().getFullYear()} Fashion Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;