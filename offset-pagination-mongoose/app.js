require('dotenv').config();
const express = require('express');
const productRoute = require('./routes/product.route');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/v1/products', productRoute);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_LINK)
        console.log("Connected to database!")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (error) {
        console.log(error.message);
    }   
}
start();

