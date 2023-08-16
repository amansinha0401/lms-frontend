import React from 'react';
import backgroundImage from '../images/bg1.jpg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const mainStyle = {
    background: '#1a202c',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusted to space between
    minHeight: '100vh',
    padding: '0 20px',
  };

  const textContainerStyle = {
    flex: 1,
    paddingRight: '30px',
  };

  const buttonStyle = {
    background: '#4a5568',
    fontSize: '1.25rem',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  };

  const footerStyle = {
    background: '#2d3748',
  };

  return (
    <div className="min-h-screen">
      <main className="relative overflow-hidden" style={mainStyle}>
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt="Background" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="z-10 relative">
          <div style={textContainerStyle}>
            <h2 className="text-5xl font-semibold mb-4">LIBRARY MANAGEMENT SYSTEM</h2> {/* Increased font size */}
            <p className="text-lg mb-6">
              LETS'S GET STARTED TO ENTER IN THE WORLD OF BOOKS
            </p>
          </div>
          <div>
            <Link to="/books">
              <button className="px-4 py-2 rounded hover:bg-gray-600" style={buttonStyle}>
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </main>

      
    </div>
  );
}

export default HomePage;
