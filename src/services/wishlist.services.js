function WishlistService(apiClient) {

    const getWishlist = async(req, res) => {

        let config = {
            headers: {
                Authorization: req.authHeader,
            },
            params: {
                secretKey: req.query.secretKey
            }
        };
        const wishlist = await apiClient.get("/wishlist", config);

        return wishlist.data;
    };

    const addItem = async(req, res) => {

        let config = {
            headers: {
                Authorization: req.authHeader,
            }
        };

        const wishlist = await apiClient.post("/wishlist/addItem", req.body, config);
        return wishlist.data;
    };

    const removeItem = async(req, res) => {

        const cart = await apiClient.delete("/wishlist/removeItem", {
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
        const wishlist = await apiClient.post("/wishlist/changeItemQuantity", req.body, config);
        return wishlist.data;
    };


    return {
        getWishlist,
        addItem,
        removeItem,
        changeItemQuantity
    };
}
export { WishlistService };