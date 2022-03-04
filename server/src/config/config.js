module.exports = {
    port: process.env.PORT || 5000,

    // application secrets
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'password'
    }
};