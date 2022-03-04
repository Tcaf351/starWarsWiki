// Custom Error Utility Class
class ApiError {
    // set class properties
    constructor(code, message, error) {
        this.code = code;
        this.message = message;
        this.error = error;
    }

    // set class methods - storing custom functions for errors
    // 400 - Bad Request
    static badRequest(msg) {
        return new ApiError(400, `Bad Request: ${msg}`);
    }

    // 404 - Not Found
    static notFound() {
        return new ApiError(404, `Resource Not Found`);
    }

    // 500 - Internal Server Error
    static internal(msg, error) {
        console.error(error);
        return new ApiError(500, `Internal Server Error: ${msg}`);
    }
}

module.exports = ApiError;