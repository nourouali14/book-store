const express = require('express');
const router = express.Router();
const {createBook,getAllBooks,getMyBooks,buyBook,restockBook,deleteBook,updateBook,getPurchasedBooks} = require('../controller/book')
const  upload  = require('../config/upload');

router.post('/create',upload,createBook)
router.post('/mybooks',getMyBooks)
router.get('/all',getAllBooks)
router.post('/buy', buyBook);
router.post('/restock', restockBook);
router.delete('/delete/:id', deleteBook);
router.put('/update/:id', updateBook);
router.get('/purchased/:id', getPurchasedBooks);

module.exports = router;
