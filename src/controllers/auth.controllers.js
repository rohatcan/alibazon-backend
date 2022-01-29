import { signIn, signUp } from "../services/auth.services.js";

const register = async(req, res, next) => {

    const user = await signUp(req, res);
    res.send(user);
};

const login = async(req, res) => {

    const user = await signIn(req, res);
    res.status(200);
    res.cookie("token", user.token, { maxAge: 9000000, httpOnly: true });
    res.json(user);
};

export { register, login };