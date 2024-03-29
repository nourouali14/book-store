const Book = require('../models/book');
const User = require('../models/user');
const {getRole,getUserId} = require('./auth');

const createBook = async (req, res) => {
    try {
        const { email, ...restOfBody } = req.body;
        const role = await getRole(email);
        const userId = await getUserId(email);
        if (role !== 'admin') {
            return res.status(403).json("Unauthorized: Only admins can create books.");
        }

        const bookData = {
          ...restOfBody,
          user: userId,
          isSold: false,
          image: req.file ? req.file.filename : undefined
        };

        const newBook = new Book(bookData);
        await newBook.save();

        res.status(200).json({ message: "Book created successfully", book: newBook });

    } catch(err) {
        res.status(500).json(err);
    }
};


const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getMyBooks = async (req, res) => {
    try {
        const {email} = req.body;
        const userId = await getUserId(email);
        const books = await Book.find({user: userId});
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json(err);
    }
}
const buyBook = async (req, res) => {
    try {
        const {email, bookId} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json("User not found");
        }
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json("Book not found");
        }
        if (book.user.toString() === user._id.toString()) {
            return res.status(403).json("You cannot buy your own book");
        }
        if (book.isSold) {
            return res.status(403).json("Book is already sold");
        }
        book.isSold = true;
        await book.save();

        user.books.push(book._id);
        const res = await user.save();

        res.status(200).json("Book has been bought successfully");
    } catch (err) {
        res.status(500).json(err);
    }
};

const restockBook = async (req, res) => {
    try {
        const {email,bookId} = req.body;
        const userId = await getUserId(email);
        const book = await Book.findById(bookId);
        if(!book){
            return res.status(404).json("Book not found");
        }                                                                                                  
        if(book.user.toString() !== userId.toString()){
            return res.status(403).json("You cannot restock a book that you do not own");
        }
        if(!book.isSold){
            return res.status(403).json("Book is already in stock");
        }
        book.isSold = false;
        await book.save();
        res.status(200).json("Book has been restocked successfully");
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const result = await Book.deleteOne({ _id: bookId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book successfully deleted" });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the book", error: err.message });
    }
};


const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updateData  = req.body; 
        const updatedBook = await Book.findByIdAndUpdate(
            bookId, 
            updateData, 
            { new: true } 
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Failed to update the book or book not found" });
        }

        res.status(200).json(updatedBook);
    } catch (err) {
        console.error("Error updating book:", err);
        res.status(500).json({ message: "An error occurred while updating the book", error: err });
    }
};

const getPurchasedBooks = async (req, res) => {
    try {
        const email = req.params.id;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json("User not found");
        }
        await user.populate('books');
        const purchasedBooks = user.books.filter(book => book.isSold);

        res.status(200).json(purchasedBooks);
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports = { createBook,getAllBooks,getMyBooks,buyBook,restockBook,deleteBook,updateBook,getPurchasedBooks };