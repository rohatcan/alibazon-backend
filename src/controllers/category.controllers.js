import apiClient from "../utils/api.utils.js";


const getCategories = async(req, res) => {

    const category = await apiClient.get(`/categories`, {
        params: {
            secretKey: process.env.API_KEY
        }
    });
    res.send(category.data);
};


const getCategoryById = async(req, res) => {

    const category = await apiClient.get(`/categories/${req.params.id}`, {
        params: {
            secretKey: req.query.secretKey
        }
    });
    res.send(category.data)
};

const getSubCategories = async(req, res) => {

    const subCategories = await apiClient.get(`/categories/parent/${req.params.id}`, {
        params: {
            secretKey: process.env.API_KEY
        }
    });
    res.send(subCategories.data)
};

const getCategoryWithProducts = async(parentCategory) => {

    let categorysWithProduct = [];
    let subCategories = [];

    if (!parentCategory.length) {
        return;
    }

    for (let category of parentCategory) {

        let subCategoryIds = await getSubCategoriesIds(category);

        if (!subCategoryIds.length) {
            categorysWithProduct.push(category);
        } else {
            subCategoryIds.forEach(id => {
                subCategories.push(id);
            });
        }
    }

    const sub = await getCategoryWithProducts(subCategories);
    return categorysWithProduct.concat(sub);
};

const getSubCategoriesByParentId = async(parentId) => {

    const subCategories = await apiClient.get(`/categories/parent/${parentId}`, {
        params: {
            secretKey: process.env.API_KEY
        }
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err.message);
        throw err;
    });
    return subCategories;
};
const getSubCategoriesIds = async(parentCategory) => {

    let subCategories = await getSubCategoriesByParentId(parentCategory);
    return subCategories.map((category) => {

        return category.id;
    });
};

export { getCategories, getCategoryById, getSubCategories, getCategoryWithProducts };