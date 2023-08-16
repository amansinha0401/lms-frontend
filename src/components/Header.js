import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    backgroundColor: '#000', // Set background color to dark black
    color: 'white',
    padding: '8px 16px',
  };

  return (
    <header style={headerStyle}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-semibold">LMS BY AMAN</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/books"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                to="/members"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                Members
              </Link>
            </li>
            <li>
              <Link
                to="/import-books"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                Import Books
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
