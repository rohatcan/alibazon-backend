function cartService(apiClient) {

    const getCart = async(req, res) => {

        let config = {
            headers: {
                Authorization: req.authHeader,
            },
            params: {
                secretKey: req.query.secretKey
            }
        };
        const cart = await apiClient.get("/cart", config);

        return cart.data;
    };

    const addItem = async(req, res) => {

        let config = {
            headers: {
                Authorization: req.authHeader,
            }
        };

        const cart = await apiClient.post("/cart/addItem", req.body, config);
        return user.data;
    };

    const removeItem = async(req, res) => {

        const cart = await apiClient.delete("/cart/removeItem", {
            headers: {
                Authorization: req.authHeader,
            },
            data: req.body,
        });
        return cart.data;
    };

    const changeItemQuantity = async(req, res) => {

        let config = {
            headers: {
                Authorization: req.authHeader,
            }
        };
        const cart = await apiClient.post("/cart/changeItemQuantity", req.body, config);
        return cart.data;
    };


    return {
        getCart,
        addItem,
        removeItem,
        changeItemQuantity
    };
}
export { cartService };