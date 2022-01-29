import apiClient from "../utils/api.utils.js";

const signIn = async(req, res) => {

    const user = await apiClient.post("/auth/signin", {
        secretKey: req.body.secretKey,
        email: req.body.email,
        password: req.body.password
    });

    return user.data;
};

const signUp = async(req, res) => {

    const user = await apiClient.post("/auth/signup", {
        secretKey: req.body.secretKey,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    return user.data;
};

export { signIn, signUp };