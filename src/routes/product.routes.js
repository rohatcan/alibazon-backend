import express from "express";
import { getProducts } from "../controllers/product.controllers.js";

const router = express.Router();
router.route("/product_search").get(getProducts);

export default router;