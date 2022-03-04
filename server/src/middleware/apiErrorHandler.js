// Error Handling Middleware
const ApiError = require('../utilities/ApiError');

const apiErrorHandler = (error, req, res, next) => {
    // 1. Middleware will check if the error is one of our pre-defined methods
    if (error instanceof ApiError) {
        res.status(error.code).json(error.message);
        return;

    // 2. Middleware catch-all - If it doesn't fall within a pre-defined method, it passes to the general error message
    } else {
        console.error(error);
        res.status(500).json({
           message: 'Oops! Something went wrong - Please try again later' 
        });
    }

};

module.exports = apiErrorHandler;