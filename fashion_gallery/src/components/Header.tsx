import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <div className="text-lg font-bold ">Vadhuvara Wedding mall</div>
        <nav >
          <ul className="flex space-x-4">
            <li>
              <a href="#mens" className="hover:text-gray-400">Mens</a>
            </li>
            <li>
              <a href="#womens" className="hover:text-gray-400">Womens</a>
            </li>
            <li>
              <a href="#kids" className="hover:text-gray-400">Kids</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
