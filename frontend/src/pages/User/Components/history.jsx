
import React, { useEffect, useState } from 'react';

function PurchaseHistory() {
  const [books, setBooks] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/books/purchased/'+storedUser.email); // Adjust API endpoint as needed
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 overflow-x-auto">
    <table className="min-w-full bg-white shadow-lg rounded-lg">
      <thead>
        <tr className="w-full h-12 border-gray-300 border-b">
          <th className="text-left text-gray-600 px-4 py-3">Book</th>
          <th className="text-left text-gray-600 px-4 py-3 hidden md:table-cell">Author</th>
          <th className="text-left text-gray-600 px-4 py-3 hidden md:table-cell">Price</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} className="border-b border-gray-300 hover:bg-gray-50 transition duration-300">
            <td className="px-4 py-4">
              <div className="flex items-center">
                <img src={`http://localhost:4000/api/images/${book.image}`} alt={book.title} className="rounded-lg w-16 h-16 object-cover mr-4" />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-lg">{book.title}</span>
                  <span className="text-gray-700 md:hidden">Author: {book.author}</span>
                  <span className="text-gray-700 md:hidden">Price: ${book.price}</span>
                </div>
              </div>
            </td>
            <td className="text-gray-700 px-4 py-4 hidden md:table-cell">{book.author}</td>
            <td className="text-gray-700 px-4 py-4 hidden md:table-cell">${book.price}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
}

export default PurchaseHistory;
