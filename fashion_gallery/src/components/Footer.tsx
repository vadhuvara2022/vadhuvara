import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-600 text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Vadhuvara Wedding mall</h3>
            <p>1-9-31/2/b, near SATHWIK HOSPITAL, Pillidi </p>
            <p>Arabgalli, Medak, Telangana 502110</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <p>Email: vadhuvara2208@gmail.com</p>
            <p>Phone: +91 9666205850</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Follow Us</h3>
            <div className="flex space-x-4">         
              <a href="https://www.instagram.com/vadhuvaraweddingmall2022/profilecard/?igsh=ZnU5b3BjdHZwZWlv" className="hover:text-gray-400">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>Vadhuvara Wedding Mall 2022. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;