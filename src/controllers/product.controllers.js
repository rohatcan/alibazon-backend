import axios from "axios";
import ash from "express-async-handler";
import apiClient from "../utils/api.client.js";
import { getCategoryWithProducts } from "./category.controllers.js";
/*

    Get Products by Search Params
 */
// @desc Fetch All products
// const getProducts = async(req, res) => {
//     console.log(`get products`);
// };
const getProducts = ash(async(req, res) => {

    if (req.query.id) {
        getProductById(req, res);
        return;
    } else if (req.query.primary_category_id) {
        getProductsByCategory(req, res);
        return;
    }
    const products = await apiClient.get("/products/product_search", {
        params: {
            secretKey: process.env.API_KEY,
        },
    });
    res.send(products.data);
});

const getProductsByCategory = async(req, res) => {

    let parentCategory = [req.query.primary_category_id];
    let categoriesWithProducts = await getCategoryWithProducts(parentCategory);
    console.log("adam gelmedi mi " + categoriesWithProducts);
    let products = [];
    // console.log('categories wit products ne');
    // console.log("iki burada mi " + categoriesWithProducts);
    // // categoriesWithProducts.forEach(async category => {

    //     let getProducts = await apiClient.get("/products/product_search", {
    //         params: {
    //             secretKey: req.query.API_KEY,
    //             primary_category_id: category
    //         }
    //     });
    // });
    // console.log('get product by category');
};

const getProductById = ash(async(req, res) => {

    console.log(`get product`);
    const product = await apiClient.get("/products/product_search", {
        params: {
            secretKey: process.env.API_KEY,
            id: req.query.id
        },
    });
    res.send(product.data);
});

export { getProducts };