require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const userRoute = require('./route/userRoute');
const PORT = 3000;

app.use(express.json());
app.use('/api/v1/users', userRoute);

const startServer = async () => {
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
startServer();