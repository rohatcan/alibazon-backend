import express from "express";
import { getProducts } from "../controllers/product.controllers.js";
import { asyncMiddleware } from "../middleware/asyncHandler.middleware.js";

const router = express.Router();

router.route("/product_search").get(asyncMiddleware(getProducts));

export default router;