import express from "express";
import { getAllProducts, getSingleProduct, addProduct, deleteProduct, updateProduct, searchProduct } from "../controllers/product.Controllers.js";

const router = express.Router();

router.route("/")
    .get(getAllProducts)
    .post(addProduct)

router.route("/search").get(searchProduct)

router.route("/:id")
    .get(getSingleProduct)
    .post(deleteProduct)
    .put(updateProduct)



export default router;