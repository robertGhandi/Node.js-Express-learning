require('dotenv').config()
const mongoose = require('mongoose');
const Product = require('./model/product.model')

const jsonProducts = require('./product.json')

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_LINK)
        console.log('connected to database');
        await Product.deleteMany()
        await Product.create(jsonProducts);

        console.log('success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()