import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberCard = ({ member, onDeleteMember, onUpdateMember }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(member.name);
  const [updatedAmountDue, setUpdatedAmountDue] = useState(member.amountdue);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://amankumar0401.pythonanywhere.com/api/transactions/');
      const memberTransactions = response.data.filter(
        transaction => transaction.member === member.id
      );

      // Fetch book details for each transaction
      const transactionsWithBookNames = await Promise.all(memberTransactions.map(async transaction => {
        const bookResponse = await axios.get(`https://amankumar0401.pythonanywhere.com/api/books/${transaction.book}/`);
        return {
          ...transaction,
          book_name: bookResponse.data.title // Assuming your book model has a "title" field
        };
      }));

      setTransactions(transactionsWithBookNames);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
    setUpdatedName(member.name);
    setUpdatedAmountDue(member.amountdue);
  };

  const handleUpdate = () => {
    onUpdateMember({ ...member, name: updatedName, amountdue: updatedAmountDue });
    setIsEditing(false);
  };

  const handleReturnBook = async (transactionId) => {
    const returnDate = new Date().toISOString().slice(0, 10); // Today's date
    try {
      const response = await axios.post('https://amankumar0401.pythonanywhere.com/api/return-book/', {
        transaction_id: transactionId,
        return_date: returnDate,
      });
      // Update the transactions after returning the book
      fetchTransactions();
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
   <div className="bg-black rounded-lg shadow-md p-6 mb-4 text-white">
      <h3 className="text-xl font-semibold mb-2">
        {isEditing ? (
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            style={{ outline: '2px solid blue' }}
          />
        ) : (
          member.name
        )}
      </h3>
      <p className="text-gray-600">Amount Due: 
        {isEditing ? (
          <input
            type="number"
            value={updatedAmountDue}
            onChange={(e) => setUpdatedAmountDue(e.target.value)}
            style={{ outline: '2px solid blue' }}
          />
        ) : (
          member.amountdue
        )}
      </p>
      <div className="mt-4 flex justify-end">
        {isEditing ? (
          <div>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2"
              onClick={handleCancelUpdate}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-blue-900 mr-2"
              onClick={handleUpdateClick}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => onDeleteMember(member.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    
           <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Books Issued and Transactions:</h4>
            {transactions.length > 0 ? (
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Book Name</th>
                    <th className="px-4 py-2">Issue Date</th>
                    <th className="px-4 py-2">Return Date</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td className="px-4 py-2">{transaction.book_name}</td>
                      <td className="px-4 py-2">{transaction.issue_date}</td>
                      <td className="px-4 py-2">
                        {transaction.return_date || 'Not returned'}
                      </td>
                      <td className="px-4 py-2">
                        {!transaction.return_date && (
                          <button
                            className="bg-gray-700 text-white py-1 px-2 rounded hover:bg-blue-900"
                            onClick={() => handleReturnBook(transaction.id)}
                          >
                            Return Book
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No books issued</p>
            )}
          </div>
        </div>
      );
    };


const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberAmountDue, setNewMemberAmountDue] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('https://amankumar0401.pythonanywhere.com/api/members/');
      const membersWithIssuedBooks = await Promise.all(response.data.map(async member => {
        const issuedBooksResponse = await Promise.all(member.books_issued.map(async bookId => {
          const bookResponse = await axios.get(`https://amankumar0401.pythonanywhere.com/api/books/${bookId}/`);
          console.log('bookResponse:', bookResponse.data);
          return bookResponse.data;
        }));
        return {
          ...member,
          issuedBooks: issuedBooksResponse
        };
      }));
      setMembers(membersWithIssuedBooks);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const deleteMember = async (memberId) => {
    try {
      await axios.delete(`https://amankumar0401.pythonanywhere.com/api/members/${memberId}/`);
      fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const updateMember = async (updatedMember) => {
    try {
      await axios.put(
        `https://amankumar0401.pythonanywhere.com/api/members/${updatedMember.id}/`,
        updatedMember
      );
      fetchMembers();
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const addMember = async () => {
    try {
      await axios.post('https://amankumar0401.pythonanywhere.com/api/members/', {
        name: newMemberName,
        amountdue: newMemberAmountDue,
      });
      fetchMembers();
      setNewMemberName('');
      setNewMemberAmountDue('');
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Member</h2>
        <div className="flex">
          <input
            type="text"
            className="border rounded-l p-2 w-1/2"
            placeholder="Name"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
          />
          <input
            type="number"
            className="border rounded-r p-2 w-1/2"
            placeholder="Amount Due"
            value={newMemberAmountDue}
            onChange={(e) => setNewMemberAmountDue(e.target.value)}
          />
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-2"
            onClick={addMember}
          >
            Add
          </button>
        </div>
      </div>
      <div>
        {members.map(member => (
          <MemberCard
            key={member.id}
            member={member}
            onDeleteMember={deleteMember}
            onUpdateMember={updateMember}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberList;
