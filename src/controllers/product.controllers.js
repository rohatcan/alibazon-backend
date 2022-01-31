import apiClient from "../utils/api.utils.js";
import { getCategoryWithProducts } from "./category.controllers.js";

const getProducts = async(req, res) => {

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
};

const getProductsByCategory = async(req, res) => {

    let parentCategory = [req.query.primary_category_id];
    let categoriesWithProducts = await getCategoryWithProducts(parentCategory);
    let products = [];
    for (const category of categoriesWithProducts) {
        try {
            let getProducts = await apiClient.get("/products/product_search", {
                params: {
                    secretKey: req.query.secretKey,
                    primary_category_id: category
                }
            });
            for (const product of getProducts.data) {
                products.push(product);
            }

        } catch (error) {}
    }
    res.json(products);

};

const getProductById = async(req, res) => {

    const product = await apiClient.get("/products/product_search", {
        params: {
            secretKey: process.env.API_KEY,
            id: req.query.id
        },
    });
    res.send(product.data);
};

export { getProducts };