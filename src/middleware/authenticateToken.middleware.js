const authenticateJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {

        const token = authHeader.split(' ')[1];
        req.token = token;
        req.authHeader = authHeader;
        next();

        // jwt.verify(token, accessTokenSecret, (err, user) => {
        //     if (err) {
        //         return res.sendStatus(403);
        //     }
        //     req.user = user;
        //     next();
        // });
    } else {
        const error = new Error('auth ');
        res.statusCode = 401;
        next(error);
    }
};

export { authenticateJWT };