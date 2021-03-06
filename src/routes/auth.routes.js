import express from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { asyncMiddleware } from "../middleware/asyncHandler.middleware.js";
import { loginSchema, registerSchema } from "../payload/auth.payload.js";
import { validateRequestSchema } from "../middleware/validate-payload.middleware.js";


const router = express.Router();

router.route("/signin").post(
    loginSchema,
    validateRequestSchema,
    asyncMiddleware(login));


router.route("/signup").post(
    registerSchema,
    validateRequestSchema,
    asyncMiddleware(register));

export default router;