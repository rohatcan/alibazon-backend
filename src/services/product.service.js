import apiClient from "../utils/api.utils.js";

const getProductById = async(req, res) => {

    const product = await apiClient.get("/products/product_search", {
        params: {
            secretKey: process.env.API_KEY,
            id: req.query.id
        },
    });
    res.send(product.data);
};

export { getProductById };