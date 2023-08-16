import React, { useState } from 'react';
import axios from 'axios';

const MemberForm = () => {
  const [transactionId, setTransactionId] = useState('');
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);

  const handleReturn = async () => {
    try {
      const response = await axios.post('https://amankumar0401.pythonanywhere.com/return-book/', {
        transaction_id: transactionId,
        return_date: returnDate,
      });
      console.log('Book returned:', response.data);
      // Reset form
      setTransactionId('');
      setReturnDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <div className="mt-4 bg-black p-6 rounded-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="transactionId" className="block font-medium text-white">
            Transaction ID:
          </label>
          <input
            id="transactionId"
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
            value={transactionId}
            onChange={e => setTransactionId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="returnDate" className="block font-medium text-white">
            Return Date:
          </label>
          <input
            id="returnDate"
            type="date"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
            value={returnDate}
            onChange={e => setReturnDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleReturn}
          className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-50"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default MemberForm;
