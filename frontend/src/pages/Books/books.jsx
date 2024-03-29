import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/books/all');
                setBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch books. Please try again later.');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-center py-4">Loading books...</div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div className="p-4 space-y-4">
            <div className="relative mb-4 flex gap-4 items-center justify-center">
                <Link to="/">
                <h2 className="text-2xl font-bold">Books</h2>
                </Link>
                <input
                    type="text"
                    placeholder="Search books..."
                    className="w-full p-2 pl-10 border border-gray-300 rounded"
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-24  text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.map(book => (
                    <div key={book.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                        {book.image && (
                            <img src={`http://localhost:4000/api/images/${book.image}`} alt={book.title} className="w-full h-56 object-cover object-center" />
                        )}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <h3 className="font-bold text-lg mb-2">{book.title}</h3>
                            <p className="text-lg flex items-center">
                                {book.isSold ? (
                                    <>
                                        <FaTimesCircle className="text-red-500 mr-2" />
                                        Sold
                                    </>
                                ) : (
                                    <>
                                        <FaCheckCircle className="text-green-500 mr-2" />
                                        Available
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksPage;
