import express from "express";
import { getWishlist, changeItemQuantity, addItem, removeItem } from "../controllers/wishlist.controllers.js";
import { asyncMiddleware } from "../middleware/asyncHandler.middleware.js";
import { changeItemQuantitySchema, addItemSchema, removeItemSchema } from "../payload/wishlist.payload.js";
import { validateRequestSchema } from "../middleware/validate-payload.middleware.js";
import { authenticateJWT } from "../middleware/authenticateToken.middleware.js";


const router = express.Router();

// get cart
router.route("/").get(
    authenticateJWT,
    asyncMiddleware(getWishlist));

// change quantity of item wishlist
router.route("/changeItemQuantity").post(
    authenticateJWT,
    changeItemQuantitySchema,
    validateRequestSchema,
    asyncMiddleware(changeItemQuantity));

// add item
router.route("/addItem").post(
    authenticateJWT,
    addItemSchema,
    validateRequestSchema,
    asyncMiddleware(addItem));

// remove item
router.route("/removeItem").delete(
    authenticateJWT,
    removeItemSchema,
    validateRequestSchema,
    asyncMiddleware(removeItem));



export default router;