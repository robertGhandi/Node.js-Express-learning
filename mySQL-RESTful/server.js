import express from 'express';
import dotenv from 'dotenv';
import db from "./config/database.js";
import productRoutes from "./routes/product.Routes.js";
dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/products", productRoutes);

//connect to mySQL and start server
db.query("SELECT 1")
    .then(() => {
        console.log("MySQL connection established!!!")
        app.listen(Port, () => {
        console.log(`Server is listening on port ${Port}`)
    })
    })
    .catch((err) => console.log(`db connection failed. ${err.message}`));