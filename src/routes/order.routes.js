import express from "express";
import { getOrder, createOrder } from "../controllers/order.controllers.js";
import { asyncMiddleware } from "../middleware/asyncHandler.middleware.js";
import { validateRequestSchema } from "../middleware/validate-payload.middleware.js";
import { authenticateJWT } from "../middleware/authenticateToken.middleware.js";
import { createOrderSchema } from "../payload/order.payload.js";
import { param } from "express-validator";

const router = express.Router();

router.route("/").get(
    param('secretKey').exists({ checkFalsy: true }),
    authenticateJWT,
    asyncMiddleware(getOrder));

router.route("/").post(
    authenticateJWT,
    createOrderSchema,
    validateRequestSchema,
    asyncMiddleware(createOrder));


export default router;