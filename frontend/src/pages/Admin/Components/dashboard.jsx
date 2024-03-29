import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:4000/api/books/mybooks',{
                    email: storedUser.email,
                });
                setBooks(response.data);
            } catch (error) {
                console.error("Failed to fetch books:", error);
                setError('Failed to fetch books. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [storedUser.email]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">All Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map(book => (
                    <div key={book.id} className="bg-white rounded-lg shadow overflow-hidden p-2 ">
                        {book.image && (
                           <img src={`http://localhost:4000/api/images/${book.image}`} alt={book.title} className="rounded-lg w-full h-56 object-cover object-center" />

                        )}
                        <div className=" ">
                            <h3 className="font-semibold text-lg capitalize">{book.title}</h3>
                            <p className="text-gray-700">Author: {book.author}</p>
                            <p className="text-gray-700">Price: {book.price} TND</p>
                            <p className={`text-gray-700 ${book.isSold ? "text-red-500" : "text-green-500"}`}>{book.isSold ? "Sold" : "Available"}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
