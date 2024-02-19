const express = require('express');
const app = express();

const mongoose = require('mongoose');
const ProductRoute = require('./routes/product.route');

require('dotenv').config()

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/products', ProductRoute)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database!")
        app.listen(3500, () => {
            console.log('Server is running on port 3500')
        });
    })
    .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send("Hello from Node API")
});
