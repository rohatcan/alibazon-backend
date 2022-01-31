import express from "express";
import { getProducts } from "../controllers/product.controllers.js";
import { asyncMiddleware } from "../middleware/asyncHandler.middleware.js";
import { param } from "express-validator";

const router = express.Router();

router.route("/product_search").get(
    param('secretKey').exists({ checkFalsy: true }),
    asyncMiddleware(getProducts));

export default router;