import { CartService } from "../services/cart.services.js";
import apiClient from "../utils/api.utils.js";

const cartServiceInstance = new CartService(apiClient);

const getCart = async(req, res) => {

    const cart = await cartServiceInstance.getCart(req, res);
    res.send(cart);
};

const addItem = async(req, res) => {

    const cart = await cartServiceInstance.addItem(req, res);
    res.send(cart);
};

const removeItem = async(req, res) => {

    const cart = await cartServiceInstance.removeItem(req, res);
    res.send(cart);
};

const changeItemQuantity = async(req, res) => {

    const cart = await cartServiceInstance.changeItemQuantity(req, res);
    res.send(cart);
};
export { getCart, changeItemQuantity, addItem, removeItem };