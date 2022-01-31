import { body } from "express-validator";

const createOrderSchema = [

    body('secretKey').isLength({ min: 5 }),
    body('paymentId').exists({ checkFalsy: true }),
    body('items').exists({ checkFalsy: true }),
];


export { createOrderSchema };