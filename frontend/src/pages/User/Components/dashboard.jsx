import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/books/all');
      setBooks(response.data);
      setError('');
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const buyBook = async (bookId) => {
    try {
      await axios.post('http://localhost:4000/api/books/buy', { bookId: bookId, email: storedUser.email });
      alert('Book purchased successfully!');
    } catch (error) {
      console.error("Failed to buy book:", error);
      alert('Book purchased successfully');
    }
  };

  if (loading) return <div className="text-center py-4 text-xl font-medium">Loading books...</div>;
  if (error) return <div className="text-red-500 text-center py-4 text-xl font-medium">{error}</div>;

  return (
    <div className=" max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-center mb-8 pb-4 text-gray-800">Available Books</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <img src={ `http://localhost:4000/api/images/${book.image}`} alt={book.title} className="mt-2 rounded-lg w-full h-56 object-cover object-center" />
              <h3 className="text-2xl font-bold text-gray-900">{book.title}</h3>
              <p className="text-gray-700 mt-2">Author: {book.author}</p>
              <p className="text-gray-700">Price: ${book.price}</p>
            </div>
            <button
              onClick={() => buyBook(book._id)}
              className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ${book.isSold ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={book.isSold}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
