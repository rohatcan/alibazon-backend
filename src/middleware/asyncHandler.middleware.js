// const asyncMiddleware = fn =>

//     (req, res, next) => {
//         Promise.resolve(fn(req, res, next))
//             .catch(next);
//     };

const asyncMiddleware = handler =>
    async(req, res, next) => {

        try {
            await handler(req, res);
        } catch (error) {
            next(error);
            return error;
        }
    };
export { asyncMiddleware };