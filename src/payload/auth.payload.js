import { body } from "express-validator";

const loginSchema = [
    body('password').isLength({ min: 5 }),
    body('email').isEmail(),
];

const registerSchema = [
    body('name').exists({ checkFalsy: true }),
    body('password').isLength({ min: 5 }),
    body('email').isEmail(),
];
export { loginSchema, registerSchema };