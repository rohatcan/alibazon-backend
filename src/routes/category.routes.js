import express from "express";
import { getCategories, getCategoryById, getSubCategories } from "../controllers/category.controllers.js";

const router = express.Router();

router.route("/").get(getCategories);
router.route("/:id").get(getCategoryById);
router.route("/parent/:id").get(getSubCategories);

export default router;