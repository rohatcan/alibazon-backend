import axios from "axios";
import ash from "express-async-handler";
import { nextTick } from "process";
import apiClient from "../utils/api.utils.js";


const getCategories = ash(async(req, res) => {

    const category = await apiClient.get(`/category`, {
        params: {
            secretKey: process.env.API_KEY
        }
    });
    res.send(category.data);
});


const getCategoryById = ash(async(req, res) => {

    const category = await apiClient.get(`/category/${req.params.id}`, {}).data;
});

const getSubCategories = ash(async(req, res) => {

    const subCategories = await apiClient.get(`/categories/parent/${req.params.id}`, {
        params: {
            secretKey: process.env.API_KEY
        }
    });
});

const getCategoryWithProducts = async(parentCategory) => {

    let categorysWithProduct = [];
    let subCategories = [];
    console.log("baslangic " + parentCategory);
    if (!parentCategory.length) {
        return;
    }

    for (let category of parentCategory) {


        let subCategoryIds = await getSubCategoriesIds(category);
        console.log("subcategory ids:" + subCategoryIds);

        if (!subCategoryIds.length) {
            categorysWithProduct.push(category);
        } else {
            subCategoryIds.forEach(id => {
                subCategories.push(id);
            });
            // subCategories.push(subCategoryIds);
            console.log("else " + subCategories);
        }
    }
    console.log("bu gelmedi bu " + subCategories);

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