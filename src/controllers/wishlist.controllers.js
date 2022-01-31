import { WishlistService } from "../services/wishlist.services.js";
import apiClient from "../utils/api.utils.js";

const wishlistServiceInstance = new WishlistService(apiClient);

const getWishlist = async(req, res) => {

    const cart = await wishlistServiceInstance.getWishlist(req, res);
    res.send(cart);
};

const addItem = async(req, res) => {

    const cart = await wishlistServiceInstance.addItem(req, res);
    res.send(cart);
};

const removeItem = async(req, res) => {

    const user = await wishlistServiceInstance.removeItem(req, res);
    res.send(user);
};

const changeItemQuantity = async(req, res) => {

    const user = await wishlistServiceInstance.changeItemQuantity(req, res);
    res.send(user);
};
export { getWishlist, changeItemQuantity, addItem, removeItem };