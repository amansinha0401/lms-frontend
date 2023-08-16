import React from 'react';
import backgroundImage from '../images/bg1.jpg'; // Update the path
import MemberList from '../components/MemberList';

const MembersPage = () => {
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

  const cardStyle = {
    backgroundColor: 'transparent', // Set card background color to transparent
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Apply shadow to the card
    borderRadius: '8px', // Set card border radius
  };

  return (
    <div style={divStyle}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={containerStyle}>
        <h2 className="text-2xl font-semibold mb-4">Member List</h2>
        <div className="bg-transparent shadow overflow-hidden rounded-lg" style={cardStyle}>
          <div className="px-4 py-5 sm:p-6">
            <MemberList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
