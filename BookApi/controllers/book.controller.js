const books = require('../db/storage');

const getBooks = (req, res) => {
    res.status(200).json(books)
};

const getSingleBook = (req, res) => {
    const bookId = Number(req.params.id);
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

const createBook = (req, res) => {
    const { title, author } = req.body;

    const duplicate = books.find(book => book.title === title);
    
    if (title && author) {
        const newBook = { id: books.length + 1, title, author };
        
        if (duplicate) {
            return res.status(409).json({message : "Book already exists"}); // conflict
        }
        books.push(newBook);
        res.status(201).json(newBook);
    } else {
        res.status(400).json({ error: 'Invalid request. title and author are required.' });
    }
    
}

const updateBook = async (req, res) => {
    const book = books.find(book => book.id === Number(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }

    const { title, author } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    
    res.json(book);
    
} 

const deleteBook = (req, res) => {
    const bookIndex = books.findIndex(book => book.id === Number(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).send('Book not found');
    }

    books.splice(bookIndex, 1);
    res.json({message: 'Successfully deleted'})
}


module.exports = {
    getBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
}