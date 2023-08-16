import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../images/bg1.jpg'; // Update the path

const ImportBooksPage = () => {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Set background size to cover the entire element
    backgroundAttachment: 'fixed', // Set background attachment to fixed
    minHeight: '100vh', // Set the minimum height to the height of the viewport
    minWidth: '100vw', // Set the minimum width to the width of the viewport
    padding: '12px 4px',
  };

  const contentStyle = {
    marginTop: '100px', // Add a top margin of 100px to the content
  };

  const [bookName, setBookName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleImport = async () => {
    try {
      const response = await axios.post('https://amankumar0401.pythonanywhere.com/api/import-books/', {
        title: bookName,
        num_books: quantity,
      });
      console.log('Books imported:', response.data);
      // Reset form
      setBookName('');
      setQuantity('');
    } catch (error) {
      console.error('Error importing books:', error);
    }
  };

  return (
    <div style={divStyle}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8" style={contentStyle}>
        <div className="bg-black bg-opacity-75 overflow-hidden shadow-xl rounded-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">Import Books</h2>
          <label className="block mb-2">
            Book Name:
            <input
              type="text"
              className="border rounded w-full p-2"
              value={bookName}
              onChange={e => setBookName(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              className="border rounded w-full p-2"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </label>
          <button
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-blue-900"
            onClick={handleImport}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportBooksPage;
