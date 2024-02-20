const express = require('express');
const router = express.Router();
const { getBooks, getSingleBook, createBook, updateBook, deleteBook } = require('../controllers/book.controller');

router.get('/', getBooks);
router.get('/:id', getSingleBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;

