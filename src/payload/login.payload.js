import { body } from "express-validator";

const schema = [
    body('name').exists({ checkFalsy: true }),
    body('password').isLength({ min: 5 }),
    body('email').isEmail(),
];


export { schema as loginSchema };