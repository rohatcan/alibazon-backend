import { body } from "express-validator";

const changeItemQuantitySchema = [

    body('secretKey').isLength({ min: 5 }),
    body('productId').exists({ checkFalsy: true }),
    body('variantId').exists({ checkFalsy: true }),
    body('quantity').exists({ checkFalsy: true }),
];

const addItemSchema = [

    body('secretKey').exists({ checkFalsy: true }),
    body('productId').exists({ checkFalsy: true }),
    body('variantId').exists({ checkFalsy: true }),
    body('quantity').exists({ checkFalsy: true }),
];

const removeItemSchema = [

    body('secretKey').exists({ checkFalsy: true }),
    body('productId').exists({ checkFalsy: true }),
    body('variantId').exists({ checkFalsy: true }),
];

export { changeItemQuantitySchema, addItemSchema, removeItemSchema };