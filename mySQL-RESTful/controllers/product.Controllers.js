import mysqlPool from "../config/database.js";

const getAllProducts = async (req, res) => {
    try {
        const [result] = await mysqlPool.query("SELECT * FROM Electronics")
        res.status(200).send(result)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getSingleProduct(req, res) {
    try {
        const { id } = req.params;
        const [result] = await mysqlPool.query(`
            SELECT * FROM Electronics
            WHERE id = ?`, [id]);

        if (result.length === 0) {
            res.send(`no record with id = ${id}`);
        } else {
            res.send(result);
        }
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, manufacturer, quantity_in_stock, price } = req.body
        const [result] = await mysqlPool.query(`
                INSERT INTO Electronics(name, manufacturer, quantity_in_stock, price)
                VALUES (?, ?, ?, ?)`, [name, manufacturer, quantity_in_stock, price])

        const id = result.insertId;
        const [output] = await mysqlPool.query(`
                    SELECT * FROM Electronics
                    WHERE id = ?
                    `, [id])
        res.status(201).json({
            message: "Product added successfully",
            data: output
        })
                
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const [result] = await mysqlPool.query(`
            DELETE FROM Electronics
            WHERE id = ?
            LIMIT 1
        `, [id])

        if (result.affectedRows === 0) {
            res.send(`no record with id = ${id}`)
        } else {
            res.json({
                message: `Product with id = ${id} deleted successfully` 
            })
        }
      
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { quantity_in_stock, price } = req.body

        const [checkProductExist] = await mysqlPool.query(`
            SELECT * FROM Electronics
            WHERE id = ?
        `, [id])

        if (checkProductExist.length === 0) {
            return res.status(404).send(`Product with id = ${id} doesn't exist`)
        } 
        
        if (quantity_in_stock && price) {
            const [result] = await mysqlPool.query(`
            UPDATE Electronics
            SET quantity_in_stock = ${quantity_in_stock},
                price = ${price}
            WHERE id = ?
            `, [id])

            res.json({
                message: "Product updated successfully",
                data: result
            })

        } else if (!quantity_in_stock) {
            const [result] = await mysqlPool.query(`
            UPDATE Electronics
            SET price = ${price}
            WHERE id = ?
            `, [id])

            res.json({
                message: "Product updated successfully",
                data: result
            })

        } else {
            const [result] = await mysqlPool.query(`
            UPDATE Electronics
            SET quantity_in_stock = ${quantity_in_stock}
            WHERE id = ?
            `, [id])

            res.json({
                message: "Product updated successfully",
                data: result
            })
        }
                       
    } catch (err) {
        res.status(500).json({message: err.message})
        
    }
}

const searchProduct = async (req, res) => {
    try {
        const { name, manufacturer } = req.query

        const [result] = await mysqlPool.query(`
                SELECT * FROM Electronics
                WHERE name LIKE ? OR manufacturer LIKE ?
                `, [`%${name}%`, `%${manufacturer}%`])

        if (result.length === 0) {
            return res.json({message: "name or manufacturer required in query"})
        }

        if (name || manufacturer) {
            res.send(result)
        }
        
    } catch (err) {
        res.status(500).send(err.message)
        console.log(err)
    }
}

export { 
    getAllProducts, 
    getSingleProduct, 
    addProduct, 
    deleteProduct, 
    updateProduct,
    searchProduct
};