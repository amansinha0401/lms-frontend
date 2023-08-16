import React from 'react';
import MemberForm from '../components/MemberForm';

const ReturnPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Return Book</h2>
        <MemberForm />
      </div>
    </div>
  );
};

export default ReturnPage;
