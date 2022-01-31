import express from "express";
import { param } from "express-validator";
import { getCategories, getCategoryById, getSubCategories } from "../controllers/category.controllers.js";
import { asyncMiddleware } from "../middleware/asyncHandler.middleware.js";

const router = express.Router();

router.route("/").get(
    param('secretKey').exists({ checkFalsy: true }),
    asyncMiddleware(getCategories));

router.route("/:id").get(
    param('secretKey').exists({ checkFalsy: true }),
    asyncMiddleware(getCategoryById));

router.route("/parent/:id").get(
    param('secretKey').exists({ checkFalsy: true }),
    asyncMiddleware(getSubCategories));

export default router;