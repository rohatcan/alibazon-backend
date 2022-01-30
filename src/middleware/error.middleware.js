const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    if (err.response) {
        res.status(err.response.status);
        err.message = err.response.data;
    } else if (err.request) {
        res.status(err.response.status);
        err.message = err.request.data;
    }
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
    res.end(res.sentry + '\n');
};

export { notFound, errorHandler };