import { OrderService } from "../services/order.services.js";
import apiClient from "../utils/api.utils.js";

const orderServiceInstance = new OrderService(apiClient);


const getOrder = async(req, res, next) => {

    const order = await orderServiceInstance.getOrder(req, res);
    res.send(order);
};

const createOrder = async(req, res) => {

    const order = await orderServiceInstance.createOrder(req, res);
    res.json(order);
};

export { getOrder, createOrder };