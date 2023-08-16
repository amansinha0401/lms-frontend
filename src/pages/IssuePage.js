import React from 'react';
import backgroundImage from '../images/bg1.jpg'; // Update the path
import BookForm from '../components/BookForm';

const IssuePage = () => {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Set background size to cover the entire element
    backgroundAttachment: 'fixed', // Set background attachment to fixed
    minHeight: '100vh', // Set the minimum height to the height of the viewport
    minWidth: '100vw', // Set the minimum width to the width of the viewport
    padding: '12px 4px',
  };

  const containerStyle = {
    marginTop: '100px', // Add a top margin of 100px to the content
    backgroundColor: 'transparent', // Set the background color to transparent
    color: 'white', // Set the font color to white
  };

  return (
    <div style={divStyle}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8" style={containerStyle}>
        <h2 className="text-2xl font-semibold mb-4">Issue Book</h2>
        <div className="bg-transparent rounded-lg shadow-md p-6">
          <BookForm />
        </div>
      </div>
    </div>
  );
};

export default IssuePage;
