function OrderService(apiClient) {

    const getOrder = async(req, res) => {

        const order = await apiClient.get("/orders", {
            params: {
                secretKey: req.query.secretKey
            }
        });

        return order.data;
    };

    const createOrder = async(req, res) => {

        const order = await apiClient.post("/orders", {
            secretKey: req.body.secretKey,
            paymentId: req.body.paymentId,
            items: req.body.items,
        });
        return order.data;
    };
    return {
        getOrder,
        createOrder
    };
}

export { OrderService };