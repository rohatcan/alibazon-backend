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

    const user = await cartServiceInstance.removeItem(req, res);
    res.send(user);
};

const changeItemQuantity = async(req, res) => {

    const user = await cartServiceInstance.changeItemQuantity(req, res);
    res.status(200);
    res.cookie("token", user.token, { maxAge: 9000000, httpOnly: true });
    res.json(user);
};
export { getCart, changeItemQuantity, addItem, removeItem };