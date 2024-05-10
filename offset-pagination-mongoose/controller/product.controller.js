const Product = require('../model/product.model');

const getProducts = async (req, res) => {
    try {
        const page = Number(req.query.page);
        const limit = 10;

        const count = await Product.find().count()
        
        const products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()

        let resultShowing = products.length;
            
        res.status(200).json({
            products,
            totalPages: Math.ceil((count / limit)),
            currentPage: page,
            showing: `${resultShowing} out of ${count} products.`
        })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
    

module.exports = {
    getProducts
}