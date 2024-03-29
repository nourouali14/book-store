import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        price: '',
        email: storedUser.email || '', 
        image: null
    });
    const [previewImage, setPreviewImage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setBookDetails({ ...bookDetails, [name]: files[0] });
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            setBookDetails({ ...bookDetails, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(bookDetails).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await axios.post('http://localhost:4000/api/books/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
           
            setBookDetails({ title: '', author: '', price: '', email: storedUser.email || '', image: null });
            setPreviewImage('');
            
        } catch (error) {
            console.error("Error adding book:", error.response?.data);
      
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Add a New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="title" className="font-medium text-gray-700">Title</label>
                    <input id="title" type="text" name="title" value={bookDetails.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="author" className="font-medium text-gray-700">Author</label>
                    <input id="author" type="text" name="author" value={bookDetails.author} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="price" className="font-medium text-gray-700">Price</label>
                    <input id="price" type="text" name="price" value={bookDetails.price} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
               
                <div className="space-y-2">
                    <label htmlFor="image" className="font-medium text-gray-700">Book Cover Image</label>
                    <input id="image" type="file" name="image" onChange={handleChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    {previewImage && <img src={previewImage} alt="Preview" className="mt-4 h-40 rounded-md" />}
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500">Submit</button>
            </form>
        </div>
    </div>
    );
}

export default AddBook;
