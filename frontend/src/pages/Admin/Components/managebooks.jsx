import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UpdateBookModal } from './updatebookmodal';
import { FaEdit, FaTrashAlt, FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};

    useEffect(() => {
        fetchBooks();
    }, [storedUser.email]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/api/books/mybooks', {
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

    const restockBook = async (bookId) => {
        try {
            await axios.post('http://localhost:4000/api/books/restock', { bookId: bookId, email: storedUser.email});
            fetchBooks();
        } catch (err) {
            console.error("Failed to restock book:", err);
            alert('Failed to restock book.');
        }
    };

    const deleteBook = async (bookId) => {
        try {
           const res= await axios.delete(`http://localhost:4000/api/books/delete/${bookId}`);
            if (res){
                window.location.reload();
            }
        } catch (err) {
            console.error("Failed to delete book:", err);
        }
    };

    const updateBook = async (book) => {
        try {
            await axios.put(`http://localhost:4000/api/books/update/${book._id}`, book);
            fetchBooks();
            setSelectedBook(null);
        } catch (err) {
            console.error("Failed to update book:", err);
        }
    };

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>{error}</div>;

    const handleCloseModal = () => setSelectedBook(null);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-center mb-6">My Books</h2>
            <div className="grid gap-4">
                {books.map((book) => (
                    <div key={book._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">

                        <div className='flex gap-2 items-between justify-center'>
                            <img src={`http://localhost:4000/api/images/${book.image}`} alt={book.title} className=" rounded-xl w-24 h-24 object-cover object-center" />
                            <div className='flex flex-col justify-between'>
                                <div>

                                    <p className="font-semibold">{book.title}</p>
                                    <p className="font-normal text-md">{book.author}</p>
                                    <p className="font-normal text-xs">{book.price}</p>
                                </div>


                                <p className={`flex items-center justify-center gap-2 text-sm font-medium ${book.isSold ? 'text-red-500' : 'text-green-500'}`}>
                                    {book.isSold ? 'Sold' : 'Available'} {book.isSold ? <FaTimesCircle /> : <FaCheckCircle />}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => restockBook(book._id)} className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                <FaSync className="mr-2" />Restock
                            </button>
                            <button onClick={() => setSelectedBook(book)} className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                <FaEdit className="mr-2" />Edit
                            </button>
                            <button onClick={() => deleteBook(book._id)} className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                <FaTrashAlt className="mr-2" />Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedBook && <UpdateBookModal book={selectedBook} onClose={handleCloseModal} onUpdate={updateBook} />}
        </div>
    );
};

export default ManageBooks;
