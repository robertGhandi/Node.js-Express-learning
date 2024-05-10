const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: String,
    company: String,
    rating: Number,
    price: Number,
    featured: Boolean,
}, { timestamps: true });



const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;