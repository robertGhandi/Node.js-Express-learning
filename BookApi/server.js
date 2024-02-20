const express = require('express');
const app = express();
const BookRoute = require('./routes/book.route');
const PORT = 5000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/books', BookRoute);

app.listen(5000, () => {
    console.log(`app is listening on http://localhost:${PORT}`)
})